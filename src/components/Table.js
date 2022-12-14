import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
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
  }).isRequired,
};

export default connect(mapStateToProps)(Table);
