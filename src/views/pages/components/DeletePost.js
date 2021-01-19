import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";

// reactstrap components
import { Button } from "reactstrap";

//Redux
import { connect } from 'react-redux';
import { deletePost } from '../../../redux/actions/dataActions';

class DeletePost extends Component {
	state = {
		alert: null
	}

	hideAlert = () => {
	    this.setState({
	      alert: null
	    });
  	};

	warningAlert = () => {
    	this.setState({
	    	alert: (
		        <ReactBSAlert
		          warning
		          showCancel
		          style={{ display: "block", marginTop: "100px" }}
		          title="Are you sure?"
		          onConfirm={()=>this.props.deletePost(this.props.postId)}
		          onCancel={this.hideAlert}
		          confirmBtnBsStyle="danger"
		          confirmBtnText="Yes, delete it!"
		          btnSize=""
		          focusCancelBtn={true}
		        >
		          You will not be able to recover this post!
		        </ReactBSAlert>
	      	)
    	});
  	};

	render(){
		return(
			<Fragment>
				{this.state.alert}
				<Button
			        className="btn-icon"
			        color="primary"
			        size="sm"
			        type="button"
			        onClick={this.warningAlert}
			    >
			        <span className="btn-inner--icon mr-1">
			          <i className="ni ni-fat-remove" />
			        </span>
			    	<span className="btn-inner--text">Delete</span>
			    </Button>
		    </Fragment>
		)
	}
}

DeletePost.propTypes = {
	deletePost: PropTypes.func.isRequired,
	postId: PropTypes.string.isRequired
}

export default connect(null, { deletePost })(DeletePost);