import * as React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import ForgotPass from './ForgotPass';
import { Link } from 'react-router-dom';

export default function Form({ setUser, setAuthState }) {
    return (
        <div className=" w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
            <h1 className="text-5xl text-center font-semibold">Đăng Nhập</h1>

            <div className="mt-8">
                <div className="flex flex-col">
                    <label className="text-lg font-medium">Email</label>
                    <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" placeholder="Nhập Email" />
                </div>
                <div className="flex flex-col mt-4">
                    <label className="text-lg font-medium">Mật Khẩu</label>
                    <input
                        className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                        placeholder="Nhập Mật Khẩu"
                        type={'password'}
                    />
                </div>
                <div className="mt-8 flex justify-between items-center">
                    <div>
                        <input type="checkbox" id="remember" />
                        <label className="ml-2 font-medium text-base" for="remember">
                            Nhớ mật khẩu
                        </label>
                    </div>
                    <Link to={'/forgetPass'} key={'forgetPass'} className="font-medium text-base text-violet-500">
                        Quên Mật khẩu
                    </Link>
                </div>
                <div className="mt-8 flex flex-col gap-y-4">
                    <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg">
                        Đăng Nhập
                    </button>
                </div>
            </div>
        </div>
    );
}
