import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Editable from './Editable'
import FlexTableEditor from '../editingTools/FlexTableEditor'

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
    padding: "1rem",
    fontSize: "1rem"
  },
  addItem: {
    border: "1px solid green"
  },
  formControl: {
    flexGrow: "1"
  },
  input: {
    fontSize: "1rem"
  },
  row: {
    marginBottom: "1rem"
  },
  deleteButton: {
    width: "30px",
    height: "30px"
  }
};

const FlexTable = props => {
  const handleSave = content => () => {
    props.saveTable(content.tableData)
  }

  const { tableData, tableStructure } = props;

  return (
    <Editable
      editor={FlexTableEditor}
      handleSave={handleSave}
      content={{ tableData: props.tableData }}
      { ...props }
    >
      <Paper className={props.classes.container}>
        <Grid container>
          {tableStructure.map(row => {
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
                      {tableData[row.fieldName].map(
                        (item, index) => {
                          if (!!item.length) {
                            return (
                              <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                key={`${row.fieldName}-item-${index}`}
                              >
                                <Grid container style={styles.item}>
                                  {item}
                                </Grid>
                              </Grid>
                            );
                          }
                          return null;
                        }
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </Editable>
  );
}

export default withStyles(styles)(FlexTable);
