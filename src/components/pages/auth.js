import React, { Component } from 'react';
import loginImg from "../../../static/assets/images/auth/login.jpg";
import Login from "../auth/login.js";


export default class Auth extends Component {
    constructor(props){
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleUnsuccessfulAuth = this.handleUnsuccessfulAuth.bind(this);
    }

    handleSuccessfulAuth(){
        this.props.handleSuccessfulLogin();
        this.props.history.push("/");  /* Push to homepage. Works because 'Auth' is a dedicated route. Otherwise you need an HOC */
    }

    handleUnsuccessfulAuth(){
        this.props.handleUnsuccessfulLogin();
    }

    render() {
        return (
            <div className='auth-page-wrapper'>
                <div className='left-column' 
                    style={{
                        backgroundImage: `url(${loginImg})` /* give it a height and other properties to visualize it */
                    }}
                />                     

                <div className='right-column'> 
                    <Login 
                    handleSuccessfulAuth={this.handleSuccessfulAuth}
                    handleUnsuccessfulAuth = {this.handleUnsuccessfulAuth}
                    />;
                </div>
            </div>
        );
    }
}