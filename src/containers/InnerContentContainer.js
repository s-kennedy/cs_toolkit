import React from "react";
import { connect } from "react-redux";
import { map } from "lodash";

import Header from "../components/editable/Header";
import Paragraph from "../components/editable/Paragraph";
import Name from "../components/editable/Name";
import Image from "../components/editable/Image";
import FileUpload from "../components/editable/FileUpload";
import Button from "../components/editable/Button";
import Action from "../components/editable/Action";
import PageNavButton from "../components/editable/PageNavButton";

import SectionEditingActions from "../containers/SectionEditingActions";

const generateContentComponents = (
  contentJson = [],
  sectionIndex,
  onUpdate,
  saveChanges,
  onAddContentItem,
  onDeleteContentItem,
  isEditing
) => {
  return map(contentJson, (obj, index) => {
    if (!obj) {
      return console.log("Obj is undefined");
    }
    switch (obj.type) {
      case "header":
        return (
          <Header
            key={index}
            index={index}
            sectionIndex={sectionIndex}
            updateContent={onUpdate}
            saveChanges={saveChanges}
            deleteContent={onDeleteContentItem}
            text={obj.text}
            isEditing={isEditing}
          />
        );
      case "paragraph":
        return (
          <Paragraph
            key={index}
            index={index}
            sectionIndex={sectionIndex}
            updateContent={onUpdate}
            saveChanges={saveChanges}
            deleteContent={onDeleteContentItem}
            text={obj.text}
            isEditing={isEditing}
          />
        );
      case "name":
        return (
          <Name
            key={index}
            index={index}
            sectionIndex={sectionIndex}
            updateContent={onUpdate}
            saveChanges={saveChanges}
            text={obj.text}
            deleteContent={onDeleteContentItem}
            isEditing={isEditing}
          />
        );
      case "image":
        return (
          <Image
            key={index}
            index={index}
            sectionIndex={sectionIndex}
            updateContent={onUpdate}
            saveChanges={saveChanges}
            source={obj.source}
            caption={obj.caption}
            deleteContent={onDeleteContentItem}
            isEditing={isEditing}
          />
        );
      case "file":
        return (
          <FileUpload
            key={index}
            index={index}
            sectionIndex={sectionIndex}
            updateContent={onUpdate}
            saveChanges={saveChanges}
            filepath={obj.filepath}
            title={obj.title}
            filetype={obj.filetype}
            deleteContent={onDeleteContentItem}
            isEditing={isEditing}
          />
        );
      case "button":
        return (
          <Button
            key={index}
            index={index}
            sectionIndex={sectionIndex}
            anchor={obj.anchor}
            link={obj.link}
            updateContent={onUpdate}
            saveChanges={saveChanges}
            deleteContent={onDeleteContentItem}
            isEditing={isEditing}
          />
        );
      case "action":
        return (
          <Action
            key={index}
            index={index}
            sectionIndex={sectionIndex}
            anchor={obj.anchor}
            link={obj.link}
            updateContent={onUpdate}
            saveChanges={saveChanges}
            deleteContent={onDeleteContentItem}
            isEditing={isEditing}
          />
        );
      case "nav_button":
        return (
          <PageNavButton
            key={index}
            index={index}
            sectionIndex={sectionIndex}
            anchor={obj.anchor}
            link={obj.link}
            direction={obj.direction}
            updateContent={onUpdate}
            saveChanges={saveChanges}
            deleteContent={onDeleteContentItem}
            isEditing={isEditing}
          />
        );
      default:
        console.log("No component defined for " + obj.type);
        return null;
    }
  });
};

const InnerContentContainer = props => {
  return (
    <div style={{ ...props.style }}>
      {generateContentComponents(
        props.content,
        props.sectionIndex,
        props.onUpdate,
        props.saveChanges,
        props.onAddContentItem,
        props.onDeleteContentItem,
        props.isEditingPage
      )}
      {props.isEditingPage && <SectionEditingActions {...props} />}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isEditingPage: state.adminTools.isEditingPage
  };
};
export default connect(mapStateToProps, null)(InnerContentContainer);
