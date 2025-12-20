import { useState, useEffect } from "react";

interface AnimatedNumberCounterProps {
  endValue: number;
  text?: string;
  isLoading?: boolean;
}

export default function AnimatedNumberCounter({
  endValue,
  text = "People have been Doxed",
  isLoading = false,
}: AnimatedNumberCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [shouldShowNumber, setShouldShowNumber] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShouldShowNumber(false);
      setDisplayValue(0);
      return;
    }

    if (endValue > 0) {
      setShouldShowNumber(true);
    }
  }, [isLoading, endValue]);

  useEffect(() => {
    if (!shouldShowNumber || endValue <= 0) {
      return;
    }

    let animationFrameId: number;
    let currentValue = 0;
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      const easeProgress = 1 - Math.pow(1 - progress, 3);

      currentValue = Math.floor(easeProgress * endValue);
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [shouldShowNumber, endValue]);

  return (
    <div className="flex flex-col items-center justify-center py-1 sm:py-1.5 md:py-2 animate-slideInUp">
      <div className="text-center">
        {shouldShowNumber && (
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-1 sm:mb-1.5 md:mb-2 tabular-nums">
            {displayValue.toLocaleString()}
          </h2>
        )}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[#979797]">
          {text}
        </p>
      </div>
    </div>
  );
}
