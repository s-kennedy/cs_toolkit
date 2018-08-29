import React, { Component } from "react";
import * as SurveyJSEditor from "surveyjs-editor";
import "surveyjs-editor/surveyeditor.css";

const styles =  {
  wrapper: {
    overflow: 'scroll',
  },
  container: {
    minWidth: '1100px',
  }
}

class SurveyEditor extends Component {
  editor;

  componentDidMount() {
    let editorOptions = {
      showEmbededSurveyTab: false,
      showJSONEditorTab: false,
    };

    SurveyJSEditor.StylesManager.ThemeColors.default = { ...SurveyJSEditor.StylesManager.ThemeColors.default,
      "$main-color": "#01b4aa",
      "$main-hover-color": "#004440",
      "$header-color": "#01b4aa",
      "$header-background-color": "#ddf2f1",
    }

    SurveyJSEditor.StylesManager.applyTheme();

    this.editor = new SurveyJSEditor.SurveyEditor(
      "surveyEditorContainer",
      editorOptions
    );
    const testprops = this.props;
    this.editor.text = this.props.content.text;
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <div id="surveyEditorContainer" style={styles.container} />
      </div>
    )
  }
}

export default SurveyEditor;
