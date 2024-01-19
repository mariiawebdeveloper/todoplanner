import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
    return (
        <div className="menu-container">
            <div className="logo-container">
                <img src={'/лого.svg'} alt="Logo" />
            </div>

            <div>
                <Link to={'/'} className={'links'}>Main</Link>
            </div>

            <div className="avatar-links">
                <div>
                    <Link to={'/'}>
                        <img src={'/Home.svg'} width={35} height={40} alt="User Avatar" />
                    </Link>
                </div>
                <div>
                    <Link to={'/profile'}>
                        <img src={'/Vector2.svg'} width={35} height={40} alt="User Avatar" />
                    </Link>
                </div>
                <div>
                    <Link to={'/profile'}>
                        <img src={'/material-symbols-light_notifications-outline.svg'} width={35} height={40} alt="User Avatar" />
                    </Link>
                </div>
                <div>
                    <Link to={'/profile'}>
                        <img src={'/Vector (1).svg'} width={35} height={40} alt="User Avatar" />
                    </Link>
                </div>
                <div>
                    <Link to={'/profile'}>
                        <img src={'/Vector (2).svg'} width={35} height={40} alt="User Avatar" />
                    </Link>
                </div>
                <div>
                    <Link to={'/profile'}>
                        <img src={'/Vector (3).svg'} width={35} height={40} alt="User Avatar" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Menu;
