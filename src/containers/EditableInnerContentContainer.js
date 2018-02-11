import React from 'react'
import { map } from 'lodash'

import Header from '../components/editable/Header'
import Paragraph from '../components/editable/Paragraph'
import Name from '../components/editable/Name'
import Image from '../components/editable/Image'
import Button from '../components/editable/Button'
import Action from '../components/editable/Action'
import FontAwesome from 'react-fontawesome';

import SectionContainer from '../containers/SectionContainer';
import ReferenceContainer from '../containers/ReferenceContainer';

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
      default:
      console.log('No component defined for ' + obj.type)
      return <div></div>;
    }
  })
}

const EditableInnerContentContainer = (props) => {
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
      <div className="edit-actions" style={styles.editActions}>
        {
          props.onDuplicate &&
          <div className='edit-icon' style={styles.actionIcon} onClick={handleDuplicate}>
            <FontAwesome name='clone' />
          </div>
        }
        {
          props.onDelete &&
          <div className='edit-icon' style={styles.actionIcon} onClick={handleDelete}>
            <FontAwesome name='trash' />
          </div>
        }
        {
          props.onAddContentItem &&
          <UncontrolledDropdown>
            <DropdownToggle className='edit-icon' style={styles.actionIcon}>
              <FontAwesome name='plus' />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={generateAddContentItemHandler('paragraph')}>
                Paragraph
              </DropdownItem>
              <DropdownItem onClick={generateAddContentItemHandler('header')}>
                Header
              </DropdownItem>
              <DropdownItem onClick={generateAddContentItemHandler('image')}>
                Image
              </DropdownItem>
              <DropdownItem onClick={generateAddContentItemHandler('button')}>
                Button
              </DropdownItem>
              <DropdownItem onClick={generateAddContentItemHandler('action')}>
                Action
              </DropdownItem>
              <DropdownItem onClick={generateAddSectionHandler('section')}>
                Section
              </DropdownItem>
              <DropdownItem onClick={generateAddSectionHandler('call_to_action')}>
                Call To Action
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        }
      </div>
    </div>
  );
}

export default EditableInnerContentContainer;