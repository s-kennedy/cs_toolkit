import React from 'react';
import FontAwesome from 'react-fontawesome';

const innerContentStyles = {
  editContainer: {
    backgroundColor: 'rgba(0,156,166,0.1)', // teal
    position: 'relative',
  },
  actions: {
    position: 'absolute',
    left: '-15px',
    top: '-15px',
    display: 'flex',
    alignItems: 'center',
    zIndex: '1',
  },
  edit: {
    color: 'white',
    height: '30px',
    width: '30px',
    borderRadius: '30px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#009CA6', // teal
    marginRight: '4px'
  },
  delete: {
    color: 'white',
    height: '30px',
    width: '30px',
    borderRadius: '30px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#9A3324', // plum
    marginRight: '4px'
  }
}

const fullWidthStyles = {
  ...innerContentStyles,
  actions: {
    ...innerContentStyles.actions,
    left: '15px',
    top: '15px'
  }
}


const Editable = (props) => {

  const styles = props.fullWidth ? fullWidthStyles : innerContentStyles

  const handleDelete = () => {
    props.deleteContent(props.sectionIndex, props.index)
  }

  return (
    <div className='edit-container' style={styles.editContainer}>
      <div className='actions' style={styles.actions}>
        <div className='edit-icon' style={styles.edit} onClick={props.toggleEditing}>
          <FontAwesome name='pencil' />
        </div>
        <div className='delete-icon' style={styles.delete} onClick={handleDelete}>
          <FontAwesome name='trash' />
        </div>
      </div>
      {props.children}
    </div>
  )
}

export default Editable;