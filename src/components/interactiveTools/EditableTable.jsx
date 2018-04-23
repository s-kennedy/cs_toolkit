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
  },
  input: {
    fontSize: '0.8rem',
    width: '100%',
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
  componentDidMount() {
    if (!this.props.tableData) {
      this.createNewRow()
    }
  }

  handleChange = (fieldName, rowIndex) => input => {
    const inputValue = input.target ? input.target.value : input
    let newData = [...this.props.tableData]
    const row = newData[rowIndex]
    const newRow = { ...row, [fieldName]: inputValue }
    newData.splice(rowIndex, 1, newRow)

    this.props.handleChange(newData)
  }

  handleDeleteRow = rowIndex => () => {
    let newData = [...this.props.tableData]
    newData.splice(rowIndex, 1)

    this.props.handleChange(newData)
  }

  defaultRowData = (row = {}) => {
    this.props.tableStructure.map(column => {
      row[column.fieldName] = ''
    })
    return row
  }

  createNewRow = () => {
    const emptyRowData = this.defaultRowData({ allowDelete: true })
    let newTableData = this.props.tableData ? [...this.props.tableData] : []
    newTableData.push(emptyRowData)

    this.props.handleChange(newTableData)
  }

  render() {
    const tableData = this.props.tableData ? this.props.tableData : []

    return (
      <Paper style={styles.container}>
        <Table style={styles.table}>
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
                        style={styles.cell}
                      >
                        <InputComponent
                          value={row[column.fieldName]}
                          handleChange={this.handleChange(
                            column.fieldName,
                            index
                          )}
                          style={styles.input}
                        />
                      </TableCell>
                    )
                  }
                  return (
                    <TableCell
                      key={`${column.fieldName}-${index}`}
                      padding="dense"
                    >
                      <TextField
                        type={column.type}
                        defaultValue={row[column.fieldName]}
                        onBlur={this.handleChange(column.fieldName, index)}
                        style={styles.input}
                        multiline={true}
                      />
                    </TableCell>
                  )
                })}
                <TableCell padding="checkbox">
                  {!!row.allowDelete ? (
                    <IconButton
                      aria-label="Delete"
                      onClick={this.handleDeleteRow(index)}
                    >
                      &times;
                    </IconButton>
                  ) : (
                    <small style={styles.disabled}>Imported</small>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button style={styles.button} onClick={this.createNewRow}>
          Add new row
        </Button>
      </Paper>
    )
  }
}

export default EditableTable
