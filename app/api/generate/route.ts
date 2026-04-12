import { openai } from "@/lib/openai";
import { geminiModel } from "@/lib/gemini";
import { getSession } from "@/lib/auth";
import { refundUserCredit, reserveUserCredit } from "@/lib/credits";
import { buildPrompt, getGenerationSize } from "@/lib/studio-config";
import type { StudioAction, StudioOption } from "@/lib/types";

export async function POST(req: Request) {
  let creditedUserId: string | null = null;

  try {
    const {
      imageUrl,
      style,
      action,
      option,
    } = (await req.json()) as {
      imageUrl: string;
      style?: string;
      action?: StudioAction;
      option?: StudioOption;
    };

    if (!imageUrl) {
      throw new Error("Missing imageUrl.");
    }

    const sessionUser = await getSession();
    let creditState:
      | {
          creditsRemaining: number;
          creditLimit: number;
          creditPeriod: string;
        }
      | null = null;

    if (sessionUser) {
      const reservation = await reserveUserCredit(sessionUser.id);

      if (!reservation.ok) {
        return Response.json(
          {
            success: false,
            error: "You’ve used your monthly credits. Add more credits to continue.",
            code: "INSUFFICIENT_CREDITS",
            creditsRemaining: reservation.creditsRemaining,
            creditLimit: reservation.creditLimit,
            creditPeriod: reservation.creditPeriod,
          },
          { status: 402 },
        );
      }

      creditedUserId = sessionUser.id;
      creditState = {
        creditsRemaining: reservation.creditsRemaining,
        creditLimit: reservation.creditLimit,
        creditPeriod: reservation.creditPeriod,
      };
    }

    console.log("=== GENERATION START ===");
    console.log("INPUT:", {
      action,
      option,
      style,
      imageUrlType: typeof imageUrl === "string" && imageUrl.startsWith("data:")
        ? "data-url"
        : "remote-url",
      imageUrlLength: typeof imageUrl === "string" ? imageUrl.length : 0,
    });

    const res = await fetch(imageUrl);

    if (!res.ok) {
      throw new Error(`Failed to fetch source image: ${res.status}`);
    }

    const buffer = await res.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");
    const mimeType = res.headers.get("content-type") || "image/png";
    const editImage = new File(
      [Buffer.from(base64Image, "base64")],
      `source.${mimeType.includes("jpeg") ? "jpg" : "png"}`,
      { type: mimeType },
    );

    const prompt =
      action && option
        ? buildPrompt(action, option)
        : `You are a high-end ecommerce photo retoucher.

TASK:
Replace the background with ${style || "a clean studio background"}.
Keep subject and clothing exactly the same.
Improve lighting, sharpness, and subject separation only.

FINAL LOOK:
A crisp premium ecommerce studio image.`;

    console.log("PROMPT PREVIEW:", prompt.slice(0, 400));
    const size = action ? getGenerationSize(action) : "1024x1536";
    console.log("OPENAI SIZE:", size);

    let imageBase64: string | null = null;
    let provider = "none";
    const errors: Record<string, unknown> = {};

    try {
      console.log("Trying OpenAI...");

      const openaiRes = await openai.images.edit({
        model: "gpt-image-1",
        prompt,
        image: editImage,
        size,
        quality: "medium",
        input_fidelity: "high",
        background: "opaque",
      });

      imageBase64 = openaiRes.data?.[0]?.b64_json ?? null;
      provider = "openai";

      console.log("✅ OpenAI SUCCESS");
    } catch (err: unknown) {
      console.error("❌ OpenAI FAILED:");
      console.error(err);

      errors.openai = err instanceof Error ? err.message : err;
    }

    if (!imageBase64) {
      if (creditedUserId) {
        creditState = await refundUserCredit(creditedUserId);
      }

      try {
        console.log("Trying Gemini...");

        const geminiRes = await geminiModel.generateContent([
          prompt,
          {
            inlineData: {
              mimeType,
              data: base64Image,
            },
          },
        ]);

        const text = (await geminiRes.response).text();

        console.log("Gemini response:", text);

        imageBase64 = base64Image;
        provider = "gemini-fallback";

        console.log("⚠️ Gemini used as fallback (original image returned)");
      } catch (err: unknown) {
        console.error("❌ Gemini FAILED:");
        console.error(err);

        errors.gemini = err instanceof Error ? err.message : err;
      }
    }

    if (!imageBase64) {
      console.log("⚠️ All providers failed, returning original");

      imageBase64 = base64Image;
      provider = "none";
    }

    console.log("=== GENERATION END ===");
    console.log("PROVIDER USED:", provider);

    return Response.json({
      success: true,
      image: `data:image/png;base64,${imageBase64}`,
      provider,
      changed: provider === "openai",
      errors,
      creditsRemaining: creditState?.creditsRemaining ?? null,
      creditLimit: creditState?.creditLimit ?? null,
      creditPeriod: creditState?.creditPeriod ?? null,
    });
  } catch (error: unknown) {
    if (creditedUserId) {
      await refundUserCredit(creditedUserId);
    }

    console.error("🔥 CRITICAL ERROR:", error);

    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Generation failed",
      },
      { status: 500 },
    );
  }
}
