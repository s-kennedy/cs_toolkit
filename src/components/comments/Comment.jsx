import React from 'react';
import Grid from '@material-ui/core/Grid';

const Comment = props => {
  return(
    <Grid container>
      <Grid item xs={12}>
        <p>{`${props.comment.user} - ${props.comment.timestamp}`}</p>
        <p>{props.comment.text}</p>
      </Grid>
    </Grid>
  )
}

export default Comment;