import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Main extends Component {
    render() {
        return (
            <div className="main-container">
                <header>
                    <h1>Plannuyou</h1>
                    <p>Your Personal Task Manager</p>
                </header>
                <section className="features">
                    <div className="feature">
                        <img src="/img.png" alt="Feature 1" />
                        <h2>Task Organization</h2>
                        <p>Effortlessly organize your tasks and to-dos in one place.</p>
                    </div>
                    <div className="feature">
                        <img src="/img_1.png" alt="Feature 2" />
                        <h2>Intuitive Interface</h2>
                        <p>Enjoy a user-friendly interface designed for easy navigation.</p>
                    </div>
                    <div className="feature">
                        <img src="/img_2.png" alt="Feature 3" />
                        <h2>Deadline Management</h2>
                        <p>Stay on track with built-in deadline management for each task.</p>
                    </div>
                </section>
                <section className="cta-section">
                    <h2>Start Organizing Your Life Today</h2>
                    <p>Join Plannuyou and take control of your tasks, deadlines, and productivity.</p>
                    <Link to="/register">
                        <button className={'button'}>Get Started</button>
                    </Link>
                </section>
            </div>
        );
    }
}

export default Main;
