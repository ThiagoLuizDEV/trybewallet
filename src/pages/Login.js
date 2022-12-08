import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: 0,
      block: true,
    };
  }

  verificaSenha = () => {
    const { email, password } = this.state;
    const total = 6;
    const validacaoEmail = /[^@ \n]+@[^@ \n]+\.[^@ \n]/;
    if (validacaoEmail.test(email) && password.length >= total) {
      this.setState({ block: false });
    } else { this.setState({ block: true }); }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => { this.verificaSenha(); });
  };

  handleClick = (event) => {
    event.preventDefault();
    const { handleLogin, history } = this.props;
    const { email } = this.state;
    handleLogin(email);
    history.push('/carteira');
  };

  render() {
    const { email, password, block } = this.state;
    return (
      <form onSubmit={ this.handleClick }>
        <input
          name="email"
          type="email"
          value={ email }
          onChange={ this.handleChange }
          data-testid="email-input"
        />
        <input
          onChange={ this.handleChange }
          name="password"
          type="password"
          value={ password }
          data-testid="password-input"
        />
        <button
          type="submit"
          disabled={ block }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  handleLogin: PropTypes.string,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (email) => dispatch(login(email)),
});
export default connect(null, mapDispatchToProps)(Login);
