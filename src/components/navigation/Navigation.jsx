import React from "react";
// import { Link } from "gatsby";
import { filter, orderBy } from "lodash";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";

import logo from "../../assets/img/coalition-logo.png";
import RegistrationModal from "./RegistrationModal";
import MenuContent from "./MenuContent";
import AccountSection from "./AccountSection";
import AdminSection from "./AdminSection";

const styles = theme => ({
  root: {
    flexGrow: 1,
    position: "relative",
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1000
  },
  drawerPaper: {
    position: "relative",
    marginTop: "1rem"
  },
  toolbar: {
    ...theme.mixins.toolbar,
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
  },
  yellow: {
    color: "#f7a700"
  },
  orange: {
    color: "#f06b33"
  },
  teal: {
    color: "#01b4aa"
  },
  selected: {
    borderBottom: `2px solid ${theme.palette.secondary.main}`
  }
});

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openMenu: false, menuItems: [] };
  }

  filterPagesByType = type => {
    return orderBy(
      filter(this.props.pages, page => page.node.navigation.group === type),
      "node.navigation.order"
    );
  };

  toggleMenu = navGroup => () => {
    const pages = this.filterPagesByType(navGroup);
    const openMenu = !(this.state.openMenu && this.state.selected === navGroup);

    this.setState({
      openMenu: openMenu,
      selected: navGroup,
      menuItems: pages
    });
  };

  closeMenu = () => {

    this.setState({ openMenu: false, selected: null });
  };

  render() {
    const openModal = Boolean(this.props.showRegistrationModal);

    return (
      <div className={this.props.classes.root}>
        <AppBar
          color="inherit"
          position="fixed"
          className={this.props.classes.appBar}
        >
          <Toolbar className={this.props.classes.toolbar}>
            <a href="/">
              <img
                className={this.props.classes.logo}
                src={logo}
                alt="Save the Children"
              />
            </a>
            <div className={this.props.classes.actions}>
              <div
                className={
                  this.state.selected === "account" &&
                  this.state.openMenu
                    ? this.props.classes.selected
                    : null
                }
              >
                <AccountSection
                  onClick={this.toggleMenu("account")}
                />
              </div>
              {this.props.isLoggedIn && (
                <div
                  className={
                    this.state.selected === "admin" &&
                    this.state.openMenu
                      ? this.props.classes.selected
                      : null
                  }
                >
                  <AdminSection
                    onClick={this.toggleMenu("admin")}
                  />
                </div>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="top"
          open={this.state.openMenu}
          onClose={this.closeMenu}
          classes={{
            paper: this.props.classes.drawerPaper
          }}
        >
          <div className={this.props.classes.toolbar} />
          <MenuContent
            navGroup={this.state.selected}
            menuItems={this.state.menuItems}
            closeMenu={this.closeMenu}
            {...this.props}
          />
        </Drawer>
        <RegistrationModal
          open={openModal}
          onToggleRegistrationModal={this.props.onToggleRegistrationModal}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Navigation);
