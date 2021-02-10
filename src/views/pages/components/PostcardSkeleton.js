import React , { Component, Fragment } from 'react';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col
} from "reactstrap";

import noImg from '../../../assets/img/theme/no-img.png'

class PostcardSkeleton extends Component {
  render(){
    const likeButton = (
      <Button
        className="like engage-button like-count"
        onClick={(e)=>{ e.preventDefault() }}
      >
      </Button>
    )

    const commentButton = (
      <Button
        className="like engage-button like-count"
        onClick={(e)=>{ e.preventDefault() }}
      >
      </Button>
    )

    // Delete post button
    const deleteButton = (
      <span className="skeleton-delete"></span>
    )
    const { index } = this.props;

    return(
      <Fragment>
        <Card>
          {index < 1 &&
            <CardHeader>
                <h5 className="h3 mb-0">Activity feed</h5>
            </CardHeader>
          }
          <CardHeader className="d-flex align-items-center">
            <div className="d-flex align-items-center">
                <img
                  alt="..."
                  className="avatar"
                  src={noImg}
                />
              <div className="mx-3">
                <div className="skeleton-line-post-name"></div>
                <small className="d-block">
                  <span className="skeleton-line-p post-date"></span>
                </small>
              </div>
            </div>
            <div className="text-right ml-auto">
              {deleteButton}
            </div>
          </CardHeader>
          <CardBody>
            <p className="skeleton-line-post"></p>
            <p className="skeleton-line-post"></p>
            <p className="mb-4 skeleton-line-post half-post"></p>
            <hr className="thin-rule" />
            <Row className="align-items-center">
              <Col sm="6" className="engagement-bar">
                <div className="icon-actions">
                  {likeButton}
                  {commentButton}
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Fragment>
    )
  }
}

export default PostcardSkeleton;