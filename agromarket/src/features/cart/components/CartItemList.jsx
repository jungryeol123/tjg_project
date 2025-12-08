// features/cart/components/CartItemList.jsx
import { CartItem } from "./CartItem";

export function CartItemList({ cartList, decreaseQty, increaseQty, removeItem }) {
  return (
    <div className="cart-left">
      {cartList.map((item) => (
        <CartItem
          key={item.cid}
          item={item}
          decreaseQty={decreaseQty}
          increaseQty={increaseQty}
          removeItem={removeItem}
        />
      ))}
    </div>
  );
}
