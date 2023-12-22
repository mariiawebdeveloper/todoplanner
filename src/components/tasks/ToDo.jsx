import React, {useState} from 'react';
import './tod.css'

function ToDo({todo, setTodo, currentCard, setCurrentCard}) {
    const [edit, setEdit] = useState(null)
    const [value, setValue] = useState('')

    function dragStartHandler(e, item) {
        setCurrentCard(item)
    }

    function dragEndHandler(e) {


    }

    function dragOverHandler(e) {
        e.preventDefault()

    }

    function dropHandler(e, item) {
        e.preventDefault()
        setTodo(todo.map(card => {
            if (card.id === item.id) {
                return {...card, order: currentCard.order}
            } else if (card.id === currentCard.id) {
                return {...card, order: item.order}
            }
            return card
        }))
    }
/**
 * sort cards*/
    const sortCards = (itemA, itemB) => {
        if (itemA.order > itemB.order) {
            return 1
        } else {
            return -1
        }
    }

    function deleteTodo(id) {
        let newTodo = [...todo].filter(item => item.id !== id)
        setTodo(newTodo)
    }

    function statusTodo(id) {
        let newTodo = [...todo].filter(item => {
            if (item.id === id) {
                item.status = !item.status
                console.log(todo)
            }
            return item
        })
        setTodo(newTodo)

    }

    function editTodo(id, title) {
        setEdit(id)
        setValue(title)

    }

    function saveTodo(id) {

        let newTodo = [...todo].map(item => {
            if (item.id === id) {
                item.title = value
            }
            return item
        })
        setTodo(newTodo)
        setEdit(null)
    }



    return (
        <div>{
            todo.sort(sortCards).map(item => (

                    <div draggable={true}
                         onDragStart={(e) => dragStartHandler(e, item)}
                         onDragLeave={(e) => dragEndHandler(e)}
                         onDragEnd={(e) => dragEndHandler(e)}
                         onDragOver={(e) => dragOverHandler(e)}
                         onDrop={(e) => dropHandler(e, item)}
                         className={item.status === true ? 'item-active' : 'item-closed'} key={item.id}>
                        <div className='item-location'>{
                            edit === item.id ?
                                <div>
                                    <input value={value} onChange={(e) => setValue(e.target.value)}/>
                                </div> : <div>{item.title} </div>
                        }
                            {
                                item.status === true ? <div>task is active</div> : <div>task is closed</div>
                            }
                        </div>
                        {
                            edit === item.id ? <div>
                                <button onClick={() => saveTodo(item.id)}>Ok</button>
                            </div> : <div className='button-location'>
                                <button onClick={() => deleteTodo(item.id)}>DELETE</button>
                                <button onClick={() => statusTodo(item.id)}>OPEN/CLOSE</button>
                                <button onClick={() => editTodo(item.id, item.title)}>EDIT</button>
                            </div>
                        }


                    </div>
                )
            )
        }
        </div>
    );
}

export default ToDo;