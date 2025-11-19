export function Item({images}) {
  return (
    <div>
      <h2>상품 정보</h2>
      <img src={`/images/productDescription/${images}`} alt="" style={{ width: "100%" }} />
      
    </div>
  );
}
