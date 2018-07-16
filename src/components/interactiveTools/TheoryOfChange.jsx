import React from "react";
import { connect } from "react-redux";
import { toggleEditing } from "../../redux/actions";

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
    header: "Final Outcome",
    fieldName: "finalOutcome"
  },
  {
    header: "Intermediate Outcomes",
    fieldName: "intermediateOutcomes"
  },
  {
    header: "Outputs",
    fieldName: "outputs"
  },
  {
    header: "Activities",
    fieldName: "activities"
  },
];

const initialTableData = {
  impact: [""],
  finalOutcome: [""],
  intermediateOutcomes: [""],
  outputs: [""],
  activities: [""],
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
  const toggleEditingBtn = props.isEditingPage
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
          <Subtitle text={tableTitle} updateTitle={saveTitle} disableDelete />
        </Grid>
        <Grid item>
          <Button
            onClick={props.onToggleEditing}
            variant="raised"
            color="secondary"
          >
            {toggleEditingBtn}
          </Button>
        </Grid>
      </Grid>
      <FlexTable
        id="theory-of-change"
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
      dispatch(toggleEditing());
    }
  };
};

const mapStateToProps = state => {
  return {
    isEditingPage: state.adminTools.isEditingPage
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TheoryOfChange);
