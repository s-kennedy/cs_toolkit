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
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import logo from "../../assets/img/coalition-logo.png";
import RegistrationModal from "./RegistrationModal";
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
    title: "Introduction",
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
    this.state = {
      anchorEl: null
    }
  }

  filterPagesByType = type => {
    return orderBy(
      filter(this.props.pages, page => page.node.navigation.group === type),
      "node.navigation.order"
    );
  };

  openMenu = e => {
    this.setState({ anchorEl: e.currentTarget })
  }

  closeMenu = e => {
    this.setState({ anchorEl: null })
  }

  render() {
    const openModal = Boolean(this.props.showRegistrationModal);
    const openMenu = Boolean(this.state.anchorEl)

    return (
      <div>
        <AppBar color="inherit" position="static">
          <Toolbar className={this.props.classes.toolbar}>
            <Link to="/">
              <img style={styles.logo} src={logo} alt="Save the Children" />
            </Link>

            <IconButton
              aria-label="Menu"
              aria-owns={openMenu ? 'main-menu' : null}
              aria-haspopup="true"
              onClick={this.openMenu}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="main-menu"
              anchorEl={this.state.anchorEl}
              open={openMenu}
              onClose={this.closeMenu}
            >
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
            </Menu>
          </Toolbar>
        </AppBar>
        <RegistrationModal
          open={openModal}
          onToggleRegistrationModal={this.props.onToggleRegistrationModal}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Navigation);
