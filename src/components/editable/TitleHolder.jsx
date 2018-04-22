import React from 'react'

const TitleHolder = (props) => {
  return (
    <div className='headline-holder-container'>
      <div className='display-title edit-container headline-holder'>
        {props.children}
      </div>
    </div>
  )
}

export default TitleHolder;