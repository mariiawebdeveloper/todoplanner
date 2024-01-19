import React, { useState, useEffect } from 'react';
import AddToDoModal from './AddTodoModal';
import ToDo from './ToDo';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import './todo.css';

function TaskPage() {
    const [cookies] = useCookies(['username']);
    const [todo, setTodo] = useState([]);
    const [currentCard, setCurrentCard] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);




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

        axios
            .get(`http://localhost:8080/todos?username=${cookies.username}`)
            .then((response) => {
                setTodo(response.data);
            })
            .catch((error) => {
                console.error('error', error);
            });
    }

    function dropHandler(e, targetStatus) {
        e.preventDefault();
        if (currentCard) {
            dragEndHandler(e, targetStatus);
            const updatedTodo = Array.isArray(todo)
                ? todo.map((item) => (item.id === currentCard.id ? { ...item, status: targetStatus } : item))
                : [];
            setTodo(updatedTodo);
        }
    }

    function dragEndHandler(e, status) {
        try {
            console.log('hui', status)
            axios.put(`http://localhost:8080/todos/${currentCard.trueId}`, { status: status });

            setTodo((prevTodo) => {
                return prevTodo.map((card) => {
                    if (card === undefined) {
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

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <div className="todo-cont">
            {cookies.username ? (
                <>
                    <div onClick={handleModalOpen}>+</div>
                    {isModalOpen && <AddToDoModal setTodo={setTodo} onClose={handleModalClose} />}
                    <div className="main-location" onDragOver={(e) => e.preventDefault()} onDrop={(e) => dropHandler(e, 'to do')}>
                        <div>To do list</div>
                        <div className="item">
                            <ToDo todo={toDoTasks} setTodo={setTodo} currentCard={currentCard} setCurrentCard={setCurrentCard} />
                        </div>
                    </div>
                    <div className="main-location" onDragOver={(e) => e.preventDefault()} onDrop={(e) => dropHandler(e, 'in progress')}>
                        <div>Progress list</div>
                        <div className="item">
                            <ToDo todo={inProcessTasks} setTodo={setTodo} currentCard={currentCard} setCurrentCard={setCurrentCard} />
                        </div>
                    </div>
                    <div className="main-location" onDragOver={(e) => e.preventDefault()} onDrop={(e) => dropHandler(e, 'done')}>
                        <div>Done list</div>
                        <div className="item">
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
