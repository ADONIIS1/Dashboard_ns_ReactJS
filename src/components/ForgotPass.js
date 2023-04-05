import * as React from 'react';

export default function ForgotPass({ setUser, setAuthState }) {
    return (
        <div className=" w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
            <h1 className="text-5xl text-center font-semibold">Quên Mật khẩu</h1>

            <div className="mt-8">
                <div className="flex flex-col">
                    <label className="text-lg font-medium">Email</label>
                    <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" placeholder="Nhập Email" />
                </div>

                <div className="mt-8 flex flex-col gap-y-4">
                    <button className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        Gửi Mail
                    </button>
                </div>
            </div>
        </div>
    );
}
