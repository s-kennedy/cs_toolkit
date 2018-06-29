import React from 'react'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState, ContentState } from 'draft-js';

import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class RichTextEditor extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = { content: this.props.content }
    this.initializeEditorState = () => this._initializeEditorState();
    this.handleEditorStateChange = (state) => this._handleEditorStateChange(state)
  }

  componentDidMount() {
    this.initializeEditorState();
  }

  _initializeEditorState() {
    const blocksFromHtml = htmlToDraft(this.state.content.text);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorState = EditorState.createWithContent(contentState);

    this.setState({ editorState });
  }

  _handleEditorStateChange(editorState) {
    this.setState({
      editorState,
      content: {
        text: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
      }
    });
  };


  render() {
    const { editorState } = this.state;

    return (
      <Editor editorState={editorState} onEditorStateChange={this.handleEditorStateChange} />
    )
  }
};

export default RichTextEditor;