import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import authService from '~/services/auth'
export const RequireAuth =  ({children}) => {
    let token = localStorage.getItem('token')
    const [auth,setAuth] = useState(true); 
    useEffect(() => {
        const checkAuth = async (accessToken = '') => {
            await authService.checkAuth(accessToken).then(res => {
                console.log('Check Auth',res);
                setAuth(res)
            }).catch(err => {
                setAuth(false)
            })
        }
        console.log(checkAuth(token));
    },[])
    if(!token){ // lỗi
        console.log('Checkkkk');
        return <Navigate to="/login" />
    }
    else
    {
        if(!auth){
            const refreshtoken = localStorage.getItem('refreshtoken')

            if(!refreshtoken ){
                return <Navigate to="/login" />
            }
            const refresh = async (reff) => {
                return await authService.refreshtoken(reff).then(p => p)
            }
            console.log('Check');
            const checkRefreshTokenExpiresIn = refresh(refreshtoken).then(value => {
                if(value.status === 200){
                    console.log('Check');
                    localStorage.setItem('token',value.data.token)
                    localStorage.setItem('refreshtoken',value.data.refreshtoken)
                }
            })
            if(!checkRefreshTokenExpiresIn){
                return <Navigate to="/login" />
            }
        }
        return children;
    }
    

}