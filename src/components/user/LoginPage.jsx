import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginPage extends Component {
    render() {
        return (
            <div>
                <h2>Login</h2>
                <form>
                    <label>
                        Email:
                        <input type="text" name="email" />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input type="password" name="password" />
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
