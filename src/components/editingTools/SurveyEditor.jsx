import React, { Component } from "react";
import * as SurveyJSEditor from "surveyjs-editor";
import "surveyjs-editor/surveyeditor.css";
import "bootstrap/dist/css/bootstrap.css";

class SurveyEditor extends Component {
  editor;

  componentDidMount() {
    let editorOptions = {
      showEmbededSurveyTab: false,
      showJSONEditorTab: false,
    };
    this.editor = new SurveyJSEditor.SurveyEditor(
      "surveyEditorContainer",
      editorOptions
    );
    const testprops = this.props;
    this.editor.text = this.props.content.text;
  }

  render() {
    return <div id="surveyEditorContainer" />;
  }
}

export default SurveyEditor;
