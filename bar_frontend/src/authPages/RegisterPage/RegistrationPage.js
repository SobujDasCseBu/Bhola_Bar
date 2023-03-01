import { Typography } from '@mui/material';
import React,{useState,useEffect} from 'react';
import AuthBox from '../../shared/components/AuthBox';
import RegisterPageInput from './RegisterPageInput';
import RegistrationPageFooter from './RegistrationPageFooter';

import {validateRegisterFrom} from "../../shared/utils/validators"
import { connect } from 'react-redux';
import { getActions } from '../../store/actions/authActions';
import { useNavigate } from 'react-router-dom';
 

const RegistrationPage = ({register}) => {
  const [mail,setMail]=useState("");
  const [password,setPassword]=useState("");
  const [username,setUsername]=useState("");
  const [isFormValid,setIsFormValid]=useState(false);
  const navigate=useNavigate();

  useEffect(()=>{
    setIsFormValid(validateRegisterFrom({mail,username,password}));

  },[mail,username,password,setIsFormValid])

  const handleRegister=()=>{
    const userDetails={
      email:mail,password,username
    }
    register(userDetails,navigate);

  }
  return (
    <AuthBox>
       <Typography variant="h5" sx={{color:"white"}}>Create an account </Typography>
       <RegisterPageInput mail={mail} password={password} username={username} setMail={setMail} setPassword={setPassword} setUsername={setUsername} />

       <RegistrationPageFooter handleRegister={handleRegister} isFormValid={isFormValid}/>
       </AuthBox>
  )
}
const mapActionsToProps=(dispatch)=>{
	return{
		...getActions(dispatch)
	}
}
export default connect(null,mapActionsToProps)(RegistrationPage);
