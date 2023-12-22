import React, {useState} from 'react';
import * as uuid from "uuid";


function AddToDoList({todo, setTodo}) {

    const [value, setValue] = useState('')
    function saveTodo() {

        setTodo(
            [...todo, {
                id: uuid.v4(),
                title: value,
                status: true,
                order: todo.length
            }]
        )
        setValue('')

    }

    return (
        <div>
            <input placeholder='Create new task' value={value} onChange={(e) => setValue(e.target.value)}/>
            <button onClick={saveTodo}>SAVE</button>
        </div>
    );
}

export default AddToDoList;