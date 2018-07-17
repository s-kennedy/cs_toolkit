import React from "react";
import { connect } from "react-redux";
import {
  toggleEditing,
  savePage,
  toggleNewPageModal,
  createPage,
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
    createPage: pageData => {
      dispatch(createPage(pageData));
    },
    deletePage: id => {
      dispatch(deletePage(id));
    },
    savePage: (pageData, content) => {
      dispatch(savePage(pageData, content));
    },
    deploy: () => {
      dispatch(deploy());
    }
  };
};

const ConnectedContent = props => {
  const savePageToDatabase = () => {
    props.savePage(props.pageData, props.content);
  };

  const deletePage = () => {
    props.deletePage(props.pageData.id);
    props.closeMenu();
  };

  const deploy = () => {
    props.deploy();
    props.closeMenu()
  };

  if (!props.allowEditing) {
    return <div />;
  }

  const toggleText = props.isEditingPage ? "Done editing" : "Start editing";

  return (
    <div>
      <List id="editor-dropdown">
        <MenuItem
          onClick={() => { props.onToggleEditing(); props.closeMenu(); }}
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

      <CreatePageModalContainer
        pages={props.pages}
        createPage={props.createPage}
      />
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
