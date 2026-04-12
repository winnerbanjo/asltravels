"use client";

import { motion } from "framer-motion";
import { ImageUp } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

type UploadDropzoneProps = {
  disabled?: boolean;
  onFileSelected: (file: File) => void;
};

export function UploadDropzone({
  disabled,
  onFileSelected,
}: UploadDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (!file) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      onFileSelected(file);
    },
    [onFileSelected],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".webp"],
    },
    maxFiles: 1,
    disabled,
    onDrop,
    onDropRejected: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
    >
      <div
        {...getRootProps()}
        className={[
          "flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 px-6 py-14 text-center transition",
          isDragActive
            ? "border-black bg-gray-50"
            : "bg-white hover:border-gray-400",
          disabled ? "cursor-not-allowed opacity-60" : "",
        ].join(" ")}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <motion.div
            className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gray-200"
            animate={isDragActive ? { scale: [1, 1.08, 1] } : { scale: 1 }}
            transition={{ duration: 1.2, repeat: isDragActive ? Infinity : 0 }}
          >
            <ImageUp className="h-5 w-5 text-[#0A0A0A]" />
          </motion.div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-[#0A0A0A]">
              Add your product photo
            </p>
            <p className="text-sm text-gray-500">
              Take it with your phone, that&apos;s fine.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
