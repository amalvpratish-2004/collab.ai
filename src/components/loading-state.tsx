import { cn } from "@/lib/utils"

interface LoadingStateProps {
  title: string
  description: string
  size?: "sm" | "md" | "lg"
  className?: string
  showBackground?: boolean
}

const AgentThinkingIcon = ({ className }: { className?: string }) => (
  <div className={cn("relative", className)}>
    <svg viewBox="0 0 64 64" className="w-full h-full text-blue-500" fill="currentColor">
      {/* Robot Head */}
      <rect x="16" y="12" width="32" height="28" rx="4" className="fill-current" />

      {/* Robot Eyes */}
      <circle cx="24" cy="22" r="3" className="fill-blue-300 animate-pulse" />
      <circle cx="40" cy="22" r="3" className="fill-blue-300 animate-pulse" />

      {/* Robot Mouth */}
      <rect x="28" y="30" width="8" height="2" rx="1" className="fill-blue-300" />

      {/* Robot Antennas */}
      <line x1="26" y1="12" x2="26" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="38" y1="12" x2="38" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="26" cy="8" r="2" className="fill-blue-400 animate-bounce" />
      <circle cx="38" cy="8" r="2" className="fill-blue-400 animate-bounce" style={{ animationDelay: "0.2s" }} />

      {/* Robot Body */}
      <rect x="20" y="40" width="24" height="16" rx="2" className="fill-current opacity-80" />

      {/* Robot Arms */}
      <rect x="12" y="42" width="6" height="12" rx="3" className="fill-current opacity-60" />
      <rect x="46" y="42" width="6" height="12" rx="3" className="fill-current opacity-60" />
    </svg>

    {/* Thinking Dots Animation */}
    <div className="absolute -top-2 -right-2 flex space-x-1">
      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
    </div>
  </div>
)

export const LoadingState = ({
  title,
  description,
  size = "md",
  className,
  showBackground = true,
}: LoadingStateProps) => {
  const sizeClasses = {
    sm: {
      container: "p-6",
      icon: "w-12 h-12",
      title: "text-base",
      description: "text-xs",
      gap: "gap-y-4",
    },
    md: {
      container: "p-8",
      icon: "w-16 h-16",
      title: "text-lg",
      description: "text-sm",
      gap: "gap-y-6",
    },
    lg: {
      container: "p-12",
      icon: "w-20 h-20",
      title: "text-xl",
      description: "text-base",
      gap: "gap-y-8",
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
          showBackground && "bg-slate-50/80 backdrop-blur-sm rounded-xl border border-slate-200 shadow-lg",
        )}
        role="status"
        aria-live="polite"
        aria-label={`Loading: ${title}`}
      >
        <div className="relative">
          <AgentThinkingIcon className={currentSize.icon} />
        </div>

        <div className={cn("flex flex-col", size === "sm" ? "gap-y-1" : "gap-y-2")}>
          <h3 className={cn(currentSize.title, "font-semibold text-slate-900")}>{title}</h3>
          <p className={cn(currentSize.description, "text-slate-600 leading-relaxed")}>{description}</p>
        </div>

        <div className="flex items-center space-x-1 text-blue-500 text-xs font-medium">
          <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
          <span>Agent processing</span>
          <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
        </div>
      </div>
    </div>
  )
}