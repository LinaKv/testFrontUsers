import axios from 'axios';
import { UserChangeInfo, UserInt, userReq } from '../../type/type';

//  Register user
const register = async (userData: UserInt, token: string) => {
    const headers = {
        Accept: 'application/json',
        Authorization: token,
        'Content-Type': 'application/json',
        'X-CSRFTOKEN': 'plMWaVM46LPsy5rQMv7S7l404C53Nd7VAjbshasueodNsWEhiaTLhlTdYRbEP3Sk',
    };

    const response = await axios.post('https://test-assignment.emphasoft.com/api/v1/users/', userData, { headers });

    return response.data;
};

// getOneUser
const getUser = async (userId: string, token: string) => {
    const headers = {
        Accept: 'application/json',
        Authorization: token,
        'Content-Type': 'application/json',
        'X-CSRFTOKEN': 'plMWaVM46LPsy5rQMv7S7l404C53Nd7VAjbshasueodNsWEhiaTLhlTdYRbEP3Sk',
    };

    const response = await axios.post(`https://test-assignment.emphasoft.com/api/v1/users/${userId}`, userId, {
        headers,
    });

    return response.data;
};

// deleteUser
const deleteUser = async (userId: string, token: string) => {
    const headers = {
        Accept: 'application/json',
        Authorization: token,
        'Content-Type': 'application/json',
        'X-CSRFTOKEN': 'plMWaVM46LPsy5rQMv7S7l404C53Nd7VAjbshasueodNsWEhiaTLhlTdYRbEP3Sk',
    };

    const response = await axios.delete(`https://test-assignment.emphasoft.com/api/v1/users/${userId}`, {
        headers,
    });

    return response.data;
};

// change user
const changeUser = async (userData: UserChangeInfo, id: number, token: string) => {
    const headers = {
        Accept: 'application/json',
        Authorization: token,
        'Content-Type': 'application/json',
        'X-CSRFTOKEN': 'plMWaVM46LPsy5rQMv7S7l404C53Nd7VAjbshasueodNsWEhiaTLhlTdYRbEP3Sk',
    };

    const response = await axios.put(`https://test-assignment.emphasoft.com/api/v1/users/${id}`, userData, {
        headers,
    });

    return response.data;
};

const userService = {
    register,
    getUser,
    changeUser,
    deleteUser,
};

export default userService;
