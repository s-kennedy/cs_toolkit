import React from "react";
import PropTypes from "prop-types";

import { uniq } from 'lodash';

import EditableTable from "./EditableTable";
import Title from '../editable/Title';
import Subtitle from '../editable/Subtitle';

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
    questions: '',
    questionTarget: '',
    dataSources: '',
    findings: '',
  },
  {
    dimension: 'Children’s aspirations',
    questions: '',
    questionTarget: '',
    dataSources: '',
    findings: '',
  },
  {
    dimension: 'Intra-household factors',
    questions: '',
    questionTarget: '',
    dataSources: '',
    findings: '',
  },
  {
    dimension: 'Extra household factors and cultural factors',
    questions: '',
    questionTarget: '',
    dataSources: '',
    findings: '',
  },
  {
    dimension: 'Existing regulations and public service',
    questions: '',
    questionTarget: '',
    dataSources: '',
    findings: '',
  },
  {
    dimension: 'Geographic location',
    questions: '',
    questionTarget: '',
    dataSources: '',
    findings: '',
  },
  {
    dimension: 'Seasonal variations',
    questions: '',
    questionTarget: '',
    dataSources: '',
    findings: '',
  },
];

const ChildSensitiveMatrix = props => {
  const tableData = props.tableData || initialTableData;
  const tableTitle = props.title || 'Your title here';

  const saveTitle = (title) => {
    props.handleSave({ title })
  }

  const saveTable = (fields) => {
    props.handleSave({ fields })
  }

  return (
    <div>
      <Subtitle text={tableTitle} updateTitle={saveTitle} />
      <EditableTable
        id="child-sensitive-matrix"
        handleSave={saveTable}
        tableStructure={tableStructure}
        tableData={tableData}
      />
    </div>
  );
};

export default ChildSensitiveMatrix;
