import React from 'react'

const styles = {
  title: {
    margin: 0
  }
}

const SubtitleWithHolder = (props) => {
  return (
    <div className='display-subtitle edit-container'>
      <h3>
        <span className="headline-holder" style={styles.headlineHolder}>{ props.text }</span>
      </h3>
    </div>
  )
}

export default SubtitleWithHolder;