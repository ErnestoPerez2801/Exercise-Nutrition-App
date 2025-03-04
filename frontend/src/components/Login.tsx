// Updated Login.tsx
import React, { useState } from 'react';
import { buildPath as bp } from './Path.tsx';

function Login() {
    const [message, setMessage] = useState('');
    const [loginName, setLoginName] = useState('');
    const [loginPassword, setPassword] = useState('');

    async function doLogin(event: any): Promise<void> {
        event.preventDefault();

        const obj = { Login: loginName, Password: loginPassword };
        const js = JSON.stringify(obj);

        console.log('Login:', loginName);
        console.log('Password:', loginPassword);

        try {
            const response = await fetch(bp('login'), {
                method: 'POST',
                body: js,
                headers: { 'Content-Type': 'application/json' },
            });

            const res = await response.json();

            if (!res.id) {
                setMessage('User/Password combination incorrect');
            } else {
                const user = {
                    firstName: res.firstName,
                    lastName: res.lastName,
                    id: res.id,
                };
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                window.location.href = '/cards';
            }
        } catch (error: any) {
            alert(error.toString());
        }
    }

    return (
        <div id="loginDiv">
            <span id="inner-title">PLEASE LOG IN</span>
            <br />
            <input
                type="text"
                id="loginName"
                placeholder="Username"
                onChange={(e) => setLoginName(e.target.value)}
            />
            <input
                type="password"
                id="loginPassword"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="submit"
                id="loginButton"
                className="buttons"
                value="Login"
                onClick={doLogin}
            />
            <span id="loginResult">{message}</span>
        </div>
    );
}

export default Login;