import React, { Component } from "react";
import axios from 'axios';

/* All Font Awesome */
import { library } from "@fortawesome/fontawesome-svg-core";                /* Library */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";           /* Component */
import { faTrash, faSignOutAlt, faEdit, faSpinner } from "@fortawesome/free-solid-svg-icons";  /* Icons you want to use! */

/* Import multiple Routes*/
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; 
/* Solution?: https://www.youtube.com/watch?v=szHwWEkYFSU 
"@types/react-router-dom": "^4.3.1",
*/

import NavigationContainer from "./navigation/navigation-container";

import Home from "./pages/home";
import About from "./pages/about"
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import BlogDetail from "./pages/blog-detail";
import Admin from "./pages/admin";
import PortfolioManager from "./pages/portfolio-manager";
import PortfolioDetail from "./portfolio/portfolio-detail";
import Auth from "./pages/auth";
import NoMatch from "./pages/no-match";

library.add(faTrash, faSignOutAlt, faEdit, faSpinner); // FontAwesome again.

export default class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN" /* Avoid using Booleans (true, false) for Log In */
    }

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this)
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this)
    this.handleSuccessfulLogOut = this.handleSuccessfulLogOut.bind(this)
  }

  handleSuccessfulLogin(){
    this.setState({
      loggedInStatus: "LOGGED_IN"
    })
  }

  handleUnsuccessfulLogin(){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  handleSuccessfulLogOut(){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  checkLoginStatus(){
    return axios.get("https://api.devcamp.space/logged_in", { withCredentials: true } ).then(response => {
      console.log("logged_in returns: ", response.data);
      const loggedIn = response.data.logged_in;
      const loggedInStatus = this.state.loggedInStatus;

      if (loggedIn && loggedInStatus === "LOGGED_IN") {
        return;
      } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
          loggedInStatus: "LOGGED_IN"
        });
      } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN"
        });
      }
    }).catch (err => {
      console.error("Error: ", err)
    })
  }

  componentDidMount(){
    this.checkLoginStatus();
  }

  authorizedPages(){
    /* We need a unique KEY to avoid: "Warning: Each child in an array or iterator should have a unique "key" prop." */
    return [
      <Route path="/admin" key="jp1" component= {Admin} />,
      <Route path="/portfolio-manager" key="jp2" component= {PortfolioManager} />,
    ]
  }

  render() {
    return (    /* In React, when you return JSX, you can only return a single DIV. Like in JS, you return one item*/
      <div className="container">
        <Router>
          <div>
            <NavigationContainer 
              loggedInStatus = { this.state.loggedInStatus } 
              handleSuccessfulLogOut = { this.handleSuccessfulLogOut }
            />
            {/* Visual Logged In or Not */}
            {this.state.loggedInStatus === "LOGGED_IN" ? <h4>🔑</h4> : <h4>🔒</h4>}
            
            <Switch> {/* These are like conditionals: */}
              {/* component={...props...} */}
              <Route exact path="/" component={Home} />
                            
              {/* Passing a ´Render Prop´ */}
              <Route
                path="/auth"
                render = { props => (
                  <Auth
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                  />
                )}
              />
              <Route path="/about-me" component={About} />
              <Route path="/contact-me" component={Contact} />
              <Route path="/blog-me" component= {Blog} />
              <Route path="/b/slug" component= {BlogDetail} />
              
              {this.state.loggedInStatus === "LOGGED_IN" ? this.authorizedPages() : null}

              {/* :slug or :permalink added as PROPS => component={PortfolioDetail} */}
              <Route exact path="/portfolio/:slug" component={PortfolioDetail} /> 

              {/* Catch all Route funnel (always goes at the bottom... its the ELSE if nothing else match) */}
              <Route component= { NoMatch } /> 
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
