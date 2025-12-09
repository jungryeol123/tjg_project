export function SignupBirth({ form, refs, handleChangeForm }) {
  return (
    <li>
      <ul className="part date">
        <li className="left">
          <span>생년월일</span>
        </li>
        <li className="middle">
          <div className="date-wrapper">
            <input
              className="date-input"
              type="text"
              maxLength={4}
              placeholder="YYYY"
              name="dateYear"
              value={form.dateYear}
              ref={refs.dateYearRef}
              onChange={handleChangeForm}
            />
            <span className="date-slash">/</span>
            <input
              className="date-input"
              type="text"
              maxLength={2}
              placeholder="MM"
              name="dateMonth"
              value={form.dateMonth}
              ref={refs.dateMonthRef}
              onChange={handleChangeForm}
            />
            <span className="date-slash">/</span>
            <input
              className="date-input"
              type="text"
              maxLength={2}
              placeholder="DD"
              name="dateDay"
              value={form.dateDay}
              ref={refs.dateDayRef}
              onChange={handleChangeForm}
            />
          </div>
        </li>
      </ul>
    </li>
  );
}
