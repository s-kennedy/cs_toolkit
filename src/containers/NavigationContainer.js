import { connect } from "react-redux";
import {
  userLoggedIn,
  userLoggedOut,
  toggleRegistrationModal
} from "../redux/actions";

import Navigation from "../components/Navigation";

const mapStateToProps = state => {
  return {
    isLoggedIn: state.adminTools.isLoggedIn,
    showRegistrationModal: state.adminTools.showRegistrationModal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userLoggedIn: roles => {
      dispatch(userLoggedIn(roles));
    },
    userLoggedOut: () => {
      dispatch(userLoggedOut());
    },
    onToggleRegistrationModal: () => {
      dispatch(toggleRegistrationModal());
    }
  };
};

const NavigationContainer = connect(mapStateToProps, mapDispatchToProps)(
  Navigation
);

export default NavigationContainer;
