import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import {
  updateSectionContent,
  duplicateSection,
  deleteSection,
  addContentItem,
  deleteContentItem,
  addSection
} from '../redux/actions'
import InnerContentContainer from '../containers/InnerContentContainer';


const sectionStyles = {
  container: {
    padding: '3rem 1rem',
  }
}


const ctaStyles = {
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
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
    }
  }
}

const SectionContainer = (props) => {
  const styles = props.cta ? ctaStyles : sectionStyles;

    return (
      <section className={`${props.cta ? 'call-to-action' : 'section'} ${props.classes}`}>
        <Grid container style={styles.container} justify="center">
          <Grid item xs={12} sm={10} md={8}>
            <InnerContentContainer
              sectionIndex={props.index}
              content={props.content}
              onUpdate={props.onUpdateSectionContent}
              onDelete={props.onDelete}
              onDuplicate={props.onDuplicate}
              onAddContentItem={props.onAddContentItem}
              onDeleteContentItem={props.onDeleteContentItem}
              onAddSection={props.onAddSection}
            />
          </Grid>
        </Grid>
      </section>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionContainer);