import React from 'react'

const TitleWithHolder = (props) => {
  return (
    <div className='display-title edit-container headline-holder'>
      {props.children}
    </div>
  )
}

export default TitleWithHolder;