import React from 'react';
import { connect } from 'react-redux'

import { addBookmark } from '../redux/actions';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import BookmarkIcon from '@material-ui/icons/Stars'
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
  WorkplaceIcon,
  WorkplaceShareButton,
} from 'react-share-stc';

const styles = {
  container: {
    position: 'absolute',
    fontSize: '0.8rem',
  },
  actions: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: '0.2rem 1rem',
    margin: '0.8rem 0.6rem',
    border: '1px solid rgba(0, 0, 0, 0.14)',
  },
  innerItem: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  button: {
    cursor: 'pointer',
    marginLeft: '4px',
    marginRight: '4px',
  },
  iconButton: {
    height: 30,
    width: 30,
    marginLeft: '4px',
    marginRight: '4px',
  },
  muiIcon: {
    fontSize: '28px'
  }
}

const mapStateToProps = state => {
  return {
    content: state.content.header,
    isEditingPage: state.adminTools.isEditingPage,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addBookmark: (pageId) => {
      dispatch(addBookmark(pageId))
    }
  }
}

const PageActionsContainer = (props) => {
  const shareUrl = props.url || ""
  return (
    <Grid container justify="flex-end" style={styles.container}>
      <Grid item style={styles.actions}>
        <Grid container>
          <Grid item style={styles.innerItem}>
            <span>Bookmark:</span>
            <IconButton onClick={() => props.addBookmark(props.pageData.id)} color="secondary" style={styles.iconButton}>
              <BookmarkIcon style={styles.muiIcon} />
            </IconButton>
          </Grid>

          <Grid item style={styles.innerItem}>
            <span>Share: </span>
            <WorkplaceShareButton url={shareUrl} quote={props.pageData.title} style={styles.button}>
              <WorkplaceIcon size={24} round />
            </WorkplaceShareButton>

            <TwitterShareButton title={props.pageData.title} url={shareUrl} style={styles.button}>
              <TwitterIcon size={24} round />
            </TwitterShareButton>

            <FacebookShareButton url={shareUrl} quote={props.pageData.title} style={styles.button}>
              <FacebookIcon size={24} round />
            </FacebookShareButton>

            <WhatsappShareButton url={shareUrl} title={props.pageData.title} style={styles.button}>
              <WhatsappIcon size={24} round />
            </WhatsappShareButton>

            <EmailShareButton url={shareUrl} subject={props.pageData.title} style={styles.button}>
              <EmailIcon size={24} round />
            </EmailShareButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PageActionsContainer)
