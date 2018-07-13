import React from "react";
import PropTypes from "prop-types";
import Link, { navigateTo } from "gatsby-link";
import logo from "../../assets/img/coalition-logo.png";
import RegistrationModal from "./RegistrationModal";
import SideMenu from "./Menu";
import MegaMenu from "./MegaMenu";
import BuildingBlocksMenu from "./BuildingBlocksMenu";
import firebase from "../../firebase/init";

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = {
  toolbar: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    height: "60px",
    marginBottom: "0"
  },
  iconLabel: {
    marginRight: "4px"
  }
};

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      mainMenuIsOpen: false,
      userMenuAnchorEl: null,
    };
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
    navigateTo('/')
  };

  login = e => {
    this.closeUserMenu();
    this.props.onToggleRegistrationModal();
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  renderSignInUp = () => {
    return (
      <Button tabIndex="0" color="default" onClick={this.login}>
        <span className="hide-on-mobile" style={styles.iconLabel}>Sign In / Sign Up</span>
        <AccountCircle />
      </Button>
    );
  };

  openUserMenu = (e) => {
    this.setState({ userMenuAnchorEl: e.currentTarget });
  }

  closeUserMenu = (e) => {
    this.setState({ userMenuAnchorEl: null })
  }

  openMainMenu = (e) => {
    this.setState({ mainMenuIsOpen: true });
  }

  closeMainMenu = (e) => {
    this.setState({ mainMenuIsOpen: false })
  }

  renderUserMenu = () => {
    const accountName = this.props.user.displayName ? this.props.user.displayName : 'Account'
    const open = Boolean(this.state.userMenuAnchorEl)

    return (
      <div>
        <Button
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={this.openUserMenu}
          color="default"
        >
          <span className="hide-on-mobile" style={styles.iconLabel}>Account</span>
          <AccountCircle />
        </Button>
        <Menu
          id="menu-appbar"
          anchorEl={this.state.userMenuAnchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={this.closeUserMenu}
        >
          <MenuItem component={Link} to={'/dashboard'} onClick={this.closeUserMenu}>Dashboard</MenuItem>
          <MenuItem onClick={this.logout}>Sign out</MenuItem>
        </Menu>
      </div>
    );
  };

  render() {
    return (
      <div>
        <AppBar color="white" position="static">
          <Toolbar className={this.props.classes.toolbar}>
            <Button
              tabIndex="0"
              color="default"
              onClick={this.openMainMenu}
            >
              <span className="hide-on-mobile" style={styles.iconLabel}>Menu</span>
              <MenuIcon />
            </Button>
            <Link to="/" className="navbar-brand">
              <img style={styles.logo} src={logo} alt="Save the Children" />
            </Link>
              {this.props.isLoggedIn
                ? this.renderUserMenu()
                : this.renderSignInUp()}
          </Toolbar>
        </AppBar>
        <SideMenu
          isOpen={this.state.mainMenuIsOpen}
          close={this.closeMainMenu}
          pages={this.props.pages}
        />
        <RegistrationModal
          firebase={firebase}
          isOpen={this.props.showRegistrationModal}
          onToggleRegistrationModal={this.props.onToggleRegistrationModal}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Navigation)
