import React from "react";
import firebase from "../../firebase/init";

import "../../assets/sass/image_uploader.scss";

const styles = {
  header: {
    display: "flex"
  },
  button: {
    textTransform: "uppercase",
    fontFamily: "Trade Gothic"
  }
};

class FileUploadEditor extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = { content: this.props.content, loading: false };
    this.toggleEditing = () => this._toggleEditing();
    this.handleFileChange = image => this._handleFileChange(image);
    this.handleCaptionChange = val => this._handleCaptionChange(val);
    this.handleDoneEditing = () => this._handleDoneEditing();
  }

  _handleCaptionChange(event) {
    const title = event.currentTarget.value;
    this.setState({
      content: {
        ...this.state.content,
        title: title
      }
    });
  }

  _handleFileChange(event) {
    this.setState({ loading: true });
    const file = event.target.files[0];
    const splitName = file.name.split(".");
    const filetype = splitName[splitName.length - 1];

    const fileRef = firebase
      .storage()
      .ref()
      .child(`files/${file.name}`);

    fileRef.put(file).then(snapshot => {
      this.setState({
        content: {
          ...this.state.content,
          filepath: snapshot.downloadURL,
          filetype: filetype
        },
        preview: snapshot.downloadURL,
        loading: false
      });
    });
  }

  render() {
    const { title, filepath, filetype } = this.state.content;

    return (
      <div className="image-uploader-container">
        <div className="form-group">
          <label className="btn btn-secondary" style={styles.button}>
            Select file
            <input type="file" hidden={true} onChange={this.handleFileChange} />
          </label>
          {this.state.loading && (
            <div className="loader-container">
              <div className="loader">loading...</div>
            </div>
          )}
          {this.state.preview && (
            <DisplayFileUpload
              filepath={filepath}
              title={title}
              filetype={filetype}
            />
          )}
        </div>
        <div className="form-group">
          Title to display:{" "}
          <input
            className="form-control"
            name="title"
            value={title || ""}
            onChange={this.handleCaptionChange}
          />
        </div>
      </div>
    );
  }
}

export default FileUploadEditor;
