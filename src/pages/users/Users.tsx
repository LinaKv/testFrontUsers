import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
import User from '../../components/User/User';
import { UserInt, UserInfo } from '../../type/type';
import './users.css';
import { ChangeEvent } from 'react';
import { throttle } from 'throttle-debounce';
import NavigateButton from '../../components/ButtonNavigate/NavigateButton';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, isLoadingSelector } from '../../store/auth/authSlice';
import { resetUser } from '../../store/user/userSlice';
import BigSpinner from '../../components/BigSpinner/BigSpinner';
import 'react-toastify/dist/ReactToastify.css';
import { usersSelector } from '../../store/auth/authSlice';

function Users() {
    const dispatch = useDispatch();
    const [filteredData, setFilteredData] = useState<UserInfo[]>([]);

    // todo
    const users = useSelector(usersSelector);
    const isLoading = useSelector(isLoadingSelector);

    useEffect(() => {
        // clean user info after register or change user
        dispatch(resetUser());
        // take users
        // @ts-expect-error
        dispatch(getUsers());
    }, []);

    useEffect(() => {
        setFilteredData(users);
    }, [users]);

    // remember the value
    const searchUsers = (e: ChangeEvent<HTMLInputElement>) => {
        filterData(e.target.value, users);
    };

    // wait a little before filter
    const filterData = useCallback(
        throttle(300, async (searchTerm, usersInfo) => {
            if (!searchTerm) {
                setFilteredData(usersInfo);
            } else {
                const filteredData = usersInfo.filter((user: UserInt) => {
                    return user.username.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
                });
                setFilteredData(filteredData);
            }
        }),
        [],
    );

    if (isLoading) return <BigSpinner />;

    return (
        <div className="contentWrapper">
            {/* NAVIGATION */}
            <div className="changeUserInfoWrapper">
                <NavigateButton navigateTo={'/Register'} buttonName="Create New User" />
            </div>
            {/* TITLE */}
            <div className="title">Our Users:</div>
            {/* FILTER */}
            <div className="settings">
                {
                    <div className="filterWrapper">
                        <input type="text" placeholder="Search Users" onChange={searchUsers} className="filter" />
                    </div>
                }
            </div>
            {/* USERS */}
            <div className="usersWrapper">
                {/* array.map */}
                {filteredData.map((user: UserInfo) => (
                    <User user={user} key={user.id} />
                ))}
            </div>
        </div>
    );
}

export default Users;
