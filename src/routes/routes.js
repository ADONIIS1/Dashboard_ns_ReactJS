import config from '~/config';

// Layouts
import LoginLayout from '~/layouts/LoginLayout';

// Pages
import ECommerce from '~/pages/ECommerce';
import Login from '~/components/Login';
import ForgotPass from './../components/ForgotPass';
import { UserProfile } from '~/components/';
// Public routes
const publicRoutes = [
    { path: config.routes.home, component: ECommerce },
    { path: config.routes.home, component: UserProfile },
    { path: config.routes.ecommerce, component: ECommerce },
    { path: config.routes.login, component: Login, layout: LoginLayout },
    { path: config.routes.forgetPass, component: ForgotPass, layout: LoginLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
