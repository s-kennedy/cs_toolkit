import React from "react";
import { connect } from "react-redux";
import { toggleEditing } from "../../redux/actions";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Table from "../editable/Table";
import Subtitle from "../editable/Subtitle";

const tableStructure = [
  { header: "Dimension", type: "text", fieldName: "dimension" },
  {
    header: "What questions need to be answered?",
    type: "text",
    fieldName: "questions"
  },
  {
    header: "Who are the questions aimed at?",
    type: "text",
    fieldName: "questionTarget"
  },
  {
    header:
      "Where can you find the data if available? Which methods can you use to collect new data when needed?",
    type: "text",
    fieldName: "dataSources"
  },
  {
    header: "Key findings",
    type: "text",
    fieldName: "findings"
  }
];

const initialTableData = [
  {
    dimension: "Children’s key deprivations",
    questions: "",
    questionTarget: "",
    dataSources: "",
    findings: ""
  },
  {
    dimension: "Children’s aspirations",
    questions: "",
    questionTarget: "",
    dataSources: "",
    findings: ""
  },
  {
    dimension: "Intra-household factors",
    questions: "",
    questionTarget: "",
    dataSources: "",
    findings: ""
  },
  {
    dimension: "Extra household factors and cultural factors",
    questions: "",
    questionTarget: "",
    dataSources: "",
    findings: ""
  },
  {
    dimension: "Existing regulations and public service",
    questions: "",
    questionTarget: "",
    dataSources: "",
    findings: ""
  },
  {
    dimension: "Geographic location",
    questions: "",
    questionTarget: "",
    dataSources: "",
    findings: ""
  },
  {
    dimension: "Seasonal variations",
    questions: "",
    questionTarget: "",
    dataSources: "",
    findings: ""
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

const ChildSensitiveMatrix = props => {
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
        id="child-sensitive-matrix"
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
  ChildSensitiveMatrix
);
