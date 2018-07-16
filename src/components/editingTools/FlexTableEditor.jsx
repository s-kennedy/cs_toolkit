import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";

import { withStyles } from "@material-ui/core/styles";

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

const StyledFlexTable = withStyles(styles)((props) => {
  return (
    <Paper className={props.classes.container}>
      <Grid container>
        {props.tableStructure.map(row => {
          return (
            <Grid item xs={12} key={`row-${row.fieldName}`}>
              <Grid
                container
                alignItems="stretch"
                spacing={16}
                className={props.classes.row}
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
                    {props.tableData[row.fieldName].map(
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
                                onChange={props.handleChange(
                                  row.fieldName,
                                  index
                                )}
                                multiline={true}
                                InputProps={{
                                  className: props.classes.input
                                }}
                                className={props.classes.formControl}
                              />
                              <IconButton
                                aria-label="Add Item"
                                onClick={props.handleDeleteItem(
                                  row.fieldName,
                                  index
                                )}
                                className={props.classes.deleteButton}
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
                        onClick={props.handleAddItem(row.fieldName)}
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
    </Paper>
  );
})

class FlexTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.content
    };
  }

  handleChange = (fieldName, index) => event => {
    const inputValue = event.target.value;
    let newData = [...this.state.content.tableData[fieldName]];
    newData.splice(index, 1, inputValue);

    this.setState({
      content: {
        ...this.state.content,
        tableData: {
          ...this.state.content.tableData,
          [fieldName]: newData
        }
      }
    });
  };

  handleDeleteItem = (fieldName, index) => () => {
    let newData = [...this.state.content.tableData[fieldName]];
    newData.splice(index, 1);

    this.setState({
      content: {
        ...this.state.content,
        tableData: {
          ...this.state.content.tableData,
          [fieldName]: newData
        }
      }
    });
  };

  handleAddItem = fieldName => () => {
    const newData = [...this.state.content.tableData[fieldName]].concat("");
    this.setState({
      content: {
        ...this.state.content,
        tableData: {
          ...this.state.content.tableData,
          [fieldName]: newData
        }
      }
    });
  };

  render() {
    const { tableData } = this.state.content;

    return (
      <StyledFlexTable
        { ...this.props }
        tableData={tableData}
        handleChange={this.handleChange}
        handleDeleteItem={this.handleDeleteItem}
        handleDeleteRow={this.handleDeleteRow}
        handleAddItem={this.handleAddItem}
      />
    )
  }
}

export default FlexTable;

