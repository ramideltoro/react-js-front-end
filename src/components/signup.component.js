import React, { Component } from "react";
import jsSha1, { } from "js-sha1";

export default class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            signupForm: {
                firstName: props.firstName,
                lastName: props.lastName,
                emailAddress: props.emailAddress,
                password: props.password
            },
            signupStatus : ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFirstNameUpdate(event) {
        const signupForm = this.state.signupForm;
        signupForm.firstName = event.target.value;

        this.setState({
           signupForm: signupForm
        });
    }

    handleLastNameUpdate(event) {
        const signupForm = this.state.signupForm;
        signupForm.lastName = event.target.value;

        this.setState({
            signupForm: signupForm
        });
    }

    handleEmailAddressUpdate(event) {
        const signupForm = this.state.signupForm;
        signupForm.emailAddress = event.target.value;

        this.setState({
            signupForm: signupForm
        });
    }

    handlePasswordUpdate(event) {
        const signupForm = this.state.signupForm;
        signupForm.password = jsSha1(event.target.value);

        this.setState({
            signupForm: signupForm
        });
    }

    handleSubmit(event) {
        console.log('A user signed up ' + JSON.stringify(this.state.signupForm));
        this.sendSignupFormToBackend(this.state.signupForm);
        event.preventDefault();
    }

    sendSignupFormToBackend(body) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };

        fetch('http://127.0.0.1:8080/signup', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ signupStatus: data['signupStatus'] })); //async
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name"  onChange={this.handleFirstNameUpdate.bind(this)} />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name"  onChange={this.handleLastNameUpdate.bind(this)}/>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email"  onChange={this.handleEmailAddressUpdate.bind(this)}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={this.handlePasswordUpdate.bind(this)}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p>
            </form>
        );
    }
}