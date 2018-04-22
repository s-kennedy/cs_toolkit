import React from 'react'
import { map } from 'lodash'

import Header from '../components/editable/Header'
import Paragraph from '../components/editable/Paragraph'
import Name from '../components/editable/Name'
import Image from '../components/editable/Image'
import FileUpload from '../components/editable/FileUpload'
import Button from '../components/editable/Button'
import Action from '../components/editable/Action'

import SectionEditingActions from '../containers/SectionEditingActions';

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';


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
          url={obj.url}
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
  const styles = {
    editActions: {
      display: 'flex',
      justifyContent: 'center'
    },
    actionIcon: {
      background: '#F2A900', // mustard
      color: 'white',
      height: '30px',
      width: '30px',
      borderRadius: '30px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '1',
      cursor: 'pointer',
      margin: '5px',
      border: 'none',
    }
  }

  const handleDuplicate = () => {
    props.onDuplicate(props.sectionIndex)
  }

  const handleDelete = () => {
    props.onDelete(props.sectionIndex)
  }

  const generateAddContentItemHandler = (contentType) => {
    return () => props.onAddContentItem(props.sectionIndex, contentType)
  }

  const generateAddSectionHandler = (sectionType) => {
    return () => props.onAddSection(props.sectionIndex, sectionType)
  }

  return (
    <div>
      { generateContentComponents(props.content, props.sectionIndex, props.onUpdate, props.onAddContentItem, props.onDeleteContentItem) }
      <SectionEditingActions {...props} />
    </div>
  );
}

export default InnerContentContainer;