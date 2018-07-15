import React from 'react';
import Grid from "@material-ui/core/Grid";

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
      <Grid container style={styles.container} justify="center">
        <Grid item>
          <p>© 2017 Save the Children International</p>
        </Grid>
      </Grid>
    </footer>
  )
}

export default Footer;