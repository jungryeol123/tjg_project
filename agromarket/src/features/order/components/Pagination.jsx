export function Pagination({ page, setPage, total, perPage }) {
  const maxPage = Math.ceil(total / perPage);

  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        {"<"}
      </button>

      <span>{page} / {maxPage}</span>

      <button disabled={page === maxPage} onClick={() => setPage(page + 1)}>
        {">"}
      </button>
    </div>
  );
}
