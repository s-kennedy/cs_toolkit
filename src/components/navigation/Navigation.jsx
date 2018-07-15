import React from "react";
import PropTypes from "prop-types";
import Link, { navigateTo } from "gatsby-link";
import { filter, orderBy } from "lodash";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import logo from "../../assets/img/coalition-logo.png";
import RegistrationModal from "./RegistrationModal";
import firebase from "../../firebase/init";
import MenuSection from "./MenuSection";
import AccountSection from "./AccountSection";
import AdminSectionContainer from "../../containers/AdminSectionContainer";


const styles = {
  toolbar: {
    justifyContent: "space-between",
    alignItems: "center"
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  logo: {
    height: "60px",
    marginBottom: "4px",
    marginTop: "4px"
  }
};

const menuSections = [
  {
    title: "About",
    color: null,
    pageType: "about"
  },
  {
    title: "A: Analysis",
    color: "yellow",
    pageType: "building_block_a"
  },
  {
    title: "B: Design",
    color: "orange",
    pageType: "building_block_b"
  },
  {
    title: "C: MEAL",
    color: "teal",
    pageType: "building_block_c"
  },
  {
    title: "Case Study",
    color: null,
    pageType: "case_study"
  },
  {
    title: "Tools",
    color: null,
    pageType: "tools"
  },
  {
    title: "Reference",
    color: null,
    pageType: "reference"
  }
];

class Navigation extends React.Component {
  constructor(props) {
    super(props);
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

  filterPagesByType = type => {
    return orderBy(
      filter(this.props.pages, page => page.node.navigation.group === type),
      "node.navigation.order"
    );
  };

  render() {
    const openModal = Boolean(this.props.showRegistrationModal);

    return (
      <div>
        <AppBar color="inherit" position="static">
          <Toolbar className={this.props.classes.toolbar}>
            <Link to="/">
              <img style={styles.logo} src={logo} alt="Save the Children" />
            </Link>
            <div className={this.props.classes.actions}>
              {menuSections.map(section => {
                const pages = this.filterPagesByType(section.pageType);
                return (
                  <MenuSection
                    key={section.pageType}
                    section={section}
                    pages={pages}
                  />
                );
              })}
              <AccountSection
                isLoggedIn={this.props.isLoggedIn}
                user={this.props.user}
                handleLogout={this.logout}
                handleLogin={this.login}
              />
              <AdminSectionContainer />
            </div>
          </Toolbar>
        </AppBar>
        <RegistrationModal
          firebase={firebase}
          open={openModal}
          onToggleRegistrationModal={this.props.onToggleRegistrationModal}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Navigation);
