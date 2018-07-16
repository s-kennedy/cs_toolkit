import React from "react";
import { connect } from "react-redux";
import { toggleEditing } from "../../redux/actions";

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
          <Subtitle text={'Risk Plot'} updateTitle={saveTitle} disableDelete />
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
      <GridTable
        id="risk-plot"
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
      dispatch(toggleEditing());
    }
  };
};

const mapStateToProps = state => {
  return {
    isEditingPage: state.adminTools.isEditingPage
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RiskPlot);
