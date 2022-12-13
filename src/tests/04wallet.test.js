import { screen } from '@testing-library/react';
import React from 'react';
import WalletForm from '../components/WalletForm';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('WalletForm', () => {
  test('verifica os campos do walletForm', () => {
    renderWithRouterAndRedux(<WalletForm />);

    const despesa = screen.getByTestId('value-input');
    expect(despesa).toBeInTheDocument();

    const describe = screen.getByTestId('description-input');
    expect(describe).toBeInTheDocument();

    const moeda = screen.getByTestId('currency-input');
    expect(moeda).toBeInTheDocument();

    const pagamento = screen.getByTestId('method-input');
    expect(pagamento).toBeInTheDocument();

    const categoria = screen.getByTestId('tag-input');
    expect(categoria).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(button).toBeInTheDocument();
  });
});
