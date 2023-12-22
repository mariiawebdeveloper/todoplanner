import React, {useState} from 'react';
import AddToDoList from "./AddToDoList";
import ToDo from "./ToDo";

function TaskPage() {
    const [todo, setTodo] = useState([
        {
            id: 2,
            order: 1,
            title: 'second todo',
            status: true
        },
        {
            id: 1,
            order: 0,
            title: 'first todo',
            status: true
        },

        {
            id: 3,
            order: 2,
            title: 'third todo',
            status: false
        }
    ])
    const [currentCard, setCurrentCard] = useState(null)

    return (
        <div className={'todo-cont'}>
            <div className='main-location'>
                <div className='item'>
                    <AddToDoList todo={todo} setTodo={setTodo}/>
                    <ToDo todo={todo} setTodo={setTodo} currentCard={currentCard} setCurrentCard={setCurrentCard}/>
                </div>

            </div>
            <div className='main-location'>
                <div className='item'>
                    <ToDo todo={todo} setTodo={setTodo} currentCard={currentCard} setCurrentCard={setCurrentCard}/>
                </div>

            </div>
            <div className='main-location'>
                <div className='item'>
                    <ToDo todo={todo} setTodo={setTodo} currentCard={currentCard} setCurrentCard={setCurrentCard}/>
                </div>

            </div>

        </div>
    );
}

export default TaskPage;