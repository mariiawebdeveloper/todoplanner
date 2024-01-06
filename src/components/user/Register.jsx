import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
        console.log('myaw')
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

            console.log(response)

            // const data = await response.json();

            // Обработка ответа от сервера, например, вывод сообщения об успешной регистрации или ошибке
            // console.log(data.message);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    render() {
        return (
            <div>
                <Link to="/login">Back to Login</Link>
                <h2>Register</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Confirm Password:
                        <input
                            type="password"
                            name="confirmPassword"
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                        />
                    </label>
                    <br />
                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}

export default Register;
