import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {useCookies} from "react-cookie";

function AddToDoList({ setTodo, status, navigate }) {
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState('');
    const [cookies, setCookie] = useCookies(['username']);

    const saveTodo = async () => {
        setTodo((prevTodo) => [
            ...prevTodo,
            {
                id: uuidv4(),
                title: title,
                status: 'to do',
                order: prevTodo.length,
                deadline: deadline,
                username: cookies.username
            },
        ]);

        try {
            const response = await fetch('http://localhost:8080/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    status,
                    deadline,
                    username: cookies.username
                }),
            });

            if (response.ok) {
               console.log('myyyyyyAAAAAWWWWW')
            }

            console.log(response);
        } catch (error) {
            console.error('Error:', error);
        }

        setTitle('');
        setDeadline('');
    };

    return (
        <div>
            <form onSubmit={saveTodo}>
                <input
                    type="text"
                    placeholder="Create new task"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Deadline"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
                <button type="submit">SAVE</button>
            </form>
        </div>
    );
}

export default AddToDoList;
