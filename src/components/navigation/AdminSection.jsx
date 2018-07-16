import React from "react";
import PropTypes from "prop-types";
import CreatePageModalContainer from "../../containers/CreatePageModalContainer";

import Button from "@material-ui/core/Button";
import SettingsIcon from "@material-ui/icons/Settings";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Divider from '@material-ui/core/Divider';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  toolbar: {
    justifyContent: "flex-end"
  },
  iconLabel: {
    marginRight: "4px"
  },
  danger: {
    color: theme.palette.error.main,
  },
  highlight: {
    color: theme.palette.primary.main,
  }
});

class AdminSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { anchorEl: null };
    this.savePageToDatabase = () => this._savePageToDatabase();
    this.deletePage = () => this._deletePage();
    this.deploy = () => this._deploy();
  }

  openMenu = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  closeMenu = e => {
    this.setState({ anchorEl: null });
  };

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
    if (!this.props.allowEditing) {
      return <div />
    }

    const open = Boolean(this.state.anchorEl);
    return (
      <div>
        <Button
          aria-owns={open ? "editor-dropdown" : null}
          aria-haspopup="true"
          onClick={this.openMenu}
          color="default"
        >
          <span className="hide-on-mobile" className={this.props.classes.iconLabel}>
            Admin
          </span>
          <SettingsIcon />
        </Button>
        {!this.props.isEditingPage && (
          <Menu
            id="editor-dropdown"
            anchorEl={this.state.anchorEl}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              getContentAnchorEl={null}
              open={open}
              onClose={this.closeMenu}
            >
            <MenuItem onClick={this.props.onToggleEditing}>Start editing</MenuItem>
            <MenuItem onClick={this.props.onToggleNewPageModal}>Add new page</MenuItem>
            <MenuItem onClick={this.deploy} className={this.props.classes.highlight} divider>Publish changes</MenuItem>
            <MenuItem onClick={this.deletePage} className={this.props.classes.danger}>Delete this page</MenuItem>
          </Menu>
        )}

        {this.props.isEditingPage && (
          <Menu
            id="editor-dropdown"
            anchorEl={this.state.anchorEl}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              getContentAnchorEl={null}
              open={open}
              onClose={this.closeMenu}
            >
            <MenuItem onClick={this.props.onToggleEditing}>Done editing</MenuItem>
            <MenuItem onClick={this.savePageToDatabase}>Save changes</MenuItem>
          </Menu>
        )}

        <CreatePageModalContainer
          pages={this.props.pages}
          createPage={this.props.createPage}
        />
      </div>
    );
  }
}

export default withStyles(styles)(AdminSection);
