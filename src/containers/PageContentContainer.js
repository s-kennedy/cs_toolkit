import React from 'react';

import { connect } from 'react-redux';
import { map } from 'lodash';

import { updatePageContent } from '../redux/actions';

import PageNavigation from '../containers/PageNavigation';
import SectionContainer from '../containers/SectionContainer';
import ReferenceContainer from '../containers/ReferenceContainer';
import SectionEditingActions from '../containers/SectionEditingActions';


const generateContentComponents = (contentJson=[], sectionIndex, onUpdate, onAddContentItem, onDeleteContentItem) => {
  return map(contentJson, (obj, index) => {
    if (!obj) {
      return console.log('Obj is undefined')
    }
    switch (obj.type) {
      case 'section':
      return(
        <SectionContainer
          key={index}
          index={index}
          sectionIndex={sectionIndex}
          updateContent={onUpdate}
          addContent={onAddContentItem}
          content={obj.content}
        />);
      case 'call_to_action':
      return (
        <SectionContainer
          key={index}
          index={index}
          sectionIndex={sectionIndex}
          updateContent={onUpdate}
          addContent={onAddContentItem}
          content={obj.content}
          cta={true}
        />);
      case 'reference':
      return (
        <ReferenceContainer
          key={index}
          index={index}
          sectionIndex={sectionIndex}
          updateContent={onUpdate}
          addContent={onAddContentItem}
          content={obj.content}
        />);
      case 'page_navigation':
      return (
        <PageNavigation
          key={index}
          index={index}
          sectionIndex={sectionIndex}
          updateContent={onUpdate}
          content={obj.content}
        />);
      default:
      console.log('No component defined for ' + obj.type)
      return null;
    }
  })
}

const PageContentContainer = (props) => {

  return (
    <div style={{ position: "relative" }}>
      { generateContentComponents(props.content, props.sectionIndex, props.onUpdate, props.onAddContentItem, props.onDeleteContentItem) }
      <SectionEditingActions {...props} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    content: state.content.body,
    isEditingPage: state.adminTools.isEditingPage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdatePageContent: (content) => {
      dispatch(updatePageContent(content))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageContentContainer);