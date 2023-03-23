import { checkChildNodeInContainer } from "@syncfusion/ej2/diagrams"
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import authService from '~/services/auth'
export const RequireAuth =  ({children}) => {
    let token = localStorage.getItem('token')
    let [auth,setAuth] = useState(true);
    let checkAuth = async (tokentest) => {
        return await authService.checkAuth(tokentest);
    }
    useEffect(() => {
        checkAuth(token).then(res => {
            setAuth(res)
        })
    },[])


    if(!auth){ // lỗi
        console.log('Checkkkk');
        const refreshtoken = localStorage.getItem('refreshtoken')
        if(refreshtoken){
            let refresh = async (reff) => {
                return await authService.refreshtoken(reff);
            }
            let data;
            refresh(refreshtoken).then(res => {
                data = res;
                console.log(res);
            })
            if(data.status == 200){
                localStorage.setItem('token',data.data.token)
                localStorage.setItem('refreshtoken',data.data.refreshtoken)
                return children;
            }
        }
        return <Navigate to="/login" replace />
    }
    return children;

}