import { AddressModal } from "features/order/AddressModal.jsx";

export default function ReceiverInfo({
    receiver,
    setReceiver,
    userFullAddress,
    userZoneCode,
    isChange,
    setIsChange,
    isOpen,
    setIsOpen,
    handleClick,
    handleSelectAddress,
    handleChangeValue
}) {
    return (
        <div className="section">
            <h2 className="section-title">
                받는사람정보 &nbsp;&nbsp;&nbsp;
                {isChange ? (
                    <button className='btn' onClick={() => setIsChange(false)}>배송지 변경</button>
                ) : (
                    <div className='section-btn-group'>
                        <button className='btn' onClick={() => setIsOpen(true)}>최근 주소</button>
                        {isOpen && (
                            <AddressModal
                                onClose={() => setIsOpen(false)}
                                onSelectAddress={handleSelectAddress}
                            />
                        )}
                        <button className='btn' onClick={() => setIsChange(true)}>수정</button>
                    </div>
                )}
            </h2>

            {isChange ? (
                <div className="info-box">
                    <div className="info-grid">
                        <div className="label">이름</div>
                        <div className="value">{receiver.name}</div>

                        <div className="label">배송주소</div>
                        <div className="value">
                            {userFullAddress} {receiver.address2} ({userZoneCode})
                        </div>

                        <div className="label">연락처</div>
                        <div className="value">{receiver.phone}</div>

                        <div className="label">배송 요청사항</div>
                        <div className="value">{receiver.memo}</div>
                    </div>
                </div>
            ) : (
                <div className="info-box">
                    <div className="info-grid">
                        <div className="label">이름</div>
                        <input
                            className="value"
                            name='name'
                            value={receiver.name}
                            onChange={handleChangeValue}
                        />

                        <div className="label">배송주소</div>
                        <div className="value phone-input">
                            <input
                                type="text"
                                name='address1'
                                value={userFullAddress}
                                readOnly
                                onClick={handleClick}
                            />
                            <input
                                type="text"
                                name='address2'
                                value={receiver.address2}
                                onChange={handleChangeValue}
                            />
                        </div>

                        <div className="label">연락처</div>
                        <input
                            className="value"
                            name='phone'
                            value={receiver.phone}
                            onChange={handleChangeValue}
                        />

                        <div className="label">배송 요청사항</div>
                        <input
                            className="value"
                            name='memo'
                            value={receiver.memo}
                            onChange={handleChangeValue}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
