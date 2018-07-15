import React from 'react';
import { connect } from 'react-redux'
import { updatePageTitle } from '../redux/actions'
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
      borderBottom: '2px solid #01b4aa',
    }
  }

  return (
    <div className='title-container' style={styles.titleContainer}>
      <div className='title' style={styles.title}>
        <Title text={props.title} updateTitle={props.onUpdateTitle} />
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PageTitleContainer)
