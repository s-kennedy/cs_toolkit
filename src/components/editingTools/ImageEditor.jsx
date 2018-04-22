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

class ImageEditor extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      content: this.props.content
    };
    this.toggleEditing = () => this._toggleEditing();
    this.handleImageChange = image => this._handleImageChange(image);
    this.handleCaptionChange = val => this._handleCaptionChange(val);
    this.handleDoneEditing = () => this._handleDoneEditing();
  }

  _handleCaptionChange(event) {
    const caption = event.currentTarget.value;
    this.setState({
      content: {
        ...this.state.content,
        caption: caption
      }
    });
  }

  _handleImageChange(event) {
    this.setState({ loading: true });
    const image = event.target.files[0];
    const storage = firebase.storage().ref();

    const fileRef = storage.child(`images/${image.name}`);

    fileRef.put(image).then(snapshot => {
      this.setState({
        preview: snapshot.downloadURL,
        loading: false,
        content: {
          ...this.state.content,
          imageSrc: snapshot.downloadURL
        }
      });
    });
  }

  render() {
    return (
      <div className="image-uploader-container">
        <div className="form-group">
          <label className="btn btn-secondary" style={styles.button}>
            Select image
            <input
              type="file"
              hidden={true}
              onChange={this.handleImageChange}
            />
          </label>
          {this.state.loading && (
            <div className="loader-container">
              <div className="loader">loading...</div>
            </div>
          )}
          {this.state.preview && (
            <div className="image-container">
              <img src={this.state.preview} alt={`image preview`} />
            </div>
          )}
        </div>
        {
          this.props.editCaption &&
          <div className="form-group">
            Caption:{" "}
            <input
              className="form-control"
              name="caption"
              value={this.state.content.caption || ""}
              onChange={this.handleCaptionChange}
            />
          </div>
        }
      </div>
    );
  }
}

export default ImageEditor;
