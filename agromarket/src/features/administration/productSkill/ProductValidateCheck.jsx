export const ProductValidateCheck = (inputField, formData) => {
    const result = { "result" : false, "message" : {} };

    // 각 항목 체크
    for (const field of inputField) {
      const value = formData[field.name];

      // 값이 없거나 공백일 경우
      if (value === null || value === undefined || String(value).trim() === "") {
        result.message = {
            icon: 'warning',
            title: '필수 항목 미입력',
            text: `${field.label}을(를) 입력해주세요.`,
            confirmButtonText: '확인'
          };
        return result;
      }

      // 숫자 타입인 경우 추가 검사
      if (field.type === "number" && (isNaN(value) || Number(value) < 0)) {
          result.message ={
            icon: 'warning',
            title: '필수 항목 미입력',
            text: `${field.label}에는 0 이상의 숫자만 입력 가능합니다.`,
            confirmButtonText: '확인'
          };
        return result;
      }
    }

    // 안내사항 검사
    if (
      formData.notes === null ||
      formData.notes === undefined ||
      String(formData.notes).trim() === ""
    ) {
        result.message ={
          icon: 'warning',
          title: '필수 항목 미입력',
          text: "안내사항을 입력해주세요.",
          confirmButtonText: '확인'
        };
      return result;
    }

    // 배송정보 검사
    if (
      formData.delType === null ||
      formData.delType === undefined ||
      String(formData.delType).trim() === ""
    ) {
        result.message ={
          icon: 'warning',
          title: '필수 항목 미입력',
          text: "배송정보를 선택해주세요.",
          confirmButtonText: '확인'
        };
      return result;
    }

    // 카테고리 중분류 검사(대분류를 선택하지않으면 중분류도 선택할 수 없으므로 중분류만 검사)
    if (
      formData.categorySub.id === null ||
      formData.categorySub.id === undefined ||
      String(formData.categorySub.id).trim() === ""
    ) {
        result.message ={
          icon: 'warning',
          title: '필수 항목 미입력',
          text: "카테고리를 선택해주세요.",
          confirmButtonText: '확인'
        };
      return result;
    }

    return {...result, "result" : true };
}
