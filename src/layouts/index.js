import React from "react";
import PropTypes from "prop-types";

import { connect } from 'react-redux'

import Link from "gatsby-link";
import Helmet from "react-helmet";
import NavigationContainer from "../containers/NavigationContainer";
import AdminToolbarContainer from "../containers/AdminToolbarContainer";
import NotificationContainer from "../containers/NotificationContainer";
import Footer from "../components/display/Footer";

import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import "../assets/sass/custom.scss";
import favicon from '../assets/img/favicon.png'

class TemplateWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.showMenu ? 'freeze' : ''}>
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
          <script src="https://use.fontawesome.com/ab5e247e92.js" />
        </Helmet>
        <NotificationContainer />
        <NavigationContainer pages={this.props.data.allPages.edges} />
        <AdminToolbarContainer pages={this.props.data.allPages.edges} />
        <div>{this.props.children()}</div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    showMenu: state.navigation.showMenu
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateWrapper)

TemplateWrapper.propTypes = {
  children: PropTypes.func
};


export const query = graphql`
  query NavigationQuery {
    allPages {
      edges {
        node {
          title
          slug
          navigation {
            group
            order
            displayTitle
          }
        }
      }
    }
  }
`;
