import React from "react";
import { connect } from "react-redux";

import {
  updateSectionContent,
  duplicateSection,
  deleteSection,
  addContentItem,
  deleteContentItem,
  addSection
} from "../redux/actions";

import InnerContentContainer from '../containers/InnerContentContainer';

const styles = {
  container: {
    padding: "3rem",
    background: "#000",
    color: '#FFF'
  },
  innerContainer:{
    display: "flex",
    justifyContent: "space-between",
    flex: '1',
    position: 'relative'
  }
};

const mapStateToProps = state => {
  return {
    isEditingPage: state.adminTools.isEditingPage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateSectionContent: (sectionIndex, contentIndex, newContent) => {
      dispatch(updateSectionContent(sectionIndex, contentIndex, newContent));
    },
    onDuplicate: sectionIndex => {
      dispatch(duplicateSection(sectionIndex));
    },
    onDelete: sectionIndex => {
      dispatch(deleteSection(sectionIndex));
    },
    onAddContentItem: (sectionIndex, contentType) => {
      dispatch(addContentItem(sectionIndex, contentType));
    },
    onDeleteContentItem: (sectionIndex, contentIndex) => {
      dispatch(deleteContentItem(sectionIndex, contentIndex));
    },
    onAddSection: (sectionIndex, sectionType) => {
      dispatch(addSection(sectionIndex, sectionType));
    }
  };
};

const PageNagivation = props => {
  const innerContainerStyles = (props.content.length === 2) ? styles.innerContainer : { ...styles.innerContainer, justifyContent: 'center'}
  return (
    <section className="page-navigation" style={styles.container}>
      <InnerContentContainer
        sectionIndex={props.index}
        content={props.content}
        onUpdate={props.onUpdateSectionContent}
        onDelete={props.onDelete}
        onDuplicate={props.onDuplicate}
        onAddContentItem={props.onAddContentItem}
        onDeleteContentItem={props.onDeleteContentItem}
        onAddSection={props.onAddSection}
        styles={innerContainerStyles}
      />
    </section>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PageNagivation);
