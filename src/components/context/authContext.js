import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
    const [role, setRole] = useState(localStorage.getItem('role') || 'user');

    const login = (token, userRole) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('role', userRole);
        setIsLoggedIn(true);
        setRole(userRole);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('role');
        setIsLoggedIn(false);
        setRole('');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
