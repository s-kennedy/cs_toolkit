import React from "react";
import PropTypes from "prop-types";
import Link, { navigateTo } from "gatsby-link";
import logo from "../../assets/img/coalition-logo.png";
import RegistrationModal from "./RegistrationModal";
import Menu from "./Menu";
import MegaMenu from "./MegaMenu";
import MenuItem from "./MenuItem";
import BuildingBlocksMenu from "./BuildingBlocksMenu";
import firebase from "../../firebase/init";

import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const styles = {
  navbar: {
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)"
  },
  logo: {
    height: "60px",
    marginBottom: "0"
  }
};

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
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
        navigateTo('/')
      }

      if (this.props.showRegistrationModal) {
        this.props.onToggleRegistrationModal();
      }
    });
  }

  logout = e => {
    e.preventDefault();
    firebase.auth().signOut();
    this.props.userLoggedOut();
    navigateTo('/')
  };

  login = e => {
    e.preventDefault();
    this.props.onToggleRegistrationModal();
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  renderSignInUp = () => {
    return (
      <NavLink tabIndex="0" color="secondary" onClick={this.login} href="#">
        <span className="hide-on-mobile">Sign In / Sign Up</span>
        <i className="fa fa-user-circle" />
      </NavLink>
    );
  };

  renderUserMenu = () => {
    const accountName = this.props.user.displayName ? this.props.user.displayName : 'Account'
    return (
      <UncontrolledDropdown>
        <DropdownToggle tag="a" className="nav-link" caret>
          {accountName}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem tag="a" href="/dashboard">Dashboard</DropdownItem>
          <DropdownItem tag="a" href="#" onClick={this.logout}>Sign out</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };

  openMenu = e => {
    e.preventDefault();
    this.props.openMenu();
  };

  closeMenu = e => {
    if (e) {
      e.preventDefault();
    }
    this.props.closeMenu();
  };

  render() {
    return (
      <div>
        <Navbar color="faded" light expand="md" style={styles.navbar}>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink
                tabIndex="0"
                color="secondary"
                onClick={this.openMenu}
                href="#"
              >
                <span className="hide-on-mobile">Menu</span>
                <i className="fa fa-bars" />
              </NavLink>
            </NavItem>
          </Nav>
          <Link to="/" className="navbar-brand">
            <img style={styles.logo} src={logo} alt="Save the Children" />
          </Link>
          <Nav className="ml-auto" navbar>
            <NavItem>
              {this.props.isLoggedIn
                ? this.renderUserMenu()
                : this.renderSignInUp()}
            </NavItem>
          </Nav>
        </Navbar>
        <Menu
          isOpen={this.props.showMenu}
          close={this.closeMenu}
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
