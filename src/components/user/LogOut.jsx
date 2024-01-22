import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const LogOutPage = () => {
    const navigate = useNavigate();
    const [, , removeCookie] = useCookies(['username']);

    const handleLogout = () => {
        // Удаление куки
        removeCookie('username');
        // Перенаправление на страницу входа
        navigate('/login');
    };

    return (
        <div>
            <h2>Log Out</h2>
            <p>Are you sure you want to log out?</p>
            <button className={'button'} onClick={handleLogout}>Log Out</button>
        </div>
    );
};

export default LogOutPage;
