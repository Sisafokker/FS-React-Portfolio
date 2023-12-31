/* PORTFOLIO-FORM.JS */
import React, { Component } from 'react';
import axios from 'axios';

import { DropzoneComponent } from 'react-dropzone-component';
import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";


export default class PortfolioForm extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            id: "",
            name: "",
            description: "",
            category: "google-appsheet",
            position: "",
            url: "",
            thumb_image: "",
            banner_image: "",
            logo: "",
            editMode: false,
            apiUrl: "https://hoakeen.devcamp.space/portfolio/portfolio_items",
            apiAction: "post",
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        
        this.componentConfig = this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.handleThumbDrop = this.handleThumbDrop.bind(this);
        this.handleBannerDrop = this.handleBannerDrop.bind(this);
        this.handleLogoDrop = this.handleLogoDrop.bind(this);
        this.deleteImage = this.deleteImage.bind(this);

        /* Creating REFS */
        this.thumbRef = React.createRef();
        this.bannerRef = React.createRef();
        this.logoRef = React.createRef();
    }
    
    deleteImage(imageType) {
        axios.delete(`https://hoakeen.devcamp.space/portfolio/delete-portfolio-image/${this.state.id}?image_type=${imageType}`,
        {withCredentials: true}
        ).then(response => {
            //console.log("deleteImage", response);
            this.setState({
                [`${imageType}_url`]: ""
            })
        }).catch(error => {
            console.log("deleteImage_error", error);
        })
    }

    componentDidUpdate() {
        if (Object.keys(this.props.portfolioToEdit).length > 0) {
          const {
            id,
            name,
            description,
            category,
            position,
            url,
            thumb_image_url,
            banner_image_url,
            logo_url
          } = this.props.portfolioToEdit;
    
          this.props.clearPortfolioToEdit();
    
          this.setState({
            id: id,
            name: name || "",
            description: description || "",
            category: category || "eCommerce",
            position: position || "",
            url: url || "",
            editMode: true,
            apiUrl: `https://hoakeen.devcamp.space/portfolio/portfolio_items/${id}`,
            apiAction: "patch",
            thumb_image_url: thumb_image_url || "",
            banner_image_url: banner_image_url|| "",
            logo_url: logo_url || ""
          });
        }
      }

    /* Dedicated handler for each image type */
    handleThumbDrop(){
        return {
            addedfile: file => this.setState({ thumb_image: file})
        };
    }

    handleBannerDrop(){
        return {
            addedfile: file => this.setState({ banner_image: file})
        };
    }

    handleLogoDrop(){
        return {
            addedfile: file => this.setState({ logo: file})
        };
    }

    /* DropzoneComponent config items*/
    componentConfig() {
        return {
          iconFiletypes: [".jpg", ".jpeg" , ".png"],
          showFiletypeIcon: true,
          postUrl: "https://httpbin.org/post" /* Mock URL that will always return TRUE */
        }
      }

    djsConfig(){
        return {
            addRemoveLinks: true,
            maxFiles: 1
        }
    }

    buildForm(){
        let formData = new FormData();
                        /*     key            ,      value */
        formData.append("portfolio_item[name]", this.state.name);
        formData.append("portfolio_item[description]", this.state.description);
        formData.append("portfolio_item[url]", this.state.url);
        formData.append("portfolio_item[position]", this.state.position);
        formData.append("portfolio_item[category]", this.state.category);

        if (this.state.thumb_image) {
            formData.append("portfolio_item[thumb_image]", this.state.thumb_image);
          }
        if (this.state.banner_image) {
            formData.append("portfolio_item[banner_image]", this.state.banner_image);
          }
        if (this.state.logo) {
            formData.append("portfolio_item[logo]", this.state.logo);
          }
        /* debugger */
        return formData;
    }

    /* Form Listener */
    handleChange(e){
        console.log("TYPING EVENT:", e)  
        this.setState({
            [e.target.name]: e.target.value
        })  
    }

    /* Submit Listener */
    handleSubmit(e){
        console.log("SUBMIT EVENT:", e)
        /* API CALL ------------ 💬STANDARD APPROACH IF YOU ARE **NOT JUST WORKING WITH 'TEXT' VALUES** */
        axios({
            method: this.state.apiAction,
            url: this.state.apiUrl,
            data: this.buildForm(),
            withCredentials: true

        }).then(response => {
            console.log("Post_Response: ",response)
            if (this.state.editMode) {
                this.props.handleEditFormSubmission();
            } else {
                /* Update the sidebar calling the method that was passes in props */
                this.props.handleNewFormSubmission(response.data.portfolio_item);
            }

            /* Resetting the State of the form => emptying it*/
            this.setState({
                name: "",
                description: "",
                category: "google-appsheet",
                position: "",
                url: "",
                thumb_image: "",
                banner_image: "",
                logo: "",
                editMode: false,
                apiUrl: "https://hoakeen.devcamp.space/portfolio/portfolio_items",
                apiAction: "post",
            });

            /* Using REF to reset the Dropzone files DOM objects !! */
            [this.thumbRef, this.bannerRef, this.logoRef].forEach( ref => {
                ref.current.dropzone.removeAllFiles();
            })

        }).catch(er => {console.log("Error_handleSubmit", er)})
        
        e.preventDefault();  /* To avoid refreshing the page AND adding info to the url bar */
    }

    render() {
        return (
                <form onSubmit={this.handleSubmit} className='portfolio-form-wrapper'>
                    <div className='two-column'>
                        {/* the 'name' property has to be identical to the state */}
                        <input type="text" name="name" placeholder="Portfolio Item Name" value={this.state.name} onChange={this.handleChange}/>
                        <input type="text" name="url" placeholder="URL" value={this.state.url} onChange={this.handleChange}/>
                    </div>
                  
                    <div className='two-column'>
                        <input type="text" name="position" placeholder="Position" value={this.state.position} onChange={this.handleChange}/>   
                        <select 
                            className='select-element'
                            name="category" 
                            value={this.state.category} 
                            onChange={this.handleChange}
                        > 
                            <option value="pyme">PYME</option>
                            <option value="education">EDU</option>
                            <option value="ngo">NO-PROFIT</option>
                            <option value="gas">APPS SCRIPT</option>
                            <option value="google-appsheet">APPSHEET</option>
                        </select>
                    </div>

                    <div className='one-column'>
                        <textarea rows="12" cols="45" type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleChange}/>
                    </div>
                    <h4>Images:</h4>
                    <div className='image-uploaders'>       
                         {this.state.thumb_image_url && this.state.editMode ? (
                            <div className='portfolio-manager-image-wrapper'>
                            <img src={this.state.thumb_image_url} />

                            <div className='image-removal-link'>
                                <a onClick={()=> this.deleteImage("thumb_image")}>Remove file</a>    
                            </div>
                            </div> )
                            : (
                        <DropzoneComponent 
                            config = { this.componentConfig() }
                            djsConfig = { this.djsConfig() }
                            eventHandlers = { this.handleThumbDrop() }
                            ref = {this.thumbRef}
                        >
                           <div className="dz-message"> Upload Thumbnail </div>
                        </DropzoneComponent>
                        )}
                        
                        {this.state.banner_image_url && this.state.editMode ? (
                            <div className='portfolio-manager-image-wrapper'>
                            <img src={this.state.banner_image_url} />
                            
                            <div className='image-removal-link'>
                                <a onClick={()=> this.deleteImage("banner_image")}>Remove file</a>    
                            </div>
                            </div> )
                            : (
                        <DropzoneComponent 
                            config = { this.componentConfig() }
                            djsConfig = { this.djsConfig() }
                            eventHandlers = { this.handleBannerDrop() }
                            ref = {this.bannerRef}
                        >
                            <div className="dz-message"> Upload Banner </div>
                        </DropzoneComponent>
                        )}

                        {this.state.logo_url && this.state.editMode ? (
                            <div className='portfolio-manager-image-wrapper'>
                            <img src={this.state.logo_url} />

                            <div className='image-removal-link'>
                                <a onClick={()=> this.deleteImage("logo")}>Remove file</a>    
                            </div>
                            </div> )
                            : (
                        <DropzoneComponent 
                            config = { this.componentConfig() }
                            djsConfig = { this.djsConfig() }
                            eventHandlers = { this.handleLogoDrop() }
                            ref = {this.logoRef}
                        >
                            <div className="dz-message"> Upload Logo </div>
                        </DropzoneComponent>
                        )}
                    </div>
                    <div>
                        <button className="btn" type="submit" name="btn"> Save </button>
                    </div>
                </form>
        );
    }
}