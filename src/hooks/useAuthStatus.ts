import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);

    const { token } = useSelector((state: RootState) => state.auth);

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
