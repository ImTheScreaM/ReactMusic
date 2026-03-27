import { createBrowserRouter } from 'react-router-dom';

import Main from '../../features/pages/main/main';
import Register from '../../features/pages/auth/register/register';
import ErrorPage from '../../features/pages/error/error_page';
import Main_layout from '../../layout/main_layout';
import Login from '../../features/pages/auth/login/login';
import Profile from '../../features/pages/profile/profile';
import ProtectedRouter from '../../shared/modals/protectedRouter';
import Favorite from "../../features/pages/favorite/favorite";
import Auth_layout from "../../layout/auth_loyout";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main_layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Main />,
            },
            {
              path:"/favorite",
              element: (
                  <ProtectedRouter>
                      <Favorite/>
                  </ProtectedRouter>
              )
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
    {
        path:'/auth',
        element:<Auth_layout/>,
        children: [
            {
                path:"register",
                element: <Register/>
            },
            {
                path:"login",
                element: <Login/>
            }
        ]
    }
]);
