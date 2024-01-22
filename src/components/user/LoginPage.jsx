import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './user.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['username']);

    if (cookies.username) {
        return (
            <div className="container">
                <img src='/ava.svg' alt="Фото" />
                <h2 className="form-label">You're already logged in</h2>
                <Link className="link" to="/todo">Go to Todo</Link>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (response.ok) {
                setCookie("username", username);
                navigate('/todo');
            }

            console.log(response);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container">
            <img src='/ava.svg' alt="Фото" />
            <h2 className="form-label">Login</h2>
            <form onSubmit={handleSubmit}>
                <label className="form-label">
                    Email:
                    <input className="form-input" type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label className="form-label">
                    Password:
                    <input className="form-input" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button className="form-button" type="submit">Login</button>
            </form>
            <br />
            <Link className="link" to="/register">Create an account</Link>
        </div>
    );
};

export default LoginPage;
