import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { createComment } from "../../redux/actions";

const mapStateToProps = state => {
  return {
    isLoggedIn: state.adminTools.isLoggedIn,
    user: state.adminTools.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createComment: (comment, pageId) => {
      dispatch(createComment(comment, pageId));
    }
  };
};

class CommentField extends Component {
  constructor(props) {
    super(props);
    this.state = { comment: "" };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.createComment(this.state.comment, this.props.pageId);
  };

  render() {
    if (!this.props.isLoggedIn) {
      return <div>Please log in to comment.</div>;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          label={'What do you think?'}
          multiline
          required
          fullWidth
          rowsMax="4"
          margin="normal"
          value={this.state.comment}
          onChange={e => this.setState({ comment: e.target.value })}
        />
        <Button type="submit" variant="raised" color="primary">Submit</Button>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentField);
