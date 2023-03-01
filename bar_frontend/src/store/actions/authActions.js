import * as api from '../../api.js';

export const authActions={
    SET_USER_DETAILS:"AUTH.SET_USER_DETAILS"
};

export const getActions=(dispatch)=>{
    return{
        login:(userDetails,history)=>dispatch(login(userDetails,history)),
        register:(userDetails,history)=>dispatch(register(userDetails,history)),
    }
}

const login=(userDetails,navigate)=>{
    return async (dispatch)=>{
        const response=await api.login(userDetails);
        console.log(response)
        if(response.error){
            //handle error

        }else{
            const {userDetails}=response?.data;
            localStorage.setItem("user",JSON.stringify(userDetails));

            dispatch(setUserDetails(userDetails));

            navigate("/dashboard");

        }
    }
}

const setUserDetails=(userDetails)=>{
    return {
        type:authActions.SET_USER_DETAILS,
        userDetails,
    }
}



const register=(userDetails,navigate)=>{
    return async (dispatch)=>{
        const response=await api.signup(userDetails);
          console.log(response);
        if(response.error){
            // handle error 
        }else{
            const {userDetails}=response?.data;
            localStorage.setItem("user",JSON.stringify(userDetails));

            dispatch(setUserDetails(userDetails));
            navigate("/dashboard");
        }


    }
}