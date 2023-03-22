import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function ECommerce() {
    const navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem('token')){
            console.log('22222');
            navigate('/login')
        }
          
    },)
    return <h2>ECommerce page</h2>;
}

export default ECommerce;
