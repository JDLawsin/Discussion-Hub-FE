"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import clsx from "clsx";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning";
  onConfirm: () => Promise<void> | void;
}

const ConfirmDialog = ({
  isOpen,
  onClose,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  onConfirm,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await onConfirm();
      onClose();
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className={clsx("absolute inset-0 bg-black/40 backdrop-blur-sm", {
          "pointer-events-none": isLoading,
        })}
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-sm mx-4 overflow-hidden">
        <div
          className={clsx("h-1", {
            "bg-linear-to-r from-red-400 to-red-500": variant === "danger",
            "bg-linear-to-r from-yellow-400 to-teal-400": variant === "warning",
          })}
        />

        <div className="p-6">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3 mb-5">
            <div>
              <h3 className="text-base font-bold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {cancelLabel}
            </button>

            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className={clsx(
                "flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold text-white rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-70",
                {
                  "bg-red-500 hover:bg-red-600": variant === "danger",
                  "bg-yellow-500 hover:bg-yellow-600": variant === "warning",
                },
              )}
            >
              {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {isLoading ? "Deleting..." : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
