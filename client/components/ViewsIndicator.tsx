import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface ViewsIndicatorProps {
  views?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  compact?: boolean;
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
