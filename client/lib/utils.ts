import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate page numbers for pagination with ellipsis support
 * Limits the number of visible pages based on mobile/desktop view
 * @param currentPage - The current page (1-indexed)
 * @param totalPages - Total number of pages
 * @param maxVisible - Maximum number of page buttons to show (excluding ellipsis)
 * @returns Array of page numbers (as numbers) and 'ellipsis' strings
 */
export function getVisiblePages(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 5
): (number | string)[] {
  if (totalPages <= maxVisible) {
    // Show all pages if total is less than maxVisible
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [];
  const halfVisible = Math.floor(maxVisible / 2);

  let startPage = Math.max(1, currentPage - halfVisible);
  let endPage = Math.min(totalPages, currentPage + halfVisible);

  // Adjust if we're near the start or end
  if (currentPage <= halfVisible + 1) {
    endPage = Math.min(totalPages, maxVisible);
  } else if (currentPage >= totalPages - halfVisible) {
    startPage = Math.max(1, totalPages - maxVisible + 1);
  }

  // Add first page
  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) {
      pages.push("ellipsis");
    }
  }

  // Add visible pages
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Add last page
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pages.push("ellipsis");
    }
    pages.push(totalPages);
  }

  return pages;
}
