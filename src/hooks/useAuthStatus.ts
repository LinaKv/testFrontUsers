import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { tokenSelector } from '../store/auth/authSlice';

export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);

    const token = useSelector(tokenSelector);

    useEffect(() => {
        if (token) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
        setCheckingStatus(false);
    }, [token]);

    return { loggedIn, checkingStatus };
};
