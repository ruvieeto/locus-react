import React, { Component, Fragment } from  'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { submitComment } from '../../../redux/actions/dataActions';

// Reactstrap components
import {
  Button,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  Media
} from "reactstrap";

class CommentForm extends Component{
	state={
		body: "",
		errors: {}
	}

	UNSAFE_componentWillReceiveProps(nextProps){
		if(nextProps.UI.errors){
			this.setState({ errors: nextProps.UI.errors });
		}
		if(!nextProps.UI.errors.comment && !nextProps.UI.loading){
			this.setState({ body: "" });
		}
	}

	handleSubmit = (event) =>{
		event.preventDefault();
		this.props.submitComment(this.props.postId, {body: this.state.body});
	}

	handleChange = (event) => {
  		this.setState({ [event.target.name]: event.target.value });
  	}

	render(){
		const { imgUrl, authenticated } = this.props;
		const { errors } = this.state;

		if(!authenticated){
			return null
		}

		return(
			<Fragment>
				<Media className="align-items-center">
	                <img
	                  alt="..."
	                  className="avatar avatar-lg rounded-circle mr-4"
	                  src={imgUrl}
	                />
	                <Media body>
	                  <Form onSubmit={this.handleSubmit}>
	                    <InputGroup>
	                      <Input
	                      	name="body"
	                        placeholder="Write your comment..."
	                        rows="1"
	                        type="textarea"
	                        resize="none"
	                        onChange={this.handleChange}
	                        value={this.state.body}
	                      />
	                      <InputGroupAddon addonType="append">
   
	                          <Button
	                            title="Add a comment"
	                            className="submit-comment"
	                            type="submit"
	                          >
	                            <i className="ni ni-send" />
	                          </Button>

	                      </InputGroupAddon>
	                    </InputGroup>
	                  </Form>
	                </Media>
	              </Media>
	              {
	              	errors.comment && 
	              	<div className="invalid-form-input-message">
        				<span>{errors.comment}</span>
                  	</div>
                  }
			</Fragment>
		)
	}
}

const mapStateToProps = (state) => ({
	UI: state.UI,
	authenticated: state.user.authenticated,
	imgUrl: state.user.credentials.imgUrl
})

CommentForm.propTypes = {
	submitComment: PropTypes.func.isRequired,
	UI: PropTypes.object.isRequired,
	authenticated: PropTypes.bool.isRequired,
	postId: PropTypes.string.isRequired,
	imgUrl: PropTypes.string.isRequired
}

export default connect(mapStateToProps, { submitComment })(CommentForm);