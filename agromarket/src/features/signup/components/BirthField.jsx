export default function BirthField({ form, refs, handleChangeForm }) {
    return (
        <li>
            <label>생년월일<span className="red-star">*</span></label>
            <div className="birth-wrap">
                <input
                    name="dateYear"
                    value={form.dateYear}
                    onChange={handleChangeForm}
                    placeholder="YYYY"
                    maxLength="4"
                    ref={refs.dateYearRef}
                />
                <span>-</span>
                <input
                    name="dateMonth"
                    value={form.dateMonth}
                    onChange={handleChangeForm}
                    placeholder="MM"
                    maxLength="2"
                    ref={refs.dateMonthRef}
                />
                <span>-</span>
                <input
                    name="dateDay"
                    value={form.dateDay}
                    onChange={handleChangeForm}
                    placeholder="DD"
                    maxLength="2"
                    ref={refs.dateDayRef}
                />
            </div>
        </li>
    );
}
