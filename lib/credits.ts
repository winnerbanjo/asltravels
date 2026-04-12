import { connectToDatabase } from "@/lib/db";
import { UserModel } from "@/models/User";

export const MONTHLY_FREE_CREDITS = 100;

function getCurrentCreditPeriod(date = new Date()) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

function normalizeUserCredits<T extends {
  creditPeriod?: string;
  creditsRemaining?: number;
  creditLimit?: number;
}>(
  user: T,
) {
  const currentPeriod = getCurrentCreditPeriod();
  const creditLimit = user.creditLimit ?? MONTHLY_FREE_CREDITS;

  if (user.creditPeriod !== currentPeriod) {
    return {
      creditPeriod: currentPeriod,
      creditLimit,
      creditsRemaining: creditLimit,
      resetApplied: true,
    };
  }

  return {
    creditPeriod: currentPeriod,
    creditLimit,
    creditsRemaining: user.creditsRemaining ?? creditLimit,
    resetApplied: false,
  };
}

export async function getNormalizedUserById(userId: string) {
  await connectToDatabase();
  const user = await UserModel.findById(userId);

  if (!user) {
    return null;
  }

  const normalized = normalizeUserCredits(user);

  if (normalized.resetApplied) {
    user.creditPeriod = normalized.creditPeriod;
    user.creditLimit = normalized.creditLimit;
    user.creditsRemaining = normalized.creditsRemaining;
    await user.save();
  }

  return user;
}

export async function reserveUserCredit(userId: string) {
  const user = await getNormalizedUserById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  if ((user.creditsRemaining ?? 0) <= 0) {
    return {
      ok: false as const,
      creditsRemaining: 0,
      creditLimit: user.creditLimit ?? MONTHLY_FREE_CREDITS,
      creditPeriod: user.creditPeriod ?? getCurrentCreditPeriod(),
    };
  }

  user.creditsRemaining = Math.max((user.creditsRemaining ?? 0) - 1, 0);
  await user.save();

  return {
    ok: true as const,
    creditsRemaining: user.creditsRemaining,
    creditLimit: user.creditLimit ?? MONTHLY_FREE_CREDITS,
    creditPeriod: user.creditPeriod ?? getCurrentCreditPeriod(),
  };
}

export async function refundUserCredit(userId: string) {
  const user = await getNormalizedUserById(userId);

  if (!user) {
    return null;
  }

  const creditLimit = user.creditLimit ?? MONTHLY_FREE_CREDITS;
  user.creditsRemaining = Math.min((user.creditsRemaining ?? 0) + 1, creditLimit);
  await user.save();

  return {
    creditsRemaining: user.creditsRemaining,
    creditLimit,
    creditPeriod: user.creditPeriod ?? getCurrentCreditPeriod(),
  };
}
