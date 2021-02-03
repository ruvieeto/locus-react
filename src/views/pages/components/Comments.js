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

		// if(!comments){
		// 	return null
		// }

		const commentList = comments.map((comment) => {
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

		return(
			<Fragment>
				{/*Comments start*/}
	            <div className="mb-1">
	            	{commentList}
					{ comments.length ? <hr/> : null }
	            	<CommentForm postId={postId}/>
	            </div>
          		{/*Comments End*/}
			</Fragment>
		)
	}
}

Comments.propTypes = {
	comments: PropTypes.array.isRequired
}

export default Comments;

/* 
<Media className="media-comment">
    <img
      alt="..."
      className="avatar avatar-lg media-comment-avatar rounded-circle"
      src={require("assets/img/theme/team-1.jpg")}
    />
    <Media>
      	<div className="media-comment-text">
            <div className="comment-head">
            	<h6 className="h5 mt-0">Michael Lewis</h6>
            	<small className="d-block text-muted mb-2">3 days ago</small>
            </div>
            <p className="text-sm lh-160">
              Cras sit amet nibh libero nulla vel metus
              scelerisque ante sollicitudin. Cras purus odio
              vestibulum in vulputate viverra turpis.
            </p>
    	</div>
    </Media>
	</Media>
*/

/*
<Media className="media-comment">
<img
  alt="..."
  className="avatar avatar-lg media-comment-avatar rounded-circle"
  src={require("assets/img/theme/team-1.jpg")}
/>
<Media>
  <div className="media-comment-text">
  <div className="comment-head">
    <h6 className="h5 mt-0">Michael Lewis</h6>
    <small className="d-block text-muted mb-2">3 days ago</small>
  </div>
    <p className="text-sm lh-160">
      Cras sit amet nibh libero nulla vel metus
      scelerisque ante sollicitudin. Cras purus odio
      vestibulum in vulputate viverra turpis.
    </p>
  </div>
</Media>
</Media>
<Media className="media-comment">
<img
  alt="..."
  className="avatar avatar-lg media-comment-avatar rounded-circle"
  src={require("assets/img/theme/team-2.jpg")}
/>
<Media>
  <div className="media-comment-text">
    <h6 className="h5 mt-0">Jessica Stones</h6>
    <p className="text-sm lh-160">
      Cras sit amet nibh libero, in gravida nulla. Nulla
      vel metus scelerisque ante sollicitudin. Cras purus
      odio, vestibulum in vulputate at, tempus viverra
      turpis.
    </p>
  </div>
</Media>
</Media>
<Media className="media-comment">
<img
  alt="..."
  className="avatar avatar-lg media-comment-avatar rounded-circle"
  src={require("assets/img/theme/team-1.jpg")}
/>
<Media>
  <div className="media-comment-text">
    <h6 className="h5 mt-0">Michael Lewis</h6>
    <p className="text-sm lh-160">
      Cras sit amet nibh libero nulla vel metus
      scelerisque ante sollicitudin. Cras purus odio
      vestibulum in vulputate viverra turpis.
    </p>
  </div>
</Media>
</Media>
<Media className="media-comment">
<img
  alt="..."
  className="avatar avatar-lg media-comment-avatar rounded-circle"
  src={require("assets/img/theme/team-1.jpg")}
/>
<Media>
  <div className="media-comment-text">
    <h6 className="h5 mt-0">Michael Lewis</h6>
    <p className="text-sm lh-160">
      Cras sit amet nibh libero nulla vel metus
      scelerisque ante sollicitudin. Cras purus odio
      vestibulum in vulputate viverra turpis.
    </p>
  </div>
</Media>
</Media>
<Media className="media-comment">
<img
  alt="..."
  className="avatar avatar-lg media-comment-avatar rounded-circle"
  src={require("assets/img/theme/team-1.jpg")}
/>
<Media>
  <div className="media-comment-text">
    <h6 className="h5 mt-0">Michael Lewis</h6>
    <p className="text-sm lh-160">
      Cras sit amet nibh libero nulla vel metus
      scelerisque ante sollicitudin. Cras purus odio
      vestibulum in vulputate viverra turpis.
    </p>
  </div>
</Media>
</Media>
*/