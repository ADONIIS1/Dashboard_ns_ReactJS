import React from 'react';

import PropTypes from 'prop-types';
import loginImg from '~/data/login.jpg';

function LoginLayout({ children }) {
    return (
        <div className="flex w-full h-screen">
            <div className="w-full flex items-center justify-center lg:w-1/2">{children}</div>
            <div className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-gray-200">
                <img className="w-11/12 h-4/5 object-cover" src={loginImg} alt="" />
            </div>
        </div>
    );
}

LoginLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LoginLayout;
