import React, { useEffect, useMemo, useState } from "react";
import "./QnA.scss";
import { useSelector } from "react-redux";

export function QnA({id}) {
  const qnaAll = useSelector((state) => state.product.productQnAList);
  // const [qnaList, setQnaList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // useEffect(() => {
  //   fetch("/data/productQnA.json")
  //     .then((res) => res.json())
  //     .then((data) => setQnaList(data.qnaList))
  //     .catch((err) => console.error("QnA 불러오기 실패:", err));
  // }, []);

    // ✅ 상품별 QnA 필터링
  const qnaList = useMemo(() => {
    if (!qnaAll || qnaAll.length === 0) return [];
    // 🔥 숫자/문자열 타입이 다를 수 있으니 Number()로 변환
    return qnaAll.filter((item) => Number(item.ppk) === Number(id));
  }, [qnaAll, id]);

  const handleNext = () => {
    setCurrentPage((prev) =>
      prev * itemsPerPage < qnaList.length ? prev + 1 : prev
    );
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  // ✅ slice 계산을 여기서 즉시 수행
  const currentItems = qnaList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
          {currentItems.map((item, index) => (
            <tr key={index}>
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
        <button onClick={handlePrev} disabled={currentPage === 1}>{"<"}</button>
        <span style={{ margin: "0 0.6rem" }}>
          {currentPage} / {Math.ceil(qnaList.length / itemsPerPage)}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage * itemsPerPage >= qnaList.length}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
