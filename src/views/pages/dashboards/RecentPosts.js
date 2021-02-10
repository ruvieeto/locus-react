import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';

// core components
import Postcard from '../components/Postcard';
import PostcardSkeleton from '../components/PostcardSkeleton';

// Redux
import { connect } from 'react-redux';
import { getPosts } from '../../../redux/actions/dataActions';

class RecentPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null
    };
  }

  componentDidMount(props){
      this.props.getPosts();
  }

  render() {
    const loadingPosts = Array.from({ length: 4 }).map((item, index) => {
        return <PostcardSkeleton index={index} key={index}/>
      })

    const { posts, loading } = this.props.data;
    const { loading: userLoading } =  this.props.user;

    if(loading || userLoading){
      return loadingPosts
    }

    if(posts === null){
      return loadingPosts
    }

    let recentPostsMarkup;
    if(posts){
      recentPostsMarkup = posts.map((post, index) => <Postcard key={post.postId} index={index} post={post} />)
    }

    return (
      <Fragment>
        {posts && recentPostsMarkup}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user
});

const mapActionsToProps = {
  getPosts
}

RecentPosts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(RecentPosts);
