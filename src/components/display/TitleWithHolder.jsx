import React from 'react'

const styles = {
  title: {
    margin: 0
  }
}

const TitleWithHolder = (props) => {
  return (
    <div className='display-title edit-container'>
      <h1>
        <span className="headline-holder" style={styles.headlineHolder}>{ props.text }</span>
      </h1>
    </div>
  )
}

export default TitleWithHolder;