import React from "react";
import EditorWrapper from "./EditorWrapper";

const styles = {
  header: {
    display: "flex"
  },
  input: {
    width: "100%",
    fontSize: "inherit",
    color: "#000",
    backgroundColor: "#fff"
  }
};

class PlainTextEditor extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = { content: this.props.content };
    this.handleEditorChange = event => this._handleEditorChange(event);
  }

  _handleEditorChange(event) {
    const text = event.currentTarget.value;
    this.setState({ content: { text } });
  }

  render() {
    const { text } = this.state.content;

    return (
      <input
        style={styles.input}
        value={text}
        onChange={this.handleEditorChange}
      />
    );
  }
}

export default PlainTextEditor;
