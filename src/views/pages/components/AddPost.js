import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// react plugin for creating alert notifications
import NotificationAlert from "react-notification-alert";

import ProgressRing from './ProgressRing';

// Redux
import { connect } from 'react-redux';
import { 
	addNewPost, 
	clearErrors, 
	newPostClick, 
	clearPostClick, 
	resetSuccessNotification 
} from '../../../redux/actions/dataActions';

import {
  Button,
  Modal,
  Form,
  FormGroup,
  Input,
  InputGroup
} from "reactstrap";

class AddPost extends Component {
	constructor(){
		super();
		this.state = {
			defaultModal: false,
			body: "",
			errors: {},
			progress: 0,
			charCount: null,
			strokeColor: "#2dce89"
	  	};
	}

  	toggleModal = (event) => {
  		this.props.clearErrors();

  		this.props.clearPostClick();

  		if(!this.state.defaultModal){
  			setTimeout(()=>{
	  		 this.focusPost(); 
	  		}, 1000);
  		}

	    this.setState({
	      defaultModal: !this.state.defaultModal,
	      body: "",
	      errors: {}
	    });
  	};

  	focusPost = () => {
  		const inputField = document.getElementById("new-post-input");

  		if(inputField){
  			inputField.focus();
  		}
  	}

  	successNotification = () =>{
  		document.body.classList.remove("modal-open");
  		// Success Notification
  		let options = {
	      place: "bc",
	      message: (
	        <div className="alert-text">
	          <span data-notify="message">
	            {" "}
	            Your post was added
	          </span>
	        </div>
	      ),
	      type: "success",
	      icon: "fas fa-pen",
	      autoDismiss: 3
	    };
	    this.refs.notificationAlert.notificationAlert(options);

  		// Reset Success Notification
  		this.props.resetSuccessNotification();
  	}

  	handleChange = (event) => {
  		const progress = 0.05 + 0.95*(event.target.value.length/280);
  		const charCount = 280 - event.target.value.length;

  		const strokeColor = charCount > 49 ? "#2dce89"
  			: charCount > 9 ? "#fb9e40"
  			: "#f5365c"

  		this.setState({ 
  			[event.target.name]: event.target.value,
  			progress,
  			charCount,
  			strokeColor
  		});
  	}

  	handleSubmit = (event) => {
  		event.preventDefault();
  		this.props.addNewPost({ body: this.state.body });
  	}

  	UNSAFE_componentWillReceiveProps(nextProps){
  		if(nextProps.UI.errors){
  			this.setState({ errors: nextProps.UI.errors });
  		}

  		// If no longer loading and no errors (i.e. successfully posted)
  		if(!nextProps.UI.errors.body && !nextProps.UI.loading){
  			if(nextProps.data.newPostClick){
  				this.setState({
			      defaultModal: !this.state.defaultModal,
			      body: "",
			      errors: {}
			    });
  			}
  		}

  		// Successful Notification
  		if(nextProps.data.postSuccess){
  			this.successNotification();
	    }
  	}

	render(){
		const { errors } = this.state;
		const { UI: { loading}} = this.props;

		return(
			<Fragment>
				<div className="rna-wrapper">
          			<NotificationAlert ref="notificationAlert" />
        		</div>

				<Button
		            className="btn-icon"
		            color="primary"
		            id="navbar-post-button"
		            onClick={()=>{this.toggleModal(); this.props.newPostClick();}}
		        >
		            <span className="btn-inner--icon mr-1">
		              <i className="ni ni-spaceship" />
		            </span>
		            <span className="btn-inner--text show-icon-only">New Post</span>
		        </Button>
		        <Modal
	                className="modal-dialog-centered"
	                isOpen={this.state.defaultModal}
	                toggle={this.toggleModal}
	            >
	                <div className="modal-header">
		                <h6 className="modal-title" id="modal-title-default">
		                    Create a new post
		                </h6>
		                <button
		                    aria-label="Close"
		                    className="close"
		                    data-dismiss="modal"
		                    type="button"
		                    onClick={this.toggleModal}
		                >
		                	<span aria-hidden={true}>×</span>
		                </button>
	                </div>
	                <Form role="form" onSubmit={this.handleSubmit}>
	                    <div className="modal-body modal-body-lean">	
	                        <FormGroup>
	                          <InputGroup className="input-group-merge">
	                            <Input
	                              placeholder="What's on your mind?"
	                              type="textarea"
	                              rows="4"
	                              resize="none"
	                              maxLength="280"
	                              id="new-post-input"
	                              name="body"
	                              onChange={(event)=>this.handleChange(event)}
	                            />
	                          </InputGroup>
	                          {errors.body &&
	          					<div className="invalid-form-input-message">
	              					<span>{errors.body}</span>
		                      	</div>
			                    }
	                        </FormGroup>      
	                    </div>
	                    <div className="modal-footer modal-footer-lean">
	                        <div>
		                        <Button 
		                        	color="primary" 
		                        	type="submit"
		                        	disabled={loading}
		                        	onClick={(event) => this.handleSubmit(event)}
		                        >
		                        	{loading ? <div className="html-spinner"></div> : "Post"}
		                        </Button>
		                        {
		                        	this.state.body &&
		                        	<ProgressRing radius={16} stroke={2} progress={this.state.progress} count={this.state.charCount} strokeColor={this.state.strokeColor}/>
		                        }
	                        </div>
	                      	<Button
	                            className="ml-auto"
	                            color="link"
	                            data-dismiss="modal"
	                            type="button"
	                            onClick={this.toggleModal}
	                        >
	                        	Cancel
	                      	</Button>
	                    </div>
	                </Form>
	            </Modal>
	        </Fragment>
		)
	}
}

const mapStateToProps = (state) => ({
	UI: state.UI,
	data: state.data,
	user: state.data
});

const mapActionsToProps = {
	addNewPost,
	clearErrors,
	newPostClick,
	clearPostClick,
	resetSuccessNotification
}

AddPost.propTypes = {
	addNewPost: PropTypes.func.isRequired,
	newPostClick: PropTypes.func.isRequired,
	clearPostClick: PropTypes.func.isRequired,
	UI: PropTypes.object.isRequired,
	resetSuccessNotification: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(AddPost);