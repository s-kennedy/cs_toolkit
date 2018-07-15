import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import CopyIcon from "@material-ui/icons/ContentCopy";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import Select from "@material-ui/core/Select";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import { withStyles, theme } from "@material-ui/core/styles";

const styles = theme => ({
  editActions: {
    display: "flex",
    justifyContent: "center",
    right: "45%",
    zIndex: "99",
    position: 'absolute',
  },
  button: {
    backgroundColor: "#000",
    color: "#fff",
    border: "1px solid #fff",
    height: "30px",
    width: "30px",
    margin: "4px",
    '&:hover': {
      backgroundColor: "#000",
    }
  },
  icon: {
    fontSize: "20px"
  }
});

class SectionEditingActions extends React.Component {
  state = {
    anchorEl: null
  };

  openMenu = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  closeMenu = e => {
    this.setState({ anchorEl: null });
  };

  handleDuplicate = () => {
    this.props.onDuplicate(this.props.sectionIndex);
  };

  handleDelete = () => {
    this.props.onDelete(this.props.sectionIndex);
  };

  generateAddContentItemHandler = contentType => {
    return () =>
      this.props.onAddContentItem(this.props.sectionIndex, contentType);
  };

  generateAddSectionHandler = sectionType => {
    return () => this.props.onAddSection(this.props.sectionIndex, sectionType);
  };

  render() {
    const open = Boolean(this.state.anchorEl);
    return (
      <div className="edit-actions" className={this.props.classes.editActions}>
        {this.props.onDuplicate && (
          <IconButton
            className="edit-icon"
            onClick={this.handleDuplicate}
            className={this.props.classes.button}
          >
            <CopyIcon className={this.props.classes.icon} />
          </IconButton>
        )}
        {this.props.onDelete && (
          <IconButton
            className="edit-icon"
            onClick={this.handleDelete}
            className={this.props.classes.button}
          >
            <DeleteIcon className={this.props.classes.icon} />
          </IconButton>
        )}
        {this.props.onAddContentItem && (
          <div>
            <IconButton
              aria-owns={open ? "menu-add-content" : null}
              aria-haspopup="true"
              onClick={this.openMenu}
              className={this.props.classes.button}
            >
              <AddIcon className={this.props.classes.icon} />
            </IconButton>
            <Menu
              id="menu-add-content"
              anchorEl={this.state.anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={open}
              onClose={this.closeMenu}
            >
              <MenuItem
                onClick={this.generateAddContentItemHandler("paragraph")}
              >
                Paragraph
              </MenuItem>
              <MenuItem onClick={this.generateAddContentItemHandler("header")}>
                Header
              </MenuItem>
              <MenuItem onClick={this.generateAddContentItemHandler("image")}>
                Image
              </MenuItem>
              <MenuItem onClick={this.generateAddContentItemHandler("file")}>
                File
              </MenuItem>
              <MenuItem onClick={this.generateAddContentItemHandler("button")}>
                Button
              </MenuItem>
              <MenuItem onClick={this.generateAddContentItemHandler("action")}>
                Action
              </MenuItem>
              <MenuItem onClick={this.generateAddSectionHandler("section")}>
                Section
              </MenuItem>
              <MenuItem
                onClick={this.generateAddSectionHandler("call_to_action")}
              >
                Call To Action
              </MenuItem>
              <MenuItem
                onClick={this.generateAddSectionHandler("page_navigation")}
              >
                Page Navigation
              </MenuItem>
            </Menu>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(SectionEditingActions);
