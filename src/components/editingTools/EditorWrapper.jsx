import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Close";

const innerContentStyles = {
  editContainer: {
    backgroundColor: "rgba(255,255,255,0.3)",
    border: "1px solid black",
    position: "relative",
    padding: "10px"
  },
  editContainerHighlight: {
    backgroundColor: "rgba(255,255,255,0.9)",
    border: "3px solid #f7a700",
    zIndex: "2500",
  },
  actions: {
    position: "absolute",
    left: "10px",
    top: "-15px",
    display: "flex",
    alignItems: "center",
    zIndex: "99",
    fontSize: "16px"
  },
  button: {
    border: "1px solid #000",
    color: "black",
    backgroundColor: "#fff",
    height: "30px",
    width: "30px",
    borderRadius: "30px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "4px",
    "&:hover": {
      backgroundColor: "grey"
    }
  },
  saveButton: {
    backgroundColor: "#f7a700",
  },
  cancelButton: {
    backgroundColor: "#f7a700",
  },
  icon: {
    fontSize: "16px"
  }
};

const fullWidthStyles = {
  ...innerContentStyles,
  editContainer: {
    padding: "0"
  },
  actions: {
    ...innerContentStyles.actions,
    top: "5px"
  }
};

const EditorWrapper = props => {
  const styles = props.fullWidth ? fullWidthStyles : innerContentStyles;

  return (
    <div
      className="edit-container"
      style={
        props.active
          ? {
              ...styles.editContainer,
              ...styles.editContainerHighlight
            }
          : styles.editContainer
      }
    >
      {props.active && (
        <div className="actions" style={styles.actions}>
          <div
            className="cancel-icon"
            style={styles.button}
            onClick={props.toggleEditing}
          >
            <CancelIcon />
          </div>
          <div
            className="save-icon"
            style={{...styles.button, ...styles.saveButton}}
            onClick={props.handleSave}
          >
            <CheckIcon />
          </div>
        </div>
      )}
      {!props.active && (
        <div className="actions" style={styles.actions}>
          {props.handleDelete &&
            props.disableDelete !== true && (
              <div
                className="delete-icon"
                style={styles.button}
                onClick={props.handleDelete}
              >
                <DeleteIcon />
              </div>
            )}
          <div
            className="edit-icon"
            style={styles.button}
            onClick={props.toggleEditing}
          >
            <EditIcon />
          </div>
        </div>
      )}
      {props.children}
    </div>
  );
};

export default EditorWrapper;
