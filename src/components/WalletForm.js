import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencie, sendExpenses } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencie());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { dispatch } = this.props;
    const { wallet: { expenses } } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;

    const Obj = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: data,
    };
    const arrayCompleted = [...expenses, Obj];
    dispatch(sendExpenses(arrayCompleted));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { wallet: { currencies } } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="valorDaDespesa">
            valor da despesa:
            <input
              type="number"
              data-testid="value-input"
              onChange={ this.handleChange }
              value={ value }
              name="value"
            />
          </label>
          <label htmlFor="descriçãoDaDespesa">
            descrição da despesa:
            <input
              type="text"
              data-testid="description-input"
              onChange={ this.handleChange }
              value={ description }
              name="description"
            />
          </label>
          <label htmlFor="despesaDaMoeda">
            moeda:
            <select
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ currency }
              name="currency"
            >
              { currencies.map((moeda) => <option key={ moeda }>{ moeda }</option>) }
            </select>
          </label>
          <label htmlFor="metodoDePagamento">
            metodo de pagamento:
            <select
              data-testid="method-input"
              onChange={ this.handleChange }
              value={ method }
              name="method"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categoria">
            categoria:
            <select
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ tag }
              name="tag"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ () => this.handleClick() }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  wallet: state.wallet,
});
WalletForm.propTypes = {
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  }).isRequired,

  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
