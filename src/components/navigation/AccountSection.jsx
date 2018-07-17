import React from "react";
import { Link, push } from "gatsby";
import firebase from "../../firebase/init";
import { connect } from "react-redux";

import {
  userLoggedIn,
  userLoggedOut,
  toggleRegistrationModal,
} from "../../redux/actions";

import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";

const styles = {
  iconLabel: {
    marginRight: "4px"
  }
}

class AccountSection extends React.Component {
  state = {
    anchorEl: null
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const ref = firebase
          .app()
          .database()
          .ref(`users/${user.uid}`);
        ref.once("value").then(snapshot => {
          const userData = snapshot.val();
          if (userData) {
            this.props.userLoggedIn(userData);
          } else {
            const newUser = {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL
            };
            ref.set(newUser);
            this.props.userLoggedIn(newUser);
          }
        });
      } else {
        this.props.userLoggedOut();
      }

      if (this.props.showRegistrationModal) {
        this.props.onToggleRegistrationModal();
      }
    });
  }

  logout = e => {
    firebase.auth().signOut();
    this.props.userLoggedOut();
    push("/");
  };

  login = e => {
    this.props.onToggleRegistrationModal();
  };

  openMenu = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  closeMenu = e => {
    this.setState({ anchorEl: null });
  };

  render() {
    if (this.props.isLoggedIn) {
      const accountName = this.props.user.displayName ? this.props.user.displayName : "Account"
      return(
        <Button color="default" onClick={this.props.onClick}>
          <span style={styles.iconLabel}>
            {accountName}
          </span>
          <AccountCircle />
        </Button>
      )
    }

    return(
      <Button color="default" onClick={this.login}>
        <span style={styles.iconLabel}>
          Sign In / Sign Up
        </span>
        <AccountCircle />
      </Button>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.adminTools.isLoggedIn,
    user: state.adminTools.user,
    showRegistrationModal: state.adminTools.showRegistrationModal,
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

export const AccountSectionContent = connect(mapStateToProps, mapDispatchToProps)((props) => {
  const logout = e => {
    firebase.auth().signOut();
    props.userLoggedOut();
    props.closeMenu();
    push("/");
  };

  return(
    <List
      id="account-dropdown"
      >
      <MenuItem
        component={Link}
        to={"/dashboard"}
        onClick={props.closeMenu}
        className={props.classes.root}
      >
        Dashboard
      </MenuItem>
      <MenuItem onClick={logout} className={props.classes.root}>Sign out</MenuItem>
    </List>
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountSection);
