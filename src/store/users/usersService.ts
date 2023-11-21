import axios from 'axios';
import { userReq } from '../../type/type';

// getUsers
const getUsers = async (token: string) => {
    const headers = {
        Accept: 'application/json',
        Authorization: token,
        'Content-Type': 'application/json',
        'X-CSRFTOKEN': 'plMWaVM46LPsy5rQMv7S7l404C53Nd7VAjbshasueodNsWEhiaTLhlTdYRbEP3Sk',
    };

    const response = await axios.get(`https://test-assignment.emphasoft.com/api/v1/users/`, {
        headers,
    });

    return response.data;
};

// Login
const login = async (userData: userReq) => {
    const response = await axios.post('https://test-assignment.emphasoft.com/api/v1/login/', userData);

    if (response.data) {
        localStorage.setItem('token', JSON.stringify({ token: response.data.token, timeStamp: new Date().getTime() }));
    }

    return response.data;
};

const usersService = {
    login,
    getUsers,
};

export default usersService;
