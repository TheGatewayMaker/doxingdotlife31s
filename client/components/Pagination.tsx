import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMemo, useState, useEffect } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Auto-detect screen size for responsive page count
  const [responsiveMaxPages, setResponsiveMaxPages] = useState(5);

  useEffect(() => {
    const updateMaxPages = () => {
      if (typeof window !== "undefined") {
        // Mobile: 3 pages, Tablet: 5 pages, Desktop: 7 pages
        const width = window.innerWidth;
        if (width < 640) {
          setResponsiveMaxPages(3);
        } else if (width < 1024) {
          setResponsiveMaxPages(5);
        } else {
          setResponsiveMaxPages(7);
        }
      }
    };

    updateMaxPages();
    window.addEventListener("resize", updateMaxPages);
    return () => window.removeEventListener("resize", updateMaxPages);
  }, []);

  // Determine visible pages based on a responsive strategy
  const getPageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];

    // Use maxVisiblePages prop if provided, otherwise use responsive value
    const maxPages = maxVisiblePages || responsiveMaxPages;

    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxPages / 2),
    );
    const endPage = Math.min(totalPages, startPage + maxPages - 1);
    const adjustedStart = Math.max(1, endPage - maxPages + 1);

    // Always show first page
    if (adjustedStart > 1) {
      pages.push(1);
      if (adjustedStart > 2) {
        pages.push("...");
      }
    }

    // Show middle pages
    for (let i = adjustedStart; i <= endPage; i++) {
      pages.push(i);
    }

    // Always show last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages, maxVisiblePages]);

  return (
    <nav
      className="flex flex-col items-center gap-3 sm:gap-4 py-6 sm:py-8 px-3 sm:px-4"
      role="navigation"
      aria-label="pagination"
    >
      {/* Page Info - Mobile friendly */}
      <div className="text-xs sm:text-sm text-[#979797]">
        Page <span className="font-semibold text-[#e0e0e0]">{currentPage}</span> of <span className="font-semibold text-[#e0e0e0]">{totalPages}</span>
      </div>

      {/* Main Pagination Controls */}
      <div className="flex items-center justify-center gap-1 sm:gap-2 w-full flex-wrap">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
          className={cn(
            "flex items-center justify-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md transition-all duration-200 text-xs sm:text-sm font-medium h-8 sm:h-10",
            currentPage === 1
              ? "bg-[#1a1a1a] text-[#666666] border border-[#333333] cursor-not-allowed opacity-50"
              : "bg-[#0088CC] text-white border border-[#0077BB] hover:bg-[#0077BB] active:scale-95 hover:shadow-md hover:shadow-[#0088CC]/25",
          )}
        >
          <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-0.5 sm:gap-1.5">
          {getPageNumbers.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="w-6 h-8 sm:w-8 sm:h-10 flex items-center justify-center text-[#666666] text-xs sm:text-sm"
                  aria-hidden="true"
                >
                  …
                </span>
              );
            }

            const pageNumber = page as number;
            const isActive = pageNumber === currentPage;
            return (
              <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                aria-label={`Go to page ${pageNumber}`}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "w-6 h-8 sm:w-8 sm:h-10 flex items-center justify-center rounded-md font-semibold text-xs sm:text-sm transition-all duration-200",
                  isActive
                    ? "bg-[#0088CC] text-white border border-[#0077BB] shadow-md shadow-[#0088CC]/25"
                    : "bg-[#1a1a1a] text-[#979797] border border-[#333333] hover:border-[#0088CC] hover:bg-[#0088CC]/15 hover:text-[#0088CC]",
                )}
              >
                {String(pageNumber)}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
          className={cn(
            "flex items-center justify-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md transition-all duration-200 text-xs sm:text-sm font-medium h-8 sm:h-10",
            currentPage === totalPages
              ? "bg-[#1a1a1a] text-[#666666] border border-[#333333] cursor-not-allowed opacity-50"
              : "bg-[#0088CC] text-white border border-[#0077BB] hover:bg-[#0077BB] active:scale-95 hover:shadow-md hover:shadow-[#0088CC]/25",
          )}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </nav>
  );
}
