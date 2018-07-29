import React from "react";

import Helmet from "react-helmet";
import NavigationContainer from "../containers/NavigationContainer";
import SidebarNavigationContainer from "../containers/SidebarNavigationContainer";
import NotificationContainer from "../containers/NotificationContainer";
import Grid from "@material-ui/core/Grid";
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
  }
}

const TemplateWrapper = props => (
  <div className={props.showMenu ? 'freeze' : ''} style={styles.page}>
    <div className={`overlay ${props.showMenu ? 'show' : ''}`} onClick={props.closeMenu}></div>
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
    <NotificationContainer />
    <NavigationContainer />
    <div style={styles.navbarOffset} />
    <Grid container>
      <Grid item md={9}>
        <div style={styles.body}>{props.children}</div>
      </Grid>
      <Grid item md={3}>
        <SidebarNavigationContainer />
      </Grid>
    </Grid>
  </div>
);

export default withRoot(TemplateWrapper);