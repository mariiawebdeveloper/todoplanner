import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Register extends Component {
    render() {
        return (
            <div>
                <Link to="/login">Back to Login</Link>
                <h2>Register</h2>
                <form>
                    <label>
                        Username:
                        <input type="text" name="username" />
                    </label>
                    <br />
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
                    <label>
                        Confirm Password:
                        <input type="password" name="confirmPassword" />
                    </label>
                    <br />
                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}

export default Register;
