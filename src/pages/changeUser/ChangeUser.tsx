import './changeUser.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { ChangeEvent } from 'react';
import NavigateButton from '../../components/ButtonNavigate/NavigateButton';
import { useSelector, useDispatch } from 'react-redux';
import {
    getUser,
    resetUser,
    changeUser,
    deleteUser,
    userSelector,
    isLoadingUserSelector,
    isErrorUserSelector,
    messageUserSelector,
} from '../../store/user/userSlice';
import { useNavigate, useParams } from 'react-router-dom';
import BigSpinner from '../../components/BigSpinner/BigSpinner';
import { isValidPassword, isValidUserNameForChange } from '../../helpers/utils';
import { FormEvent } from 'react';
import { UserChangeInfo } from '../../type/type';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputChange from '../../components/InputChange/InputChange';
import InputChangeWithReq from '../../components/InputChangeWithReq/InputChangeWithReq';

function ChangeUser() {
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // user info
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        is_active: false,
    });
    const { username, first_name, last_name, password, is_active } = formData;
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(isValidPassword(password));
    const [isUsernameCorrect, setIsUsernameCorrect] = useState(isValidUserNameForChange(username));

    const user = useSelector(userSelector);
    const isLoadingUser = useSelector(isLoadingUserSelector);
    const isErrorUser = useSelector(isErrorUserSelector);
    const messageUser = useSelector(messageUserSelector);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    // get user info
    useEffect(() => {
        // clean prev info
        dispatch(resetUser());
        // get user info

        if (id) {
            // @ts-expect-error
            dispatch(getUser(id));
        }
    }, []);

    // set user info
    useEffect(() => {
        if (user) {
            setFormData((prevState) => ({
                ...prevState,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                is_active: user.is_active,
                id: user.id,
            }));
        }
    }, [user]);

    // reset settings
    useEffect(() => {
        if (isErrorUser) {
            toast.error(messageUser);
            if (messageUser === 'no user') {
                navigate('/');
            }
        }
    }, [isErrorUser, messageUser]);

    // remember is password correct
    useEffect(() => {
        setIsPasswordCorrect(isValidPassword(password));
    }, [password]);

    // remember is user correct
    useEffect(() => {
        setIsUsernameCorrect(isValidUserNameForChange(username));
    }, [username]);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (user?.id) {
            const newUserData: UserChangeInfo = {
                username,
                first_name,
                last_name,
                is_active,
                password,
            };

            const newData = {
                newUserData,
                id: user.id,
            };

            // @ts-expect-error
            dispatch(changeUser(newData)).then(() => {
                toast.success('Data was changed');
            });
        }
    };

    const deleteOnClick = () => {
        if (id) {
            // @ts-expect-error
            dispatch(deleteUser(id)).then(() => {
                navigate('/');
            });
        }
    };

    if (isLoadingUser) return <BigSpinner />;

    return (
        <>
            <ToastContainer />
            <div className="contentWrapper">
                <div className="personalDataWrapper">
                    {/* Button to Users */}
                    <div className="toUsersWrapper">
                        <NavigateButton navigateTo={'/'} buttonName="Return To Our Users" />
                    </div>

                    <header>
                        <p className="pageHeader">Change user's personal data</p>
                    </header>

                    <form onSubmit={onSubmit}>
                        <div className="userDataWrapper">
                            {/* UserName */}
                            <InputChangeWithReq
                                inputName="Username"
                                id="username"
                                type="text"
                                value={username}
                                onChange={onChange}
                                isCorrect={isUsernameCorrect}
                                isDisabled={true}
                                requirements={[
                                    'May contain letters',
                                    'May contain numbers',
                                    'May contain @/./+/-/_ characters',
                                ]}
                            />

                            {/* FirstName */}
                            <InputChange
                                inputName="First Name"
                                id="first_name"
                                value={first_name}
                                onChange={onChange}
                            />

                            {/* Last Name */}
                            <InputChange inputName="Last Name" id="last_name" value={last_name} onChange={onChange} />

                            {/* Password */}
                            <InputChangeWithReq
                                inputName="Password"
                                id="password"
                                type="password"
                                value={password}
                                onChange={onChange}
                                isCorrect={isPasswordCorrect}
                                isDisabled={false}
                                requirements={['At least one capital', 'At least one numeric', 'Minimum 8 characters']}
                            />

                            {/* submit button */}
                            <button disabled={!isPasswordCorrect || !isUsernameCorrect} className="buttonSubmit">
                                Save
                            </button>
                        </div>
                    </form>

                    <div className="buttonDeleteWrapper">
                        {/* delete button */}
                        <button className="buttonDelete" onClick={deleteOnClick}>
                            Delete User
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChangeUser;
