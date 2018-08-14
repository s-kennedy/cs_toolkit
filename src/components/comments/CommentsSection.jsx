import React, { Component } from 'react';
import { connect } from "react-redux";
import { map } from 'lodash';
import Grid from '@material-ui/core/Grid';
import CommentField from './CommentField';
import Comment from './Comment';

import {
  deleteComment,
  getCommentsByPage,
} from "../../redux/actions";

const styles = {
  container: {
    padding: '3rem 1rem',
    backgroundColor: '#f3f7f6',
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.adminTools.isLoggedIn,
    user: state.adminTools.user,
    comments: state.comments.comments,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteComment: (comment) => {
      dispatch(deleteComment(comment));
    },
    getCommentsByPage: (pageId) => {
      dispatch(getCommentsByPage(pageId));
    }
  };
};

class CommentsSection extends Component {
  constructor(props) {
    super(props);
    this.state = { comments: [] }
  }

  componentDidMount() {
    this.props.getCommentsByPage(this.props.pageId);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createComment(this.state.comment, this.props.pageId);
  }

  render() {
    const comments = this.props.comments;
    const commentCount = comments ? Object.keys(comments).length : 0;

    return(
      <section id="comments">
        <Grid container style={styles.container} justify="center">
          <Grid item xs={12} sm={10}>
            <h2>{`Comments (${commentCount})`}</h2>
            {
              comments &&
              map(comments, (comment, uid) => <Comment comment={comment} key={uid} />)
            }
            <CommentField pageId={this.props.pageId} />
          </Grid>
        </Grid>
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsSection);
