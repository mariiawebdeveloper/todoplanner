import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginPage extends Component {
    state = {
        username: '',
        password: '',

    };
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        const {  username, password,  } = this.state;


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
            if (response.ok){
                console.log('myaw')
            }

            console.log(response)

        } catch (error) {
            console.error('Error:', error);
        }
    };
    render() {
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email:
                        <input type="text" name="username"  value={this.state.username} onChange={this.handleChange}  />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </label>
                    <br />
                    <button type="submit">Login</button>
                </form>
                <br />
                <Link to="/register">Create an account</Link>
            </div>
        );
    }
}

export default LoginPage;
