import React, { useEffect, Component } from 'react';

export class AlertingSystem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let messages =  this.props.messages.map((message) => (
            <AlertingMessage key={this.props.messages.indexOf(message)} id={this.props.messages.indexOf(message)} type={message.type} message={message.text} deleteAlert={this.props.deleteAlert}/>
        ))
        return (
                <>
                    {messages.isEmpty ? null : messages}
                </>
            )
        
    }
}

function AlertingMessage(props) {
    useEffect(() => {
        setTimeout(() => {
            props.deleteAlert()
        }, 5000);
    }, []);

    return (
        <div style={{bottom: 20+(78*props.id)+"px"}} className={"alert alert-"+props.type} role="alert">
            {props.message}
        </div>
    )
    
}