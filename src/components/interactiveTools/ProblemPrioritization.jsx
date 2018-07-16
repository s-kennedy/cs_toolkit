import React from "react";
import { connect } from "react-redux";
import { toggleEditing } from "../../redux/actions";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Table from "../editable/Table";
import Subtitle from "../editable/Subtitle";

const tableStructure = [
  {
    header: "Priority problems and needs affecting children?",
    type: "text",
    fieldName: "priorityProblems"
  },
  {
    header: "Which groups of children are most affected?",
    type: "text",
    fieldName: "mostAffected"
  },
  {
    header: "Can these issues be addressed through PA alone (yes/no)?",
    type: "text",
    fieldName: "paAlone"
  },
  {
    header:
      "How can a PA be complemented to address issues that are not linked to poverty?",
    type: "text",
    fieldName: "complemented"
  }
];

const initialTableData = [
  {
    priorityProblems: "",
    mostAffected: "",
    paAlone: "",
    complemented: ""
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

const ProblemPrioritization = props => {
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
        id="problem-prioritization"
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

export default connect(mapStateToProps, mapDispatchToProps)(
  ProblemPrioritization
);
