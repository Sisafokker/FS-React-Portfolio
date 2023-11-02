import React from 'react';

export default function(myProps) { /* <<== we add 'props' as argument  */
       return (
            <div>
                <h2>Portfolio Detail for {myProps.match.params.slug}</h2>
            </div>
        );
}