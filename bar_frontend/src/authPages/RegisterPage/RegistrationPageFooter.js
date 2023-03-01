import React from 'react';
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton';
import RedirectInfo from '../../shared/components/RedirectInfo';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';



const RegistrationPageFooter = ({ handleRegister, isFormValid }) => {
    const navigate=useNavigate();
    const handlePushToLogin=()=>{
   navigate("/login")

    }
    const getFormNotValidMessage=()=>{
        return "username should be  up to 6 character and password should be between 6 to 12 character.Also e-mail address should be provide. !"
    
    }
    const getFormValidMessage=()=>{
        return "Press register!";
    }
	return (
        <>
        <Tooltip title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}>
		<div>
			<CustomPrimaryButton
				label='Register'
				additionalStyles={{ marginTop: '30px' }}
				disabled={!isFormValid}
				onClick={handleRegister}
			/>
		</div>
        </Tooltip>
        <RedirectInfo text="" redirectText="Already have an account?" additionalStyles={{marginTop:"5px"}} redirectHandler={handlePushToLogin} />
        </>
	);
};

export default RegistrationPageFooter;
