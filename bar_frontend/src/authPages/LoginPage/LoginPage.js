import React,{useState,useEffect} from 'react';

import AuthBox from '../../shared/components/AuthBox';
import LoginPageFooter from './LoginPageFooter';
import LoginPageHeader from './LoginPageHeader';
import LoginPageInput from './LoginPageInput';
import {validateLoginForm} from "../../shared/utils/validators"
import { useNavigate } from 'react-router-dom';

import {getActions} from '../../store/actions/authActions';
import {connect} from 'react-redux';

const LoginPage = ({login}) => {
	const navigate=useNavigate();
	const [mail,setMail]=useState("");
	const [password,setPassword]=useState("")
	const [isFormValid,setIsFromValid]=useState(false);
    useEffect(() => {
		
		setIsFromValid(validateLoginForm({mail,password}))
	}, [mail,password,setIsFromValid]);

	const handleLogin=()=>{
		const userDetails={
			email:mail,password
		}
		login(userDetails,navigate)
	}
	return (
		<AuthBox>
			<LoginPageHeader />
			<LoginPageInput mail={mail} password={password} setMail={setMail} setPassword={setPassword} />
			<LoginPageFooter isFormValid={isFormValid} handleLogin={handleLogin}/>
		</AuthBox>
	);
};

const mapActionsToProps=(dispatch)=>{
	return{
		...getActions(dispatch)
	}
}

export default connect(null,mapActionsToProps)(LoginPage);
