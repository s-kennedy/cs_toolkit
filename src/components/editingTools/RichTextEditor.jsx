import React from 'react'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import EditorWrapper from './EditorWrapper';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, convertFromRaw, EditorState, ContentState } from 'draft-js';

class RichTextEditor extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {}
    this.initializeEditorState = () => this._initializeEditorState();
    this.handleEditorStateChange = (state) => this._handleEditorStateChange(state)
    this.handleDoneEditing = () => this._handleDoneEditing();
  }

  componentDidMount() {
    this.initializeEditorState();
  }

  _initializeEditorState() {
    const blocksFromHtml = htmlToDraft(this.props.text);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorState = EditorState.createWithContent(contentState);

    this.setState({ editorState });
  }

  _handleEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
  };

  _handleDoneEditing() {
    const newContent = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
    this.props.doneEditing(newContent);
  }

  render() {
    const { editorState } = this.state;

    return (
      <EditorWrapper handleDoneEditing={this.handleDoneEditing}>
        <Editor editorState={editorState} onEditorStateChange={this.handleEditorStateChange} />
      </EditorWrapper>
    )
  }
};

export default RichTextEditor;