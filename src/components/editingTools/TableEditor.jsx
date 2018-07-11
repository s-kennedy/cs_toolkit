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
    verticalAlign: "bottom",
    minWidth: '300px'
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

const StyledTable = withStyles(styles)((props) => {
  const { tableStructure, tableData } = props;
  return (
     <Paper className={props.classes.container}>
      <Table className={props.classes.table}>
        <TableHead>
          <TableRow>
            {tableStructure.map(column => (
              <TableCell key={column.fieldName} padding="dense">
                {column.header}
              </TableCell>
            ))}
            <TableCell>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={`${props.id}-row-${index}`}>
              {tableStructure.map(column => {
                if (column.type === "custom") {
                  const InputComponent = props.customInputs[
                    column.fieldName
                  ];
                  return (
                    <TableCell
                      key={`${column.fieldName}-${index}`}
                      padding="dense"
                      className={props.classes.cell}
                    >
                      <InputComponent
                        value={row[column.fieldName]}
                        handleChange={props.handleChange(
                          column.fieldName,
                          index
                        )}
                        className={props.classes.input}
                      />
                    </TableCell>
                  );
                }
                return (
                  <TableCell
                    key={`${column.fieldName}-${index}`}
                    padding="dense"
                    className={props.classes.cell}
                  >
                    <TextField
                      type={column.type}
                      value={row[column.fieldName]}
                      onChange={props.handleChange(column.fieldName, index)}
                      multiline={true}
                      InputProps={{ className: props.classes.input }}
                      className={props.classes.formControl}
                    />
                  </TableCell>
                );
              })}
              <TableCell padding="checkbox">
                <IconButton
                  aria-label="Delete"
                  onClick={props.handleDeleteRow(index)}
                >
                  &times;
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        className={props.classes.button}
        onClick={props.createNewRow}
      >
        Add new row
      </Button>
    </Paper>
  );
})

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.content
    };
  }

  handleChange = (fieldName, rowIndex) => input => {
    const inputValue = input.target ? input.target.value : input;
    let newData = [...this.state.content.tableData];
    const row = newData[rowIndex];
    const newRow = { ...row, [fieldName]: inputValue };
    newData.splice(rowIndex, 1, newRow);

    this.setState({
      content: {
        ...this.state.content,
        tableData: newData
      }
    });
  };

  handleDeleteRow = rowIndex => () => {
    let newData = [...this.state.content.tableData];
    newData.splice(rowIndex, 1);

    this.setState({
      content: {
        ...this.state.content,
        tableData: newData
      }
    });
  };

  defaultRowData = (row = {}) => {
    this.props.tableStructure.map(column => {
      row[column.fieldName] = "";
    });
    return row;
  };

  createNewRow = () => {
    const emptyRowData = this.defaultRowData();
    let newData = this.state.content.tableData ? [...this.state.content.tableData] : [];
    newData.push(emptyRowData);

    this.setState({
      content: {
        ...this.state.content,
        tableData: newData
      }
    });
  };

  render() {
    const { tableData } = this.state.content;
    const { tableStructure } = this.props;

    return (
      <StyledTable
        {...this.props}
        tableData={tableData}
        createNewRow={this.createNewRow}
        handleDeleteRow={this.handleDeleteRow}
        handleChange={this.handleChange}
      />
    );
  }
}

export default EditableTable;