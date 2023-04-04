import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from './contexts/AuthContext';
ReactDOM.render(
    <div>
        <React.StrictMode>
            <ToastContainer position="top-right"/>
                <ContextProvider>
                    <App />
                </ContextProvider>
        </React.StrictMode>
        {/* <ToastContainer position="top-right"/>
        //<React.StrictMode>
            <ContextProvider>
                
                <App />
            </ContextProvider>
        </React.StrictMode> */}
    </div>
    ,
    document.getElementById('root'),
);
