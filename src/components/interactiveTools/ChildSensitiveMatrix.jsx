import React from "react";
import PropTypes from "prop-types";

import EditableTable from "./EditableTable";

const tableStructure = [
  { header: "Dimension", type: "text", fieldName: "dimension" },
  {
    header: "What questions need to be answered?",
    type: "text",
    fieldName: "questions"
  },
  {
    header: "Who are the questions aimed at?",
    type: "text",
    fieldName: "questionTarget"
  },
  {
    header:
      "Where can you find the data if available? Which methods can you use to collect new data when needed?",
    type: "text",
    fieldName: "dataSources"
  },
  {
    header:
      "Key findings",
    type: "text",
    fieldName: "findings"
  }
];

const initialTableData = [
  {
    dimension: 'Children’s key deprivations',
    questionTarget: '',
    dataSources: '',
    findings: '',
  },
  {
    dimension: 'Children’s aspirations',
    questionTarget: '',
    dataSources: '',
    findings: '',
  },
  {
    dimension: 'Intra-household factors',
    questionTarget: '',
    dataSources: '',
    findings: '',
  },
  {
    dimension: 'Extra household factors and cultural factors',
    questionTarget: '',
    dataSources: '',
    findings: '',
  },
  {
    dimension: 'Existing regulations and public service',
    questionTarget: '',
    dataSources: '',
    findings: '',
  },
  {
    dimension: 'Geographic location',
    questionTarget: '',
    dataSources: '',
    findings: '',
  },
  {
    dimension: 'Seasonal variations',
    questionTarget: '',
    dataSources: '',
    findings: '',
  },
];

const ChildSensitiveMatrix = props => {
  const saveTable = data => {
    console.log(data);
  };

  return (
    <EditableTable
      id="child-sensitive-matrix"
      handleSave={saveTable}
      tableStructure={tableStructure}
      tableData={initialTableData}
    />
  );
};

export default ChildSensitiveMatrix;
