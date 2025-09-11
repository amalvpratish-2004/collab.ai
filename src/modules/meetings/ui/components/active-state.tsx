"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { VideoIcon } from "lucide-react";

interface Props {
  meetingId: string;
}

export const ActiveState = ({
  meetingId,
}: Props) => {
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
            src="/upcoming.svg"
            alt="Active Meeting"
            fill
            className="object-contain"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-y-2 px-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Meeting is underway
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Meeting will end once all participants have left 
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-7 w-full px-4">
          <Button asChild className="w-full lg:w-auto">
            <Link href={`/call/${meetingId}`} className="flex items-center justify-center">
              <VideoIcon className="mr-2" />
              Join Meeting
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
