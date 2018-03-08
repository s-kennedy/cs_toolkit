import React from 'react'
import EditorWrapper from './EditorWrapper';
import DisplayFileUpload from '../display/FileUpload';
import firebase from "../../firebase/init";
import { Button } from 'reactstrap';

import '../../assets/sass/image_uploader.scss';

const styles = {
  header: {
    display: 'flex'
  },
  button: {
    textTransform: 'uppercase',
    fontFamily: 'Trade Gothic'
  }
}

class FileUploadEditor extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      filepath: this.props.filepath,
      title: this.props.title,
      filetype: this.props.filetype,
      loading: false
    }
    this.toggleEditing = () => this._toggleEditing()
    this.handleFileChange = (image) => this._handleFileChange(image)
    this.handleCaptionChange = (val) => this._handleCaptionChange(val)
    this.handleDoneEditing = () => this._handleDoneEditing();
  }

  _handleCaptionChange(event) {
    const title = event.currentTarget.value;
    this.setState({ title })
  }

  _handleFileChange(event) {
    this.setState({ loading: true });
    const file = event.target.files[0];
    const splitName = file.name.split('.');
    const filetype = splitName[splitName.length - 1];

    const fileRef = firebase.storage().ref().child(`files/${file.name}`);

    fileRef.put(file).then(snapshot => {
      this.setState({
        filepath: snapshot.downloadURL,
        preview: snapshot.downloadURL,
        loading: false,
        filetype: filetype
      })
    });
  }

  _handleDoneEditing() {
    this.props.doneEditing({
      filepath: this.state.filepath,
      title: this.state.title,
      filetype: this.state.filetype
    })
  }

  render() {
    const { text } = this.state;

    return (
      <EditorWrapper handleDoneEditing={this.handleDoneEditing}>
        <div className="image-uploader-container">
          <div className="form-group">
            <label className="btn btn-secondary" style={styles.button}>
              Select file
              <input
                type="file"
                hidden={true}
                onChange={this.handleFileChange}
              />
            </label>
            {
              this.state.loading &&
              <div className="loader-container">
                <div className="loader">loading...</div>
              </div>
            }
            {
              this.state.preview &&
              <DisplayFileUpload
                filepath={this.state.preview}
                title={this.state.title}
                filetype={this.state.filetype}
              />
            }
          </div>
          <div className="form-group">
            Title to display: <input className="form-control" name="title" value={this.state.title || ''} onChange={this.handleCaptionChange} />
          </div>
        </div>
      </EditorWrapper>
    )
  }
};

export default FileUploadEditor;