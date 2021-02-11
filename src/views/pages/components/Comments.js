import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Comment Form
import CommentForm from './CommentForm';

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
		const { comments, postId } = this.props;

    let commentList;
    if(comments){
      commentList = comments.map((comment) => {
      const { body, createdAt, userImage, userHandle } = comment;

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

Comments.propTypes = {
	comments: PropTypes.array
}

export default Comments;