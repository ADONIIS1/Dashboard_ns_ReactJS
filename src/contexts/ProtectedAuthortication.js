export const RequireAuthorization = ({ children, roles }) => {
    return children;
};

// if (localStorage.getItem('roles').includes(roles)) {
//     return children;
// } else {
//     return <Navigate to={'/ecommerce'} />;
// }
