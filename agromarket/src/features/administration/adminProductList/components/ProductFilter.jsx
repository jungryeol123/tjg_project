// ProductFilter.jsx
import { FilterItem } from "shared/constants/FilterItem";

export default function ProductFilter({ filterLabel, activeFilter, onFilter }) {
  return (
    <ul className="product-filter">
      {filterLabel.map((item) => (
        <FilterItem
          key={item.value}
          label={item.label}
          value={item.value}
          activeFilter={activeFilter}
          onClick={onFilter}
        />
      ))}
    </ul>
  );
}
