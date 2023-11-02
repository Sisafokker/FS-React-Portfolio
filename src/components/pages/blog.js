import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BlogItem from "../blog/blog-item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlogModal from "../modals/blog-modal";

class Blog extends Component {
    constructor(){
        super();

        this.state = {
            blogItems: [],
            totalCount: 0,
            currentPage: 0,
            isLoading: true,

            blogModalIsOpen: false
        }
        
        this._isMounted = false;
        this.getBlogItems = this.getBlogItems.bind(this);
        this.onScroll = this.onScroll.bind(this);
        window.addEventListener('scroll', this.onScroll, false);

        this.handleNewBlogClick = this.handleNewBlogClick.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleSuccessfulNewBlogSubmission  = this.handleSuccessfulNewBlogSubmission.bind(this)
    }

    handleSuccessfulNewBlogSubmission (blog){
        this.setState({
            blogModalIsOpen: false, // Close the modal
            blogItems: [blog].concat(this.state.blogItems)  // Place new blog record at the top of the blog posts
        })
    }

    handleModalClose(){
        this.setState({
            blogModalIsOpen: false
        })
    }

    handleNewBlogClick(){
        this.setState({
            blogModalIsOpen: true
        })
    }

    onScroll(){
            // console.log("User is scrolling height/width...", window.innerHeight, window.innerWidth);
            // console.log("ScrollTop: ",document.documentElement.scrollTop)  // Exact Vertical position of where the user is.
            // console.log("ScrollLeft: ",document.documentElement.scrollLeft)
            // console.log("offsetHeight: ",document.documentElement.offsetHeight) // Height of the entire document
            // console.log("-------------------------------------") 
            if (this.state.isLoading || this.state.blogItems.length === this.state.totalCount) {
                console.log("Still loading || OR || No more posts available to load")
                return 
            }
            
            if (window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight - 200) {
                console.log("Should Get more posts!")
                this.getBlogItems();
            }
    }

    getBlogItems() {
        this.setState({
            currentPage: this.state.currentPage + 1
        })

        axios
            .get(`https://hoakeen.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`, { withCredentials: true })
            .then(response => {
                if (this._isMounted) {
                    console.log("Getting more...",response.data)
                    console.log("TotalRecords: ",response.data.meta.total_records)
                    console.log("TotalPages: ",response.data.meta.total_pages)
                    this.setState({
                        blogItems: this.state.blogItems.concat(response.data.portfolio_blogs), // adding the new post to the previous ones.
                        totalCount: response.data.meta.total_records,
                        isLoading: false
                    });
                }
            })
            .catch(error => {
                console.log("getBlogItems Error", error);
            });
    }

    componentWillMount() {
        this._isMounted = false;
    }

    componentWillUnmount() {
        // 👍👍 To avoid the scroll listener to continue when you leave the Blog page.
        window.removeEventListener('scroll', this.onScroll, false)
    }

    componentDidMount() {
        this._isMounted = true;
        this.getBlogItems();
    }

    render() {
        const blogRecords = this.state.blogItems.map(blogItem => {
          return <BlogItem key={blogItem.id} blogItem={blogItem} />;
        });
    
        return (
            <div className="blog-container">
                <BlogModal      handleSuccessfulNewBlogSubmission = {this.handleSuccessfulNewBlogSubmission}
                                handleModalClose={this.handleModalClose}
                                modalIsOpen ={this.state.blogModalIsOpen} /> {/* passing these 3 props */}

                <div className="new-blog-link">
                    <a onClick={this.handleNewBlogClick}>Click to Open Modal</a>
                </div>

            <div className="content-container"> {blogRecords} </div>
            {this.state.isLoading ? (
                <div className="content-loader">
                    <FontAwesomeIcon icon="spinner" spin/>
                </div>
                ) : null}
            </div>
        )
      }
    }
    
    export default Blog;