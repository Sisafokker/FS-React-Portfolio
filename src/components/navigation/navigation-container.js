import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router';  /* HOC should start with lower captioned letter */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  /* FontAwesome already in app.js */


const NavigationComponent = (props) => {

    /* Function for DynamicLink */
    const dynamicLink = (route, linkText) => {
        return (
            <div className='nav-link-wrapper'>
                <NavLink to={route} activeClassName='nav-link-active'> {linkText} </NavLink>
            </div>
        )
    }

    const handleSignOut = () => {
        axios
        .delete("https://api.devcamp.space/logout", {withCredentials: true})
        .then(response => {
            console.log(response.status)
            if (response.status === 200) {
                props.handleSuccessfulLogOut();
                
                // Will give Error_SO:  TypeError: Cannot read properties of undefined (reading 'push')
                // Therefore we need to make the file an HOC (Higher Order Component)
                // import { withRout }
                // export default withRouter( NavigationComponent );
                props.history.push("/"); 
                
            }
            return response.data;
        }).catch(er => { console.log("Error_SO: ", er) });
    }

    return (
        <div className='nav-wrapper'>
            <div className='left-side'>
                {/* Dynamic Links - Always Visible */}
                {dynamicLink("/", "Home")}
                {dynamicLink("/about-me", "About")}
                {dynamicLink("/contact-me", "Contact")}

                {/* Dynamic Links - Conditional Visiblility */}
                {props.loggedInStatus === "LOGGED_IN" ? dynamicLink("/admin", "✔ Admin") : null} 
                {props.loggedInStatus === "LOGGED_IN" ? dynamicLink("/portfolio-manager", "✔ Portfolio Manager") : null} 
                {props.loggedInStatus === "LOGGED_IN" ? dynamicLink("/blog-me", "✔ Blog") : null} 
            </div>

            <div className='right-side'> 
                Joaquin Pagliettini
                                                    {/* No need for '{this.HangleSignOut} because its a functional component */}
                {props.loggedInStatus === "LOGGED_IN" ? <a onClick = { handleSignOut }><FontAwesomeIcon icon="sign-out-alt"/> </a> : null}
            </div>
        </div>
    );
};

/* export default NavigationComponent; */
export default withRouter( NavigationComponent );