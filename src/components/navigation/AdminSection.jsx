import React from "react";
import { connect } from "react-redux";
import {
  toggleEditing,
  toggleNewPageModal,
  deletePage,
  deploy
} from "../../redux/actions";

import CreatePageModalContainer from "../../containers/CreatePageModalContainer";

import Button from "@material-ui/core/Button";
import AdminIcon from "@material-ui/icons/Settings";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  toolbar: {
    justifyContent: "flex-end"
  },
  iconLabel: {
    marginRight: "4px"
  },
  danger: {
    color: theme.palette.error.main
  },
  highlight: {
    color: theme.palette.primary.main
  }
});

const mapStateToProps = (state, ownProps) => {
  const allowEditing = state.adminTools.user && state.adminTools.user.isEditor;
  return {
    isLoggedIn: state.adminTools.isLoggedIn,
    isEditingPage: state.adminTools.isEditingPage,
    content: state.content,
    pageData: state.pageData,
    allowEditing: allowEditing
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleEditing: () => {
      dispatch(toggleEditing());
    },
    onToggleNewPageModal: () => {
      dispatch(toggleNewPageModal());
    },
    deletePage: pageData => {
      dispatch(deletePage(pageData));
    },
    deploy: () => {
      dispatch(deploy());
    }
  };
};

const ConnectedContent = props => {
  const deletePage = () => {
    props.deletePage(props.pageData);
    props.closeMenu();
  };

  const deploy = () => {
    props.deploy();
    props.closeMenu();
  };

  if (!props.allowEditing) {
    return <div />;
  }

  const toggleText = props.isEditingPage ? "Done editing" : "Start editing";

  return (
    <div style={{ width: "100%" }} >
      <List id="editor-dropdown" style={{ flexGrow: "1" }} component="div">
        <MenuItem
          onClick={() => {
            props.onToggleEditing();
            props.closeMenu();
          }}
          className={props.classes.root}
        >
          {toggleText}
        </MenuItem>
        <MenuItem
          onClick={props.onToggleNewPageModal}
          className={props.classes.root}
        >
          Add new page
        </MenuItem>
        <MenuItem
          onClick={deploy}
          className={`${props.classes.highlight} ${props.classes.root}`}
          divider
        >
          Publish changes
        </MenuItem>
        <MenuItem
          onClick={deletePage}
          className={`${props.classes.danger} ${props.classes.root}`}
        >
          Delete this page
        </MenuItem>
      </List>

      <CreatePageModalContainer pages={props.pages} />
    </div>
  );
};

const AdminSection = props => {
  if (props.allowEditing) {
    return (
      <Button color="default" onClick={props.onClick}>
        <span style={styles.iconLabel}>Admin</span>
        <AdminIcon />
      </Button>
    );
  }
  return <div />;
};

export const AdminSectionContent = connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(ConnectedContent)
);

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(AdminSection)
);
