import React from 'react'

const Paragraph = (props) => {
  return (
    <div className='para edit-container'>
      <div dangerouslySetInnerHTML={ {__html: props.text} } />
    </div>
  )
}

export default Paragraph;