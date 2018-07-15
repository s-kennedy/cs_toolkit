import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import { updateSectionContent, duplicateSection, deleteSection } from '../redux/actions'
import InnerContentContainer from '../containers/InnerContentContainer';


const styles = {
  container: {
    padding: '3rem 1rem',
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
    }
  }
}

const ReferenceContainer = (props) => {
    return (
      <section className={`reference ${props.classes}`}>
        <Grid container style={styles.container} justify="center">
          <Grid item xs={12} sm={10} md={8}>
            <InnerContentContainer
              sectionIndex={props.index}
              content={props.content}
              onUpdate={props.onUpdateSectionContent}
              onDelete={props.onDelete}
              onDuplicate={props.onDuplicate}
            />
          </Grid>
        </Grid>
      </section>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ReferenceContainer);