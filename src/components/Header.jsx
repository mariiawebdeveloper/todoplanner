import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const handleDropdownToggle = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    return (
        <div className="header">
            <div><Link to={'/main'} className={'links'}>Plannuyou</Link></div>
            <div><Link to={'/todo'} className={'links'}>Board</Link></div>
            <div><Link to={'/todo'} className={'links'}>Calendar</Link></div>
            <div className="dropdown-container">
                <img src={'/ava.svg'} width={50} onClick={handleDropdownToggle} />
                {isDropdownVisible && (
                    <div className="dropdown-content">
                        <div><Link to={'/login'} className={'links'}>User</Link></div>
                        <div><Link className="link" to="/register">Create an account</Link></div>
                        <div><Link className="link" to="/logout">Log out</Link></div>
                    </div>
                )}
                <div>User</div>
            </div>

        </div>
    );
}

export default Header;


