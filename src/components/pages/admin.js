import React from 'react';
import { Link } from 'react-router-dom'; /* Very similar not NavLink (Difference: no active class for example)*/

export default function() {
       return (
            <div>
                <h2>Admin Page</h2>
                <Link to="/"> Return to home.</Link>
            </div>
        );
}