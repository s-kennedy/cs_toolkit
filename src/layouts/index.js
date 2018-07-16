import React from "react";

import withRoot from '../utils/withRoot';

import { connect } from 'react-redux'
import { closeMenu } from "../redux/actions";

import Helmet from "react-helmet";
import NavigationContainer from "../containers/NavigationContainer";
import NotificationContainer from "../containers/NotificationContainer";
import Footer from "../components/Footer";

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
        viewport="children, Save the Children, poverty alleviation, poverty reduction, child sensitivity, toolkit"
      />
      <link rel="icon" href={favicon} type="image/x-icon" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/solid.css" integrity="sha384-v2Tw72dyUXeU3y4aM2Y0tBJQkGfplr39mxZqlTBDUZAb9BGoC40+rdFCG0m10lXk" crossorigin="anonymous" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/fontawesome.css" integrity="sha384-q3jl8XQu1OpdLgGFvNRnPdj5VIlCvgsDQTQB6owSOHWlAurxul7f+JpUOVdAiJ5P" crossorigin="anonymous" />
    </Helmet>
    <NotificationContainer />
    <NavigationContainer />
    <div style={styles.navbarOffset} />
    <div style={styles.body}>{props.children}</div>
    <Footer />
  </div>
);

function mapStateToProps(state) {
  return {
    showMenu: state.navigation.showMenu
  }
}

function mapDispatchToProps(dispatch) {
  return {
    closeMenu: () => {
      dispatch(closeMenu());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRoot(TemplateWrapper))