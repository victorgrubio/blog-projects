import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import App from './App';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        goals: [],
      }),
    ok: true,
  })
);

describe('App component', () => {
  it('renders without errors', () => {
    render(<App />);
  });

  it('fetches and displays goals', async () => {
    const mockGoals = [
      {
        id: 1,
        text: 'Goal 1',
      },
      {
        id: 2,
        text: 'Goal 2',
      },
    ];

    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            goals: mockGoals,
          }),
        ok: true,
      })
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Goal 1')).toBeTruthy();
    });
  });

  it('adds a new goal', async () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText('Enter your goal');
    const addButton = screen.getByText('Add Goal');

    fireEvent.change(inputElement, { target: { value: 'New Goal' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('New Goal')).toBeTruthy();
    });
  });
});
