import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ToDoList from './ToDoList';

function addTodo(toDoList, task='my test task') {
    const toDoInput = toDoList.getByLabelText('Task:');
    fireEvent.change(toDoInput, { target: { value: task }});
    const addBtn = toDoList.getByText('Add');
    fireEvent.click(addBtn);
}

it('renders a ToDoList without crashing', () => {
    render(<ToDoList />);
});

it('matches a ToDoList snapshot', () => {
    const { asFragment } = render(<ToDoList />);
    expect(asFragment()).toMatchSnapshot();
});

it('can add a new todo', () => {
    const toDoList = render(<ToDoList />);
    addTodo(toDoList);

    //expect new todo form is reset
    expect(toDoList.getByLabelText('Task:')).toHaveValue('');
    
    //expect new todo is in the DOM
    expect(toDoList.getByText('my test task')).toBeInTheDocument();
    expect(toDoList.getByText('Mark as completed')).toBeInTheDocument();
    expect(toDoList.getByText('Edit')).toBeInTheDocument();
    expect(toDoList.getByText('X')).toBeInTheDocument();
});

it('can edit a todo', () => {
    const toDoList = render(<ToDoList />);
    addTodo(toDoList);

    //confirm the new todo is in the document
    expect(toDoList.queryByText('my test task')).toBeInTheDocument();

    //click the edit button
    fireEvent.click(toDoList.getByText('Edit'));

    //modify the input
    const toDoInput = toDoList.getByDisplayValue('my test task');
    fireEvent.change(toDoInput, { target: { value: 'new test value' }});
    fireEvent.click(toDoList.getByText('Update'));

    //expect only the new todo text
    expect(toDoList.queryByText('my test task')).not.toBeInTheDocument();
    expect(toDoList.getByText('new test value')).toBeInTheDocument();
});

it('can delete a todo', () => {
    const toDoList = render(<ToDoList />);
    addTodo(toDoList);

    //confirm the new todo is in the document
    expect(toDoList.queryByText('my test task')).toBeInTheDocument();

    //click the delete button
    fireEvent.click(toDoList.getByText('X'));

    //expect the todo is now deleted
    expect(toDoList.queryByText('my test task')).not.toBeInTheDocument();
});

it('can toggle a todo complete', () => {
    const toDoList = render(<ToDoList />);
    addTodo(toDoList);

    //confirm the new todo is in the document
    expect(toDoList.queryByText('my test task')).toBeInTheDocument();

    //click the toggle mark complete button
    fireEvent.click(toDoList.getByText('Mark as completed'));

    //confirm todo is crossed out
    expect(toDoList.queryByText('my test task')).toHaveStyle({'text-decoration': 'line-through'});

});

it('can untoggle a completed todo', () => {
    const toDoList = render(<ToDoList />);
    addTodo(toDoList);

    //confirm the new todo is in the document
    expect(toDoList.queryByText('my test task')).toBeInTheDocument();

    //toggle the todo completed and confirm style is applied
    fireEvent.click(toDoList.getByText('Mark as completed'));
    expect(toDoList.queryByText('my test task')).toHaveStyle({'text-decoration': 'line-through'});

    //click the todo completed again and confirm the style is removed
    fireEvent.click(toDoList.getByText('Mark as completed'));
    expect(toDoList.queryByText('my test task')).not.toHaveStyle({'text-decoration': 'line-through'});
});