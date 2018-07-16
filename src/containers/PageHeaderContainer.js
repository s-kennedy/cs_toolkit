import React from 'react';
import { connect } from 'react-redux'

import { updatePageHeader } from '../redux/actions'

import TitleHolder from '../components/editable/TitleHolder'
import Title from '../components/editable/Title'
import Subtitle from '../components/editable/Subtitle'
import BackgroundImage from '../components/editable/BackgroundImage'


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


const PageHeaderContainer = (props) => {
  const imageSrc = props.content && props.content.image ?  props.content.image : defaultImage;

  const updateTitle = text => {
    props.updatePageHeader({ title: text })
  }

  const updateSubtitle = text => {
    props.updatePageHeader({ subtitle: text })
  }

  return (
    <BackgroundImage image={imageSrc} handleSave={props.updatePageHeader}>
      <TitleHolder>
        <Title text={props.content.title} updateTitle={updateTitle} />
        <Subtitle text={props.content.subtitle} updateTitle={updateSubtitle} />
      </TitleHolder>
    </BackgroundImage>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PageHeaderContainer)
