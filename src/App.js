import React, {Component} from 'react'
import AuthScreen from './AuthScreen'
import MainScreen from './MainScreen'

class App extends Component {
    state = {
        token: localStorage.getItem('token'),
    };

    onLogin = (token) =>{
        localStorage.setItem('token', token)
        this.setState({token : token})
    }

    onLogout = () =>{
        localStorage.removeItem('token')
        this.setState({token : null})
    }

    render() {
        if (!this.state.token)
            return <AuthScreen onLogin = {this.onLogin}/>
        else
            return <MainScreen onLogout = {this.onLogout} token = {this.state.token}/>
    }   
}   
export default App