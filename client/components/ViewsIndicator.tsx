import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface ViewsIndicatorProps {
  views?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  compact?: boolean;
  thumbnail?: boolean;
}

/**
 * ViewsIndicator component displays view count with an eye icon
 * Similar to major content platforms like YouTube, Medium, TikTok
 */
export default function ViewsIndicator({
  views = 0,
  size = "md",
  className = "",
  compact = false,
  thumbnail = false,
}: ViewsIndicatorProps) {
  const formatViews = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const sizeClasses = {
    sm: "gap-1",
    md: "gap-1.5",
    lg: "gap-2",
  };

  const iconClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const textClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  // Thumbnail badge style - positioned on thumbnail with higher prominence
  if (thumbnail) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1 xs:gap-1.5 px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 sm:py-2 rounded-md xs:rounded-lg bg-black/70 backdrop-blur-sm border border-[#0088CC]/40 hover:border-[#0088CC]/60 transition-all drop-shadow-lg",
          className,
        )}
      >
        <Eye className="w-4 xs:w-4.5 sm:w-5 h-4 xs:h-4.5 sm:h-5 text-white flex-shrink-0" />
        <span className="font-bold text-white text-xs xs:text-sm whitespace-nowrap">
          {formatViews(views)}
        </span>
      </div>
    );
  }

  if (compact) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1 px-2 py-1 rounded",
          className,
        )}
      >
        <Eye className={cn("text-[#0088CC]", iconClasses[size])} />
        <span className={cn("font-bold text-white", textClasses[size])}>
          {formatViews(views)}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center bg-[#2a2a2a] px-3 py-2 rounded-md border border-[#444444] hover:border-[#0088CC] transition-all",
        sizeClasses[size],
        className,
      )}
    >
      <Eye className={cn("text-[#0088CC] flex-shrink-0", iconClasses[size])} />
      <span
        className={cn(
          "font-bold text-white whitespace-nowrap",
          textClasses[size],
        )}
      >
        {formatViews(views)} {views === 1 ? "view" : "views"}
      </span>
    </div>
  );
}
