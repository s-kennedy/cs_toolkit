import React from "react";
import PropTypes from "prop-types";
import CreatePageModalContainer from "../../containers/CreatePageModalContainer";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  toolbar: {
    justifyContent: "flex-end"
  }
};

class AdminToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.savePageToDatabase = () => this._savePageToDatabase();
    this.deletePage = () => this._deletePage();
    this.deploy = () => this._deploy();
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
          <AppBar position="static" color="default">
            <Toolbar className={this.props.classes.toolbar}>
              {!this.props.isEditingPage && (
                <Button color="primary" onClick={this.deletePage}>
                  Delete this page
                </Button>
              )}

              {!this.props.isEditingPage && (
                <Button
                  color="primary"
                  onClick={this.props.onToggleNewPageModal}
                >
                  Add new page
                </Button>
              )}

              <Button color="primary" onClick={this.props.onToggleEditing}>
                {editingText}
              </Button>

              {this.props.isEditingPage && (
                <Button color="secondary" onClick={this.savePageToDatabase}>
                  Save changes
                </Button>
              )}
              {!this.props.isEditingPage && (
                <Button color="secondary" onClick={this.deploy}>
                  Deploy website
                </Button>
              )}
            </Toolbar>
          </AppBar>
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

export default withStyles(styles)(AdminToolbar);
