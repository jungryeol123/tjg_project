export function FilterItem({ label, value, activeFilter, onClick }) {
  return (
    <li
      className={`item ${activeFilter === value ? "active" : ""}`}
      onClick={() => onClick(value)}
    >
      <a>{label}</a>
    </li>
  );
}