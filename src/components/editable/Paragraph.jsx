import React from 'react'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, convertFromRaw, EditorState, ContentState } from 'draft-js';
import { Button } from 'reactstrap';
import DisplayParagraph from '../display/Paragraph'
import Editable from './Editable'
import RichTextEditor from '../editingTools/RichTextEditor'

import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


class Paragraph extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = { editing: false }
    this.toggleEditing = () => this._toggleEditing()
    this.doneEditing = (text) => this._doneEditing(text);
  }

  _toggleEditing() {
    this.setState({ editing: !this.state.editing })
  }

  _doneEditing(text) {
    this.toggleEditing();
    this.props.updateContent(this.props.sectionIndex, this.props.index, { text })
  }

  render() {
    if (this.state.editing) {
      return (
        <RichTextEditor doneEditing={this.doneEditing} text={this.props.text} />
      )
    }

    return (
      <Editable toggleEditing={this.toggleEditing} {...this.props} >
        <DisplayParagraph text={this.props.text} />
      </Editable>
    )
  }
};

export default Paragraph;