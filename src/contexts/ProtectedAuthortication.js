import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export const RequireAuthorization = ({ children, roles }) => {
    // if (localStorage.getItem('roles').includes(roles)) {
    //     return children;
    // } else {
    //     toast.error('Bạn không có quyền truy cập', {
    //         position: 'top-right',
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: 'light',
    //     });
    //     return (
    //         <div>
    //             <ToastContainer />
    //             <Navigate to={'/information'} />
    //         </div>
    //         );
    // }
    return children;
};
