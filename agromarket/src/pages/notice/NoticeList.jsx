import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
// features
import "./NoticeList.scss";
import { setNoticeListAPI } from "features/notice/noticeAPI";

export function NoticeList() {
  const noticeList = useSelector((state) => state.notice.noticeList);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // ✅ JSON 데이터 불러오기
  useEffect(() => {
    dispatch(setNoticeListAPI());
  }, [dispatch]);

  // ✅ 최신순 정렬
  const sortedNotices = useMemo(() => {
    return [...noticeList].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }, [noticeList]);

  // ✅ 페이지네이션 처리
  const currentItems = sortedNotices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => {
    setCurrentPage((prev) =>
      prev * itemsPerPage < sortedNotices.length ? prev + 1 : prev
    );
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <div className="notice-section">
      <h2>공지사항</h2>
      <p className="notice-desc">
        서비스 관련 주요 공지와 안내사항을 확인하실 수 있습니다.
      </p>

      <table className="notice-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <tr key={item.id}>
                <td>{sortedNotices.length - ((currentPage - 1) * itemsPerPage + index)}</td>
                <td className="title">
                  <Link to={`/notice/${item.id}`}>{item.title}</Link>
                </td>
                <td>{item.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="empty">
                등록된 공지사항이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ 페이지네이션 */}
      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          {"<"}
        </button>
        <span style={{ margin: "0 0.6rem" }}>
          {currentPage} / {Math.ceil(sortedNotices.length / itemsPerPage)}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage * itemsPerPage >= sortedNotices.length}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
