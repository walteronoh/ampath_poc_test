import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginUser from './login_api_service/login_api_service';

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
        <div>
            <h1>Login</h1>
            <form>
                <label>Username</label><br />
                <input type='text' placeholder='Enter Username' onChange={e => setUsername(e.target.value)} /><br />
                <label>Password</label><br />
                <input type='password' placeholder='Enter Password' onChange={e => setPassword(e.target.value)} /><br />
                <input type='button' value='Login' onClick={handleLogin} /><br />
            </form>
        </div>
    )
}

export default Login;