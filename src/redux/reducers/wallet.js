// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  CURRENCIES,
  CURRENCIES_SUCESS,
  CURRENCIES_ERROR,
  SEND_EXPENSES,
  TOTAL_VALUE,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isLoading: false,
  value: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES: {
    return {
      ...state,
      isLoading: true,
    };
  }
  case CURRENCIES_SUCESS: {
    return {
      ...state,
      isLoading: false,
      currencies: action.payload.currencies,
    };
  }
  case CURRENCIES_ERROR: {
    return {
      ...state,
      isLoading: false,
      error: action.payload.error.message || 'Erro',
    };
  }
  case SEND_EXPENSES: {
    return {
      ...state,
      expenses: action.payload.expenses,
      value: action.payload.expenses.reduce(
        (prev, current) => prev
        + (current.value * current.exchangeRates[current.currency].ask
        ),
        0,
      ).toFixed(2),
    };
  }
  case TOTAL_VALUE: {
    return {
      ...state,
      value: action.payload.value,
    };
  }
  default:
    return state;
  }
};
export default wallet;
