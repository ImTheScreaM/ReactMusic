import { createContext, useContext, useEffect, useState } from 'react';
import ApiRequest from './apiRequest';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = async () => {
            try {
                const response = await ApiRequest('http://localhost:3003/session', 'GET');

              if (response.auth) {
                    setIsAuth(true);
                    console.log('AUTH!!!');
                }
            } catch (err) {
                console.log('NO AUTH!!');
            }
        setIsLoading(false);
    };

  useEffect(() => {
    checkAuth()
  },[])


    const logout = async () => {
        try {
            const response = await ApiRequest('http://localhost:3003/logout', 'POST');

            setIsAuth(false);
            return response;
        } catch (err) {
            console.log(err);
        }
    };

    const login = async data => {
        try {
            const res = await ApiRequest('http://localhost:3003/login', 'POST', data);
            setIsAuth(true);
            return res;
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuth, logout, login, checkAuth, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    return context;
};
