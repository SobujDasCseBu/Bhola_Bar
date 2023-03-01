import React from 'react';
 
import InputWithLabel from '../../shared/components/InputWithLabel';

const RegisterPageInput = (props) => {
    const {mail,setMail,password,setPassword,username,setUsername}=props;
  return (
    <>
    <InputWithLabel label="Username"
    value={username} placeholder="Enter username.." type="text" setValue={setUsername} />
    
    <InputWithLabel label="E-mail address"
    value={mail} placeholder="Enter  e-mail address.." type="text" setValue={setMail} />
    
    <InputWithLabel label="Password"
    value={password} placeholder="Password.." type="password" setValue={setPassword} />
      
    </>
  )
}

export default RegisterPageInput
