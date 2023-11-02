import React, { Component } from 'react';
import ReactModal from 'react-modal';
import BlogForm from '../blog/blob-form';

ReactModal.setAppElement(".app-wrapper") // Remove warning that ReactModal generates. ".app-wrapper" ia the main Wrapper from Index.html

export default class BlogModal extends Component {
   constructor(props){
    super(props);

    this.customStyles = { // see react-modal documentation to know what props are valid
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%",
            width: "800px"
        },
        overlay: {
            backgroundColor: "rgba(1, 1, 1, 0.75)"
        }
      };

      this.handleSuccessfullFormSubmission = this.handleSuccessfullFormSubmission.bind(this)
    }

    handleSuccessfullFormSubmission(blog) {
        this.props.handleSuccessfulNewBlogSubmission(blog);
      }

    render() {
        return (
            <div>
                <ReactModal 
                    style = {this.customStyles} // Passing inline styles
                    onRequestClose={ () => {
                        console.log("Pressed outside of the modal or the ESC key") 
                        this.props.handleModalClose();
                    } } 
                    isOpen={this.props.modalIsOpen}
                >  {/* see react-modal documentation to know what props are valid */}
                
                <h1>Blog Form modal</h1>
                <BlogForm handleSuccessfullFormSubmission = {this.handleSuccessfullFormSubmission} />
                </ReactModal> {/* Not a selfclosing tag becuase the modal will be passed as a child component */}
            </div>
        );
    }
}