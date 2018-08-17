import React, { Component } from "react";
import * as SurveyJSEditor from "surveyjs-editor";
import "surveyjs-editor/surveyeditor.css";
import "bootstrap/dist/css/bootstrap.css";

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
