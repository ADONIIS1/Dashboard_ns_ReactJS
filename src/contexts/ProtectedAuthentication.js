import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import authService from '~/services/auth';
import jwt_decode from 'jwt-decode';
export const RequireAuthentication = ({ children }) => {
    let token = localStorage.getItem('token');
    const [auth, setAuth] = useState(true);
    useEffect(() => {
        // const checkAuth = async (accessToken = '') => {
        //     await authService
        //         .checkAuth(accessToken)
        //         .then((res) => {
        //             setAuth(res);
        //         })
        //         .catch((err) => {
        //             setAuth(false);
        //         });
        // };
        // console.log(checkAuth(token));
    }, []);

    if (!token) {
        // lỗi
        console.log('Checkkkk');
        return <Navigate to="/login" />;
    } else {
        if (!auth) {
            const refreshtoken = localStorage.getItem('refreshtoken');

            if (!refreshtoken) {
                return <Navigate to="/login" />;
            }
            const refresh = async (reff) => {
                return await authService.refreshtoken(reff).then((p) => p);
            };
            const checkRefreshTokenExpiresIn = refresh(refreshtoken).then((value) => {
                if (value.status === 200) {
                    localStorage.setItem('token', value.data.token);
                    localStorage.setItem('refreshtoken', value.data.refreshtoken);
                    const decoded = jwt_decode(value.data.token);
                    localStorage.setItem('roles', decoded.roles);
                }
            });
            if (!checkRefreshTokenExpiresIn) {
                return <Navigate to="/login" />;
            }
        }
        return children;
    }
};
