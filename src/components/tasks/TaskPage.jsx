import React, { useState, useEffect } from 'react';
import AddToDoList from "./AddToDoList";
import ToDo from "./ToDo";
import { useCookies } from "react-cookie";
import axios from "axios";
import './tod.css';

function TaskPage() {
    const [cookies, setCookie] = useCookies(['username']);
    const [todo, setTodo] = useState([]);
    const [currentCard, setCurrentCard] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, [cookies.username]);

    const toDoTasks = Array.isArray(todo) ? todo.filter((task) => task.status === 'to do') : [];
    const inProcessTasks = Array.isArray(todo) ? todo.filter((task) => task.status === 'in progress') : [];
    const doneTasks = Array.isArray(todo) ? todo.filter((task) => task.status === 'done') : [];

     function fetchTodos() {

        const postData = {
            username: cookies.username,

        };

        axios.get(`http://localhost:8080/todos?username=${cookies.username}`)
            .then(response => {
                console.log('data', response.data);
                setTodo(response.data)


            })
            .catch(error => {
                console.error('error', error);
            });
    }

    function dropHandler(e, targetStatus) {

        e.preventDefault();
        if (currentCard) {
            dragEndHandler(e, targetStatus)
            const updatedTodo = Array.isArray(todo)
                ? todo.map((item) => (item.id === currentCard.id ? { ...item, status: targetStatus } : item))
                : [];
            setTodo(updatedTodo);
        }
        console.log('HHHHHUUUUUUIIIII', todo)

    }

    function dragEndHandler(e, status) {
        try {
            console.log(todo)
            axios.put(`http://localhost:8080/todos/${currentCard.trueId}`, { status: status });
            setTodo((prevTodo) => {
                return prevTodo.map((card) => {
                    console.log(card, currentCard, 'PIZDA')
                    if (card=== undefined){
                        return card;
                    }
                    if (card.id === currentCard.id) {
                        return { ...card, status: status };
                    }
                    return card;
                });
            });
        } catch (error) {
            console.error('Error update status:', error);
        }
    }

    return (
        <div className={'todo-cont'}>
            {cookies.username ? (
                <>
                    <AddToDoList setTodo={setTodo} />
                    <div className='main-location' onDragOver={(e) => e.preventDefault()} onDrop={(e) => dropHandler(e, 'to do')}>
                        <div> To do list</div>
                        <div className='item'>
                            <ToDo todo={toDoTasks} setTodo={setTodo} currentCard={currentCard} setCurrentCard={setCurrentCard} />
                        </div>
                    </div>
                    <div className='main-location' onDragOver={(e) => e.preventDefault()} onDrop={(e) => dropHandler(e, 'in progress')}>
                        <div>Progress list</div>
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
                </>
            ) : (
                <div>You are not logged in</div>
            )}
        </div>
    );
}

export default TaskPage;
