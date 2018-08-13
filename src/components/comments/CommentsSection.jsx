import React, { Component } from 'react';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import CommentField from './CommentField';
import Comment from './Comment';

import {
  deleteComment,
} from "../../redux/actions";

const styles = {
  container: {
    padding: '3rem 1rem',
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.adminTools.isLoggedIn,
    user: state.adminTools.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteComment: (comment) => {
      dispatch(deleteComment(comment));
    }
  };
};

class CommentsSection extends Component {
  constructor(props) {
    super(props);
    this.state = { comments: [] }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createComment(this.state.comment, this.props.pageId);
  }

  render() {

    return(
      <section id="comments">
        <Grid container style={styles.container} justify="center">
          <Grid item xs={12} sm={10}>
            <h2>{`Comments (${this.state.comments.length})`}</h2>
            {
              this.state.comments.map(comment => <Comment comment={comment} key={comment.id} />)
            }
            <CommentField pageId={this.props.pageId} />
          </Grid>
        </Grid>
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsSection);
