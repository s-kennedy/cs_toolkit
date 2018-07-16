import React from 'react';
import { connect } from "react-redux";
import Hidden from "@material-ui/core/Hidden";
import {
  userLoggedIn,
  userLoggedOut,
  toggleRegistrationModal,
  openMenu,
  closeMenu
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
  <div>
    <Hidden mdUp>
      <MobileNavigation {...props} />
    </Hidden>
    <Hidden smDown>
      <Navigation {...props} />
    </Hidden>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(NavigationComponent);
