import React from 'react';
import { connect } from 'react-redux'
import { updatePageHeader } from '../redux/actions'
import EditableTitleWithHolder from '../components/editable/TitleWithHolder'
import EditableSubtitleWithHolder from '../components/editable/SubtitleWithHolder'
import EditableHeaderImage from '../components/editable/HeaderImage'
import DisplayTitleWithHolder from '../components/display/TitleWithHolder'
import DisplaySubtitleWithHolder from '../components/display/SubtitleWithHolder'
import DisplayHeaderImage from '../components/display/HeaderImage'
import { Jumbotron } from 'reactstrap';

import defaultImage from '../assets/img/home_header.jpg';

function mapStateToProps(state) {
  return {
    content: state.content.header,
    isEditingPage: state.adminTools.isEditingPage,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updatePageHeader: (data) => {
      dispatch(updatePageHeader(data))
    }
  }
}

const styles = {
  titleWrapper: {
    display: 'flex',
    justifyContent: 'center'
  }
}


const PageHeaderContainer = (props) => {
  const imageSrc = props.content && props.content.image ?  props.content.image : defaultImage;

  if (props.isEditingPage) {
    return (
      <EditableHeaderImage image={imageSrc} updateHeader={props.updatePageHeader}>
        <div style={styles.titleWrapper}>
          <EditableTitleWithHolder text={props.content.title} updateHeader={props.updatePageHeader} />
          <EditableSubtitleWithHolder text={props.content.subtitle} updateHeader={props.updatePageHeader} />
        </div>
      </EditableHeaderImage>
    )
  } else {
    return (
      <DisplayHeaderImage image={imageSrc}>
        <div style={styles.titleWrapper}>
          <DisplayTitleWithHolder>
            <h1>{props.content.title}</h1>
            <h3>{props.content.subtitle}</h3>
          </DisplayTitleWithHolder>
        </div>
      </DisplayHeaderImage>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageHeaderContainer)
