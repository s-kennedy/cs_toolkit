import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

import { withStyles } from "@material-ui/core/styles";

const styles = {
  container: {
    padding: "1rem"
  },
  item: {
    padding: "0.2rem",
    fontSize: "0.8rem",
    minHeight: "10rem"
  },
  innerItem: {
    borderRadius: "4px",
    backgroundColor: "#f3f7f6",
    height: "100%",
    width: "100%",
    padding: "0.6rem",
    whiteSpace: "normal",
    wordWrap: "break-word",
    verticalAlign: "bottom",
    display: 'flex',
    alignItems: 'flex-end',
  },
  addItem: {
    border: "1px solid green"
  },
  formControl: {
    flexGrow: "1",
    height: '100%',
    background: 'none',
    border: 'none',
    fontSize: '18px',
  },
  input: {
    fontSize: '18px',
  },
  row: {
    marginBottom: "1rem"
  },
  deleteButton: {
    width: "30px",
    height: "30px"
  },
  label: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: "0.8rem",
    justifyContent: "center",
    alignItems: "center",
    wordWrap: "normal"
  },
  miniLabel: {
    textTransform: "uppercase",
    fontSize: "0.7rem"
  },
  verticalLabel: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "center",
    padding: "6px"
  },
  horizontalLabel: {
    display: "flex",
    justifyContent: "space-between",
    textAlign: "center",
    padding: "6px"
  }
};

const EditablGridItem = props => {
  return (
    <Grid item xs={4} className={props.classes.item}>
      <div className={props.classes.innerItem}>
        <TextField
          fullWidth
          value={props.children}
          onChange={props.handleChange}
          multiline={true}
          rows="6"
          className={props.classes.formControl}
          InputProps={{
            disableUnderline: true,
            className: props.classes.formControl
          }}
        />
      </div>
    </Grid>
  );
};

const StyledGridTable = withStyles(styles)(props => {
  const { tableData } = props;

  return (
    <Paper className={props.classes.container}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={1} className={props.classes.verticalLabel}>
              <div className={props.classes.miniLabel}>High</div>
              <div className={props.classes.label}>Likelihood of occurence</div>
              <div className={props.classes.miniLabel}>Low</div>
            </Grid>
            <Grid item xs={11}>
              <Grid container>
                <EditablGridItem
                  classes={props.classes}
                  handleChange={props.handleChange("highLikelihood", "lowRisk")}
                >
                  {tableData.highLikelihood.lowRisk}
                </EditablGridItem>

                <EditablGridItem
                  classes={props.classes}
                  handleChange={props.handleChange(
                    "highLikelihood",
                    "mediumRisk"
                  )}
                >
                  {tableData.highLikelihood.mediumRisk}
                </EditablGridItem>

                <EditablGridItem
                  classes={props.classes}
                  handleChange={props.handleChange(
                    "highLikelihood",
                    "highRisk"
                  )}
                >
                  {tableData.highLikelihood.highRisk}
                </EditablGridItem>
              </Grid>

              <Grid container>
                <EditablGridItem
                  classes={props.classes}
                  handleChange={props.handleChange(
                    "mediumLikelihood",
                    "lowRisk"
                  )}
                >
                  {tableData.mediumLikelihood.lowRisk}
                </EditablGridItem>

                <EditablGridItem
                  classes={props.classes}
                  handleChange={props.handleChange(
                    "mediumLikelihood",
                    "mediumRisk"
                  )}
                >
                  {tableData.mediumLikelihood.mediumRisk}
                </EditablGridItem>

                <EditablGridItem
                  classes={props.classes}
                  handleChange={props.handleChange(
                    "mediumLikelihood",
                    "highRisk"
                  )}
                >
                  {tableData.mediumLikelihood.highRisk}
                </EditablGridItem>
              </Grid>

              <Grid container>
                <EditablGridItem
                  classes={props.classes}
                  handleChange={props.handleChange("lowLikelihood", "lowRisk")}
                >
                  {tableData.lowLikelihood.lowRisk}
                </EditablGridItem>

                <EditablGridItem
                  classes={props.classes}
                  handleChange={props.handleChange(
                    "lowLikelihood",
                    "mediumRisk"
                  )}
                >
                  {tableData.lowLikelihood.mediumRisk}
                </EditablGridItem>

                <EditablGridItem
                  classes={props.classes}
                  handleChange={props.handleChange("lowLikelihood", "highRisk")}
                >
                  {tableData.lowLikelihood.highRisk}
                </EditablGridItem>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={1} />
                <Grid item xs={11} className={props.classes.horizontalLabel}>
                  <div className={props.classes.miniLabel}>Low</div>
                  <div className={props.classes.label}>Severity of Risk</div>
                  <div className={props.classes.miniLabel}>High</div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
});

class GridTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.content
    };
  }

  handleChange = (likelihood, risk) => event => {
    const inputValue = event.target.value;
    let newData = { ...this.state.content.tableData };
    newData[likelihood][risk] = inputValue;

    this.setState({
      content: {
        ...this.state.content,
        tableData: newData
      }
    });
  };

  render() {
    const { tableData } = this.state.content;

    return (
      <StyledGridTable
        {...this.props}
        tableData={tableData}
        handleChange={this.handleChange}
      />
    );
  }
}

export default GridTable;
