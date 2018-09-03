import React from 'react';
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import PhoneIcon from "@material-ui/icons/Phone"
import EmailIcon from "@material-ui/icons/Email"
import OfficeIcon from "@material-ui/icons/Business"

const styles = {
  footer: {
    display: 'flex',
    boxShadow: '0px -2px 4px rgba(0,0,0,0.1)',
    paddingTop: '20px',
    paddingBottom: '20px',
    background: '#fff',
    zIndex: '14000'
  }
}

const Footer = (props) => {
  return (
    <footer className='footer' style={styles.footer}>
      <Grid container style={styles.container} justify="center">
        <Grid item xs={12} sm={10}>
          <Grid container>
            <Grid item xs={12} sm={6} md={8}>
              <Hidden only={['xs']}>
                <div className="footer-content">
                  <Typography variant="display3">Child Sensitivity in Poverty Alleviation Programming</Typography>
                  <p>An Analytical Toolkit</p>
                </div>
              </Hidden>
              <div className="footer-content">
                <p>© 2017 Save the Children International</p>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div className="footer-content">
                <Grid container spacing={8} wrap="nowrap">
                  <Grid item>
                    <OfficeIcon />
                  </Grid>
                  <Grid item>
                    <p>St Vincent House, 30 Orange Street</p>
                    <p>London, UK</p>
                  </Grid>
                </Grid>
                <Grid container spacing={8} wrap="nowrap">
                  <Grid item>
                    <PhoneIcon />
                  </Grid>
                  <Grid item>
                    <p>+44 (0)20 3272 0300</p>
                  </Grid>
                </Grid>

                <Grid container spacing={8} wrap="nowrap">
                  <Grid item>
                    <EmailIcon />
                  </Grid>
                  <Grid item>
                    <p>info@savethechildren.org</p>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </footer>
  )
}

export default Footer;