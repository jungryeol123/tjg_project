export default function BuyerInfo({ user }) {
    return (
        <div className="section">
            <h2 className="section-title">구매자정보</h2>
            <div className="info-box">
                <div className="info-grid">
                    <div className="label">이름</div>
                    <div className="value">{user?.name}</div>

                    <div className="label">이메일</div>
                    <div className="value">{user?.email}</div>

                    <div className="label">휴대폰 번호</div>
                    <div className="value phone-input">
                        <input type="text" value={user?.phone || ""} readOnly />
                    </div>
                </div>
            </div>
        </div>
    );
}
