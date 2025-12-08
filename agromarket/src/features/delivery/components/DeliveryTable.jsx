// src/features/delivery/components/DeliveryTable.jsx
export function DeliveryTable() {
  return (
    <section className="delivery-table">
      <h2>주문부터 배송까지 한눈에 보기</h2>

      <table>
        <thead>
          <tr>
            <th>지역</th>
            <th>주문 시간</th>
            <th>배송 시간</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>수도권</td>
            <td>오늘 밤 11시 전</td>
            <td>내일 아침 7시 전</td>
          </tr>
          <tr>
            <td>충청</td>
            <td>오늘 밤 11시 전</td>
            <td>내일 아침 7시 전</td>
          </tr>
          <tr>
            <td>부산</td>
            <td>오늘 밤 11시 전</td>
            <td>내일 아침 8시 전</td>
          </tr>
          <tr>
            <td>그 외 지역</td>
            <td>오늘 밤 11시 전</td>
            <td>익일 도착</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
