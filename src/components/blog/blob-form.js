import React, { Component } from 'react';
import axios from 'axios';

export default class BlogForm extends Component {
   constructor(props){
    super(props);

    this.state = {
        title: '',
        blog_status: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   }

   buildForm() {
    let formData = new FormData();

    formData.append("portfolio_blog[title]", this.state.title);
    formData.append("portfolio_blog[blog_status]", this.state.blog_status);

    return formData;
  }

   handleSubmit(event){
    axios
    .post(`https://hoakeen.devcamp.space/portfolio/portfolio_blogs`, this.buildForm(), { withCredentials: true } )
    .then(response => {
        console.log("handleSubmit blog response", response.data.portfolio_blog)
        this.props.handleSuccessfullFormSubmission(response.data.portfolio_blog);

        this.setState({
            title: '',
            blog_status: ''
        })
    })
    .catch(error => {
        console.log("handleSubmit blog error", error)
    })
    
    event.preventDefault();
    }

   handleChange(event) {
    //console.log("handleChange", event);
    this.setState({
        [event.target.name]: event.target.value // See 'Portfolio Form' Guides. Plenty of detail on those guides.
    })
   }

   render() {
    return (
      <form onSubmit={this.handleSubmit} className='blog-form-wrapper'>
        <div className='two-column'>
            <input
            type="text"
            onChange={this.handleChange}
            name="title"
            placeholder="Blog Title"
            value={this.state.title}
            />

            <input
            type="text"
            onChange={this.handleChange}
            name="blog_status"
            placeholder="Blog status"
            value={this.state.blog_status}
            />

        </div>
        <button className='btn'>Save</button>

      </form>
    );
  }
}