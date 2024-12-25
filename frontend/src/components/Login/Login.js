
import './Login.scss'
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/apiServices';


const Login = (props) => {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let history = useHistory();

    let handleCreateNewAccount = () => {
        alert('me')
    }
    let handleLogin = async () => {
        let res = await loginUser(email, password);
        if (res && res.errCode === 0) {
            let data = {
                isAuthenticated: true,
                token: 'fake token',
                username: email
            }
            sessionStorage.setItem('account', JSON.stringify(data));
            toast.success(res.errMessage);
            history.push("/");
            window.location.reload()
        } else {
            toast.error(res.errMessage);
        }
    }
    return (
        <div className="login-container ">
            <div className="container">
                <div className="row px-3 px-sm-0 py-5">
                    <div className="content-left col-12 d-none col-sm-7 d-sm-block">
                        <div className='brand'>
                            Login
                        </div>
                        <div className='detail'>
                            Login giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.
                        </div>
                    </div>
                    <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3">
                        <div className='brand d-sm-none'>
                            Login
                        </div>
                        <input type='text' className='form-control'
                            placeholder='Email address or your phone number'
                            value={email}
                            onChange={(event) => { setEmail(event.target.value) }}
                        />
                        <input type='password' className='form-control'
                            placeholder='Password'
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }}
                        />
                        <button className='btn btn-primary'
                            onClick={() => handleLogin()}
                        >Login</button>
                        <span className='text-center'>
                            <a className='forgot-password' href='#'>Forgot your password?</a>
                        </span>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success'
                                onClick={() => handleCreateNewAccount()}
                            >
                                Create new account</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
