import React from "react";
import PropTypes from "prop-types";

import FlexTable from "./FlexTable";
import Subtitle from '../editable/Subtitle';

const tableStructure = [
  { header: "Structural Causes", fieldName: "structuralCauses" },
  { header: "Underlying Causes", fieldName: "underlyingCauses" },
  { header: "Immediate Causes", fieldName: "immediateCauses" },
  { header: "Main Problem", fieldName: "mainProblem" },
]

const initialTableData = {
  structuralCauses: [''],
  underlyingCauses: [''],
  immediateCauses: [''],
  mainProblem: [''],
}

const styles = {
  container: {
    marginTop: '2rem'
  }
}

const ProblemTree = props => {
  const tableData = !!props.tableData ? props.tableData : initialTableData;
  const tableTitle = props.title || 'Your title here';

  const saveTitle = (title) => {
    props.handleSave({ title })
  }

  const saveTable = (fields) => {
    props.handleSave({ fields })
  }

  return (
    <div style={styles.container}>
      <Subtitle text={tableTitle} updateTitle={saveTitle} />
      <FlexTable
        id="problem-tree"
        handleSave={saveTable}
        tableStructure={tableStructure}
        tableData={initialTableData}
      />
    </div>
  );
};

export default ProblemTree;
