import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
   constructor(props){
    super(props);

    this.state ={
        yourEmail: "",
        yourPassword: "",
        errorText: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   }
  
   handleChange(event) {
    this.setState({
        [event.target.name] : event.target.value,
        errorText: ""
    });
   }

   handleSubmit(event) {
    console.log("HandleSubmit:");
    console.log(this.state.yourEmail, this.state.yourPassword)

    /* API CALL ------------ 💬STANDARD APPROACH IF YOU ARE ONLY WORKING WITH 'TEXT' VALUES */
    let myOptions = {
        client: {
            email: this.state.yourEmail, 
            password: this.state.yourPassword
        }
    };

    /* Related to the Browser Cookies for Auth */
    let myCredentials = {
        withCredentials: true
    };

    axios.post("https://api.devcamp.space/sessions", myOptions, myCredentials).then(response => {
        console.log("Response: ", response.data.status);

        if (response.data.status == "created") {
            console.log("👍 Authorized... you are in")
            this.props.handleSuccessfulAuth()
        } else {
            console.log("❌ Not Authorized")
            this.setState({
                errorText: "Wrong Email or password" 
            })
            this.props.handleUnsuccessfulAuth()
        }
        
    }).catch(err => { /* If API Fails, wrong URL, etc. */
        this.setState({
            errorText: "There was an error"
        });
        this.props.handleUnsuccessfulAuth()
    });
    
    event.preventDefault();  /* To avoid refreshing the page nor adding info to the url bar */
   }



    render() {
        return (
            <div>
                <h1>LOGIN TO ACCESS YOUR DASHBOARD</h1>
                <h3> { this.state.yourEmail }</h3>
                <h4> { this.state.errorText }</h4>

                <form onSubmit={ this.handleSubmit }> 
                    <input 
                    type="email"
                    name="yourEmail"
                    placeholder='Your email'
                    value={ this.state.yourEmail }
                    onChange={ this.handleChange }
                    />

                    <input 
                    type="password"
                    name="yourPassword"
                    placeholder='Your Password'
                    value={ this.state.yourPassword }
                    onChange={ this.handleChange }
                    />

                    <div>
                      <button type="submit">Login</button>
                    </div>
                 </form>
            </div>
        );
    }
}