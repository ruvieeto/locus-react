import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";

// reactstrap components
import { Button } from "reactstrap";

//Redux
import { connect } from 'react-redux';
import { deleteComment, clearPostClick } from '../../../redux/actions/dataActions';

class DeleteComment extends Component {
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
		          style={{ display: "block", marginTop: "150px", boxShadow: "0px 0px 2rem 5px rgba(136, 152, 170, 0.3)" }}
		          title="Are you sure?"
		          onConfirm={()=>this.props.deleteComment(this.props.commentId)}
		          onCancel={this.hideAlert}
		          confirmBtnBsStyle="danger"
		          confirmBtnText="Yes, delete it!"
		          btnSize=""
		          focusCancelBtn={true}
		          hideOverlay={true}
		        >
		          You won't be able to recover this comment!
		        </ReactBSAlert>
	      	)
    	});

    	this.props.clearPostClick()
  	};

	render(){
		return(
			<Fragment>
				{this.state.alert}
				<Button
			        className="btn-icon"
			        color="danger"
			        size="sm"
			        type="button"
			        onClick={this.warningAlert}
			    >
			        <span className="btn-inner--icon">
			          <i className="fas fa-trash" />
			        </span>
			    </Button>
		    </Fragment>
		)
	}
}

DeleteComment.propTypes = {
	deleteComment: PropTypes.func.isRequired,
	commentId: PropTypes.string.isRequired,
	clearPostClick: PropTypes.func.isRequired
}

const mapActionsToProps = {
	deleteComment,
	clearPostClick
}

export default connect(null, mapActionsToProps)(DeleteComment);