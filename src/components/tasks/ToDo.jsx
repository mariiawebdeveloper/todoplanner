import React, {useState} from 'react';
import './tod.css';

function ToDo({ todo, setTodo, currentCard, setCurrentCard }) {
    const [edit, setEdit] = useState(null);
    const [value, setValue] = useState('');

    function dragStartHandler(e, item) {
        setCurrentCard(item);
    }

    function dragEndHandler(e) {}

    function dragOverHandler(e) {
        e.preventDefault();
    }

    function dropHandler(e, targetStatus) {
        e.preventDefault();
        setTodo((prevTodo) => {
            return prevTodo.map((card) => {
                if (card.id === currentCard.id) {
                    return {...card, status: targetStatus};
                } else if (card.id === currentCard.id) {
                    let item;
                    return {...card, order: item.order};
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

    function deleteTodo(id) {
        let newTodo = [...todo].filter((item) => item.id !== id);
        setTodo(newTodo);
    }

    function statusTodo(id) {
        const transitionTime = 2000;
        const interval = 100;

        const steps = transitionTime / interval;
        const initialOrder = todo.find((item) => item.id === id).order;

        let currentStep = 0;

        const intervalId = setInterval(() => {
            setTodo((prevTodo) => {
                const updatedTodo = prevTodo.map((item) => {
                    if (item.id === id) {
                        const newOrder = initialOrder + (currentStep / steps);
                        return { ...item, order: newOrder };
                    }
                    return item;
                });
                return updatedTodo;
            });

            currentStep++;

            if (currentStep >= steps) {
                clearInterval(intervalId);

                setTodo((prevTodo) => {
                    const updatedTodo = prevTodo.map((item) => {
                        if (item.id === id) {
                            return { ...item, status: 'done', order: initialOrder + 1 };
                        }
                        return item;
                    });
                    return updatedTodo;
                });
            }
        }, interval);
    }

    function editTodo(id, title) {
        setEdit(id);
        setValue(title);
    }

    function saveTodo(id) {
        let newTodo = [...todo].map((item) => {
            if (item.id === id) {
                item.title = value;
            }
            return item;
        });
        setTodo(newTodo);
        setEdit(null);
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
                    className={item.status === true ? 'item-active' : 'item-closed'}
                >
                    <div className='item-location'>
                        {edit === item.id ? (
                            <div>
                                <input value={value} onChange={(e) => setValue(e.target.value)} />
                            </div>
                        ) : (
                            <div>{item.title} </div>
                        )}
                        <div>{`Task is ${item.status === 'to do' ? 'todo' : item.status}`}</div>
                        <div>{`Deadline: ${item.deadline}`}</div>
                    </div>
                    {edit === item.id ? (
                        <div>
                            <button onClick={() => saveTodo(item.id)}>Ok</button>
                        </div>
                    ) : (
                        <div className='button-location'>
                            <button onClick={() => deleteTodo(item.id)}>DELETE</button>
                            <button onClick={() => statusTodo(item.id)}>Change status</button>
                            <button onClick={() => editTodo(item.id, item.title)}>EDIT</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ToDo;