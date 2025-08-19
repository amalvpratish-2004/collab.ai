"use client"

import { cn } from "@/lib/utils"

interface ErrorStateProps {
  title: string
  description: string
  size?: "sm" | "md" | "lg"
  className?: string
  showBackground?: boolean
  onRetry?: () => void
}

const AgentErrorIcon = ({ className }: { className?: string }) => (
  <div className={cn("relative", className)}>
    <svg viewBox="0 0 64 64" className="w-full h-full text-red-500" fill="currentColor">
      {/* Robot Head */}
      <rect x="16" y="12" width="32" height="28" rx="4" className="fill-current" />

      {/* Robot Eyes (X marks) */}
      <g className="fill-red-300">
        <path d="M21 19 L27 25 M27 19 L21 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M37 19 L43 25 M43 19 L37 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Robot Mouth (frown) */}
      <path
        d="M28 32 Q32 28 36 32"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        className="stroke-red-300"
      />

      {/* Robot Antennas (broken/bent) */}
      <path d="M26 12 L24 8 L22 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M38 12 L40 8 L42 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="22" cy="10" r="2" className="fill-red-400" />
      <circle cx="42" cy="10" r="2" className="fill-red-400" />

      {/* Robot Body */}
      <rect x="20" y="40" width="24" height="16" rx="2" className="fill-current opacity-80" />

      {/* Robot Arms (drooped) */}
      <rect
        x="12"
        y="46"
        width="6"
        height="12"
        rx="3"
        className="fill-current opacity-60"
        transform="rotate(15 15 52)"
      />
      <rect
        x="46"
        y="46"
        width="6"
        height="12"
        rx="3"
        className="fill-current opacity-60"
        transform="rotate(-15 49 52)"
      />
    </svg>

    {/* Error indicator */}
    <div className="absolute -top-2 -right-2">
      <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  </div>
)

export const ErrorState = ({
  title,
  description,
  size = "md",
  className,
  showBackground = true,
  onRetry,
}: ErrorStateProps) => {
  const sizeClasses = {
    sm: {
      container: "p-6",
      icon: "w-12 h-12",
      title: "text-base",
      description: "text-xs",
      gap: "gap-y-4",
      button: "text-xs px-3 py-1.5",
    },
    md: {
      container: "p-8",
      icon: "w-16 h-16",
      title: "text-lg",
      description: "text-sm",
      gap: "gap-y-6",
      button: "text-sm px-4 py-2",
    },
    lg: {
      container: "p-12",
      icon: "w-20 h-20",
      title: "text-xl",
      description: "text-base",
      gap: "gap-y-8",
      button: "text-base px-6 py-3",
    },
  }

  const currentSize = sizeClasses[size]

  return (
    <div className={cn("flex items-center justify-center py-8 px-4 min-h-[50vh]", className)}>
      <div
        className={cn(
          "flex flex-col items-center justify-center text-center mx-auto",
          "max-w-lg w-full",
          currentSize.container,
          currentSize.gap,
          showBackground && "bg-red-50/80 backdrop-blur-sm rounded-xl border border-red-200 shadow-lg",
        )}
        role="alert"
        aria-live="assertive"
        aria-label={`Error: ${title}`}
      >
        <div className="relative">
          <AgentErrorIcon className={currentSize.icon} />
        </div>

        <div className={cn("flex flex-col", size === "sm" ? "gap-y-1" : "gap-y-2")}>
          <h3 className={cn(currentSize.title, "font-semibold text-slate-900")}>{title}</h3>
          <p className={cn(currentSize.description, "text-slate-600 leading-relaxed")}>{description}</p>
        </div>

        <div className="flex items-center space-x-1 text-red-500 text-xs font-medium">
          <div className="w-1 h-1 bg-red-500 rounded-full"></div>
          <span>Agent encountered an error</span>
          <div className="w-1 h-1 bg-red-500 rounded-full"></div>
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            className={cn(
              "bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              currentSize.button,
            )}
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}
