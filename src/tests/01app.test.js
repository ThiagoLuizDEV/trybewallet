import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('App', () => {
  test('renderizar a tela', () => {
    renderWithRouterAndRedux(<App />);
  });
});
