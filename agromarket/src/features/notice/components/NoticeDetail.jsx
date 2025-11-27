import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import "./NoticeDetail.scss";

export default function NoticeDetail() {
  const notices = useSelector((state) => state.notice.noticeList );
  const { id } = useParams();


  const notice = notices.find((n) => n.id === parseInt(id));

  if (!notice) return <p>공지사항을 찾을 수 없습니다.</p>;

  return (
    <div className="notice-detail">
      <h1 className="title">{notice.title}</h1>
      <p className="date">{notice.date}</p>
      <div className="content">{notice.content}</div>
      <Link to="/notice" className="btn-back">
        목록으로 돌아가기
      </Link>
    </div>
  );
}
