import React, { Component } from "react";
import jsSha1 from "js-sha1";

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userCredentials: {
                emailAddress: props.emailAddress,
                passwordHash: props.password
            },

            signInStatus : ''

        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailAddressUpdate(event) {
        const userCredentials = this.state.userCredentials;
        userCredentials.emailAddress = event.target.value;

        this.setState({
            userCredentials: userCredentials
        });
    }

    handlePasswordUpdate(event) {
        const userCredentials = this.state.userCredentials;
        var password = event.target.value
        userCredentials.passwordHash = jsSha1(password);

        this.setState({
            userCredentials: userCredentials
        });
    }

    handleSubmit(event) {
        console.log('A user attempted to log In ' + JSON.stringify(this.state.userCredentials));
        this.checkUserCredentials(this.state.userCredentials);
        event.preventDefault();
    }

    checkUserCredentials(body) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };

        return fetch('http://127.0.0.1:8080/signin', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ signInStatus: data['isValidUser'] }))
            .then(data =>  console.log('Is valid user? ' + this.state['signInStatus'])); //async
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={this.handleEmailAddressUpdate.bind(this)}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={this.handlePasswordUpdate.bind(this)}/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}