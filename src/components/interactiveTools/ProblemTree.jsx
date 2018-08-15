import React from "react";
import { connect } from "react-redux";
import { toggleEditingTool } from "../../redux/actions";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import FlexTable from "../editable/FlexTable";
import Subtitle from "../editable/Subtitle";

const tableStructure = [
  {
    header: "Impacts on Children",
    description: "(from the situation and needs analyses)",
    fieldName: "impactsOnChildren"
  },
  {
    header: "Immediate Effects on Community and HH",
    fieldName: "immediateEffects"
  },
  {
    header: "Main Problem",
    fieldName: "mainProblem"
  },
  {
    header: "Immediate Causes",
    description: "(e.g. family level use of practices / services...)",
    fieldName: "immediateCauses"
  },
  {
    header: "Underlying Causes",
    description: "(e.g. Basic service access, availability, quality...)",
    fieldName: "underlyingCauses"
  },
  {
    header: "Structural Causes",
    description:
      "Enabling Environment (e.g. culture, norms, systems, policies, resources, laws, markets...)",
    fieldName: "structuralCauses"
  }
];

const initialTableData = {
  structuralCauses: [""],
  underlyingCauses: [""],
  immediateCauses: [""],
  mainProblem: [""],
  immediateEffects: [""],
  impactsOnChildren: [""]
};

const styles = {
  container: {
    marginTop: "2rem"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start"
  }
};

const ProblemTree = props => {
  const tableData = props.tableData || initialTableData;
  const tableTitle = props.title || "Your title here";
  const toggleEditingBtn = props.isEditingTool
    ? "Done editing"
    : "Start Editing";

  const saveTitle = title => {
    props.handleSave({ title });
  };

  const saveTable = fields => {
    props.handleSave({ fields });
  };

  return (
    <div style={styles.container}>
      <Grid container justify={"space-between"}>
        <Grid item>
          <Subtitle
            isEditing={props.isEditingTool}
            text={tableTitle}
            updateTitle={saveTitle}
            disableDelete
          />
        </Grid>
        <Grid item>
          {!props.isLoggedIn && (
            <span>Please sign in to start using this tool.</span>
          )}
          {props.isLoggedIn &&
            props.allowEditing && (
              <Button
                onClick={props.onToggleEditing}
                variant="raised"
                color={props.isEditingTool ? "default" : "secondary"}
              >
                {toggleEditingBtn}
              </Button>
            )}
        </Grid>
      </Grid>
      <FlexTable
        id="problem-tree"
        isEditing={props.isEditingTool}
        saveTable={saveTable}
        tableStructure={tableStructure}
        tableData={tableData}
        disableDelete
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleEditing: () => {
      dispatch(toggleEditingTool());
    }
  };
};

const mapStateToProps = state => {
  return {
    isEditingTool: state.interactiveTool.isEditing,
    isLoggedIn: state.adminTools.isLoggedIn
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProblemTree);
