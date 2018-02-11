import React from 'react'
import EditorWrapper from './EditorWrapper';

const styles = {
  header: {
    display: 'flex'
  },
  input: {
    width: '100%'
  }
}

class PlainTextEditor extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = { text: this.props.text }
    this.handleEditorChange = (event) => this._handleEditorChange(event)
    this.handleDoneEditing = () => this._handleDoneEditing();
  }

  _handleEditorChange (event) {
    const text = event.currentTarget.value;
    this.setState({ text });
  };

  _handleDoneEditing() {
    this.props.doneEditing(this.state.text)
  }

  render() {
    const { text } = this.state;

    return (
      <EditorWrapper handleDoneEditing={this.handleDoneEditing}>
        <input
          style={styles.input}
          value={ text }
          onChange={this.handleEditorChange}
        />
      </EditorWrapper>
    )
  }
};

export default PlainTextEditor;