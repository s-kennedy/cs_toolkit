import React from 'react';
import FontAwesome from 'react-fontawesome';

const styles = {
  text: {
    fontWeight: 'bold'
  },
  icon: {
    marginRight: '10px',
    color: '#9A3324'
  }
}
const Action = (props) => {
  return (
    <div className="action-link">
      <span style={styles.icon}>
        <FontAwesome name='file' />
      </span>
      <a href={props.filepath} style={styles.text} target="_blank">{props.title} {props.filetype && `(${props.filetype})`}</a>
    </div>
  )
}

export default Action;