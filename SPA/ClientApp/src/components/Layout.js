import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { AlertingSystem } from './AlertingSystem';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
    static displayName = Layout.name;
    constructor(props) {
        super(props)
        this.deleteAlert = this.deleteAlert.bind(this)
        this.addAlert = this.addAlert.bind(this)
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
            

      render () {
        return (
          <div>
              <NavMenu loggedIn={this.props.loggedIn}/>
              <Container>
                   {this.props.children}
              </Container>
              {<AlertingSystem messages={this.props.errorMessages} deleteAlert={this.props.deleteAlert}/>}
          </div>
        );
      }
}
