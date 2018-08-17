import React, { Component } from "react";
import * as SurveyJSEditor from "surveyjs-editor";
// import SurveyKo from "survey-knockout";
import "surveyjs-editor/surveyeditor.css";
import "bootstrap/dist/css/bootstrap.css";

// import widgets from "surveyjs-widgets";

// widgets.icheck(SurveyKo, $);
// widgets.select2(SurveyKo, $);
// widgets.inputmask(SurveyKo);
// widgets.jquerybarrating(SurveyKo, $);
// widgets.jqueryuidatepicker(SurveyKo, $);
// widgets.nouislider(SurveyKo);
// widgets.select2tagbox(SurveyKo, $);
// widgets.signaturepad(SurveyKo);
// widgets.sortablejs(SurveyKo);
// widgets.ckeditor(SurveyKo);
// widgets.autocomplete(SurveyKo, $);
// widgets.bootstrapslider(SurveyKo);

class SurveyEditor extends Component {
  editor;

  componentDidMount() {
    let editorOptions = { showEmbededSurveyTab: true };
    this.editor = new SurveyJSEditor.SurveyEditor(
      "surveyEditorContainer",
      editorOptions
    );
    this.editor.saveSurveyFunc = this.saveMySurvey;
  }
  render() {
    return <div id="surveyEditorContainer" />;
  }

  saveMySurvey = () => {
    console.log(JSON.stringify(this.editor.text));
  };
}

export default SurveyEditor;