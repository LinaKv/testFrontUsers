import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import authService from './usersService';
import { UserInt, userReq, UserInfo, UserChangeInfo, ChangeInfo } from '../../type/type';
import { RootState } from '../store';
import { isExpired } from '../../helpers/token';

// Get token from localstorage
const storedTokenString = localStorage.getItem('token');
const stored = storedTokenString ? JSON.parse(storedTokenString) : null;
let tokenFromLocal = null;

if (stored) {
    if (isExpired(stored.timeStamp)) {
        localStorage.removeItem('token');
    } else {
        tokenFromLocal = stored.token;
    }
}

interface State {
    token: string | null;
    users: UserInfo[] | [];
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
}

const initialState: State = {
    token: tokenFromLocal,
    users: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

const selectToken = (state: RootState) => state.users.token;
// get users
export const getUsers = createAsyncThunk('users/getUsers', async (users, thunkAPI: any) => {
    try {
        const token = selectToken(thunkAPI.getState());
        return await authService.getUsers(`Token ${token}`);
    } catch (error) {
        const message = 'smt happened';
        return thunkAPI.rejectWithValue(message);
    }
});

// login user
export const login = createAsyncThunk('users/login', async (user: userReq, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        const message = 'Wrong password or username';
        return thunkAPI.rejectWithValue(message);
    }
});

const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.token = null;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.users = action.payload.sort((a: UserInfo, b: UserInfo) => {
                    return a.id - b.id;
                });
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            });
    },
});

export default usersSlice.reducer;
export const { reset } = usersSlice.actions;
export const usersSelector = (state: RootState) => state.users.users;
export const tokenSelector = (state: RootState) => state.users.token;
export const isLoadingSelector = (state: RootState) => state.users.isLoading;
export const isErrorSelector = (state: RootState) => state.users.isError;
export const messageSelector = (state: RootState) => state.users.message;
export const isSuccessSelector = (state: RootState) => state.users.isSuccess;
