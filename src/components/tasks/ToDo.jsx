import React, { useState } from 'react';
import './todo.css';
import axios from 'axios';

function ToDo({ todo, setTodo, currentCard, setCurrentCard }) {
    const [edit, setEdit] = useState(null);
    const [value, setValue] = useState('');
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    async function deleteTodo(id) {
        try {
            await axios.delete(`http://localhost:8080/todos/${id}`);
            setTodo((prevTodo) => prevTodo.filter((item) => item.trueId !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    }

    function dragStartHandler(e, item) {
        setCurrentCard(item);
    }

    function dragEndHandler(e) {
        try {
            axios.put(`http://localhost:8080/todos/${currentCard.trueId}`, {
                status: 'in progress',
            });
            setTodo((prevTodo) => {
                return prevTodo.map((card) => {
                    if (card.id === currentCard.id) {
                        return { ...card, status: 'in progress' };
                    }
                    return card;
                });
            });
        } catch (error) {
            console.error('Error updating todo status:', error);
        }
    }

    function dragOverHandler(e) {
        e.preventDefault();
    }

    function dropHandler(e, targetStatus) {
        e.preventDefault();
        setTodo((prevTodo) => {
            return prevTodo.map((card) => {
                if (card.id === currentCard.id) {
                    return { ...card, status: targetStatus };
                }
                return card;
            });
        });
    }

    const sortCards = (itemA, itemB) => {
        if (itemA.order > itemB.order) {
            return 1;
        } else {
            return -1;
        }
    };

    function editTodo(id, title) {
        setEdit(id);
        setValue(title);
    }

    async function saveTodo(id) {
        let currentTodo = todo.find((item) => item.trueId === id);
        const { trueId, status, order, deadline, username } = currentTodo;

        try {
            await axios.put(`http://localhost:8080/todos/${trueId}`, {
                title: value,
                status,
                order,
                deadline,
                username,
            });
            setTodo((prevTodo) => {
                return prevTodo.map((item) => {
                    if (item.trueId === id) {
                        return { ...item, title: value };
                    }
                    return item;
                });
            });
            setEdit(null);
            setValue('');
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    }

    return (
        <div>
            {todo.sort(sortCards).map((item) => (
                <div
                    key={item.id}
                    draggable={true}
                    onDragStart={(e) => dragStartHandler(e, item)}
                    onDragLeave={(e) => dragEndHandler(e)}
                    onDragEnd={(e) => dragEndHandler(e)}
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => dropHandler(e, 'to do')}
                >
                    <div className='item-location'>
                        {edit === item.trueId ? (
                            <div>
                                <input
                                    value={value ? value : ''}
                                    onChange={(e) => {
                                        setValue(e.target.value);
                                        console.log(e.target.value);
                                    }}
                                />
                            </div>
                        ) : (
                            <div className={'todo-loc-dots'}>
                                <div>{item.title}</div>
                            <div className={'todo-loc'}>
                                <div className={'dots'} onClick={() => setDropdownVisible(!isDropdownVisible)}>...</div>
                                {isDropdownVisible && (
                                    <div className="button-dropdown">
                                        <button onClick={() => deleteTodo(item.trueId)}>DELETE</button>
                                        <button onClick={() => editTodo(item.trueId)}>EDIT</button>
                                    </div>
                                )}
                            </div>
                            </div>
                        )}
                        <div>{`Task is ${item.status === 'to do' ? 'todo' : item.status}`}</div>
                        <div>{`Deadline: ${item.deadline}`}</div>
                    </div>
                    {edit === item.trueId ? (
                        <div>
                            <button onClick={() => saveTodo(item.trueId)}>Ok</button>
                        </div>
                    ) : null}
                </div>
            ))}
        </div>
    );
}

export default ToDo;
