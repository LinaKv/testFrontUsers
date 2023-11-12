import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import userService from './userService';
import { UserInt, UserInfo, ChangeInfo } from '../../type/type';
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
    user: UserInfo | null;
    isErrorUser: boolean;
    isSuccessUser: boolean;
    isLoadingUser: boolean;
    messageUser: string;
}

const initialState: State = {
    token: tokenFromLocal,
    user: null,
    isErrorUser: false,
    isSuccessUser: false,
    isLoadingUser: false,
    messageUser: '',
};

const selectToken = (state: RootState) => state.auth.token;

// Register new user
export const register = createAsyncThunk('auth/register', async (user: UserInt, thunkAPI: any) => {
    try {
        const token = selectToken(thunkAPI.getState());
        return await userService.register(user, `Token ${token}`);
    } catch (error) {
        const messageUser = "don't work";
        return thunkAPI.rejectWithValue(messageUser);
    }
});

// change user information
export const changeUser = createAsyncThunk('auth/changeUser', async (newData: ChangeInfo, thunkAPI: any) => {
    try {
        const token = selectToken(thunkAPI.getState());
        return await userService.changeUser(newData.newUserData, newData.id, `Token ${token}`);
    } catch (error) {
        const messageUser = "don't work";
        return thunkAPI.rejectWithValue(messageUser);
    }
});

// get user`s information
export const getUser = createAsyncThunk('auth/getUser', async (userId: string, thunkAPI: any) => {
    try {
        const token = selectToken(thunkAPI.getState());
        return await userService.getUser(userId, `Token ${token}`);
    } catch (error) {
        const messageUser = 'no user';
        return thunkAPI.rejectWithValue(messageUser);
    }
});

// delete user`s information
export const deleteUser = createAsyncThunk('auth/delete', async (userId: string, thunkAPI: any) => {
    try {
        const token = selectToken(thunkAPI.getState());
        return await userService.deleteUser(userId, `Token ${token}`);
    } catch (error) {
        const messageUser = "don't work";
        return thunkAPI.rejectWithValue(messageUser);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        resetUser: (state) => {
            state.isLoadingUser = false;
            state.isErrorUser = false;
            state.isSuccessUser = false;
            state.messageUser = '';
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.isLoadingUser = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoadingUser = false;
                state.isSuccessUser = true;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoadingUser = false;
                state.isErrorUser = true;
                state.messageUser = action.payload as string;
            })
            .addCase(changeUser.pending, (state) => {
                state.isLoadingUser = true;
            })
            .addCase(changeUser.fulfilled, (state, action) => {
                state.isLoadingUser = false;
                state.isSuccessUser = true;
                state.user = action.payload;
            })
            .addCase(changeUser.rejected, (state, action) => {
                state.isLoadingUser = false;
                state.isErrorUser = true;
                state.messageUser = action.payload as string;
            })
            .addCase(register.pending, (state) => {
                state.isLoadingUser = true;
            })
            .addCase(register.fulfilled, (state) => {
                state.isLoadingUser = false;
                state.isSuccessUser = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoadingUser = false;
                state.isErrorUser = true;
                state.messageUser = action.payload as string;
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoadingUser = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoadingUser = false;
                state.isSuccessUser = true;
                state.user = null;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoadingUser = false;
                state.isErrorUser = true;
                state.messageUser = action.payload as string;
            });
    },
});

export default userSlice.reducer;
export const { resetUser } = userSlice.actions;
