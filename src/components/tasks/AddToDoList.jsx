import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function AddToDoList({ todo, setTodo, status }) {
    const [value, setValue] = useState('');

    function saveTodo() {
        setTodo((prevTodo) => [
            ...prevTodo,
            {
                id: uuidv4(),
                title: value,
                status: status,
                order: prevTodo.length,
                date: new Date().toLocaleString(),
            },
        ]);
        setValue('');
    }

    return (
        <div>
            <input
                placeholder="Create new task"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={saveTodo}>SAVE</button>
        </div>
    );
}

export default AddToDoList;
