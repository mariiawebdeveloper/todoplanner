import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuid using v4 alias

function AddToDoList({ todo, setTodo }) {
    const [value, setValue] = useState('');

    function saveTodo() {
        setTodo((prevTodo) => [
            ...prevTodo,
            {
                id: uuidv4(),
                order: prevTodo.length,
                title: value,
                status: 'to do',

            }
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
