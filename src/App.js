import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RequireAuth } from './contexts/RequireAuth';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        console.log('check Page',route.path);// route.path
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    (route.path !== '/login') ?
                                    <RequireAuth>
                                        <Layout >
                                            <Page />
                                        </Layout>
                                    </RequireAuth>
                                    :
                                        <Layout >
                                            <Page />
                                        </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
