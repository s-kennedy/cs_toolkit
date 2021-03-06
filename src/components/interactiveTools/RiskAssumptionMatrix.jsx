import React from "react";
import { connect } from "react-redux";
import { toggleEditingTool } from "../../redux/actions";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Table from "../editable/Table";
import Subtitle from "../editable/Subtitle";

const tableStructure = [
  {
    header: "Risk Category",
    type: "text",
    fieldName: "riskCategory"
  },
  {
    header:
      "What are the potential risks for children due to the project interventions?",
    type: "text",
    fieldName: "potentialRisks"
  },
  {
    header:
      "What assumptions are we making related to children and the project interventions?",
    type: "text",
    fieldName: "assumptions"
  }
];

const initialTableData = [
  {
    riskCategory: "Health",
    potentialRisks: "",
    assumptions: ""
  },
  {
    riskCategory: "Nutrition",
    potentialRisks: "",
    assumptions: ""
  },
  {
    riskCategory: "Intra-household dynamics",
    potentialRisks: "",
    assumptions: ""
  },
  {
    riskCategory: "Extra-household dynamics",
    potentialRisks: "",
    assumptions: ""
  },
  {
    riskCategory: "Education",
    potentialRisks: "",
    assumptions: ""
  },
  {
    riskCategory: "Protection",
    potentialRisks: "",
    assumptions: ""
  },
  {
    riskCategory: "Children and work",
    potentialRisks: "",
    assumptions: ""
  },
  {
    riskCategory: "Social and psychosocial wellbeing",
    potentialRisks: "",
    assumptions: ""
  },
  {
    riskCategory: "Other factors",
    potentialRisks: "",
    assumptions: ""
  }
];

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

const RiskAssumptionMatrix = props => {
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
      <Table
        id="risk-assumption-matrix"
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

export default connect(mapStateToProps, mapDispatchToProps)(
  RiskAssumptionMatrix
);
