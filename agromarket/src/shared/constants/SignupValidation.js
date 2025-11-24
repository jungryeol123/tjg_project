export const isEmpty = (value) => {
  return !value || value.trim() === "";
};

export const validateSignup = (formdata) => {
    const {userId, password, cpwd, name, email} = formdata;
    let errors = "";

    if(isEmpty(userId)){
        errors = "아이디를 입력해주세요.";
        return errors;
    } 
    if(isEmpty(password)){
        errors = "비밀번호를 입력해주세요.";
        return errors;
    } 
    if(isEmpty(cpwd)){
        errors = "비밀번호를 입력해주세요.";
        return errors;
    } 
    if(isEmpty(name)){
        errors = "이름을 입력해주세요.";
        return errors;
    } 
    if(isEmpty(email)){
        errors = "이메일을 입력해주세요.";
        return errors;
    } 
    if(password !== cpwd){
        errors = "비밀번호가 일치하지 않습니다."
        return errors;
    }

    return errors;
};
