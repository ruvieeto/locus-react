import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import axios from 'axios';

import dayjs from 'dayjs';

// Redux
import { connect } from 'react-redux';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardImg,
  Modal,
  Row,
  Col
} from "reactstrap";

import ProfileSkeleton from './UserProfileCardSkeleton';

class UserProfileCard extends Component{
  state = {
    profile: null,
    photoModal: false
  }

  togglePhotoModal = () => {
    this.setState({
      photoModal: !this.state.photoModal,
    });
  };

  componentDidMount(props){
    axios.get(`/user/${this.props.handle}`)
      .then(res => {
        this.setState({
          profile: res.data.user
        })
      })
  }

  render(){
    if(!this.state.profile){
      return (<ProfileSkeleton />)
    }

    const { handle, createdAt, website, bio, imgUrl, location } = this.state.profile;

    return(
      <Fragment>
        <Card className="card-profile">
          <Row className="justify-content-center">
            <Col className="order-lg-2" lg="3">
              <div className="card-profile-image">
                  <img
                    alt="..."
                    className="rounded-circle user-page"
                    src={imgUrl}
                    onClick={this.togglePhotoModal}
                  />
              </div>
            </Col>
          </Row>
          <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
            <div className="d-flex justify-content-between">

              { handle === this.props.user.credentials.handle ?
                (
                    <Button
                      className="float-right"
                      color="default"
                      size="sm"
                    >
                      <Link to="/admin/account" className="nochange">
                        Edit
                      </Link>
                    </Button>
                    ) : (<br />)
              }

            </div>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="text-center">
              <h5 className="h3">
                @{handle}
              </h5>
              <div className="h5 mt-4 font-weight-300">
                Joined {dayjs(createdAt).format('MMM YYYY')}
              </div>
              {website && 
                (<div className="h5 font-weight-300">
                  <i className="ni ni-world-2 mr-2" />
                  <a href={website} target="_blank" rel="noopener noreferrer">{website}</a>
                </div>)
              }
              {location &&
              (<div className="h5 mt-1 font-weight-300">
                <i className="ni ni-pin-3 mr-2" />
                {location}
              </div>)
              }
              {bio &&
              (<Fragment>
                  <hr />
                  <div className="h5 description font-weight-300">
                  {bio}
                  </div>
                </Fragment>)
              }
            
            </div>
          </CardBody>
        </Card>
        <Modal
          className="modal-dialog-centered profile-photo-modal"
          size="xl"
          modalTransition={{ timeout: 100 }}
          isOpen={this.state.photoModal}
          toggle={this.togglePhotoModal}
        >
          <Card>
            <CardHeader className="photo-modal-header">
                <button
                  aria-label="Close"
                  className="close"
                  type="button"
                  onClick={this.togglePhotoModal}
                >
                  <span aria-hidden={true}>&times;</span>
                </button>
            </CardHeader>
            <CardImg
              alt="..."
              src={imgUrl}
              top
            />
          </Card>
        </Modal>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

UserProfileCard.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(UserProfileCard);