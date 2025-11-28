export function Item({images}) {
  return (
    <div>
      <h2 style={ {marginBottom: "10px"}}>상품 정보</h2>
      { !images ? "상품 정보가 존재하지 않습니다. " :
        <img src={`/images/productDescription/${images}`} alt="" style={{ width: "100%" }} />
      }
    </div>
  );
}