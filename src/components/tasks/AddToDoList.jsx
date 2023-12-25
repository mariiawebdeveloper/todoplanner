import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function AddToDoList({ todo, setTodo }) {
    const [value, setValue] = useState('');
    const [deadline, setDeadline] = useState('');

    function saveTodo() {
        setTodo((prevTodo) => [
            ...prevTodo,
            {
                id: uuidv4(),
                order: prevTodo.length,
                title: value,
                status: 'to do',
                deadline: deadline,

            }
        ]);
        setValue('');
        setDeadline('');
    }

    return (
        <div>
            <input
                placeholder="Create new task"
                value={value}
                onChange={(e) => setDeadline(e.target.value)}
            />
            <button onClick={saveTodo}>SAVE</button>
        </div>
    );
}

export default AddToDoList;
