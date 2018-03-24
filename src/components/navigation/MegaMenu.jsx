import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Link from "gatsby-link";
import MenuItemParent from "./MenuItemParent";
import MenuItem from "./MenuItem";
import MenuColumn from "./MenuColumn";
import { map, orderBy, filter } from "lodash";

export default class MegaMenu extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.clearSubMenu = () => this._clearSubMenu()
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  _clearSubMenu() {
    this.setState({ generateSubMenu: null })
  };

  filterPagesByType = type => {
    return orderBy(
      filter(this.props.pages, page => page.node.navigation.group === type),
      "node.navigation.order"
    );
  };

  aboutMenu = props => {
    const pages = this.filterPagesByType("about");

    return (
      <MenuColumn submenu clearSubMenu={this.clearSubMenu}>
        {pages.map((page, index) => {
          const pageTitle =
            page.node.navigation.displayTitle || page.node.title;
          return (
            <Link to={`/${page.node.slug}`} key={page.node.slug} onClick={this.toggle}>
              <MenuItem>{pageTitle}</MenuItem>
            </Link>
          );
        })}
      </MenuColumn>
    );
  };

  analysisMenu = props => {
    const pages = this.filterPagesByType("building_block_a");

    return (
      <MenuColumn submenu clearSubMenu={this.clearSubMenu}>
        {pages.map((page, index) => {
          const pageTitle =
            page.node.navigation.displayTitle || page.node.title;
          return (
            <Link to={`/${page.node.slug}`} key={page.node.slug} onClick={this.toggle}>
              <MenuItem>{pageTitle}</MenuItem>
            </Link>
          );
        })}
      </MenuColumn>
    );
  };

  designMenu = props => {
    const pages = this.filterPagesByType("building_block_b");

    return (
      <MenuColumn submenu clearSubMenu={this.clearSubMenu}>
        {pages.map((page, index) => {
          const pageTitle =
            page.node.navigation.displayTitle || page.node.title;
          return (
            <Link to={`/${page.node.slug}`} key={page.node.slug} onClick={this.toggle}>
              <MenuItem>{pageTitle}</MenuItem>
            </Link>
          );
        })}
      </MenuColumn>
    );
  };

  mealMenu = props => {
    const pages = this.filterPagesByType("building_block_c");

    return (
      <MenuColumn submenu clearSubMenu={this.clearSubMenu}>
        {pages.map((page, index) => {
          const pageTitle =
            page.node.navigation.displayTitle || page.node.title;
          return (
            <Link to={`/${page.node.slug}`} key={page.node.slug} onClick={this.toggle}>
              <MenuItem>{pageTitle}</MenuItem>
            </Link>
          );
        })}
      </MenuColumn>
    );
  };

  toolsMenu = props => {
    const pages = this.filterPagesByType("tools");

    return (
      <MenuColumn submenu clearSubMenu={this.clearSubMenu}>
        {pages.map((page, index) => {
          const pageTitle =
            page.node.navigation.displayTitle || page.node.title;
          return (
            <Link to={`/${page.node.slug}`} key={page.node.slug} onClick={this.toggle}>
              <MenuItem>{pageTitle}</MenuItem>
            </Link>
          );
        })}
      </MenuColumn>
    );
  };

  caseStudyMenu = props => {
    const pages = this.filterPagesByType("case_study");

    return (
      <MenuColumn submenu clearSubMenu={this.clearSubMenu}>
        {pages.map((page, index) => {
          const pageTitle =
            page.node.navigation.displayTitle || page.node.title;
          return (
            <Link to={`/${page.node.slug}`} key={page.node.slug} onClick={this.toggle}>
              <MenuItem>{pageTitle}</MenuItem>
            </Link>
          );
        })}
      </MenuColumn>
    );
  };

  referenceMenu = props => {
    const pages = this.filterPagesByType("reference");

    return (
      <MenuColumn submenu clearSubMenu={this.clearSubMenu}>
        {pages.map((page, index) => {
          const pageTitle =
            page.node.navigation.displayTitle || page.node.title;
          return (
            <Link to={`/${page.node.slug}`} key={page.node.slug} onClick={this.toggle}>
              <MenuItem>{pageTitle}</MenuItem>
            </Link>
          );
        })}
      </MenuColumn>
    );
  };

  generateHandleSelect = generateMenu => {
    return () => this.setState({ generateSubMenu: generateMenu });
  };

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} inNavbar>
        <DropdownToggle>{this.props.children}</DropdownToggle>
        <DropdownMenu>
          <div className="menu-container">
            <MenuColumn>
              <MenuItem
                parent
                handleMouseOver={this.generateHandleSelect(this.aboutMenu)}
                handleClick={this.generateHandleSelect(this.aboutMenu)}
              >
                About
              </MenuItem>
              <MenuItem header>Building Blocks</MenuItem>
              <MenuItem
                indent
                parent
                color="yellow"
                handleMouseOver={this.generateHandleSelect(this.analysisMenu)}
                handleClick={this.generateHandleSelect(this.analysisMenu)}
              >
                A: Analysis
              </MenuItem>
              <MenuItem
                indent
                parent
                color="orange"
                handleMouseOver={this.generateHandleSelect(this.designMenu)}
                handleClick={this.generateHandleSelect(this.designMenu)}
              >
                B: Design
              </MenuItem>
              <MenuItem
                indent
                parent
                color="teal"
                handleMouseOver={this.generateHandleSelect(this.mealMenu)}
                handleClick={this.generateHandleSelect(this.mealMenu)}
              >
                C: MEAL
              </MenuItem>
              <MenuItem
                parent
                handleMouseOver={this.generateHandleSelect(this.toolsMenu)}
                handleClick={this.generateHandleSelect(this.toolsMenu)}
              >
                Tools
              </MenuItem>
              <MenuItem
                parent
                handleMouseOver={this.generateHandleSelect(this.caseStudyMenu)}
                handleClick={this.generateHandleSelect(this.caseStudyMenu)}
              >
                Case Study
              </MenuItem>
              <MenuItem
                parent
                handleMouseOver={this.generateHandleSelect(this.referenceMenu)}
                handleClick={this.generateHandleSelect(this.referenceMenu)}
              >
                Reference
              </MenuItem>
            </MenuColumn>
            {this.state.generateSubMenu && this.state.generateSubMenu()}
          </div>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
