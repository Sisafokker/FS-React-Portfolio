import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class PortfolioItem extends Component {
  constructor (props) {
    super(props);

    this.state = {
      portfolioItemClass: ""
    };
  }

  handleMouseEnter() {
    this.setState({portfolioItemClass: "image-blur"});
  }

  handleMouseLeave(){
    this.setState({portfolioItemClass: ""});
  }

  render () {
  /* DESTRUCTORING The props */
  const { id, description, thumb_image_url, logo_url } = this.props.item;
  
    return (
      <div className="portfolio-item-wrapper"
      /* Adding Event Handlers to the div */
      onMouseEnter={ () => this.handleMouseEnter() } /* use "() =>" to load an wait, otherwise eternal loop*/
      onMouseLeave={ () => this.handleMouseLeave() } 
      >
     {/*  <h1> {this.state.portfolioItemClass}</h1> */}
        <div 
          className={"portfolio-img-background "+ this.state.portfolioItemClass}  /* Dynamically adding the state as class name */
          style={{
            backgroundImage: "url("+ thumb_image_url+")"
          }}
        />
        <div className="img-text-wrapper">
          <div className="logo-wrapper"> 
            <img src={logo_url} />
          </div>
          <div className="subtitle"> {description} </div>
          <Link to={ `/portfolio/${this.props.slug}` }> Link to {this.props.slug} </Link>
        </div>
      </div>
    );
}
}
