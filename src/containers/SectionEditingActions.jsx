import React from "react";
import FontAwesome from "react-fontawesome";

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";


const SectionEditingActions = props => {
  const styles = {
    editActions: {
      display: "flex",
      justifyContent: "center",
      position: "absolute",
      bottom: "0",
      right: '45%',
      zIndex: '99'
    },
    actionIcon: {
      background: "#000",
      color: "#fff",
      border: "1px solid #fff",
      height: "30px",
      width: "30px",
      borderRadius: "30px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      margin: "5px",
    }
  };

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
            <DropdownItem onClick={generateAddContentItemHandler('file')}>
              File
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
  );
};

export default SectionEditingActions;
