import React, { Component } from "react";
import axios from 'axios';

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
  constructor() {
    super();

    this.state = {
      pageTitle: "Welcome to xyz's portfolio",
      isLoading: false,
      data: []
    };
    
    // 💬To Change state and enable the handlePageTitleUpdate()
    // 💬Otherwise, you will get "TypeError: Cannot read property 'setState' of undefined.
    // 💬We are letting the component know that it needs to have access to the keyword THIS
    // 💬Particularly when we will have an eventlistener and/or custom function, we need to bind the function directly to the component
    this.handlePageTitleUpdate = this.handlePageTitleUpdate.bind(this);

    this.handleFilter = this.handleFilter.bind(this);
  }

  /* Making an API get request */
  getPortfolioItems (){ 
    const url = 'https://hoakeen.devcamp.space/portfolio/portfolio_items';
    
    axios.get(url)
      .then(response => {  /* Arrow functions so we can use 'this' */
        console.log('✔ SUCCESS: response',response);
        console.log('✔ DETAILS: response.data.portfolio_items',response.data.portfolio_items);
        // Changing the state of data in the constructor
        this.setState({
          data: response.data.portfolio_items
        })
      })
      .catch(error => {
        console.log('❌ ERROR: ',error);
      })
      .finally(function () {
        // always executed
      });
  }

  // Rendering the API data[] in the constructor
  portfolioItems() {
    return this.state.data.map(item => {
      //debugger; 
      /* If you place this debugger anywhere inside of your application, then what's going to happen is the browser's going to see this keyword and it is going to stop execution of your program and it's going to allow you to ask questions of your data.
      It's like it freezes the entire process and gives me the ability to run functions, to build out equations, anything like that. */

      let theSlug = item.name.replace(' ','');
      return (
        <PortfolioItem 
          key={item.id} 
          item={item} 
          /> 
      )
    });
  }

  // 💬Changing the STATE of the pageTitle (AKA: Changing the value of the pageTitle)
  handlePageTitleUpdate() {
    this.setState({
      pageTitle: "Welcome to Hoakeen's portfolio"
    });
  }

  // Filter data based on data property
  handleFilter(filtro_param) {
    this.setState({
      data: this.state.data.filter(item => {
        return item.category === filtro_param;
      })
    })
  }

  /* Calling the getPortfolioitems (API) after components are mounted */
  componentDidMount(){
    this.getPortfolioItems();  
  }

  render() {
    return (
      <div className="portfolio-items-wrapper"> 
        {/*💬 Filter Buttons data based on data property */}
        {/*👉 See notes (in GoogleDoc) on why we have to use '() => this.' for these onClick */}
        <button className="btn" onClick={() => this.handleFilter("eCommerce")}>eCommerce</button>
        <button className="btn" onClick={() => this.handleFilter("Scheduling")}>Scheduling</button>
        <button className="btn" onClick={() => this.handleFilter("Enterprise")}>Enterprise</button>

       {this.portfolioItems()}  

      </div>
    );
  }
}
