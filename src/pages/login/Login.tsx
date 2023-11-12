import React from 'react';
import { useState, useEffect } from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { reset, login } from '../../store/auth/authSlice';
import Spinner from '../../components/Spinner/Spinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const { username, password } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // get info
    // todo: move to authSlice and export here
    const { token, isLoading, isError, isSuccess, message } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (isError) {
            // todo spec error
            toast.error(message);
        }

        dispatch(reset());
    }, [isError, message]);

    useEffect(() => {
        // Redirect when logged in
        if (isSuccess || token) {
            navigate('/');
        }
    }, [isSuccess, token]);

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
            password,
        };
        // @ts-expect-error
        dispatch(login(userData));
    };

    return (
        <div className="contentWrapper">
            <ToastContainer />
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">Welcome Back</p>
                </header>

                <form onSubmit={onSubmit}>
                    <div className="inputsContainer">
                        {/* User Name */}
                        <input
                            required
                            className="inputInfo"
                            id="username"
                            onChange={onChange}
                            placeholder="User Name"
                            type="username"
                            value={username}
                        />

                        <input
                            type="password"
                            className="inputInfo"
                            placeholder="Password"
                            id="password"
                            value={password}
                            onChange={onChange}
                            required
                        />
                    </div>

                    <button className="buttonSubmit">{isLoading ? <Spinner /> : 'Login'}</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
