// features/cart/components/CartItem.jsx
export function CartItem({ item, decreaseQty, increaseQty, removeItem }) {
  return (
    <div className='cart-item'>
      <div className="cart-image-container">
        <img src={`/images/productImages/${item.product.imageUrl}`} alt='product img' />
        {item.product.count <= 0 && <div className="sold-out">SOLD OUT</div>}
      </div>

      <div className='cart-item-details'>
        <p className='cart-item-title'>{item.product.productName}</p>
        <p className='cart-item-price'>{item.product.price.toLocaleString()}원</p>
        <p className='cart-item-dcprice'>
          {(item.product.price * (100 - item.product.dc) * 0.01).toLocaleString()}원
        </p>
      </div>

      <div className='cart-quantity'>
        <button disabled={item.product.count <= 0}
          onClick={() => decreaseQty(item)}
        >-</button>

        <input type="text" value={item.qty.toLocaleString()} readOnly/>

        <button disabled={item.product.count <= 0}
          onClick={() => increaseQty(item)}
        >+</button>
      </div>

      <button className='cart-remove' onClick={() => removeItem(item.cid)}>
        제거
      </button>
    </div>
  );
}
