import React, { Component, Fragment } from 'react';

// Redux
import { connect } from 'react-redux';
import { addNewPost, clearErrors } from '../../../redux/actions/dataActions';

import PropTypes from 'prop-types';

import {
  Button,
  Modal,
  Form,
  FormGroup,
  Input,
  InputGroup
} from "reactstrap";

class AddPost extends Component {
	state = {
		defaultModal: false,
		body: "",
		errors: {}
  	};

  	toggleModal = () => {
  		this.props.clearErrors();
	    this.setState({
	      defaultModal: !this.state.defaultModal,
	      body: "",
	      errors: {}
	    });
  	};

  	handleChange = (event) => {
  		this.setState({ [event.target.name]: event.target.value });
  	}

  	handleSubmit = (event) => {
  		event.preventDefault();
  		this.props.addNewPost({ body: this.state.body });
  	}

  	UNSAFE_componentWillReceiveProps(nextProps){
  		if(nextProps.UI.errors){
  			this.setState({ errors: nextProps.UI.errors });
  		}

  		if(!nextProps.UI.errors.body && !nextProps.UI.loading){
  			this.setState({
		      defaultModal: !this.state.defaultModal,
		      body: "",
		      errors: {}
		    });
  		}
  	}

	render(){
		const { errors } = this.state;
		const { UI: { loading}} = this.props;

		return(
			<Fragment>
				<Button
		            className="btn-icon"
		            color="primary"
		            id="navbar-post-button"
		            onClick={this.toggleModal}
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
			                        <Button 
			                        	color="primary" 
			                        	type="submit"
			                        	disabled={loading}
			                        	onClick={(event) => this.handleSubmit(event)}
			                        >
			                        	{loading ? <div className="html-spinner"></div> : "Post"}
			                        </Button>
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
	UI: state.UI
});

const mapActionsToProps = {
	addNewPost,
	clearErrors
}

AddPost.propTypes = {
	addNewPost: PropTypes.func.isRequired,
	UI: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(AddPost);