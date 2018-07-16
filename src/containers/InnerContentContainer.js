import React from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'

import Header from '../components/editable/Header'
import Paragraph from '../components/editable/Paragraph'
import Name from '../components/editable/Name'
import Image from '../components/editable/Image'
import FileUpload from '../components/editable/FileUpload'
import Button from '../components/editable/Button'
import Action from '../components/editable/Action'
import PageNavButton from '../components/editable/PageNavButton'

import SectionEditingActions from '../containers/SectionEditingActions';


const generateContentComponents = (contentJson=[], sectionIndex, onUpdate, onAddContentItem, onDeleteContentItem) => {
  return map(contentJson, (obj, index) => {
    if (!obj) {
      return console.log('Obj is undefined')
    }
    switch (obj.type) {
      case 'header':
      return (
        <Header
          key={index}
          index={index}
          sectionIndex={sectionIndex}
          updateContent={onUpdate}
          deleteContent={onDeleteContentItem}
          text={obj.text}
        />);
      case 'paragraph':
      return (
        <Paragraph
          key={index}
          index={index}
          sectionIndex={sectionIndex}
          updateContent={onUpdate}
          deleteContent={onDeleteContentItem}
          text={obj.text}
        />);
      case 'name':
      return (
        <Name
          key={index}
          index={index}
          sectionIndex={sectionIndex}
          updateContent={onUpdate}
          text={obj.text}
          deleteContent={onDeleteContentItem}
        />);
      case 'image':
      return (
        <Image
          key={index}
          index={index}
          sectionIndex={sectionIndex}
          updateContent={onUpdate}
          source={obj.source}
          caption={obj.caption}
          deleteContent={onDeleteContentItem}
        />);
      case 'file':
      return (
        <FileUpload
          key={index}
          index={index}
          sectionIndex={sectionIndex}
          updateContent={onUpdate}
          filepath={obj.filepath}
          title={obj.title}
          filetype={obj.filetype}
          deleteContent={onDeleteContentItem}
        />);
      case 'button':
      return (
        <Button
          key={index}
          index={index}
          sectionIndex={sectionIndex}
          anchor={obj.anchor}
          link={obj.link}
          updateContent={onUpdate}
          deleteContent={onDeleteContentItem}
        />);
      case 'action':
      return (
        <Action
          key={index}
          index={index}
          sectionIndex={sectionIndex}
          anchor={obj.anchor}
          link={obj.link}
          updateContent={onUpdate}
          deleteContent={onDeleteContentItem}
        />);
      case 'nav_button':
      return (
        <PageNavButton
          key={index}
          index={index}
          sectionIndex={sectionIndex}
          anchor={obj.anchor}
          link={obj.link}
          direction={obj.direction}
          updateContent={onUpdate}
          deleteContent={onDeleteContentItem}
        />);
      default:
      console.log('No component defined for ' + obj.type)
      return null;
    }
  })
}

const InnerContentContainer = (props) => {

  return (
    <div style={{position: 'relative'}}>
      { generateContentComponents(props.content, props.sectionIndex, props.onUpdate, props.onAddContentItem, props.onDeleteContentItem) }
      {
        props.isEditingPage &&
        <SectionEditingActions {...props} />
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isEditingPage: state.adminTools.isEditingPage,
  }
}
export default connect(mapStateToProps, null)(InnerContentContainer);