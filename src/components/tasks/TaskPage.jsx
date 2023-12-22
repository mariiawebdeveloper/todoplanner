import React, { useState } from 'react';
import AddToDoList from "./AddToDoList";
import ToDo from "./ToDo";

function TaskPage() {
    const [todo, setTodo] = useState([
        {
            id: 2,
            order: 1,
            title: 'second todo',
            status: 'to do',
        },
        {
            id: 1,
            order: 0,
            title: 'first todo',
            status: 'to do',
        },
        {
            id: 3,
            order: 2,
            title: 'third todo',
            status: 'in process',
        },
        {
            id: 4,
            order: 1,
            title: 'four todo',
            status: 'done',
        },
    ]);

    const [currentCard, setCurrentCard] = useState(null);

    const toDoTasks = todo.filter((task) => task.status === 'to do');
    const inProcessTasks = todo.filter((task) => task.status === 'in process');
    const doneTasks = todo.filter((task) => task.status === 'done');

    console.log("To Do Tasks:", toDoTasks);
    console.log("ToDo Props:", todo);

    function dropHandler(e, targetStatus) {
        e.preventDefault();
        if (currentCard) {
            const updatedTodo = todo.map((item) => {
                if (item.id === currentCard.id) {
                    return { ...item, status: targetStatus };
                }
                return item;
            });
            setTodo(updatedTodo);
        }
    }

    return (
        <div className={'todo-cont'}>
            <AddToDoList todo={toDoTasks} setTodo={setTodo} status="to do" />
            <div className='main-location' onDragOver={(e) => e.preventDefault()} onDrop={(e) => dropHandler(e, 'to do')}>
                <div> To do list</div>
                <div className='item'>
                    <ToDo todo={toDoTasks} setTodo={setTodo} currentCard={currentCard} setCurrentCard={setCurrentCard} />
                </div>
            </div>
            <div className='main-location' onDragOver={(e) => e.preventDefault()} onDrop={(e) => dropHandler(e, 'in process')}>
                <div> Process list</div>
                <div className='item'>
                    <ToDo todo={inProcessTasks} setTodo={setTodo} currentCard={currentCard} setCurrentCard={setCurrentCard} />
                </div>
            </div>
            <div className='main-location' onDragOver={(e) => e.preventDefault()} onDrop={(e) => dropHandler(e, 'done')}>
                <div> Done list</div>
                <div className='item'>
                    <ToDo todo={doneTasks} setTodo={setTodo} currentCard={currentCard} setCurrentCard={setCurrentCard} />
                </div>
            </div>
        </div>
    );
}

export default TaskPage;