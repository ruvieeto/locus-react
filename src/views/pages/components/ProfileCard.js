import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import dayjs from 'dayjs';

// Redux
import { connect } from 'react-redux';

import {
  Button,
  Card,
  CardHeader,
  CardImg,
  CardBody,
  Row,
  Col
} from "reactstrap";

import Skeleton from './ProfileCardSkeleton';

class ProfileCard extends Component{

  render(){
    const { user: { loading } } = this.props;

    if(loading){
      return (<Skeleton />)
    }

    const {
      user: { 
        credentials: { handle, createdAt, website, bio, imgUrl, location }
      }
    } = this.props;

    return(
      <Card className="card-profile card-profile-home">
        <CardImg
          alt="..."
          src={require("assets/img/theme/img-1-1000x600.jpg")}
          top
        />
        <Row className="justify-content-center">
          <Col className="order-lg-2" lg="3">
            <div className="card-profile-image">
              <Link to={`/users/${handle}`}>
                <img
                  alt="..."
                  className="rounded-circle home-page-image"
                  src={imgUrl}
                />
              </Link>
            </div>
          </Col>
        </Row>
        <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
          <div className="d-flex justify-content-between">
            <Button
              className="mr-4"
              color="info"
              size="sm"
            >
              <Link to={`/users/${handle}`} className="nochange">
              View
              </Link>
            </Button>
            <Button
              className="float-right"
              color="default"
              size="sm"
            >
              <Link to="/admin/account" className="nochange">
                Edit
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardBody className="pt-0">
          <div className="text-center">
            <h5 className="h3">
              @{handle}
            </h5>
            <div className="h5 mt-4 font-weight-300"> {/**/}
              Joined {dayjs(createdAt).format('MMM YYYY')}
            </div>
            {website && 
              (<div className="h5 font-weight-300">
                <i className="ni ni-world-2 mr-2" />
                <a href={website} target="_blank" rel="noopener noreferrer">{website}</a>
              </div>)
            }
            {bio &&
            (<div className="h5 description font-weight-300"> {/*h5 mt-4 font-weight-300*/}
              {bio}
            </div>)
            }
            {location &&
            (<div className="h5 mt-4 font-weight-300">
              <i className="ni ni-pin-3 mr-2" />
              {location}
            </div>)
            }
          </div>
        </CardBody>
      </Card>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

ProfileCard.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(ProfileCard);