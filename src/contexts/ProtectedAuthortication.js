import { Navigate } from 'react-router-dom';
export const RequireAuthorization = ({ children, roles }) => {
    console.log(roles);
    // if(localStorage.getItem('roles').includes(roles)){
    //     return children;
    // }
    // else{
    //     return <Navigate to={"/ecommerce"} />
    // }

    return children;
};
