import React from 'react'
import ImageUploader from '../../assets/js/react-images-upload/index.js';
import EditorWrapper from './EditorWrapper';
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

class ImageEditor extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = { source: this.props.source, caption: this.props.caption, loading: false }
    this.toggleEditing = () => this._toggleEditing()
    this.handleImageChange = (image) => this._handleImageChange(image)
    this.handleCaptionChange = (val) => this._handleCaptionChange(val)
    this.handleDoneEditing = () => this._handleDoneEditing();
  }

  _handleCaptionChange(event) {
    const caption = event.currentTarget.value;
    this.setState({ caption })
  }

  _handleImageChange(event) {
    this.setState({ loading: true });
    const image = event.target.files[0];
    const storage = firebase.storage().ref();

    const fileRef = storage.child(`images/${image.name}`);

    fileRef.put(image).then(snapshot => {
      this.setState({
        source: snapshot.downloadURL,
        preview: snapshot.downloadURL,
        loading: false
      })
    });
  }

  _handleDoneEditing() {
    this.props.doneEditing({ source: this.state.source, caption: this.state.caption })
  }

  render() {
    const { text } = this.state;

    return (
      <EditorWrapper handleDoneEditing={this.handleDoneEditing}>
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
            {
              this.state.loading &&
              <div className="loader-container">
                <div className="loader">loading...</div>
              </div>
            }
            {
              this.state.preview &&
              <div className="image-container">
                <img src={this.state.preview} alt={`image preview`} />
              </div>
            }
          </div>
          <div className="form-group">
            Caption (optional): <input className="form-control" name="caption" value={this.state.caption || ''} onChange={this.handleCaptionChange} />
          </div>
        </div>
      </EditorWrapper>
    )
  }
};

export default ImageEditor;