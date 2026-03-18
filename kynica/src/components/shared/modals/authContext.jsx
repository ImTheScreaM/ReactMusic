import { createContext, useContext, useEffect, useState } from 'react';
import ApiRequest from './apiRequest';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const logout = async () => {
        try {
            const response = await ApiRequest('http://localhost:3003/logout', 'POST');

            return response;
        } catch (err) {
            console.log(err);
        }
    };

    const login = async data => {
        try {
            const res = await ApiRequest('http://localhost:3003/login', 'POST', data);
            
            return res;
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AuthContext.Provider value={{ logout, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    return context;
};
