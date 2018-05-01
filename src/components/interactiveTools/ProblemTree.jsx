import React from "react";
import PropTypes from "prop-types";

import FlexTable from "./FlexTable";
import Subtitle from '../editable/Subtitle';

const tableStructure = [
  {
    header: "Impacts on Children",
    description: '(from the situation and needs analyses)',
    fieldName: "impactsOnChildren"
  },
  {
    header: "Immediate Effects on Community and HH",
    fieldName: "immediateEffects"
  },
  {
    header: "Main Problem",
    fieldName: "mainProblem"
  },
  {
    header: "Immediate Causes",
    description: '(e.g. family level use of practices / services...)',
    fieldName: "immediateCauses"
  },
  {
    header: "Underlying Causes",
    description: '(e.g. Basic service access, availability, quality...)',
    fieldName: "underlyingCauses"
  },
  {
    header: "Structural Causes",
    description: 'Enabling Environment (e.g. culture, norms, systems, policies, resources, laws, markets...)',
    fieldName: "structuralCauses"
  },
]

const initialTableData = {
  structuralCauses: [''],
  underlyingCauses: [''],
  immediateCauses: [''],
  mainProblem: [''],
  immediateEffects: [''],
  impactsOnChildren: [''],
}

const styles = {
  container: {
    marginTop: '2rem'
  }
}

const ProblemTree = props => {
  const tableData = props.tableData || initialTableData;
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
        tableData={tableData}
      />
    </div>
  );
};

export default ProblemTree;
