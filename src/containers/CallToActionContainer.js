import React from 'react'

import { connect } from 'react-redux'
import { updateSectionContent } from '../redux/actions'
import InnerContentContainer from '../containers/InnerContentContainer';
import EditableInnerContentContainer from '../containers/EditableInnerContentContainer';


const styles = {
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
    }
  }
}

const CallToActionContainer = (props) => {
  return (
    <section className={`call-to-action ${props.classes}`}>
      <div style={styles.container} className='container col-xs-12 col-sm-8'>
        {
          props.isEditingPage ?
          <EditableInnerContentContainer
            sectionIndex={props.index}
            content={props.content}
            onUpdate={props.onUpdateSectionContent}
          /> :
          <InnerContentContainer content={props.content} />
        }
      </div>
    </section>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CallToActionContainer);