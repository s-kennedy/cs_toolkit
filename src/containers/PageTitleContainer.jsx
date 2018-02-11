import React from 'react';
import { connect } from 'react-redux'
import { updatePageTitle } from '../redux/actions'
import EditableTitle from '../components/editable/Title'
import DisplayTitle from '../components/display/Title'

function mapStateToProps(state) {
  return {
    title: state.pageData.title,
    isEditingPage: state.adminTools.isEditingPage,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateTitle: (title) => {
      dispatch(updatePageTitle(title))
    }
  }
}


const PageTitleContainer = (props) => {
  const styles = {
    titleContainer: {
      display: 'flex',
      justifyContent: 'center',
      margin: '2rem',
    },
    title: {
      borderBottom: '2px solid #DA291C'
    }
  }

  return (
    <div className='title-container' style={styles.titleContainer}>
      <div className='title' style={styles.title}>
      {
        props.isEditingPage ?
        <EditableTitle text={props.title} updateTitle={props.onUpdateTitle} /> :
        <DisplayTitle text={props.title} />
      }
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PageTitleContainer)
