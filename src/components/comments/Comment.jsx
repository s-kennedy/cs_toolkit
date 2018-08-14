import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import UserIcon from "@material-ui/icons/AccountCircle";
import { withStyles } from "@material-ui/core/styles";

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
  }
});

const Comment = props => {
  const user = props.comment.user;
  const date = new Date(props.comment.timestamp).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  });

  return (
    <Grid container className={props.classes.commentCard}>
      <Grid item xs={12}>
        <div className={props.classes.container}>
          <div className="author" className={props.classes.author}>
            {user.photoURL ? (
              <img
                src={user.photoURL}
                className={props.classes.img}
                alt={user.displayName}
                title={user.displayName}
              />
            ) : (
              <UserIcon className={props.classes.img} />
            )}
          </div>
          <div className={props.classes.comment}>
            <Paper className="comment-body" className={props.classes.paper}>
              <div className={props.classes.name}>
                <span>{`${user.displayName}:`}</span>
              </div>
              {props.comment.text}
            </Paper>
            <div className={props.classes.date}>
              <em>{`${date}`}</em>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Comment);
