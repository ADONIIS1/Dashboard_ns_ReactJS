import * as React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import ForgotPass from './ForgotPass';
import {useNavigate} from 'react-router-dom'
import authService from '~/services/auth'
import {useState,useContext} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";

 function Login() {

    const navigate = useNavigate();
    const [userInfo,setUser] = useState({
        email : "",
        password : ""
    });
    //const input = useRef({})
    const handleChange = (event) => {
        setUser({ ...userInfo, [event.target.name]: event.target.value });
      };
    const handleSubmit = async (event) =>{
        try {
            event.preventDefault();
            const data = await authService.login(userInfo).then(res => {
                return res;
            }).catch((err) => {
                //console.log('Check data : ',err);
                return err;
            });
            if(data.status === 422){
                toast.warning(`${data.data.message}`, {
                    position: toast.POSITION.TOP_RIGHT
                });
                return;
            }
            if(data.status === 404){
                toast.warning(`${data.data.message}`, {
                    position: toast.POSITION.TOP_RIGHT
                });
                return;
            }
            if(data.status === 401){
                toast.error('Email or Password is not correct !', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                return;
            }
            if(data.status === 200){
                const decoded = jwt_decode(data.data.token); // decode Token
                localStorage.setItem('roles',decoded.roles)
                localStorage.setItem('token',data.data.token);
                localStorage.setItem('refreshtoken',data.data.refreshtoken);
                navigate('/ecommerce')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className=" w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
            <h1 className="text-5xl text-center font-semibold">Đăng Nhập</h1>
            <form onSubmit={handleSubmit}>
            <div className="mt-8">
                <div className="flex flex-col">
                    <label className="text-lg font-medium">Email</label>
                    <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" 
                    placeholder="Nhập Email" 
                    name="email"
                    value={userInfo.email}
                    onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col mt-4">
                    <label className="text-lg font-medium">Mật Khẩu</label>
                    <input
                        className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                        placeholder="Nhập Mật Khẩu"
                        type={'password'}
                        name="password"
                        value={userInfo.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="mt-8 flex justify-between items-center">
                    <div>
                        <input type="checkbox" id="remember" />
                        <label className="ml-2 font-medium text-base" htmlFor="remember">
                            Nhớ mật khẩu
                        </label>
                    </div>
                    <a className="font-medium text-base text-violet-500">Quên Mật khẩu</a>
                    {/*   <Routes>
                      
                       
                        <Route path="/forgotPass" element=<ForgotPass /> />
                    </Routes>
                  */}
                </div>
                <div className="mt-8 flex flex-col gap-y-4">
                    <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg">
                        Đăng Nhập
                    </button>
                </div>
            </div>
            </form>
        </div>
    );
}
export default Login