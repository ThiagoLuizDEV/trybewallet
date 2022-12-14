// Coloque aqui suas actions

export const USER = 'USER';
export const user = (payload) => ({
  type: USER,
  payload,
});

export const SEND_EXPENSES = 'SEND_EXPENSES';
export const sendExpenses = (expenses) => ({
  type: SEND_EXPENSES,
  payload: {
    expenses,
  },
});

export const TOTAL_VALUE = 'TOTAL_VALUE';
export const totalValue = (value) => ({
  type: TOTAL_VALUE,
  payload: {
    value,
  },
});

export const CURRENCIES = 'CURRENCIES';
export const Currencies = () => ({
  type: CURRENCIES,
});

export const CURRENCIES_SUCESS = 'CURRENCIES_SUCESS';
const currencieSucess = (moedas) => ({
  type: CURRENCIES_SUCESS,
  payload: {
    currencies: Object.keys(moedas),
  },
});

export const CURRENCIES_ERROR = 'CURRENCIES_ERROR';
const currencieError = (error) => ({
  type: CURRENCIES_ERROR,
  payload: {
    error,
  },
});

export const fetchCurrencie = () => async (dispatch) => {
  dispatch(Currencies());
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    dispatch(currencieSucess(data));
  } catch (error) {
    dispatch(currencieError(error));
  }
};
export const DELETE = 'DELETE';
export const buttonDelete = (id) => ({
  type: DELETE,
  payload: id,
});
