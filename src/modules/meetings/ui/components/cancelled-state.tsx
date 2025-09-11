"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export const CancelledState = () => {
  return (
    <div className="flex items-center justify-center px-4">
      <div
        className={cn(
          "bg-white rounded-2xl shadow-lg flex flex-col gap-y-6 items-center text-center w-full max-w-3xl p-8 sm:p-20"
        )}
      >
        {/* Illustration */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 relative mx-auto">
          <Image
            src="/cancelled.svg"
            alt="Cancelled Meeting"
            fill
            className="object-contain"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-y-2 px-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Meeting cancelled
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            This meeting was cancelled 
          </p>
        </div>
      </div>
    </div>
  );
};
