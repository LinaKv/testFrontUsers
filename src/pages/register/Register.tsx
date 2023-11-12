import './register.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { isValidPassword, isValidUserName } from '../../helpers/utils';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { register, resetUser } from '../../store/user/userSlice';
import { UserInt } from '../../type/type';
import InputRequirements from '../../components/inputsRequirements/InputRequirements';
import Spinner from '../../components/Spinner/Spinner';
import NavigateButton from '../../components/ButtonNavigate/NavigateButton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const [formData, setFormData] = useState<UserInt>({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        is_active: true,
    });
    const { username, password, first_name, last_name, is_active } = formData;
    const [blur, setBlur] = useState({
        username: false,
        password: false,
    });

    const [isPasswordCorrect, setIsPasswordCorrect] = useState(isValidPassword(password));
    const [isUsernameCorrect, setIsUsernameCorrect] = useState(isValidUserName(username));

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //todo
    const { isLoadingUser, isErrorUser, isSuccessUser, messageUser } = useSelector((state: RootState) => state.user);

    // if error
    useEffect(() => {
        if (isErrorUser) {
            toast.error(messageUser);
        }

        dispatch(resetUser());
    }, [isErrorUser, messageUser]);

    // if success
    useEffect(() => {
        if (isSuccessUser) {
            navigate('/');
        }

        dispatch(resetUser());
    }, [isSuccessUser]);

    // remember is password correct
    useEffect(() => {
        setIsPasswordCorrect(isValidPassword(password));
    }, [password]);

    // remember is user correct
    useEffect(() => {
        setIsUsernameCorrect(isValidUserName(username));
    }, [username]);

    const onBlur = (e: ChangeEvent) => {
        setBlur((prevState) => ({
            ...prevState,
            [e.target.id]: false,
        }));
    };

    const onFocus = (e: ChangeEvent) => {
        setBlur((prevState) => ({
            ...prevState,
            [e.target.id]: true,
        }));
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userData = {
            username,
            first_name,
            last_name,
            password,
            is_active,
        };

        // @ts-expect-error
        dispatch(register(userData));
    };

    return (
        <div className="contentWrapper">
            <ToastContainer />
            <div className="personalDataWrapper">
                {/* button to users */}
                <div className="toUsersWrapper">
                    <NavigateButton navigateTo={'/'} buttonName="Our Users" />
                </div>

                <header>
                    <p className="pageHeader">Create a new user</p>
                </header>

                <form onSubmit={onSubmit}>
                    <div className="inputsContainer">
                        {/* User Name */}
                        <div className="userNameWrapper">
                            <input
                                type="text"
                                className={!isUsernameCorrect ? 'inputInfoError' : 'inputInfo'}
                                placeholder="User Name"
                                id="username"
                                value={username}
                                onChange={onChange}
                                required
                                onBlur={onBlur}
                                onFocus={onFocus}
                            />
                            {!isUsernameCorrect && blur.username && (
                                <InputRequirements
                                    requirements={[
                                        'May contain letters',
                                        'May contain numbers',
                                        'May contain @/./+/-/_ characters',
                                    ]}
                                />
                            )}
                        </div>

                        {/* First Name */}
                        <input
                            type="text"
                            className="inputInfo"
                            placeholder="First Name"
                            id="first_name"
                            value={first_name}
                            onChange={onChange}
                        />

                        {/* Last Name */}
                        <input
                            type="text"
                            className="inputInfo"
                            placeholder="Last Name"
                            id="last_name"
                            value={last_name}
                            onChange={onChange}
                        />

                        {/* password */}
                        <div className="passwordWrapper">
                            <input
                                onBlur={onBlur}
                                onFocus={onFocus}
                                type="password"
                                className={!isPasswordCorrect ? 'inputInfoError' : 'inputInfo'}
                                placeholder="Password"
                                id="password"
                                value={password}
                                onChange={onChange}
                                required
                            />
                            {!isPasswordCorrect && blur.password && (
                                <InputRequirements
                                    requirements={[
                                        'At least one capital',
                                        'At least one numeric',
                                        'Minimum 8 characters',
                                    ]}
                                />
                            )}
                        </div>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button className="buttonSubmit" disabled={!isPasswordCorrect || !isUsernameCorrect}>
                        {isLoadingUser ? <Spinner /> : 'Create user'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
