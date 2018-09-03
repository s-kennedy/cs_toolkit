import React from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Helmet from "react-helmet";
import NavigationContainer from "../containers/NavigationContainer";
import SidebarNavigationContainer from "../containers/SidebarNavigationContainer";
import NotificationContainer from "../containers/NotificationContainer";
import Overlay from "../components/Overlay";
import Footer from "../components/Footer";

import { withStyles } from '@material-ui/core/styles';
import withRoot from '../utils/withRoot';

import "../assets/sass/custom.scss";
import favicon from '../assets/img/favicon.png'

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  body: {
    flexGrow: '1',
  },
  navbarOffset: {
    height: '74px'
  },
  container: {
    alignSelf: "center",
    margin: '3rem 0'
  }
}

const NotFoundPage = props => (
  <div style={styles.page}>
    <Helmet>
      <title>
        Child Sensitivity in Poverty Alleviation Programming: An Analytical
        Toolkit
      </title>
      <meta
        charSet="utf-8"
        description="Child Sensitivity in Poverty Alleviation Programming: An Analytical Toolkit"
        keywords="children, Save the Children, poverty alleviation, poverty reduction, child sensitivity, toolkit"
        viewport="width=device-width,initial-scale=1.0,maximum-scale=1"
      />
      <link rel="icon" href={favicon} type="image/x-icon" />
    </Helmet>
    <Overlay />
    <NotificationContainer />
    <NavigationContainer />
    <div style={styles.navbarOffset} />
    <Grid container>
      <Grid item md={9} sm={12} xs={12}>
        <div style={styles.body}>
          <Grid container justify="center" className={props.classes.container}>
            <Grid item>
              <Typography variant="display1" gutterBottom>
                NOT FOUND
              </Typography>
              <p>This page does not exist.</p>
            </Grid>
          </Grid>
        </div>
        <Footer />
      </Grid>
      <Grid item md={3}>
        <SidebarNavigationContainer />
      </Grid>
    </Grid>
  </div>
)

export default withRoot(withStyles(styles)(NotFoundPage));
