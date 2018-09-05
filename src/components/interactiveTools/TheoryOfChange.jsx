import React from "react";
import { connect } from "react-redux";
import { toggleEditingTool } from "../../redux/actions";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import FlexTable from "../editable/FlexTable";
import Subtitle from "../editable/Subtitle";

const tableStructure = [
  {
    header: "Impact",
    fieldName: "impact"
  },
  {
    header: "Risks and Assumptions (Impact)",
    fieldName: "impactRisks",
    color: 'warning',
  },
  {
    header: "Final Outcome",
    fieldName: "finalOutcome"
  },
  {
    header: "Risks and Assumptions (Final Outcome)",
    fieldName: "finalOutcomeRisks",
    color: 'warning',
  },
  {
    header: "Intermediate Outcomes",
    fieldName: "intermediateOutcomes"
  },
  {
    header: "Risks and Assumptions (Intermediate Outcome)",
    fieldName: "intermediateOutcomesRisks",
    color: 'warning',
  },
  {
    header: "Outputs",
    fieldName: "outputs"
  },
  {
    header: "Risks and Assumptions (Outputs)",
    fieldName: "outputsRisks",
    color: 'warning',
  },
  {
    header: "Activities",
    fieldName: "activities"
  },
  {
    header: "Risks and Assumptions (Activities)",
    fieldName: "activitiesRisks",
    color: 'warning',
  },
];

const initialTableData = {
  impact: [""],
  impactRisks: [""],
  finalOutcome: [""],
  finalOutcomeRisks: [""],
  intermediateOutcomes: [""],
  intermediateOutcomesRisks: [""],
  outputs: [""],
  outputsRisks: [""],
  activities: [""],
  activitiesRisks: [""]
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

const TheoryOfChange = props => {
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
        id="theory-of-change"
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

export default connect(mapStateToProps, mapDispatchToProps)(TheoryOfChange);
