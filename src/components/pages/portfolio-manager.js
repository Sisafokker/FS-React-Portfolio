import React, { Component } from 'react';
import axios from 'axios';
import PortfolioSidebarList from '../portfolio/portfolio-sidebar-list';
import PortfolioForm from '../portfolio/portfolio-form';

export default class PortfolioManager extends Component {
   constructor(){
    super();

    this.state = {
        portfolioData : [],
        portfolioToEdit : {}
    }

    this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
    this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
    
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
   }

   clearPortfolioToEdit () { /* Clear the Edit State */
    this.setState ({
        portfolioToEdit: {}
    });
   }

   handleEditClick (portfolioItem) { /* Update the Edit State */
    this.setState ({
        portfolioToEdit: portfolioItem
    })
   }

   handleDeleteClick (item){
    console.log("handleDeleteClick: ", item)
    const url = 'https://hoakeen.devcamp.space/portfolio/portfolio_items/'
    axios.delete(url+`${item.id}` , {withCredentials: true}).then(response => {
        console.log("Delete Response", response)
        /* Updating State so it matches with the API data */
        this.setState({
            portfolioData: this.state.portfolioData.filter( an_item => {
                return item.id !== an_item.id
            })
        })
        return response.data;
    }).catch (err =>  { console.error("error handleDeleteClick", err)})
   }
   
   handleEditFormSubmission() {
    this.getPortfolioItems()
   }

   handleNewFormSubmission(portfolioItem) {
    console.log("handleNewFormSubmission ",portfolioItem);
    /* Add new item to the sidebar array */
    this.setState({
        portfolioData: [portfolioItem].concat( this.state.portfolioData ) /* Stacking the new item on top */
    })
   }

   handleFormSubmissionError(error) {
    console.log("ERROR handleFormSubmissionError", error)
   }

   /* Gets the Items from the API */
   getPortfolioItems() {
    const url = 'https://hoakeen.devcamp.space/portfolio/portfolio_items'
    let order = "?order_by=id&direction=desc"
    axios.get(url+order, { withCredentials: true }).then(response => {
        console.log("Response from getPortfolioItems", response.data)
        this.setState({
            /* without the [... ] this would create you single item*/
            /* with [... ] it is an coma separated array with multiple items*/
            portfolioData: [...response.data.portfolio_items]
          })
    }).catch (err =>  { console.error("error GetPortoflioItems", err)})
   }

    /* Lifecycle Hook to call getPortfolioItems */
    componentDidMount(){
        this.getPortfolioItems();
   }


    render() {
        return (
            <div className='portfolio-manager-wrapper'>
                <div className='left-column'> 
                    <PortfolioForm 
                        handleNewFormSubmission =    { this.handleNewFormSubmission }
                        handleEditFormSubmission =    { this.handleEditFormSubmission }
                        handleFormSubmissionError =         { this.handleFormSubmissionError }
                        clearPortfolioToEdit = { this.clearPortfolioToEdit }
                        portfolioToEdit = { this.state.portfolioToEdit } /* passing the portfolioToEdit object */
                    />
                </div>
                
                <div className='right-column'> 
                    {/* Passing 'data' as props so it is available within the component PortfolioSidebarList */}
                    {/* Passing 'handleDeleteClick' so PortfolioSidebarList can access this handler */}
                    <PortfolioSidebarList 
                        data = { this.state.portfolioData }
                        handleDeleteClick = { this.handleDeleteClick }
                        handleEditClick = { this.handleEditClick }
                    />
                </div>
            </div>
        );
    }
}