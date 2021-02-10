import React, { Component } from 'react';

import {
  Button,
  Card,
  CardHeader,
  CardImg,
  CardBody,
  Row,
  Col
} from "reactstrap";

import noImg from '../../../assets/img/theme/no-img.png';

class ProfileCardSkeleton extends Component{

  render(){
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
                <img
                  alt="..."
                  className="rounded-circle"
                  src={noImg}
                />
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
              View
            </Button>
            <Button
              className="float-right"
              color="default"
              size="sm"
            >
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardBody className="pt-0">
          <div className="text-center">
            <h5 className="h3">
              <div className="skeleton-line-h2"></div>
            </h5>
            <div className="h5 mt-4 font-weight-300"> {/**/}
              <div className="skeleton-line-p"></div>
            </div>
            <div className="h5 font-weight-300">
              <div className="skeleton-line-p"></div>
            </div>
            <div className="h5 description font-weight-300">
              <div className="skeleton-line-p bio"></div>
            </div>
            <div className="h5 mt-4 font-weight-300">
              <div className="skeleton-line-p"></div>
            </div>
          </div>
        </CardBody>
      </Card>
    )
  }
}

export default ProfileCardSkeleton;