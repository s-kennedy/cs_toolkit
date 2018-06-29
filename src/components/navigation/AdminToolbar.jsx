import React from "react";
import PropTypes from "prop-types";
import CreatePageModalContainer from "../../containers/CreatePageModalContainer";

import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem
} from "reactstrap";

const styles = {
  toolbar: {
    backgroundColor: "#f7a700", //yellow
    color: "#FFF",
    zIndex: '0',
  },
  saveBtn: {
    backgroundColor: "#01b4aa", //teal
    color: "#FFF"
  },
  deployBtn: {
    backgroundColor: "#941c5b", //plum
    color: "#FFF"
  },
  navButton: {
    marginRight: "6px"
  }
};

export default class AdminToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.savePageToDatabase = () => this._savePageToDatabase();
    this.deletePage = () => this._deletePage();
    this.deploy = () => this._deploy();
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  _savePageToDatabase() {
    this.props.savePage(this.props.pageData, this.props.content);
  }

  _deletePage() {
    this.props.deletePage(this.props.pageData.id);
  }

  _deploy() {
    this.props.deploy();
  }

  render() {
    if (this.props.isLoggedIn && this.props.allowEditing) {
      const editingText = this.props.isEditingPage
        ? "Stop editing"
        : "Edit this page";

      return (
        <div>
          <Navbar style={styles.toolbar} expand="md">
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem style={styles.navButton}>
                  {!this.props.isEditingPage && (
                    <Button
                      color="white"
                      onClick={this.deletePage}
                    >
                      Delete this page
                    </Button>
                  )}
                </NavItem>
                <NavItem style={styles.navButton}>
                  {!this.props.isEditingPage && (
                    <Button
                      color="white"
                      onClick={this.props.onToggleNewPageModal}
                    >
                      Add new page
                    </Button>
                  )}
                </NavItem>
                <NavItem style={styles.navButton}>
                  <Button color="white" onClick={this.props.onToggleEditing}>
                    {editingText}
                  </Button>
                </NavItem>
                {this.props.isEditingPage && (
                  <NavItem style={styles.navButton}>
                    <Button
                      style={styles.saveBtn}
                      onClick={this.savePageToDatabase}
                    >
                      Save changes
                    </Button>
                  </NavItem>
                )}
                <NavItem style={styles.navButton}>
                  {!this.props.isEditingPage && (
                    <Button style={styles.deployBtn} onClick={this.deploy}>
                      Deploy website
                    </Button>
                  )}
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <CreatePageModalContainer
            pages={this.props.pages}
            createPage={this.props.createPage}
          />
        </div>
      );
    } else {
      return <div />;
    }
  }
}
