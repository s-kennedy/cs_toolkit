import React from "react";

import * as Survey from "survey-react";
import Paper from "@material-ui/core/Paper";

import Editable from './Editable'
import SurveyEditor from '../editingTools/SurveyEditor'

import "survey-react/survey.css";
import "bootstrap/dist/css/bootstrap.css";


const EditableSurvey = props => {
  const handleSave = content => {
    props.saveSurvey(content.text)
  }

  const { surveyData } = props;
  const model = new Survey.Model(props.surveyData);

  return (
    <Editable
      editor={SurveyEditor}
      handleSave={handleSave}
      content={{ text: props.surveyData }}
      { ...props }
    >
      <Paper>
        <Survey.Survey
          model={model}
          onComplete={handleSave}
          onValueChanged={(val) => console.log(val)}
        />
      </Paper>
    </Editable>
  );
}

export default EditableSurvey;