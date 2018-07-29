import React from 'react';
import { connect } from "react-redux";
import { StaticQuery, graphql } from "gatsby";

import Hidden from "@material-ui/core/Hidden";
import {
  userLoggedIn,
  userLoggedOut,
  toggleRegistrationModal,
} from "../redux/actions";

import Navigation from "../components/navigation/Navigation";
import MobileNavigation from "../components/navigation/MobileNavigation";

const mapStateToProps = state => {
  return {
    isLoggedIn: state.adminTools.isLoggedIn,
    showRegistrationModal: state.adminTools.showRegistrationModal,
    showMenu: state.navigation.showMenu,
    user: state.adminTools.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userLoggedIn: user => {
      dispatch(userLoggedIn(user));
    },
    userLoggedOut: () => {
      dispatch(userLoggedOut());
    },
    onToggleRegistrationModal: () => {
      dispatch(toggleRegistrationModal());
    },
  };
};

const NavigationComponent = props => (
  <StaticQuery
    query={graphql`
      query {
        allPages {
          edges {
            node {
              title
              slug
              page_type
              navigation {
                displayTitle
                group
                order
                nested {
                  page {
                    slug
                    title
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <div>
        <Hidden mdUp>
          <MobileNavigation {...props} pages={data.allPages.edges} />
        </Hidden>
        <Hidden smDown>
          <Navigation {...props} pages={data.allPages.edges} />
        </Hidden>
      </div>
    )}
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(NavigationComponent);
