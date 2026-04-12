"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/components/auth-provider";
import { ProgressStatus } from "@/components/progress-status";
import {
  getActionConfig,
  getOptionConfig,
  studioActions,
} from "@/lib/studio-config";
import type { StudioAction, StudioOption } from "@/lib/types";
import { UploadDropzone } from "@/components/upload-dropzone";
import { useStudio } from "@/components/studio-provider";
import { withBasePath } from "@/lib/client-paths";

type RecentImage = {
  id: string;
  generatedUrl: string;
  action: StudioAction;
  option: StudioOption;
};

export default function HomePage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { originalUrl, setOriginalUrl, setAction } = useStudio();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [recentImages, setRecentImages] = useState<RecentImage[]>([]);

  const previewUrl = useMemo(() => {
    if (!selectedFile) {
      return null;
    }

    return URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!isAuthenticated) {
      setRecentImages([]);
      return;
    }

    void (async () => {
      const response = await fetch(withBasePath("/api/images/recent"));

      if (!response.ok) {
        return;
      }

      const payload = (await response.json()) as { images: RecentImage[] };
      setRecentImages(payload.images);
    })();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!uploading) {
      return;
    }

    setUploadProgress(8);

    const interval = window.setInterval(() => {
      setUploadProgress((current) => {
        if (current >= 90) {
          return current;
        }

        if (current < 35) {
          return current + 9;
        }

        if (current < 70) {
          return current + 5;
        }

        return current + 2;
      });
    }, 280);

    return () => window.clearInterval(interval);
  }, [uploading]);

  const currentPreview = previewUrl || originalUrl;
  const isActionStep = Boolean(originalUrl);
  const uploadDetails = [
    "Cleaning the background...",
    "Adjusting lighting...",
    "Making it look professional...",
  ];
  const actionHoverCopy: Record<StudioAction, string> = {
    "clean-studio": "Remove messy background",
    "change-color": "Try different outfit colors",
    "upgrade-model": "Try another face direction",
    "create-campaign": "Place it in a real occasion",
  };

  const handleFileUpload = async (file: File) => {
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(withBasePath("/api/upload"), {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const payload = (await response.json()) as { url: string };
      setUploadProgress(100);
      setOriginalUrl(payload.url);
    } catch {
      setUploadProgress(0);
      toast.error("Something went wrong. Please try again.");
    } finally {
      window.setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 250);
    }
  };

  const handleActionSelect = (actionId: (typeof studioActions)[number]["id"]) => {
    setAction(actionId);
    router.push("/editor");
  };

  return (
    <main className="page-shell py-10 md:py-14">
      <div className="pointer-events-none absolute inset-x-0 top-16 -z-10 mx-auto h-64 max-w-6xl overflow-hidden">
        <motion.div
          className="absolute left-10 top-4 h-40 w-40 rounded-full bg-gray-100"
          animate={{ y: [0, 12, 0], opacity: [0.55, 0.85, 0.55] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-16 top-10 h-56 w-56 rounded-full border border-gray-200 bg-white"
          animate={{ y: [0, -10, 0], x: [0, 8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="page-transition flex w-full max-w-5xl flex-col items-center space-y-8 text-center"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <span className="rounded-full border border-gray-200 px-3 py-1 text-sm font-medium text-gray-600">
          Fix your product photo
        </span>
        <div className="space-y-4">
          <h1 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-[#0A0A0A] md:text-5xl">
            Make your product photos look like a professional shoot
          </h1>
          <p className="mx-auto max-w-xl text-base font-normal text-gray-500 md:text-lg">
            No studio. No editing skills. Just upload your photo.
          </p>
        </div>

        <div className="grid w-full gap-3 text-left md:grid-cols-3">
          <motion.div
            className="rounded-xl border border-gray-200 p-4"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.35 }}
          >
            <p className="text-sm font-medium text-[#0A0A0A]">1. Upload</p>
            <p className="mt-1 text-sm text-gray-500">
              Add your product photo
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Take it with your phone, that&apos;s fine.
            </p>
          </motion.div>
          <motion.div
            className="rounded-xl border border-gray-200 p-4"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.35 }}
          >
            <p className="text-sm font-medium text-[#0A0A0A]">2. Pick a direction</p>
            <p className="mt-1 text-sm text-gray-500">
              What do you want to improve?
            </p>
          </motion.div>
          <motion.div
            className="rounded-xl border border-gray-200 p-4"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.35 }}
          >
            <p className="text-sm font-medium text-[#0A0A0A]">3. Generate</p>
            <p className="mt-1 text-sm text-gray-500">
              We&apos;ll fix it for you
            </p>
            <p className="mt-1 text-sm text-gray-500">
              This takes a few seconds...
            </p>
          </motion.div>
        </div>

        <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-left">
          <p className="text-sm font-medium text-[#0A0A0A]">
            {user
              ? `Signed in as ${user.name}. Your generated images can be saved to your account.`
              : "Create an account to save your edits and come back to them later."}
          </p>
        </div>

        <div className="surface-card w-full p-6 md:p-8">
          <AnimatePresence mode="wait">
            {!isActionStep ? (
              <motion.div
                key="upload"
                className="space-y-6"
                initial={false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <UploadDropzone
                  disabled={uploading}
                  onFileSelected={(file) => {
                    setSelectedFile(file);
                    void handleFileUpload(file);
                  }}
                />

                {currentPreview ? (
                  <div className="space-y-5">
                  <motion.div
                    className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={currentPreview}
                        alt="Selected product preview"
                        fill
                        className="object-contain"
                        unoptimized={!originalUrl}
                      />
                    </div>
                  </motion.div>
                    {uploading ? (
                      <ProgressStatus
                        progress={uploadProgress}
                        label="Fixing your image..."
                        detail={uploadDetails[Math.min(2, Math.floor(uploadProgress / 34))]}
                      />
                    ) : (
                      <p className="text-sm text-gray-500">
                        Start by adding your product photo
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    Start by adding your product photo
                  </p>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="actions"
                className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start"
                initial={false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="space-y-4 text-left">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Step 2
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight text-[#0A0A0A] md:text-3xl">
                      What do you want to improve?
                    </h2>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                    <p className="text-sm font-medium text-[#0A0A0A]">
                      We recommend: Clean background
                    </p>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                    <motion.div
                      className="relative aspect-[4/5] w-full"
                      whileHover={{ scale: 1.015 }}
                      transition={{ duration: 0.25 }}
                    >
                      {currentPreview ? (
                        <Image
                          src={currentPreview}
                          alt="Uploaded image preview"
                          fill
                          className="object-contain"
                        />
                      ) : null}
                    </motion.div>
                  </div>
                </div>

                <div className="space-y-3 text-left">
                  {studioActions.map((action) => {
                    const Icon = action.icon;
                    const actionTitle =
                      action.id === "clean-studio"
                        ? "Clean background"
                      : action.id === "change-color"
                          ? "Change color"
                          : action.id === "upgrade-model"
                            ? "Try another model"
                            : "Create occasion shot";

                    return (
                      <motion.button
                        key={action.id}
                        type="button"
                        initial={false}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.28 }}
                        whileHover={{ y: -2, scale: 1.01 }}
                        whileTap={{ scale: 0.995 }}
                        onClick={() => handleActionSelect(action.id)}
                        className={[
                          "w-full rounded-xl border bg-white p-5 text-left shadow-sm transition hover:border-gray-300",
                          action.id === "clean-studio"
                            ? "border-black"
                            : "border-gray-200",
                        ].join(" ")}
                      >
                        <div className="space-y-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200">
                            <Icon className="h-5 w-5 text-[#0A0A0A]" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="text-base font-semibold text-[#0A0A0A]">
                              {actionTitle}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {action.description}
                            </p>
                            <p className="text-sm text-gray-500">
                              {actionHoverCopy[action.id]}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {recentImages.length > 0 ? (
          <section className="w-full space-y-4 text-left">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-[#0A0A0A]">Recent renders</h2>
              <p className="text-sm text-gray-500">
                Quick access to your latest saved outputs.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {recentImages.map((image) => (
                <div key={image.id} className="surface-card overflow-hidden p-3">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-gray-50">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative h-full w-full"
                    >
                      <Image
                        src={image.generatedUrl}
                        alt="Recent generated image"
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <p className="text-sm font-medium text-[#0A0A0A]">
                      {getActionConfig(image.action)?.title || image.action}
                    </p>
                    <p className="text-sm text-gray-500">
                      {getOptionConfig(image.action, image.option)?.title || image.option}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </motion.div>
    </main>
  );
}
