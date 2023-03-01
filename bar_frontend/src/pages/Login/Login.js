import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

import "./Login.css";
import login_img from '../../assets/images/login_bg.gif';
import { toastConfigColoured, valid_mobile } from '../../utils/helper';
import { signIn } from '../../apis/user';
import { toast } from 'react-toastify';


const Login = () => {

    const navigate = useNavigate()

    let [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState();
    useEffect(() => {
        console.log('ENV: ', process.env.NODE_ENV)
    }, [])

    const submitHandle = async (e) => {
        e.preventDefault();

        if (phone.length < 11 && phone.legth > 14) {
            setErr("Correct your phone number !")
            toast.warn("Correct your phone number !",toastConfigColoured)
        }
        else if (password == "") {
            setErr("Enter your password!")
            toast.warn("Enter your password !",toastConfigColoured)
        }
        else {
            //  phone=valid_mobile(phone)
             console.log(phone)
            const data = await signIn({ phone, password });
            console.log('login token: ', data)
            console.log('login message: ', data?.message)
            if (data && data.success) {
                toast.success(data.message, toastConfigColoured)
                localStorage.setItem('profile', JSON.stringify(data.data))
                localStorage.setItem('token', data.token)
                navigate('/')
            } else {
                toast.warn(data.message, toastConfigColoured)
            }
        }
    }
    return (
        <div className="container login-container">
            <div className="row" id="mobile_number_part_only">
                <div className="">
                    <div className="mb-10 border border-red-900 rounded flex flex-col lg:flex-row py-5">
                        <div className="member_login_img flex items-center justify-center">
                            <img src={login_img} alt="" />
                        </div>
                        <div className="lg:mt-20 member_login_form px-10">
                                <div className="  login_header ">
                                    <h3 className=''>Member Login</h3>
                                    `{err ? <p style={{ color: "red" }}>{err}</p> : <p className=''>Enter your correct phone number or username and password.</p>}`
                                </div>
                            <form onSubmit={submitHandle} id="form">
                                <div className="login_group">
                                    <label>Username or Phone</label>
                                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} name="phone_number1" placeholder="Username or Phone number" className="login_input" />
                                    <span style={{ "color": "red", "display": "none" }} id="error_format"> অনুগ্রহপূর্বক সঠিক নাম্বার প্রদান করুন </span>
                                </div>
                                <div className="login_group">
                                    <label>Password</label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="phone_number1" placeholder="Password" className="login_input" />
                                    <span style={{ "color": "red", "display": "none" }} id="error_format"> অনুগ্রহপূর্বক সঠিক নাম্বার প্রদান করুন </span>
                                </div>
                                <div className="login_btn">
                                    <button type="submit" className="s_btn"> Sign In </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login
