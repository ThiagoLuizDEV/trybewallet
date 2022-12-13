import { screen } from '@testing-library/react';
import React from 'react';
import Header from '../components/Header';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Header', () => {
  test(' verifica o header', () => {
    renderWithRouterAndRedux(<Header />);
    const email = screen.getByTestId('email-field');
    expect(email).toBeInTheDocument();

    const value = screen.getByTestId('total-field');
    expect(value).toBeInTheDocument();

    const moeda = screen.getByTestId('header-currency-field');
    expect(moeda).toBeInTheDocument();
  });
});
