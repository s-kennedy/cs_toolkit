import React from 'react'
import TextEditor, { createValueFromString } from 'react-rte';

class RichTextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: this.props.content, editorValue: null }
  }

  componentDidMount() {
    this.initializeEditorState();
  }

  initializeEditorState = () => {
    const editorValue = createValueFromString(this.state.content.text, 'html');
    this.setState({ editorValue });
  }

  onChange = (editorValue) => {
    const text = editorValue.toString('html')
    this.setState({ editorValue, content: { text } })
  }


  render() {
    const { editorValue } = this.state;

    if (editorValue) {
      return (<TextEditor value={editorValue} onChange={this.onChange} />)
    }

    return (<div />)
  }
};

export default RichTextEditor;