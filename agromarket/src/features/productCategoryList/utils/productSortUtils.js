// features/productList/utils/productSortUtils.js

export const sortByNew = (list) =>
  [...list]
    .filter((p) => !!p.productDate)
    .sort((a, b) => new Date(b.productDate) - new Date(a.productDate));

export const sortByOld = (list) =>
  [...list]
    .filter((p) => !!p.productDate)
    .sort((a, b) => new Date(a.productDate) - new Date(b.productDate));

export const sortHotOrSpecial = (list) =>
  list.filter((p) => p.hotDeal === true || p.memberSpecial === true);

export const sortBySale = (list) =>
  [...list]
    .filter((p) => p.dc >= 10)
    .sort((a, b) => b.dc - a.dc);

export const sortByPriceHigh = (list) =>
  [...list].sort((a, b) => b.price - a.price);

export const sortByPriceLow = (list) =>
  [...list].sort((a, b) => a.price - b.price);
