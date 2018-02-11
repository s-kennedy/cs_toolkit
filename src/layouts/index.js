import React from 'react';

import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import NavigationContainer from '../containers/NavigationContainer';
import AdminToolbarContainer from '../containers/AdminToolbarContainer';
import NotificationContainer from '../containers/NotificationContainer';
import Footer from '../components/display/Footer';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import '../assets/sass/custom.scss';


export default class TemplateWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Helmet>
          <title>Child Sensitivity in Poverty Alleviation Programming: An Analytical Toolkit</title>
          <meta
            charSet="utf-8"
            description="Child Sensitivity in Poverty Alleviation Programming: An Analytical Toolkit"
            keywords="children, Save the Children, poverty alleviation, poverty reduction, child sensitivity, toolkit"
            viewport="children, Save the Children, poverty alleviation, poverty reduction, child sensitivity, toolkit"
          />
          <script src="https://use.fontawesome.com/ab5e247e92.js"></script>
          <script src="https://cdn.auth0.com/js/lock/10.24.1/lock.min.js"></script>
        </Helmet>
        <NotificationContainer />
        <NavigationContainer pages={this.props.data.allPages.edges} />
        <AdminToolbarContainer pages={this.props.data.allPages.edges} />
        <div>
          {this.props.children()}
        </div>
        <Footer />
      </div>
    )
  }
}


TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export const query = graphql`
  query NavigationQuery {
    allPages {
      edges {
        node {
          fields {
            slug
            template
            title
            category
          }
        }
      }
    }
  }
`;
