import React from 'react';
import { render } from '@testing-library/react';
import ToDoListForm from './ToDoListForm';

it('renders a ToDoListForm without crashing', () => {
    render(<ToDoListForm />);
});

it('matches a ToDoListForm snapshot', () => {
    const { asFragment } = render(<ToDoListForm />);
    expect(asFragment()).toMatchSnapshot();
});