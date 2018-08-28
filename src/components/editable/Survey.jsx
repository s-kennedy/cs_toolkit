import React from "react";

import * as Survey from "survey-react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Editable from "./Editable";
import SurveyEditor from "../editingTools/SurveyEditor";
import PlainTextEditor from "../editingTools/PlainTextEditor";

import "survey-react/survey.css";

const EditableSurvey = props => {
  const handleSaveSurvey = text => {
    props.saveChanges(() =>
      props.updateContent(props.sectionIndex, props.index, { text })
    );
  };

  const handleSaveQuizTitle = content => {
    props.saveChanges(() =>
      props.updateContent(props.sectionIndex, props.index, { title: content.text })
    );
  }

  const { text, title, ...rest } = props;
  const model = new Survey.Model(text);

  return (
    <div>
      <Typography variant="display2" gutterBottom>
        <Editable
          editor={PlainTextEditor}
          handleSave={handleSaveQuizTitle}
          content={{ text: title }}
          { ...rest }
        >
          { title }
        </Editable>
      </Typography>

      <Editable
        editor={SurveyEditor}
        handleSave={handleSaveSurvey}
        content={{ text: text }}
        surveyEditor={true}
        {...rest}
      >
        <Paper>
          <Survey.Survey
            model={model}
            onComplete={val => console.log('complete', val)}
            onValueChanged={val => console.log("value changed", val)}
          />
        </Paper>
      </Editable>
    </div>
  );
};

export default EditableSurvey;
