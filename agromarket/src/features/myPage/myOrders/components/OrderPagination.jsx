// pages/myPage/OrderPagination.jsx
export function OrderPagination({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
}) {
  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={prevPage}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>

      <span style={{ margin: "0 0.6rem" }}>
        {currentPage} / {totalPages}
      </span>

      <button
        className="pagination-btn"
        onClick={nextPage}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
}
