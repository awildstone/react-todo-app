import React, { useState } from 'react';
import './ToDo.css';

const ToDo = ({id, task, removeToDo, editToDo }) => {
    const [editTask, setEditTask] = useState(task);
    const [isEditing, setIsEditing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const toggleEdit = () => {
        setIsEditing(edit => !edit);
    };

    const handleEdit = (evt) => {
        setEditTask(evt.target.value);
    };

    const handleUpdate = (evt) => {
        evt.preventDefault();
        editToDo(id, editTask);
        setIsEditing(false);
    };

    const handleDelete = () => {
        removeToDo(id);
    }

    const toggleComplete = () => {
        setIsComplete(done => !done);
    }

    let strikeTask = <span style={ {textDecoration: 'line-through'} }>{editTask}</span>;

    let toDoJsx = ( 
        <div className="task" data-testid={id}>
            {isComplete ? strikeTask : editTask}
            <div className="buttons">
                <button className="update" onClick={toggleComplete}>Mark as completed</button>
                <button className="edit" onClick={toggleEdit}>Edit</button>
                <button className="delete" onClick={handleDelete}>X</button>
            </div>
        </div>
    );

    if (isEditing) {
        toDoJsx = (
            <div className="task-form">
                <form onSubmit={handleUpdate}>
                    <input type="text" value={editTask} onChange={handleEdit} />
                    <button className="save">Update</button>
                </form>
            </div>
      )
    }

    return toDoJsx;
}

export default ToDo;