export function Detail({images}) {
  return (
    <div>
      <h2>상세 설명</h2>
      <img src={`/images/productInformation/${images}`} alt="" style={{ width: "100%" }} />
      
    </div>
  );
}
