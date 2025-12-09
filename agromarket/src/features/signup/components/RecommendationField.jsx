export default function RecommendationField({
    form,
    refs,
    handleChangeForm,
    handleIdCheck
}) {
    return (
        <li>
            <label>추천인</label>
            <div className="input-btn">
                <input
                    name="recommendation"
                    value={form.recommendation}
                    onChange={handleChangeForm}
                    ref={refs.recommendationRef}
                    placeholder="추천인 아이디 입력"
                />
                <button type="button" onClick={handleIdCheck}>확인</button>
            </div>
        </li>
    );
}
