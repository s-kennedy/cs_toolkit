import React from "react";
import Link from "gatsby-link";
import firebase from "../../firebase/init";
import { connect } from "react-redux";

import {
  userLoggedIn,
  userLoggedOut
} from "../../redux/actions";

import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const styles = {
  iconLabel: {
    marginRight: "4px"
  }
}

class AccountSection extends React.Component {
  state = {
    anchorEl: null
  }

  componentWillMount() {
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
    navigateTo("/");
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
      const open = Boolean(this.state.anchorEl);
      const accountName = this.props.user.displayName
      ? this.props.user.displayName
      : "Account";

      return(
        <div>
          <Button
            aria-owns={open ? "account-dropdown" : null}
            aria-haspopup="true"
            onClick={this.openMenu}
            color="default"
          >
            <span className="hide-on-mobile" style={styles.iconLabel}>
              {accountName}
            </span>
            <AccountCircle />
          </Button>
          <Menu
            id="account-dropdown"
            anchorEl={this.state.anchorEl}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              getContentAnchorEl={null}
              open={open}
              onClose={this.closeMenu}
            >
            <MenuItem
              component={Link}
              to={"/dashboard"}
              onClick={this.closeMenu}
            >
              Dashboard
            </MenuItem>
            <MenuItem onClick={this.logout}>Sign out</MenuItem>
          </Menu>
        </div>
      )
    }

    return(
      <Button color="default" onClick={this.login}>
        <span className="hide-on-mobile" style={styles.iconLabel}>
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userLoggedIn: user => {
      dispatch(userLoggedIn(user));
    },
    userLoggedOut: () => {
      dispatch(userLoggedOut());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountSection);
