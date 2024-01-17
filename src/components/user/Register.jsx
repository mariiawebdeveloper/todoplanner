import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './user.css';

class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        const { username, email, password, confirmPassword } = this.state;

        // Проверки на валидность данных, например, сравнение паролей

        // Отправка данных на сервер
        try {
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    confirmPassword,
                }),
            });

            console.log(response);

            // const data = await response.json();

            // Обработка ответа от сервера, например, вывод сообщения об успешной регистрации или ошибке
            // console.log(data.message);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    render() {
        return (
            <div className="container">
                <div className="back-link">
                    <div className="arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
                            <path d="M5 12h14M12 5l-7 7 7 7"></path>
                        </svg>
                    </div>
                    <div>
                        <Link to="/login" className="link">
                            Back to Login
                        </Link>
                    </div>
                </div>
                <div><img src='/ava.svg' alt="Фото" /></div>
                <div><h2 className="form-label">Registration</h2></div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <span className="form-label">Username:</span>
                        <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            className="form-input"
                        />
                    </label>
                    <br />
                    <label>
                        <span className="form-label">Email:</span>
                        <input
                            type="text"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            className="form-input"
                        />
                    </label>
                    <br />
                    <label>
                        <span className="form-label">Password:</span>
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            className="form-input"
                        />
                    </label>
                    <br />
                    <label>
                        <span className="form-label">Confirm Password:</span>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            className="form-input"
                        />
                    </label>
                    <br />
                    <button type="submit" className="form-button">Register</button>
                </form>
            </div>
        );
    }
}

export default Register;
