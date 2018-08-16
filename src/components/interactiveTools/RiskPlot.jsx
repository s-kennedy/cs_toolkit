import React from "react";
import { connect } from "react-redux";
import { toggleEditingTool } from "../../redux/actions";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import GridTable from "../editable/GridTable";
import Subtitle from "../editable/Subtitle";


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

const initialPlotData = {
  highLikelihood: {
    lowRisk: '',
    mediumRisk: '',
    highRisk: '',
  },
  mediumLikelihood: {
    lowRisk: '',
    mediumRisk: '',
    highRisk: '',
  },
  lowLikelihood: {
    lowRisk: '',
    mediumRisk: '',
    highRisk: '',
  }
}

const RiskPlot = props => {
  const tableData = props.tableData || initialPlotData;
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
      <GridTable
        id="risk-plot"
        isEditing={props.isEditingTool}
        tableData={tableData}
        saveTable={saveTable}
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

export default connect(mapStateToProps, mapDispatchToProps)(RiskPlot);
