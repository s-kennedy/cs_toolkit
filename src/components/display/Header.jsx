import React from 'react'

const styles = {
  header: {
    display: 'flex'
  }
}

const Header = (props) => {
  return (
    <div className='header' style={styles.header}>
      <div className="edit-container">
        <h3>{ props.text }</h3>
      </div>
    </div>
  )
}

export default Header;