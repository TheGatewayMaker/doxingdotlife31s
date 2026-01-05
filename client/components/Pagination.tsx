import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
  maxVisiblePages = 7,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Calculate which page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    const adjustedStart = Math.max(1, endPage - maxVisiblePages + 1);

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
  };

  const pages = getPageNumbers();

  return (
    <nav
      className="flex items-center justify-center gap-2 sm:gap-3 py-6 px-4"
      role="navigation"
      aria-label="pagination"
    >
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className={cn(
          "flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-200 min-h-[44px] touch-target text-sm sm:text-base",
          currentPage === 1
            ? "bg-[#1a1a1a] text-[#666666] border border-[#333333] cursor-not-allowed opacity-50"
            : "bg-[#0088CC] text-white border border-[#0077BB] hover:bg-[#0077BB] hover:shadow-lg hover:shadow-[#0088CC]/30 active:scale-95",
        )}
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">Previous</span>
        <span className="sm:hidden">Prev</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-[#666666] text-sm"
                aria-hidden="true"
              >
                ···
              </span>
            );
          }

          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              aria-label={`Go to page ${page}`}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 min-h-[44px] touch-target",
                isActive
                  ? "bg-[#0088CC] text-white border border-[#0077BB] shadow-md shadow-[#0088CC]/30"
                  : "bg-[#1a1a1a] text-[#979797] border border-[#333333] hover:border-[#0088CC] hover:bg-[#0088CC]/15 hover:text-[#0088CC]",
              )}
            >
              {page}
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
          "flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-200 min-h-[44px] touch-target text-sm sm:text-base",
          currentPage === totalPages
            ? "bg-[#1a1a1a] text-[#666666] border border-[#333333] cursor-not-allowed opacity-50"
            : "bg-[#0088CC] text-white border border-[#0077BB] hover:bg-[#0077BB] hover:shadow-lg hover:shadow-[#0088CC]/30 active:scale-95",
        )}
      >
        <span className="hidden sm:inline">Next</span>
        <span className="sm:hidden">Next</span>
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </nav>
  );
}
