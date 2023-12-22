import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div>
            <div><Link to={'/main'}  className={'links'}>Main</Link></div>
            <div><Link to={'/login'} className={'links'}>User</Link></div>
            <div><Link to={'/todo'} className={'links'}>ToDo</Link></div>


        </div>
    );
}

export default Header;