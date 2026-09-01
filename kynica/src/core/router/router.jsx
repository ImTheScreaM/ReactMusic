import {createBrowserRouter} from 'react-router-dom';

import Main from '../../features/pages/main/main.tsx';
import Register from '../../features/pages/auth/register/register.tsx';
import ErrorPage from '../../features/pages/error/error_page.tsx';
import MainLayout from '../../layout/main_layout.tsx';
import Login from '../../features/pages/auth/login/login.tsx';
import Profile from '../../features/pages/profile/profile.tsx';
import ProtectedRouter from './protectedRouter.tsx';
import Favorite from "../../features/pages/favorite/favorite.tsx";
import AuthLayout from "../../layout/auth_loyout.tsx";
import Search from "../../features/pages/search/search.tsx";
import Playlist from "../../features/pages/playlist/playlist.tsx";
import PlaylistMusic from "../../features/pages/playlistMusic/playlistMusic.tsx";
import Artist from '../../features/pages/artist/artist.tsx';


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
            },
            {
              path:"/artist/:id",
              element: (
                <Artist/>
              )
            },
            {
                path:"/playlist",
                element: (
                    <ProtectedRouter>
                        <Playlist/>
                    </ProtectedRouter>
                )
            },
            {
                path:"/playlist/:id",
                element: (
                    <ProtectedRouter>
                        <PlaylistMusic/>
                    </ProtectedRouter>
                )
            },
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
