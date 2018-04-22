import React from "react";
import PropTypes from "prop-types";
import { filter, orderBy } from "lodash";
import Link, { navigateTo } from "gatsby-link";
import logo from "../assets/img/coalition-logo.png";
import RegistrationModal from "./RegistrationModal";
import Menu from './Menu';
import firebase from "../firebase/init";

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
    this.logout = () => this._logout();
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
      }

      if (this.props.showRegistrationModal) {
        this.props.onToggleRegistrationModal()
      }
    });
  }

  _logout() {
    firebase.auth().signOut();
    this.props.userLoggedOut();
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  renderSignInUp = () => {
    return (
      <NavLink color="secondary" onClick={this.props.onToggleRegistrationModal}>
        <span className="hide-on-mobile">Sign In / Sign Up</span>
        <i className="fa fa-user-circle"></i>
      </NavLink>
    );
  };

  renderLogOut = () => {
    return (
      <NavLink color="secondary" onClick={this.logout}>
        <span className="hide-on-mobile">Sign out</span>
        <i className="fa fa-user-circle"></i>
      </NavLink>
    );
  };

  filterPagesByType = (type) => {
    return orderBy(filter(
      this.props.pages,
      page => page.node.navigation.group === type
    ), 'node.navigation.order')
  }

  render() {
    const columns = [
      [
        {
          title: 'Building Block A: Analysis',
          pages: this.filterPagesByType("building_block_a"),
        },
        {
          title: 'Building Block B: Design',
          pages: this.filterPagesByType("building_block_b")
        },
        {
          title: 'Building Block C: MEAL',
          pages: this.filterPagesByType("building_block_c")
        },
      ],
      [
        {
          title: 'Tools',
          pages: this.filterPagesByType("tools")
        },
        {
          title: 'Case Study',
          pages: this.filterPagesByType("case_study")
        }
      ],
      [
        {
          title: 'Reference',
          pages: this.filterPagesByType("reference")
        },
        {
          title: 'About',
          pages: this.filterPagesByType("about")
        }
      ]
    ]

    return (
      <div>
        <Navbar color="faded" light expand="md" style={styles.navbar}>
          <Link to="/" className="navbar-brand">
            <img style={styles.logo} src={logo} alt="Save the Children" />
          </Link>
            <Nav className="ml-auto" navbar>
              <NavItem>
                {this.props.isLoggedIn
                  ? this.renderLogOut()
                  : this.renderSignInUp()}
              </NavItem>
              <NavItem onClick={this.props.openMenu}>
                <NavLink>
                  <span className="hide-on-mobile">Menu</span>
                  <i className="fa fa-bars" aria-hidden="true"></i></NavLink>
              </NavItem>
            </Nav>
        </Navbar>
        <Menu open={this.props.showMenu} columns={columns} close={this.props.closeMenu} />
        <RegistrationModal
          firebase={firebase}
          isOpen={this.props.showRegistrationModal}
          onToggleRegistrationModal={this.props.onToggleRegistrationModal}
        />
      </div>
    );
  }
}
