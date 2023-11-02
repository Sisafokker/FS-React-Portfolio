import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  /* FontAwesome already in app.js */

/* Functional Component */
const PortfolioSidebarList = (props) => {
    const portfolioList = props.data.map( item => {
        return (
            /* We need a unique KEY to avoid: "Warning: Each child in an array or iterator should have a unique "key" prop." */
            <div className='portfolio-item-thumb'     key={item.id}> 
                <div className='portfolio-thumb-img'>
                    <img src = { item.thumb_image_url} />
                </div>
                <div className='text-content'>
                    <div className='title'>{item.name}</div>
                    <div className='actions'>
                        <a className="action-icon" title='Edit Item' onClick={() => props.handleEditClick(item)}>
                            <FontAwesomeIcon icon="pen-to-square"/> 
                        </a> 
                        <a className="action-icon" title='Delete Item' onClick={() => props.handleDeleteClick(item)}>
                            <FontAwesomeIcon icon="trash"/> 
                        </a>
                     </div>
                </div>
                <div className='theID'>id: {item.id}</div>
            </div>
        )
    })

    return (
         <div className='portfolio-sidebar-list-wrapper'>
             { portfolioList } 
         </div>
    );
}

export default PortfolioSidebarList