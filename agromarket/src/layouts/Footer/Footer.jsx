import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__logo">KAFB2B</div>
          <div className="footer__info">
            <p>서울특별시 서초구 강남대로 78길 8, 한국빌딩 4층, 8층</p>
            <p>고객센터: 02-556-5611 | 운영시간: 10~18시 (토·일·공휴일 휴무)</p>
            <p>업무시간 외 장애 접수: 02-1234-5678</p>
            <p>사업자등록번호: 111-11-11111</p>
          </div>
        </div>

        <div className="footer__links">
          <ul>
            <li><Link to="/terms">이용약관</Link></li>
            <li><Link to="/privacy">개인정보처리방침</Link></li>
            <li><Link to="/email-policy">이메일 무단 수집거부</Link></li>
            <li><Link to="/youth-protection">청소년보호 책임자 고지</Link></li>
            <li><Link to="/kakao">카카오톡 채널 추가</Link></li>
          </ul>
        </div>

        <div className="footer__bottom">
          <p>
            Copyrights ⓒ 2023 by 한국농수산식품유통공사. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
