import React from 'react';
import FontAwesome from 'react-fontawesome';

const styles = {
  editContainer: {
    position: 'relative',
  },
  saveIcon: {
    position: 'absolute',
    left: '-15px',
    top: '-15px',
    background: '#F2A900', // mustard
    color: 'white',
    height: '30px',
    width: '30px',
    borderRadius: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1',
    cursor: 'pointer',
    fontSize: '18px'
  }
}

const EditorWrapper = (props) => {
  return (
    <div className='edit-container'>
      <div className='save-icon' style={styles.saveIcon} onClick={props.handleDoneEditing}>
        <FontAwesome name='check' />
      </div>
      { props.children }
    </div>
  )

}

export default EditorWrapper;