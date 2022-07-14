import React, {Component} from 'react';
import { Route, Switch } from "react-router-dom";
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Edit } from './components/Edit'
import { Create } from './components/Create'
import { useHistory } from 'react-router-dom';
import { NotFound } from './components/404'

import './custom.css'

export default class App extends Component {
    static displayName = App.name;
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            email: '',
            password: '',
            messages: [],
        };
        this.logout = this.logout.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.deleteAlert = this.deleteAlert.bind(this)
        this.addAlert = this.addAlert.bind(this)
    }

    componentDidMount() {
        this.setState({
            loggedIn: sessionStorage.getItem("token") !== ""
        })
    }

    async handleLogin(e) {
        e.preventDefault();
        const email = this.state.email.trim();
        const password = this.state.password.trim();
        if (!email || !password) {
            return;
        }
        const data = {
            Email: email,
            Password: password
        };

        await fetch("user/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
            throw new Error("Wrong email or password")
        }).then(result => {
            sessionStorage.setItem("token", result);
            this.setState({
                loggedIn: true
            })
            this.props.history.push("/");
        }).catch((error) => {
            this.addAlert(error.message, "danger")
        })
    }

    addAlert(message, type) {
        let messages = this.state.messages
        messages.push({ text: message, type: type })
        this.setState({ 
            messages: messages
        })
    }

    deleteAlert() {
        let messages = this.state.messages
        messages.shift()
        this.setState({
            messages: messages
        })
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    logout() {
        this.setState({
            loggedIn: false
        })
    }

    render () {
        return (
            <Layout loggedIn={this.state.loggedIn} errorMessages={this.state.messages} deleteAlert={this.deleteAlert}>
                <Switch>
                    <Route exact path='/' component={() => <Home loggedIn={this.state.loggedIn} addAlert={this.addAlert}/>} />
                    <Route exact path='/login' component={(props) => <Login {...props}
                            handleLogin={this.handleLogin}
                            handleEmail={this.handleEmailChange}
                            handlePassword={this.handlePasswordChange}
                            loggedIn={this.state.loggedIn}
                            email={this.state.email}
                            password={this.state.password}
                            addAlert={this.addAlert}
                        />}
                    />
                    <Route exact path='/edit/:id' render={(props) => <Edit {...props}
                            loggedIn={this.state.loggedIn}
                            addAlert={this.addAlert}
                        />}
                    />
                    <Route exect path='/logout' component={() => <Logout logout={this.logout} loggedIn={this.state.loggedIn} />} />
                    <Route exect path='/create' component={(props) => <Create {...props} loggedIn={this.state.loggedIn}
                            addAlert={this.addAlert} />} />
                    <Route component={(props) => <NotFound />} />
                </Switch>
            </Layout>
        );
    }
}

function Logout(props){
    const history = useHistory();
    sessionStorage.setItem("token", "")
    props.logout();
    history.push("/")
    return <div>Logout</div>
}
