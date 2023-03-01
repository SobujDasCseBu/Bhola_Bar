export const validateLoginForm=({mail,password})=>{
    const isMailValid=validateMail(mail);
    const isPasswordValid=validatePassword(password);
    return isMailValid && isPasswordValid;
}

export const validateRegisterFrom=({mail,username,password})=>{
    const isMailValid=validateMail(mail);
    const isPasswordValid=validatePassword(password);
    const isUsernameValid=validateUsername(username);

    return isMailValid&& isPasswordValid&& isUsernameValid;

}
const validateMail=(mail)=>{
    const emailPattern= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailPattern.test(mail);

}
const validatePassword=(password)=>{
return password.length>4 && password.length<12;

}

const validateUsername=(username)=>{
    return username.length >2 && username.length<13;
}