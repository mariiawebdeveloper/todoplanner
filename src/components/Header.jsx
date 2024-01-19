import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CalendarPopup from './Calendar'; // Предположим, что у вас есть компонент с календарем

function Header() {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isCalendarOpen, setCalendarOpen] = useState(false);

    const handleDropdownToggle = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const handleCalendarToggle = () => {
        setCalendarOpen(!isCalendarOpen);
    };

    return (
        <div className="header">
            <div><Link to={'/'} className={'links'}>Plannuyou</Link></div>
            <div><Link to={'/todo'} className={'links'}>Board</Link></div>
            <div onClick={handleCalendarToggle} className={'links'}>Calendar</div>
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

            {isCalendarOpen && <CalendarPopup onClose={handleCalendarToggle} />}
        </div>
    );
}

export default Header;
