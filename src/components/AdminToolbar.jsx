import React from 'react';
import PropTypes from 'prop-types';
import AuthService from '../utils/AuthService'
import CreatePageModalContainer from '../containers/CreatePageModalContainer'

import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem } from 'reactstrap';

import { savePage } from '../utils/API';

const styles = {
  toolbar: {
    backgroundColor: '#9A3324', //plum
    color: '#FFF'
  },
  saveBtn: {
    backgroundColor: '#009CA6', //teal
    color: '#FFF'
  },
  deployBtn: {
    backgroundColor: '#F2A900', //mustard
    color: '#FFF'
  },
  navButton: {
    marginRight: '6px'
  }
}

export default class AdminToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.auth = new AuthService();
    this.savePageToDatabase = () => this._savePageToDatabase();
    this.createPage = () => this._createPage();
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

  _savePageToDatabase () {
    const token = this.auth.getToken();
    this.props.savePage(this.props.pageData, this.props.content, token)
  }

  _createPage(pageData) {
    const token = this.auth.getToken();
    this.props.createPage(pageData, token)
  }

  _deploy() {
    const token = this.auth.getToken();
    // this.props.deploy(token);
  }

  render() {
    if (this.props.isLoggedIn && this.props.allowEditing) {
      const editingText = this.props.isEditingPage ? 'Stop editing' : 'Edit this page';

      return (
        <div>
          <Navbar style={styles.toolbar} expand="md">
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem style={styles.navButton}>
                  {
                    !this.props.isEditingPage &&
                    <Button color='white' onClick={this.props.onToggleNewPageModal}>
                      Add new page
                    </Button>
                  }
                </NavItem>
                <NavItem style={styles.navButton}>
                  <Button color='white' onClick={this.props.onToggleEditing}>
                    {editingText}
                  </Button>
                </NavItem>
                <NavItem style={styles.navButton}>
                  {
                    this.props.isEditingPage &&
                    <Button style={styles.saveBtn} onClick={this.savePageToDatabase}>
                      Save changes
                    </Button> }
                </NavItem>
                <NavItem style={styles.navButton}>
                  {
                    !this.props.isEditingPage &&
                    <Button style={styles.deployBtn} onClick={this.deploy}>
                      Deploy website
                    </Button>
                  }
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <CreatePageModalContainer pages={this.props.pages} createPage={this.createPage}/>
        </div>
      );
    } else {
      return <div></div>
    }
  }
}