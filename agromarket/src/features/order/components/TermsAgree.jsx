export default function TermsAgree({ agree, handleChangeAgree }) {
    return (
        <div className="terms">
            <div className="terms-row">
                <input
                    type="checkbox"
                    name="terms"
                    checked={agree.terms}
                    onChange={handleChangeAgree}
                />
                <label htmlFor="terms">구매조건 확인 및 결제대행 서비스 약관 동의</label>
            </div>

            <div className="terms-row">
                <input
                    type="checkbox"
                    name="privacy"
                    checked={agree.privacy}
                    onChange={handleChangeAgree}
                />
                <label htmlFor="privacy">개인정보 국외 이전 동의</label>
            </div>
        </div>
    );
}
