import React from 'react'
import Editable from './Editable';
import DisplayFileUpload from '../display/FileUpload';
import FileUploadEditor from '../editingTools/FileUploadEditor';


class FileUpload extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = { editing: false }
    this.toggleEditing = () => this._toggleEditing()
    this.doneEditing = (data) => this._doneEditing(data);
  }

  _toggleEditing() {
    this.setState({ editing: !this.state.editing })
  }

  _doneEditing(updatedContent) {
    this.toggleEditing();
    this.props.updateContent(this.props.sectionIndex, this.props.index, updatedContent)
  }

  render() {

    if (this.state.editing) {
      return (
        <FileUploadEditor
          filepath={this.props.filepath}
          title={this.props.title}
          filetype={this.props.filetype}
          doneEditing={this.doneEditing}
        />
      )
    }

    return (
      <Editable toggleEditing={this.toggleEditing} {...this.props}>
        <DisplayFileUpload
          filepath={this.props.filepath}
          title={this.props.title}
          filetype={this.props.filetype}
        />
      </Editable>
    )
  }
};

export default FileUpload;