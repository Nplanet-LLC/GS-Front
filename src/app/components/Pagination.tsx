import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3;
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust startPage if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white">
      <div className="flex items-center text-sm text-gray-700">
        <p>
          Showing {Math.min((currentPage - 1) * 10 + 1, totalPages * 10)} to{" "}
          {Math.min(currentPage * 10, totalPages * 10)} of {totalPages * 10}{" "}
          entries
        </p>
      </div>

      <div className="flex items-center space-x-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400"
              : "bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer"
          }`}
        >
          Previous
        </button>

        {renderPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md ${
              currentPage === page
                ? "bg-blue-600 text-white cursor-pointer"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400"
              : "bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
