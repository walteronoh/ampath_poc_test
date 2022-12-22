import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginUser from './login_api_service/login_api_service';
import logo from '../../asset/ampath_logo.png';
import './Login.css';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        const data = {
            username: username,
            password: password
        }
        // Authenticate user
        const isValid = await loginUser(data);
        if (isValid) {
            // Redirect user to Dashboard
            navigate("dashboard");
        }
    }

    return (
        <div className='login-body'>
            <div className='login-body-items'>
                <img src={logo} />
                <form className='login-form-items'>
                    <label>Username</label><br />
                    <input type='text' className='login-form-username-input' placeholder='Enter Username' onChange={e => setUsername(e.target.value)} /><br />
                    <label>Password</label><br />
                    <input type='password' className='login-form-password-input' placeholder='Enter Password' onChange={e => setPassword(e.target.value)} /><br />
                    <input type='button' value='LOGIN' onClick={handleLogin} /><br />
                </form>
            </div>
        </div>
    )
}

export default Login;