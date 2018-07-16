import React from "react";

import { connect } from "react-redux";
import { toggleEditing } from "../../redux/actions";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Table from "../editable/Table";

import Subtitle from "../editable/Subtitle";

const tableStructure = [
  {
    header: "Questions to ask",
    type: "text",
    fieldName: "questions"
  },
  {
    header: "Yes/No",
    type: "text",
    fieldName: "yesNo"
  },
  {
    header: "Action required",
    type: "text",
    fieldName: "action"
  },
  {
    header: "Details of action required",
    type: "text",
    fieldName: "details"
  }
];

const initialTableData = [
  {
    questions:
      "Has the monitoring plan been documented, agreed and signed off by the technical teams and project manager?",
    yesNo: "",
    action: "",
    details: ""
  },
  {
    questions:
      "Have arrangements have been made to validate and feedback the findings from monitoring data to communities including children?",
    yesNo: "",
    action: "",
    details: ""
  },
  {
    questions:
      "Have the relevant permissions required to carry out the monitoring been gained at community and local authority level?",
    yesNo: "",
    action: "",
    details: ""
  },
  {
    questions:
      "Has informed consent for each participating child been gained? And a contact person identified for children to reach out to if they have more questions?",
    yesNo: "",
    action: "",
    details: ""
  },
  {
    questions:
      "Have relevant permissions have been gained for the validation and feedback sessions? e.g. from community leader",
    yesNo: "",
    action: "",
    details: ""
  },
  {
    questions:
      "Have all sites planned for monitoring, including access to these sites, been given security clearance?",
    yesNo: "",
    action: "",
    details: ""
  },
  {
    questions: "Have all monitoring team members received a security briefing?",
    yesNo: "",
    action: "",
    details: ""
  },
  {
    questions:
      "Have all modes of transport and accommodation sites been given safety and security clearance?",
    yesNo: "",
    action: "",
    details: ""
  },
  {
    questions:
      "Has equality of opportunity for children participating in the project monitoring been considered? e.g. for working children, children with disabilities, children at school, orphaned or vulnerable children.",
    yesNo: "",
    action: "",
    details: ""
  },
  {
    questions:
      "Is there any threat of violence or other retaliatory actions for children resulting from their participation in project monitoring? e.g. from other children, parents/caregivers, community members, religious groups, groups engaged in armed conflict?",
    yesNo: "",
    action: "",
    details: ""
  },
  {
    questions:
      "Is there any threat of violence or other retaliatory actions for community members in the locations where project monitoring is taking place? e.g. from other communities, religious groups, groups engaged in armed conflict?",
    yesNo: "",
    action: "",
    details: ""
  },
  {
    questions:
      "Are the trauma and stress levels of any children too high for them to safely participate in the project monitoring? Is participation of all children in project monitoring voluntary?",
    yesNo: "",
    action: "",
    details: ""
  },
  {
    questions:
      "Does a protocol exist to manage disclosures made by children during project monitoring?",
    yesNo: "",
    action: "",
    details: ""
  },
  {
    questions:
      "Will sharing the results of project monitoring put children, their families and communities at further risk of harm?",
    yesNo: "",
    action: "",
    details: ""
  },
  {
    questions:
      "Have specific measures been put in place to protect the children and communities where project monitoring is taking place against further risk of harm as a result of disseminating the monitoring findings?",
    yesNo: "",
    action: "",
    details: ""
  },
  {
    questions:
      "Has each member of the monitoring team been given an adequate and equal amount of training? Is each member of the monitoring team thoroughly familiar with the data collection methodologies of each data collection tool?",
    yesNo: "",
    action: "",
    details: ""
  },
  {
    questions:
      "Is there an adequate balance amongst the monitoring team in regard to gender, ability and ethnicity?",
    yesNo: "",
    action: "",
    details: ""
  },
  {
    questions:
      "Have all members of the monitoring team, including translators and drivers been briefed on:    • The objectives and methodology of the monitoring?   • Key organisational policies including Code of Conduct, Child Safeguarding, Child Participation standards, and the behaviours expected of all staff and volunteers?   • The techniques and tools that will be used?   • The schedule as well as the communication, security and emergency procedures?   • The administrative and logistic arrangements, such as transport and accommodation?",
    yesNo: "",
    action: "",
    details: ""
  },
  {
    questions:
      "Has each member of the monitoring team signed the child safeguarding protocol and code of conduct?",
    yesNo: "",
    action: "",
    details: ""
  },
  {
    questions:
      "Are there an adequate number of facilitators with previous experience of working with children?",
    yesNo: "",
    action: "",
    details: ""
  },
  {
    questions:
      "Have all facilitators and note takers received notes to explain key terminologies and an outline of site sampling? Is it possible to pilot the tools in communities not included in the monitoring sample?",
    yesNo: "",
    action: "",
    details: ""
  },
  {
    questions:
      "Have locations for all monitoring activities been identified and secured?",
    yesNo: "",
    action: "",
    details: ""
  },
  {
    questions:
      "Do locations for monitoring offer a safe, accessible and enabling environment for children?",
    yesNo: "",
    action: "",
    details: ""
  }
];

const styles = {
  container: {
    marginTop: "2rem"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start"
  }
};

const RiskMitigationPlan = props => {
  const tableData = props.tableData || initialTableData;
  const tableTitle = props.title || "Your title here";
  const toggleEditingBtn = props.isEditingPage
    ? "Done editing"
    : "Start Editing";

  const saveTitle = title => {
    props.handleSave({ title });
  };

  const saveTable = fields => {
    props.handleSave({ fields });
  };

  return (
    <div style={styles.container}>
      <Grid container justify={"space-between"}>
        <Grid item>
          <Subtitle text={tableTitle} updateTitle={saveTitle} disableDelete />
        </Grid>
        <Grid item>
          <Button
            onClick={props.onToggleEditing}
            variant="raised"
            color="secondary"
          >
            {toggleEditingBtn}
          </Button>
        </Grid>
      </Grid>
      <Table
        id="risk-assumption-matrix"
        saveTable={saveTable}
        tableStructure={tableStructure}
        tableData={tableData}
        disableDelete
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleEditing: () => {
      dispatch(toggleEditing());
    }
  };
};

const mapStateToProps = state => {
  return {
    isEditingPage: state.adminTools.isEditingPage
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RiskMitigationPlan);
