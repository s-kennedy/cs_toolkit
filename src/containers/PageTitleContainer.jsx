import React from 'react';
import { connect } from 'react-redux'
import { updatePageTitle, saveChanges } from '../redux/actions'
import Title from '../components/editable/Title'

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
    },
    saveChanges: (innerFunction) => {
      dispatch(saveChanges(innerFunction))
    }
  }
}

const PageTitleContainer = (props) => {
  const styles = {
    titleContainer: {
      display: 'flex',
      justifyContent: 'center',
      padding: '2rem',
      paddingTop: '5rem',
    },
    title: {
      borderBottom: '2px solid #01b4aa',
    }
  }

  const updateTitle = input => {
    props.saveChanges(() => props.onUpdateTitle(input))
  }

  return (
    <div className='title-container' style={styles.titleContainer}>
      <div className='title' style={styles.title}>
        <Title text={props.title} updateTitle={updateTitle} isEditing={props.isEditingPage} />
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PageTitleContainer)
