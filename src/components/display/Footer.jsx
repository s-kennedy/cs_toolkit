import React from 'react'

const styles = {
  footer: {
    display: 'flex',
    boxShadow: '0px -2px 4px rgba(0,0,0,0.1)',
    paddingTop: '20px'
  },
  container: {
    display: 'flex',
    justifyContent: 'center'
  }
}

const Footer = (props) => {
  return (
    <footer className='footer' style={styles.footer}>
      <div className="container" style={styles.container}>
        <p>© 2017 Save the Children International</p>
      </div>
    </footer>
  )
}

export default Footer;