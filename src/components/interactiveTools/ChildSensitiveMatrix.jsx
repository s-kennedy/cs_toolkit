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
    allowDelete: true
  },
  {
    dimension: 'Children’s aspirations',
    questionTarget: '',
    dataSources: '',
    findings: '',
    allowDelete: true
  },
  {
    dimension: 'Intra-household factors',
    questionTarget: '',
    dataSources: '',
    findings: '',
    allowDelete: true
  },
  {
    dimension: 'Extra household factors and cultural factors',
    questionTarget: '',
    dataSources: '',
    findings: '',
    allowDelete: true
  },
  {
    dimension: 'Existing regulations and public service',
    questionTarget: '',
    dataSources: '',
    findings: '',
    allowDelete: true
  },
  {
    dimension: 'Geographic location',
    questionTarget: '',
    dataSources: '',
    findings: '',
    allowDelete: true
  },
  {
    dimension: 'Seasonal variations',
    questionTarget: '',
    dataSources: '',
    findings: '',
    allowDelete: true
  },
];

const ChildSensitiveMatrix = props => {
  const changeHandler = input => {
    console.log(input);
  };

  return (
    <EditableTable
      id="child-sensitive-matrix"
      handleChange={changeHandler}
      tableStructure={tableStructure}
      tableData={initialTableData}
    />
  );
};

export default ChildSensitiveMatrix;
