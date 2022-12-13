import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Login', () => {
  test(' mostra na pagina os campos de login', () => {
    renderWithRouterAndRedux(<Login />);
    const email = screen.getByTestId('email-input');
    expect(email).toBeInTheDocument();

    const password = screen.getByTestId('password-input');
    expect(password).toBeInTheDocument();

    const button = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(button).toBeInTheDocument();
  });

  test('testa a funcionalidade do button', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(button.disabled).toBe(true);

    userEvent.type(email, 'alguem@alguem.com');
    userEvent.type(password, '123456');
    userEvent.click(button);
    expect(button.disabled).toBe(false);
  });
});
