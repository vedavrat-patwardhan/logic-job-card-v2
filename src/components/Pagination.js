export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      // Add jump to page value with dots
      rangeWithDots.push(1, {
        dots: true,
        jumpTo: currentPage - delta - 1,
        position: "left",
      });
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push(
        { dots: true, jumpTo: currentPage + delta + 1, position: "right" },
        totalPages
      );
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const renderPageButton = (pageItem) => {
    // Handle dots object
    if (typeof pageItem === "object" && pageItem.dots) {
      return (
        <button
          key={`dot-${pageItem.position}`}
          onClick={() => onPageChange(pageItem.jumpTo)}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          ...
        </button>
      );
    }

    // Handle normal page numbers
    return (
      <button
        key={`page-${pageItem}`}
        onClick={() => onPageChange(pageItem)}
        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
          ${
            currentPage === pageItem
              ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
          }`}
      >
        {pageItem}
      </button>
    );
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
      <div className="flex justify-between flex-1 sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Page <span className="font-medium">{currentPage}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            {getPageNumbers().map((pageNum) => renderPageButton(pageNum))}
          </nav>
        </div>
      </div>
    </div>
  );
};
