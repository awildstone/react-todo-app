import React from 'react';
import { render } from '@testing-library/react';
import ToDo from './ToDo';

it('renders a ToDo without crashing', () => {
    render(<ToDo />);
});

it('matches a ToDo snapshot', () => {
    const { asFragment } = render(<ToDo />);
    expect(asFragment()).toMatchSnapshot();
});