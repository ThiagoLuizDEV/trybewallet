import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendExpenses } from '../redux/actions';

class Table extends Component {
  handleClick = (id) => {
    const { dispatch, wallet: { expenses } } = this.props;
    const spending = expenses.filter((event) => event.id !== id);
    dispatch(sendExpenses(spending));
  };

  render() {
    const { wallet: { expenses } } = this.props;
    return (
      <table>
        <tr>
          <th>
            Descrição
          </th>
          <th>
            Tag
          </th>
          <th>
            Método de pagamento
          </th>
          <th>
            Valor
          </th>
          <th>
            Moeda
          </th>
          <th>
            Câmbio utilizado
          </th>
          <th>
            Valor convertido
          </th>
          <th>
            Moeda de conversão
          </th>
          <th>
            Editar/Excluir
          </th>
        </tr>

        <tbody>
          {
            expenses.map((desp) => {
              const test = Object.entries(desp.exchangeRates)
                .find((event) => event[0] === desp.currency);
              return (
                <tr key={ desp.id }>
                  <td>
                    { desp.description }
                  </td>
                  <td>
                    {desp.tag}
                  </td>
                  <td>
                    {desp.method}
                  </td>
                  <td>
                    {parseFloat(desp.value).toFixed(2)}
                  </td>
                  <td>
                    {test[1].name}
                  </td>
                  <td>
                    {parseFloat(test[1].ask).toFixed(2)}
                  </td>
                  <td>
                    {parseFloat(test[1].ask * desp.value).toFixed(2)}
                  </td>
                  <td>
                    BRL
                  </td>
                  <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => {
                        this.handleClick(desp.id, (desp.value * test.ask));
                      } }
                    >
                      excluir
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

Table.propTypes = {
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    value: PropTypes.number.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
