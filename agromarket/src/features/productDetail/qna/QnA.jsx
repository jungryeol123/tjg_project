import Swal from 'sweetalert2';
import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
// feautres
import { addProductQnA } from "features/product/productAPI";
// shared
import "./QnA.scss";
import AddQnA from './AddQnA';

export function QnA({id, product}) {
  const qnaAll = useSelector((state) => state.product.productQnAList);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const dispatch = useDispatch();  
  const navigate = useNavigate();
  const location = useLocation();
  // 문의하기 창 띄우기 플래그
  const [isClickQnA, setIsClickQnA] = useState(false);
  const isLogin = useSelector((state) => state.auth.isLogin);

  // ✅ 상품별 QnA 필터링
  const qnaList = useMemo(() => {
    if (!qnaAll || qnaAll.length === 0) return [];
    // 🔥 숫자/문자열 타입이 다를 수 있으니 Number()로 변환
    return qnaAll.filter((item) => Number(item.ppk) === Number(id))
                  .sort((a,b)=> new Date(b.date) - new Date(a.date));
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

  // 문의하기 버튼 클릭시 문의하기창 띄우기
  const handleQnA = () => {
    if (!isLogin) {
      Swal.fire({
        icon: "warning",
        title: "⚠ 로그인 필요",
        text: "로그인이 필요합니다.",
      }).then(() =>
        navigate("/login", { state: { from: location.pathname } })
      );
    } else {
     setIsClickQnA(true)
    }
  }

  // 문의하기창에서 닫기버튼 클릭시 창 닫기 
  const handleCloseQnA = () => {
    setIsClickQnA(false);
  };

  const handleAddQnA = async (qnaData) => {
    const result = await dispatch(addProductQnA(qnaData));

    if(result){
      Swal.fire({
          icon: 'success',
          title: '✅ 문의 등록 성공!',
          text: '문의가 등록되었습니다.',
          confirmButtonText: '확인',
        }).then(() => {
          setIsClickQnA(false);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: '❌ 문의 등록 실패!',
        text: '다시 시도해주세요.',
      });
    }
  };

  return (
    <div className="qna-section">
      <div className="title-area">
        <h2>상품 문의</h2>
        <button onClick={ handleQnA }>문의하기</button>
        { isClickQnA &&
         <AddQnA onAddQnA = { handleAddQnA } onClose={ handleCloseQnA } product= { product }/>}
      </div>
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
        {currentItems.length === 0 ? <div style={{ textAlign: "right", paddingTop: "10px"}}>이 상품에 대한 문의글이 없습니다.</div>  : 
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>
                  {item.is_private ? <div>비밀글 입니다. <span className="lock-icon">🔒</span></div> : item.title}
                </td>
                <td>{item.writer}</td>
                <td>{new Date(item.date).toLocaleDateString("ko-KR")}</td>
                <td className= {`status ${item.status === "답변대기" ? "wait" : "" }`}>{item.status}</td>
              </tr>
            ))}
          </tbody>
        }
      </table>
      {currentItems.length !== 0 ?
        <div className="pagination">
          <button onClick={handlePrev} 
            disabled={currentPage === 1}>
            {"<"}
          </button>
          <span style={{ margin: "0 0.6rem" }}>
            {currentPage} / {Math.ceil(qnaList.length / itemsPerPage)}
          </span>
          <button onClick={handleNext}
            disabled={currentPage * itemsPerPage >= qnaList.length}>
            {">"}
          </button>
        </div>
      : ""}
    </div>
  );
}
