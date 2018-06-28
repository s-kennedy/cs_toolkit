import { connect } from "react-redux";
import {
  userLoggedIn,
  userLoggedOut,
  toggleRegistrationModal,
  openMenu,
  closeMenu
} from "../redux/actions";

import Navigation from "../components/navigation/Navigation";

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
    openMenu: () => {
      dispatch(openMenu());
    },
    closeMenu: () => {
      dispatch(closeMenu());
    }
  };
};

const NavigationContainer = connect(mapStateToProps, mapDispatchToProps)(
  Navigation
);

export default NavigationContainer;
