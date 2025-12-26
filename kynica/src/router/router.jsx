import { createBrowserRouter } from 'react-router-dom';

import Main from '../components/limbs/main/Main';
import Register from '../components/auth/sign_up/signUp';
import ErrorPage from '../pages/error_page';
import Layout from '../pages/layout';
import Login from '../components/auth/sign_in/signIn';
import Profile from '../components/profile/Profile';
import ProtectedRouter from '../components/shared/modals/protectedRouter';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Main />,
            },
            {
                path: '/auth/register',
                element: <Register />,
            },
            {
                path: '/auth/login',
                element: <Login />,
            },
            {
                path: '/profile',
                element: (
                    <ProtectedRouter>
                        <Profile />
                    </ProtectedRouter>
                ),
            },
        ],
    },
]);
