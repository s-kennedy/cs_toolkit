import React from "react";
import PropTypes from "prop-types";
import Grid from "material-ui/Grid";
import TextField from "material-ui/TextField";
import IconButton from "material-ui/IconButton";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";

import { withStyles } from "material-ui/styles";

const styles = {
  container: {
    padding: "1rem"
  },
  header: {
    background: "#f3f7f6",
    border: "1px solid #01b4aa", // $teal
    padding: "1rem",
    height: "100%"
  },
  item: {
    border: "1px solid #404040", // $dark-grey
    padding: "1rem"
  },
  addItem: {
    border: "1px solid green"
  },
  formControl: {
    flexGrow: "1"
  },
  input: {
    fontSize: "0.8rem"
  },
  row: {
    marginBottom: "1rem"
  },
  deleteButton: {
    width: "30px",
    height: "30px"
  }
};

class FlexTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: this.props.tableData
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.tableData !== this.props.tableData) {
      this.setState({ tableData: newProps.tableData });
    }
  }

  handleChange = (fieldName, index) => event => {
    const inputValue = event.target.value;
    let newData = [...this.state.tableData[fieldName]];
    newData.splice(index, 1, inputValue);

    this.setState({
      tableData: {
        ...this.state.tableData,
        [fieldName]: newData
      }
    });
  };

  handleDeleteItem = (fieldName, index) => () => {
    let newData = [...this.state.tableData[fieldName]];
    newData.splice(index, 1);

    this.setState({
      tableData: {
        ...this.state.tableData,
        [fieldName]: newData
      }
    });
  };

  handleAddItem = fieldName => () => {
    const newData = [...this.state.tableData[fieldName]].concat("");
    this.setState({
      tableData: {
        ...this.state.tableData,
        [fieldName]: newData
      }
    });
  };

  saveTable = () => {
    this.props.handleSave(this.state.tableData);
  };

  render() {
    return (
      <Paper className={this.props.classes.container}>
        <Grid container>
          {this.props.tableStructure.map(row => {
            return (
              <Grid item xs={12} key={`row-${row.fieldName}`}>
                <Grid
                  container
                  alignItems="stretch"
                  spacing={16}
                  className={this.props.classes.row}
                >
                  <Grid item xs={12} md={3}>
                    <div style={styles.header}>
                      <div>
                        <strong>{row.header}</strong>
                      </div>
                      {row.description && (
                        <div>
                          <small>{row.description}</small>
                        </div>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Grid container spacing={16}>
                      {this.state.tableData[row.fieldName].map(
                        (item, index) => {
                          return (
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              md={4}
                              key={`${row.fieldName}-item-${index}`}
                            >
                              <Grid container style={styles.item}>
                                <TextField
                                  value={item}
                                  onChange={this.handleChange(
                                    row.fieldName,
                                    index
                                  )}
                                  multiline={true}
                                  InputProps={{
                                    className: this.props.classes.input
                                  }}
                                  className={this.props.classes.formControl}
                                />
                                <IconButton
                                  aria-label="Add Item"
                                  onClick={this.handleDeleteItem(
                                    row.fieldName,
                                    index
                                  )}
                                  className={this.props.classes.deleteButton}
                                >
                                  &times;
                                </IconButton>
                              </Grid>
                            </Grid>
                          );
                        }
                      )}
                      <Grid item>
                        <IconButton
                          aria-label="Add Item"
                          onClick={this.handleAddItem(row.fieldName)}
                        >
                          +
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        <Button
          color="primary"
          variant="raised"
          onClick={this.saveTable}
        >
          Save
        </Button>
      </Paper>
    );
  }
}

export default withStyles(styles)(FlexTable);
