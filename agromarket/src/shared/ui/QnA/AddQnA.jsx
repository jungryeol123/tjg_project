import Swal from 'sweetalert2';
import React, { useState } from "react";
import "./AddQnA.css";

export default function AddQnA({ onAddQnA, onClose, product }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = () => {
    // 여기서 백엔드로 보낼 데이터 구성
    const qnaData = {
      ppk: product.id,
      title,
      content,
      isPrivate: isPrivate,
    };
    
    // 제목의 값이 없거나 공백일 경우
    if (qnaData.title === null || qnaData.title === undefined || String(qnaData.title).trim() === "") {
      Swal.fire({
        icon: 'warning',
        title: '필수 항목 미입력',
        text: `제목을 입력해주세요.`,
        confirmButtonText: '확인'
      });
      return ;
    }
    // 내용의 값이 없거나 공백일 경우
    if (qnaData.content === null || qnaData.content === undefined || String(qnaData.content).trim() === "") {
      Swal.fire({
        icon: 'warning',
        title: '필수 항목 미입력',
        text: `내용을 입력해주세요.`,
        confirmButtonText: '확인'
      });
      return ;
    }

    onAddQnA(qnaData);
  };

  return (
    <div class="popup-backdrop" id="popup">
      <div class="popup-box">
        <div class="popup-header">
          <h2>상품 문의하기</h2>
          <button class="close-btn" onClick={ onClose }>✕</button>
        </div>

        <div class="product-area">
          <img src={`/images/productImages/${product.imageUrl}`}
               alt={product.imageUrl_name}
               className="product-img" />
          <div class="product-title">
            { product.productName }
          </div>
        </div>

        <div class="form-area">
          <label class="label">제목</label>
          <input type="text" class="input" placeholder="제목을 입력해주세요." 
            value={ title } onChange={(e) => setTitle(e.target.value)} />

          <label class="label">내용</label>
          <textarea class="textarea" placeholder="내용을 입력해주세요. (최대 5000자)"
            value={ content } onChange={(e) => setContent(e.target.value)} ></textarea>

          <div class="secret-box">
            <input type="checkbox"
            checked={ isPrivate } onChange={(e) => setIsPrivate(e.target.checked)} />
            <label for="secret">비밀글로 문의하기</label>
          </div>
        </div>

        <div class="bottom-buttons">
          <button onClick={ handleSubmit }>등록</button>
          <button onClick={ onClose }>취소</button>
        </div>
      </div>
    </div>
  );
}
