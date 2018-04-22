import React from 'react'

import { connect } from 'react-redux'
import { updateSectionContent, duplicateSection, deleteSection } from '../redux/actions'
import InnerContentContainer from '../containers/InnerContentContainer';


const styles = {
  container: {
    padding: '3rem',
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
        <div style={styles.container} className='container col-xs-12 col-sm-8'>
          <InnerContentContainer
            sectionIndex={props.index}
            content={props.content}
            onUpdate={props.onUpdateSectionContent}
            onDelete={props.onDelete}
            onDuplicate={props.onDuplicate}
          />
        </div>
      </section>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ReferenceContainer);