import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import UserIcon from "@material-ui/icons/AccountCircle";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

import { createComment, updateCommentInput } from "../../redux/actions";

const styles = theme => ({
  commentCard: {
    marginBottom: "1rem"
  },
  paper: {
    padding: "1rem"
  },
  date: {
    fontSize: "0.8rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    color: "#404040"
  },
  author: {
    height: "56px",
    width: "56px",
    borderRadius: "56px",
    objectFit: "cover",
    overflow: "hidden",
    flexShrink: "0"
  },
  img: {
    height: "100%",
    width: "100%",
    color: theme.palette.error.main
  },
  container: {
    display: "flex"
  },
  comment: {
    flexGrow: "1",
    marginLeft: "1rem"
  },
  name: {
    fontSize: "0.8rem",
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.primary.dark
  },
  button: {
    float: 'right',
    marginTop: '10px',
  }
});

const mapStateToProps = state => {
  return {
    isLoggedIn: state.adminTools.isLoggedIn,
    user: state.adminTools.user,
    comment: state.comments.input,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createComment: (comment, pageId) => {
      dispatch(createComment(comment, pageId));
    },
    updateCommentInput: (input) => {
      dispatch(updateCommentInput(input));
    }
  };
};

class CommentField extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.createComment(this.props.comment, this.props.pageId);
  };

  render() {
    if (!this.props.isLoggedIn) {
      return <div>Please sign in to comment.</div>;
    }

    const { user, classes } = this.props;

    return (
      <Grid container className={classes.commentCard}>
        <Grid item xs={12}>
          <form onSubmit={this.handleSubmit}>
          <div className={classes.container}>
            <div className={classes.author}>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  className={classes.img}
                  alt={user.displayName}
                  title={user.displayName}
                />
              ) : (
                <UserIcon className={classes.img} />
              )}
            </div>
            <div className={classes.comment}>
              <Paper className={classes.paper}>
                <TextField
                  label={'What do you think?'}
                  multiline
                  required
                  fullWidth
                  rowsMax="4"
                  margin="dense"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.props.comment}
                  onChange={e => this.props.updateCommentInput(e.target.value)}
                />
              </Paper>
              <div className={classes.button}>
                <Button type="submit" variant="raised" color="primary">Submit</Button>
              </div>
            </div>
          </div>
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CommentField));
