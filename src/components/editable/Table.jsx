import React from "react";
import PropTypes from "prop-types";
import { map } from "lodash";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import Grid from "material-ui/Grid";
import TextField from "material-ui/TextField";
import IconButton from "material-ui/IconButton";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";

import Editable from './Editable'
import TableEditor from '../editingTools/TableEditor'

import { withStyles } from "material-ui/styles";

const styles = {
  container: {
    overflowX: "auto",
    paddingBottom: "1rem"
  },
  table: {
    marginBottom: "1rem"
  },
  cell: {
    whiteSpace: "normal",
    wordWrap: "break-word",
    verticalAlign: "bottom"
  },
  formControl: {
    width: "100%"
  },
  input: {
    fontSize: "0.8rem"
  },
  button: {
    marginLeft: "1rem"
  },
  disabled: {
    fontStyle: "italic",
    textTransform: "uppercase"
  }
};

const EditableTable = props => {
  const handleSave = content => {
    props.saveTable(content.tableData)
  }

  const { tableData, tableStructure } = props;

  return (
    <Editable
      editor={TableEditor}
      handleSave={handleSave}
      content={{ tableData: props.tableData }}
      { ...props }
    >
      <Paper className={props.classes.container}>
        <Table className={props.classes.table}>
          <TableHead>
            <TableRow>
              {tableStructure.map(column => (
                <TableCell key={column.fieldName} padding="dense">
                  {column.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={`${props.id}-row-${index}`}>
                {props.tableStructure.map(column => {
                  return (
                    <TableCell
                      key={`${column.fieldName}-${index}`}
                      padding="dense"
                      className={props.classes.cell}
                    >
                      {row[column.fieldName]}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Editable>
  );
}

export default withStyles(styles)(EditableTable);
