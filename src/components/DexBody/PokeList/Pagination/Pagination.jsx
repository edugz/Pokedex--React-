import React from "react";
import "./Pagination.css";

function Pagination({ currentPage, totalPages, handlePageChange }) {
  const getPaginationButtons = () => {
    const buttons = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage > 3) {
      buttons.push(
        <button
          key={1}
          className="pagination-button"
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );
      if (currentPage > 4) {
        buttons.push(<span key="left-ellipsis">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`pagination-button ${currentPage === i ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) {
        buttons.push(<span key="right-ellipsis">...</span>);
        buttons.push(
          <button
            key={totalPages}
            className="pagination-button"
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        );
      }
    }

    return buttons;
  };

  return (
    <div className="pagination-container">
      <button
        onClick={() => handlePageChange(currentPage > 5 ? currentPage - 5 : 1)}
        disabled={currentPage === 1}
        className="pagination-button jump-5"
      >
        &lt;&lt;
      </button>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button previous"
      >
        Previous
      </button>
      {getPaginationButtons()}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button next"
      >
        Next
      </button>
      <button
        onClick={() =>
          handlePageChange(
            currentPage < totalPages - 4 ? currentPage + 5 : totalPages
          )
        }
        disabled={currentPage === totalPages}
        className="pagination-button jump-5"
      >
        &gt;&gt;
      </button>
    </div>
  );
}

export default Pagination;
