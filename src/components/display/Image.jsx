import React from 'react'

const Image = (props) => {
    return (
      <div className='img edit-container'>
        <img src={props.source} alt={props.caption} />
        <small>{props.caption}</small>
      </div>
    )
}

export default Image;