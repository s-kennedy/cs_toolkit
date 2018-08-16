import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import {
  updateSectionContent,
  duplicateSection,
  deleteSection,
  addContentItem,
  deleteContentItem,
  addSection,
  saveChanges,
} from '../redux/actions'
import InnerContentContainer from '../containers/InnerContentContainer';

const allStyles = {
  section: {
    container: {
      padding: '3rem 1rem',
    }
  },
  cta: {
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  pageNav: {
    container: {
      padding: "3rem",
      background: "#000",
      color: '#FFF'
    },
    innerContainer: {
      display: "flex",
      justifyContent: "space-between",
      flex: '1',
      position: 'relative'
    }
  }
}


const mapStateToProps = (state) => {
  return {
    isEditingPage: state.adminTools.isEditingPage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateSectionContent: (sectionIndex, contentIndex, newContent) => {
      dispatch(updateSectionContent(sectionIndex, contentIndex, newContent))
    },
    onDuplicate: (sectionIndex) => {
      dispatch(duplicateSection(sectionIndex))
    },
    onDelete: (sectionIndex) => {
      dispatch(deleteSection(sectionIndex))
    },
    onAddContentItem: (sectionIndex, contentType) => {
      dispatch(addContentItem(sectionIndex, contentType))
    },
    onDeleteContentItem: (sectionIndex, contentIndex) => {
      dispatch(deleteContentItem(sectionIndex, contentIndex))
    },
    onAddSection: (sectionIndex, sectionType) => {
      dispatch(addSection(sectionIndex, sectionType))
    },
    saveChanges: (innerFunction) => {
      dispatch(saveChanges(innerFunction))
    }
  }
}

const SectionContainer = (props) => {
  const styles = allStyles[props.sectionType];

    return (
      <section className={`${props.sectionType === "cta" ? 'call-to-action' : 'section'} ${props.classes}`}>
        <Grid container style={styles.container} justify="center">
          <Grid item xs={12} sm={10}>
            <InnerContentContainer
              sectionIndex={props.index}
              content={props.content}
              onUpdate={props.onUpdateSectionContent}
              onDelete={props.onDelete}
              onDuplicate={props.onDuplicate}
              onAddContentItem={props.onAddContentItem}
              onDeleteContentItem={props.onDeleteContentItem}
              onAddSection={props.onAddSection}
              saveChanges={props.saveChanges}
              style={styles.innerContainer}
            />
          </Grid>
        </Grid>
      </section>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionContainer);