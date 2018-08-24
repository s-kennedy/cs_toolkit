import React, { Component } from "react";
import * as SurveyJSEditor from "surveyjs-editor";
import "surveyjs-editor/surveyeditor.css";
import "bootstrap/dist/css/bootstrap.css";

class SurveyEditor extends Component {
  editor;
  state = {
    content: this.props.content
  };

  componentDidMount() {
    let editorOptions = {
      showEmbededSurveyTab: false,
      showJSONEditorTab: false,
    };
    this.editor = new SurveyJSEditor.SurveyEditor(
      "surveyEditorContainer",
      editorOptions
    );
    this.editor.text = JSON.stringify(this.props.content.text);
    this.editor.saveSurveyFunc = () => {
      this.setState({ content: { text: this.editor.text }})
    }
  }

  render() {
    return <div id="surveyEditorContainer" />;
  }
}

export default SurveyEditor;
