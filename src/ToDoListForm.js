import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import './ToDoListForm.css'

const ToDoListForm = ({ addToDo }) => {
    const INITIAL_STATE = { toDo: ''};

    const [formData, setFormData] = useState('');

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(formData => ({...formData, [name]: value}));
    }
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        addToDo({ id: nanoid(), ...formData });
        evt.target.reset();
        setFormData(INITIAL_STATE);
    }

    return (
        <div className="new-todo">
            <form onSubmit={handleSubmit}>
                <label htmlFor="task">Task: </label>
                <input
                    id="task"
                    type="text"
                    name="task"
                    onChange={handleChange}
                />
                <button className="save">Add</button>
            </form>
        </div>
    )
}

export default ToDoListForm;

