export default function AgreeField({
    agree,
    termList,
    handleAgreeChange,
    handleAllAgree,
    hoveredId,
    setHoveredId
}) {
    return (
        <li className="agree-box">
            <label>약관 동의<span className="red-star">*</span></label>

            <div className="agree-list">

                {/* 전체동의 */}
                <div className="agree-item all">
                    <input
                        type="checkbox"
                        name="all"
                        checked={agree.all}
                        onChange={handleAllAgree}
                    />
                    <label>전체 동의</label>
                </div>

                <hr />

                {/* 개별 항목 */}
                {termList.map((term) => (
                    <div
                        key={term.id}
                        className="agree-item"
                        onMouseEnter={() => setHoveredId(term.id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <input
                            type="checkbox"
                            name={term.key}
                            checked={agree[term.key]}
                            onChange={handleAgreeChange}
                        />
                        <label>
                            {term.title} {term.required && <span className="red-star">*</span>}
                        </label>

                        {/* tooltip */}
                        {hoveredId === term.id && (
                            <div className="tooltip">
                                {term.content}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </li>
    );
}
