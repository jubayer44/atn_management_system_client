/* eslint-disable react/prop-types */

const generatePageNumbers = (totalPages, currentPage) => {
  const pages = [];
  if (totalPages <= 6) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage < 4) {
    for (let i = 1; i <= 5; i++) {
      pages.push(i);
    }
    pages.push("...");
    pages.push(totalPages);
  } else if (currentPage > totalPages - 3) {
    pages.push(1);
    pages.push("...");
    for (let i = totalPages - 4; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    pages.push("...");
    for (let i = currentPage - 1; i <= currentPage + 3; i++) {
      pages.push(i);
    }
    pages.push("...");
    pages.push(totalPages);
  }

  return pages;
};

const TablePagination = ({ totalPages, currentPage, handlePageClick }) => {
  const pageNumbers = generatePageNumbers(totalPages, currentPage);

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`text-xl mx-2 h-8 w-8 rounded-full ${
          currentPage === 1 ? "" : "hover:bg-primary hover:text-gray-100"
        } disabled:opacity-50 flex items-center justify-center`}
      >
        &lt;
      </button>

      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && handlePageClick(page)}
          disabled={page === "..."}
          className={`text-sm mx-1 min-h-8 min-w-8 rounded-full flex items-center justify-center ${
            currentPage === page
              ? "bg-primary text-gray-100"
              : "bg-white text-tColor"
          } ${
            page === "..."
              ? "cursor-default"
              : "cursor-pointer hover:bg-primary hover:text-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`text-xl mx-2 h-8 w-8 rounded-full ${
          currentPage === totalPages
            ? ""
            : "hover:bg-primary hover:text-gray-100"
        } disabled:opacity-50 flex items-center justify-center`}
      >
        &gt;
      </button>
    </div>
  );
};

export default TablePagination;
