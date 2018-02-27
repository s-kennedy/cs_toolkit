import React from "react";
import PropTypes from "prop-types";
import { filter } from "lodash";
import Link, { navigateTo } from "gatsby-link";
import logo from "../assets/img/STC_Logo_Horiz.png";
import RegistrationModal from "./RegistrationModal";
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
        const ref = firebase.app().database().ref(`users/${user.uid}`)
        ref.once('value').then(snapshot => {
          const userData = snapshot.val();
          if (userData) {
            this.props.userLoggedIn(userData);
          } else {
            const newUser = {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL
            }
            ref.set(newUser);
            this.props.userLoggedIn(newUser);
          }
        })
      } else {
        this.props.userLoggedOut();
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
      <Button color="secondary" onClick={this.props.onToggleRegistrationModal}>
        Sign In / Sign Up
      </Button>
    );
  };

  renderLogOut = () => {
    return (
      <Button color="secondary" onClick={this.logout}>
        Sign out
      </Button>
    );
  };

  render() {
    const aboutPages = filter(
      this.props.pages,
      page => page.node.fields.category === "about"
    );
    const referencePages = filter(
      this.props.pages,
      page => page.node.fields.category === "reference"
    );
    const toolkitPages = filter(
      this.props.pages,
      page => page.node.fields.category === "building_block"
    );

    return (
      <div>
        <Navbar color="faded" light expand="md" style={styles.navbar}>
          <Link to="/" className="navbar-brand">
            <img style={styles.logo} src={logo} alt="Save the Children" />
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle nav caret>
                  Toolkit
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => navigateTo("/building-blocks/analysis")}
                  >
                    <div className="nav-link">Building Block A: Analysis</div>
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => navigateTo("/building-blocks/design")}
                  >
                    <div className="nav-link">Building Block B: Design</div>
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => navigateTo("/building-blocks/meal")}
                  >
                    <div className="nav-link">Building Block C: MEAL</div>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown nav>
                <DropdownToggle nav caret>
                  About
                </DropdownToggle>
                <DropdownMenu>
                  {aboutPages.map((page, index) => (
                    <DropdownItem
                      key={index}
                      onClick={() => navigateTo(`/${page.node.fields.slug}`)}
                    >
                      <div className="nav-link">{page.node.fields.title}</div>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown nav>
                <DropdownToggle nav caret>
                  Reference
                </DropdownToggle>
                <DropdownMenu>
                  {referencePages.map((page, index) => (
                    <DropdownItem
                      key={index}
                      onClick={() => navigateTo(`/${page.node.fields.slug}`)}
                    >
                      <div className="nav-link">{page.node.fields.title}</div>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                {this.props.isLoggedIn
                  ? this.renderLogOut()
                  : this.renderSignInUp()}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <RegistrationModal
          firebase={firebase}
          isOpen={this.props.showRegistrationModal}
          onToggleRegistrationModal={this.props.onToggleRegistrationModal}
        />
      </div>
    );
  }
}
