import React from "react";
import { FaPhoneAlt, FaEnvelope, FaQuestionCircle } from "react-icons/fa";
import "./CustomerService.scss";

export default function CustomerService() {
  return (
    <div className="customer-service">
      <h1 className="title">고객센터</h1>
      <p className="subtitle">
        언제나 고객님의 편의를 위해 최선을 다하겠습니다.
      </p>

      <div className="service-grid">
        <div className="service-card">
          <FaPhoneAlt className="icon" />
          <h3>전화 문의</h3>
          <p>대표번호: 1544-1234</p>
          <p>평일 09:00 ~ 18:00 (주말 및 공휴일 휴무)</p>
        </div>

        <div className="service-card">
          <FaEnvelope className="icon" />
          <h3>이메일 문의</h3>
          <p>help@candyshop.com</p>
          <p>24시간 접수 가능 (영업일 기준 1~2일 내 답변)</p>
        </div>

        <div className="service-card">
          <FaQuestionCircle className="icon" />
          <h3>자주 묻는 질문 (FAQ)</h3>
          <p>배송, 교환, 환불 관련 자주 묻는 내용을 확인하세요.</p>
          <button className="btn">FAQ 바로가기</button>
        </div>
      </div>
    </div>
  );
}
