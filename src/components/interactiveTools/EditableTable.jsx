import React from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'

import { withStyles } from 'material-ui/styles';

const styles = {
  container: {
    overflowX: 'auto',
    paddingBottom: '1rem',
  },
  table: {
    marginBottom: '1rem',
  },
  cell: {
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    verticalAlign: 'bottom',
  },
  formControl: {
    width: '100%',
  },
  input: {
    fontSize: '0.8rem',
  },
  button: {
    marginLeft: '1rem',
  },
  disabled: {
    fontStyle: 'italic',
    textTransform: 'uppercase',
  },
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: this.props.tableData || []
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.tableData !== this.props.tableData) {
      this.setState({ tableData: newProps.tableData })
    }
  }

  componentDidMount() {
    if (!this.props.tableData) {
      this.createNewRow()
    }
  }

  handleChange = (fieldName, rowIndex) => input => {
    const inputValue = input.target ? input.target.value : input
    let newData = [...this.state.tableData]
    const row = newData[rowIndex]
    const newRow = { ...row, [fieldName]: inputValue }
    newData.splice(rowIndex, 1, newRow)

    this.setState({ tableData: newData })
  }

  handleDeleteRow = rowIndex => () => {
    let newData = [...this.state.tableData]
    newData.splice(rowIndex, 1)

    this.setState({ tableData: newData })
  }

  defaultRowData = (row = {}) => {
    this.props.tableStructure.map(column => {
      row[column.fieldName] = ''
    })
    return row
  }

  createNewRow = () => {
    const emptyRowData = this.defaultRowData()
    let newData = this.state.tableData ? [...this.state.tableData] : []
    newData.push(emptyRowData)

    this.setState({ tableData: newData })
  }

  saveTable = () => {
    this.props.handleSave(this.state.tableData)
  }

  render() {
    const { tableData } = this.state;

    return (
      <Paper className={this.props.classes.container}>
        <Table className={this.props.classes.table}>
          <TableHead>
            <TableRow>
              {this.props.tableStructure.map(column => (
                <TableCell key={column.fieldName} padding="dense">
                  {column.header}
                </TableCell>
              ))}
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={`${this.props.id}-row-${index}`}>
                {this.props.tableStructure.map(column => {
                  if (column.type === 'custom') {
                    const InputComponent = this.props.customInputs[
                      column.fieldName
                    ]
                    return (
                      <TableCell
                        key={`${column.fieldName}-${index}`}
                        padding="dense"
                        className={this.props.classes.cell}
                      >
                        <InputComponent
                          value={row[column.fieldName]}
                          handleChange={this.handleChange(
                            column.fieldName,
                            index
                          )}
                          className={this.props.classes.input}
                        />
                      </TableCell>
                    )
                  }
                  return (
                    <TableCell
                      key={`${column.fieldName}-${index}`}
                      padding="dense"
                      className={this.props.classes.cell}
                    >
                      <TextField
                        type={column.type}
                        value={row[column.fieldName]}
                        onChange={this.handleChange(column.fieldName, index)}
                        multiline={true}
                        InputProps={{ className: this.props.classes.input }}
                        className={this.props.classes.formControl}
                      />
                    </TableCell>
                  )
                })}
                <TableCell padding="checkbox">
                  <IconButton
                    aria-label="Delete"
                    onClick={this.handleDeleteRow(index)}
                  >
                    &times;
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button className={this.props.classes.button} onClick={this.createNewRow}>
          Add new row
        </Button>
        <Button className={this.props.classes.button} color="primary" variant="raised" onClick={this.saveTable}>
          Save
        </Button>
      </Paper>
    )
  }
}

export default withStyles(styles)(EditableTable)
