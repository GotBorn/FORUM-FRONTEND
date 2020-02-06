import React, { Component } from 'react'
import './AuthScreen.css'
import { login } from './backend'

class AuthScreen extends Component {
  state = {
    error: '',
    login: '',
    password: '',
    clicked: false,
  };

  handleLogin = (event) => {
    this.setState({ login: event.target.value });
  }

  handlePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = async (event) => {
    //здесь будет отправка запроса с логином и паролем
    //alert('Отправленное имя: ' + this.state.value);
    //event.preventDefault();
  }

  onclick = async () => {
    this.setState({ clicked: true, error: "" });
    try {
      let token = await login(this.state.login, this.state.password)
      this.props.onLogin(token);
    }
    catch (error) {
      this.setState({ error: error.message });
    }
    this.setState({ clicked: false });
  };
  
  render() {
    return (
      <div>
        <div className="Background">
          <div className="AuthWindow">
            <div className="AuthTitle">Вход</div>
            <div className="AuthText">Логин:</div>
            <input id="LoginContainer" type="text" value={this.state.login} onChange={this.handleLogin} />

            <div className="AuthText">Пароль:</div>
            <input id="PasswordContainer" type="text" value={this.state.password} onChange={this.handlePassword} />
            <br></br>
            <button id="AuthButton"
              disabled={this.state.login === '' || this.state.password === '' || this.state.clicked === true}
              onClick={this.onclick}>Войти
            </button><br></br>
            {this.state.error !== '' && <div className="Error">{this.state.error}</div>}
          </div>
        </div>

      </div>
    );
  }
}

export default AuthScreen