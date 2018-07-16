import React from "react";
import { connect } from "react-redux";
import { toggleEditing } from "../../redux/actions";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Table from "../editable/Table";
import Subtitle from "../editable/Subtitle";

const tableStructure = [
  {
    header: "Risk and/or correlating assumption(s)",
    type: "text",
    fieldName: "riskAndAssumptions"
  },
  {
    header: "Monitoring actions",
    type: "text",
    fieldName: "monitoringActions"
  },
  {
    header: "Mitigating actions",
    type: "text",
    fieldName: "mitigatingActions"
  },
  {
    header: "Person responsible for taking action(s)",
    type: "text",
    fieldName: "personResponsible"
  }
];

const initialTableData = [
  {
    riskAndAssumptions: "",
    monitoringActions: "",
    mitigatingActions: "",
    personResponsible: ""
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

const RiskMitigationPlan = props => {
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
      <Table
        id="risk-assumption-matrix"
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

export default connect(mapStateToProps, mapDispatchToProps)(RiskMitigationPlan);
