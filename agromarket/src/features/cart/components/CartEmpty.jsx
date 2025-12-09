// features/cart/components/CartEmpty.jsx
export function CartEmpty() {
  return (
    <div className="cart-right">
      <div className="cart-empty">
        <p>장바구니에 담은 상품이 없습니다.</p>
        <img src="/images/emptycart.png" style={{ marginTop: "20px" }} />
      </div>
    </div>
  );
}
