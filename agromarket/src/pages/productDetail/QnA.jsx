import React, { useEffect, useState } from "react";
import "./QnA.scss";

export  function QnA() {
  const [qnaList, setQnaList] = useState([]);

  useEffect(() => {
    fetch("/data/productQnA.json")
      .then((res) => res.json())
      .then((data) => setQnaList(data.qnaList))
      .catch((err) => console.error("QnA 불러오기 실패:", err));
  }, []);

  return (
    <div className="qna-section">
      <h2>상품 문의</h2>
      <p className="qna-desc">
        상품에 대한 문의를 남기는 공간입니다. 해당 게시판의 성격과 다른 글은 사전동의 없이 이동될 수 있습니다. <br />
        배송관련, 주문(취소/교환/환불) 관련 문의 및 요청사항은{" "}
        <span className="highlight">고객문의</span>에 남겨주세요.
      </p>

      

      <table className="qna-table">
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>답변상태</th>
          </tr>
        </thead>
        <tbody>
          {qnaList.map((item) => (
            <tr key={item.id}>
              <td>
                {item.title}{" "}
                {item.isPrivate && <span className="lock-icon">🔒</span>}
              </td>
              <td>{item.writer}</td>
              <td>{item.date}</td>
              <td className="status">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled>{"<"}</button>
        <button disabled>{">"}</button>
      </div>
    </div>
  );
}
