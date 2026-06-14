import {createBrowserRouter} from 'react-router-dom';

import Main from '../../features/pages/main/main';
import Register from '../../features/pages/auth/register/register';
import ErrorPage from '../../features/pages/error/error_page';
import MainLayout from '../../layout/main_layout';
import Login from '../../features/pages/auth/login/login';
import Profile from '../../features/pages/profile/profile';
import ProtectedRouter from './protectedRouter';
import Favorite from "../../features/pages/favorite/favorite";
import AuthLayout from "../../layout/auth_loyout";
import Search from "../../features/pages/search/search";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
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
            {
                path:"/search",
                element: <Search/>,
            }
        ],
    },
    {
        path:'/auth',
        element:<AuthLayout/>,
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
