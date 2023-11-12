import React from 'react';
import { UserInt, UserInfo } from '../../type/type';
import './user.css';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

type Props = {
    user: UserInfo;
};

function User({ user }: Props) {
    const navigate = useNavigate();

    const userFullName =
        user.first_name || user.last_name ? `${user.first_name} ${user.last_name}` : 'no information :c';

    return (
        <div className="userWrapper">
            <div className="userMainInfo">
                {/* USER ACTIVE */}
                <div className="userIsOnline">
                    <UserIcon fill={user.is_active ? 'green' : 'tomato'} />
                </div>
                {/* USER INFO */}
                <div className="userInfoWrapper">
                    <div className="userInfo">
                        <p className="username">{user.username}</p>
                        {user.is_superuser && <div className="superuser">Admin</div>}
                    </div>
                    <div className="userFullName">
                        <p>{userFullName}</p>
                    </div>
                    {/* SETTINGS */}
                    <div className="settingsWrapperUser">
                        <PencilSquareIcon onClick={() => navigate(`/changeUser/${user.id}`)} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;
