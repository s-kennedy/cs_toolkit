import React from "react";
import PropTypes from "prop-types";
import { filter, orderBy } from "lodash";
import Link, { navigateTo } from "gatsby-link";
import logo from "../assets/img/STC_Logo_Horiz.png";
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
    width: "200px",
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
        Sign In / Sign Up
        <i className="fa fa-user-circle"></i>
      </NavLink>
    );
  };

  renderLogOut = () => {
    return (
      <NavLink color="secondary" onClick={this.logout}>
        Sign out
        <i className="fa fa-user-circle"></i>
      </NavLink>
    );
  };

  render() {
    const aboutPages = orderBy(filter(
      this.props.pages,
      page => page.node.navigation.group === "about"
    ), 'node.navigation.order')

    const referencePages = orderBy(filter(
      this.props.pages,
      page => page.node.navigation.group === "reference"
    ), 'node.navigation.order')
    const bbAPages = orderBy(filter(
      this.props.pages,
      page => page.node.navigation.group === "building_block_a"
    ), 'node.navigation.order')
    const bbBPages = orderBy(filter(
      this.props.pages,
      page => page.node.navigation.group === "building_block_b"
    ), 'node.navigation.order')
    const bbCPages = orderBy(filter(
      this.props.pages,
      page => page.node.navigation.group === "building_block_c"
    ), 'node.navigation.order')
    const toolPages = orderBy(filter(
      this.props.pages,
      page => page.node.navigation.group === "tools"
    ), 'node.navigation.order')
    const caseStudyPages = orderBy(filter(
      this.props.pages,
      page => page.node.navigation.group === "case_study"
    ), 'node.navigation.order')

    const columns = [
      [
        {
          title: 'Building Block A: Analysis',
          pages: bbAPages,
        },
        {
          title: 'Building Block B: Design',
          pages: bbBPages
        },
        {
          title: 'Building Block C: MEAL',
          pages: bbCPages
        },
      ],
      [
        {
          title: 'Tools',
          pages: toolPages
        },
        {
          title: 'Case Study',
          pages: caseStudyPages
        }
      ],
      [
        {
          title: 'Reference',
          pages: referencePages
        },
        {
          title: 'About',
          pages: aboutPages
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
                <NavLink>Menu<i className="fa fa-bars" aria-hidden="true"></i></NavLink>
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
