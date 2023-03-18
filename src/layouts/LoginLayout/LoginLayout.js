import React from 'react';

import PropTypes from 'prop-types';

function LoginLayout({ children }) {
    return (
        <div className="flex w-full h-screen">
            <div className="w-full flex items-center justify-center lg:w-1/2">{children}</div>
            <div className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-gray-200">
                <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-violet-500 to-pink-500 animate-spin" />
            </div>
        </div>
    );
}

LoginLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LoginLayout;
