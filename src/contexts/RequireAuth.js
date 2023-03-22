import { Navigate, useNavigate } from "react-router-dom"

export const RequireAuth = ({children}) => {
    
    console.log('Check data : ',localStorage.getItem('token') + !localStorage.getItem('token'));
    if(!localStorage.getItem('token')){
        console.log('Checkkkk');
        
        return <Navigate to="/login" replace />
    }
    return children;

}