
import { useState } from 'react';
import './Register.scss'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { registerUser } from '../../services/apiServices'
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [lastname, setLastName] = useState('');
    const [firstname, setFirstName] = useState('');
    const [password, setPassword] = useState('');
    const defaultValidInput = {
        isValidEmail: true,
        isValidPassword: true,
        isValidFirstName: true,
        isValidLastName: true,
    }
    const [objectCheckInput, setObjectCheckInput] = useState(defaultValidInput)

    let history = useHistory();
    let handleLogin = () => {
        history.push("/login");
    }
    const handleRegister = async () => {
        let userData = { email, password, firstname, lastname }
        let check = isValidInput();
        if (check === true) {
            let res = await registerUser(userData);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                history.push("/login");
            } else {
                toast.error(res.errMessage)
            }
        }
    }
    const isValidInput = () => {
        setObjectCheckInput(defaultValidInput);
        if (!email) {
            toast.error('Email is required')
            setObjectCheckInput({ ...defaultValidInput, isValidEmail: false })
            return false;
        }
        let regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (!regx.test(email)) {
            setObjectCheckInput({ ...defaultValidInput, isValidEmail: false })
            toast.error('Please enter a valid email address')
            return false;
        }
        if (!firstname) {
            toast.error('First name is required')
            return false;
        }
        if (!lastname) {
            toast.error('Last name is required')
            return false;
        }
        if (!password) {
            setObjectCheckInput({ ...defaultValidInput, isValidPassword: false })
            toast.error('Password is required')
            return false;
        }

        return true;

    }
    return (
        <div className="register-container ">
            <div className="container">
                <div className="row px-3 px-sm-0 py-5">
                    <div className="content-left col-12 d-none col-sm-7 d-sm-block">
                        <div className='brand'>
                            Register
                        </div>
                        <div className='detail'>
                            Register giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.
                        </div>
                    </div>
                    <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3">
                        <div className='brand d-sm-none'>
                            Register
                        </div>
                        <div className='form-group'>
                            <label>Email: </label>
                            <input type='text' className={objectCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'}
                                placeholder='Email address'
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>First Name: </label>
                            <input type='text' className={objectCheckInput.isValidFirstName ? 'form-control' : 'form-control is-invalid'}
                                placeholder='First Name'
                                value={firstname}
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Last Name: </label>
                            <input type='text' className={objectCheckInput.isValidLastName ? 'form-control' : 'form-control is-invalid'}
                                placeholder='Last Name'
                                value={lastname}
                                onChange={(event) => setLastName(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Password: </label>
                            <input type='password' className={objectCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                                placeholder='Password'
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <button className='btn btn-info'
                            onClick={() => handleRegister()}
                        >Register</button>

                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleLogin()}>
                                Already've an account. Login</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
