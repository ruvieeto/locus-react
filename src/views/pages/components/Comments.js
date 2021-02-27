import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Comment Components
import CommentForm from './CommentForm';
import DeleteComment from './DeleteComment';

import {
  Media
} from "reactstrap";

// Post date management
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
//For Dayjs Relative Time plugin to function
dayjs.extend(relativeTime);

class Comments extends Component{
	render(){
		const { 
      user: { 
        credentials: { handle },
        authenticated
      }
    } = this.props;
    
    const { comments, postId } = this.props.post;

    let commentList;
    if(comments){

      commentList = comments.map((comment) => {
      const { body, createdAt, userImage, userHandle, commentId } = comment;

      // Delete post button
      const deleteCommentButton = authenticated && userHandle === handle ? (
        <DeleteComment commentId={commentId} key={commentId} />
        ) : (null)

      return(
        <Media className="media-comment" key={createdAt}>
          <Link to={`/users/${userHandle}`}>
            <img
              alt="..."
              className="avatar avatar-lg media-comment-avatar rounded-circle comment-image"
              src={userImage}
            />
          </Link>
          <Media className="inner-media-container">
            <div className="media-comment-text">   
              <div className="comment-head">
                <Link
                  className="font-weight-600 commenter-name"
                  to={`/users/${userHandle}`}
                >
                  @{userHandle}
                </Link>
                <small className="d-block text-muted">{dayjs(createdAt.toString()).fromNow()}</small>
                <div className="text-right ml-auto">
                  {deleteCommentButton}
                </div>
              </div>
              <p className="text-sm lh-160">
                {body}
              </p>
            </div>
          </Media>
        </Media>
      )
    })
    }

		return(
			<Fragment>
        {
          comments && (
          <div className="mb-1">
            {commentList}
    		    {comments.length > 0 ? (<hr/>):(null)}
          </div>
          )
        }
        <CommentForm postId={postId}/>
			</Fragment>
		)
	}
}

const mapStateToProps = (state) => ({
  user: state.user,
  post: state.data.post
})

Comments.propTypes = {
  comments: PropTypes.array,
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps, null)(Comments);