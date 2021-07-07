import React, { useState } from 'react';
import ToDo from './ToDo';
import ToDoListForm from './ToDoListForm';
import './ToDoList.css';

const ToDoList = () => {

    const [ toDos, setToDos ] = useState([]);

    const addToDo = (newToDo) => {
        setToDos(toDos => [...toDos, newToDo]);
    }

    const removeToDo = (toDoId) => {
        setToDos(toDos.filter(toDo => toDo.id !== toDoId));
    }

    const editToDo = (toDoId, data) => {
        setToDos(toDos.map(toDo => {
            if (toDo.id === toDoId) {
                toDo.toDo = data;
            }
            return toDo;
        }))
    }

    return (
        <div className="list">
            <h1>ToDo List</h1>
            <ToDoListForm addToDo={ addToDo } />
            <div>
                {toDos.map(({ id, task }) => 
                    <ToDo 
                        key={id} 
                        id={id} 
                        task={task}
                        removeToDo={removeToDo}
                        editToDo={editToDo}
                    />
                )}
            </div>
        </div>
    )
}

export default ToDoList;