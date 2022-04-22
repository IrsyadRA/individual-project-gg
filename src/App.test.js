import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import { Provider } from 'react-redux';
import store from './global_state/store'
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

test('renders learn react link', () => {
  render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>);
  const linkElement = screen.getByRole('button', {
    name: /login spotify/i
  })
  expect(linkElement).toBeInTheDocument();

  userEvent.click(linkElement)
  const btnElement = screen.getByRole('button', {
    name: /Login Spotify/i
  })
  expect(btnElement).toBeInTheDocument();
});
