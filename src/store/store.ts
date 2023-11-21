import { configureStore } from '@reduxjs/toolkit';
import authReducer from './users/usersSlice';
import userReducer from './user/userSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
    reducer: {
        users: authReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
