export default function OrderItemList({ reduceCartList }) {
    return (
        <div className="section order-section">
            <h2 className="section-title">주문 상품</h2>
            <div className="info-box">
                <div className="info-grid order-info-grid">
                    {reduceCartList.map((item) =>
                        <div key={item.cid} className="value order-item">
                            <img
                                src={`/images/productImages/${item.product.imageUrl}`}
                                alt="product"
                                className="order-thumb"
                            />
                            {item.product.productName},&nbsp;
                            수량({item.qty.toLocaleString()}),&nbsp;
                            가격(
                            {(item.product.price *
                                (100 - item.product.dc) * 0.01 *
                                item.qty
                            ).toLocaleString()}원)
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
