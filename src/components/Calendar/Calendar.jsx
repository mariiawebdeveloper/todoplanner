import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import 'react-calendar/dist/Calendar.css';
import axios from "axios";
import { useCookies } from 'react-cookie';

function MyApp() {
    const [todo, setTodo] = useState(null);
    const [cookies] = useCookies(['username']);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, [cookies.username]);

    function fetchTodos() {
        const postData = {
            username: cookies.username,
        };

        axios
            .get(`http://localhost:8080/todos?username=${cookies.username}`)
            .then((response) => {
                setTodo(response.data);
            })
            .catch((error) => {
                console.error('error', error);
            });
    }

    function getDate() {
        if (todo === null) {
            return [];
        }
        return todo.map(e => new Date(e.deadline));
    }

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    function isTargetDate(date) {
        return getDate().some(targetDate => formatDate(date) === formatDate(targetDate));
    }

    function tileClassName({ date, view }) {
        if (view === 'month' && isTargetDate(date)) {
            return 'highlighted-date';
        }
        return '';
    }

    return (
        <div className={'calendar-container'}>
            <Calendar
                tileClassName={tileClassName}
            />
        </div>
    );
}

export default MyApp;
