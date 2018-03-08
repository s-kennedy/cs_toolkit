import React from 'react'
import ImageUploader from '../../assets/js/react-images-upload/index.js';
import EditorWrapper from './EditorWrapper';
import firebase from "../../firebase/init";


import '../../assets/js/react-images-upload/index.css';

const styles = {
  header: {
    display: 'flex'
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

  _handleImageChange(fileList) {
    this.setState({ loading: true })
    const image = fileList[0];
    const storage = firebase.storage().ref();

    const fileRef = storage.child(`images/${image.name}`);

    fileRef.put(image).then(snapshot => {
      console.log('uploaded!!!')
      this.setState({ source: snapshot.downloadURL, loading: false })
    });
  }

  _handleDoneEditing() {
    this.props.doneEditing({ source: this.state.source, caption: this.state.caption })
  }

  render() {
    const { text } = this.state;

    return (
      <EditorWrapper handleDoneEditing={this.handleDoneEditing}>
        {
          this.state.loading && <div className="loader-container"><div className="loader">loading...</div></div>
        }
        <ImageUploader
          withIcon={true}
          withPreview={true}
          buttonText='Choose an image'
          imgExtension={['.jpg', '.gif', '.png']}
          onChange={this.handleImageChange}
        />
        <input value={this.state.caption || ''} onChange={this.handleCaptionChange} />
      </EditorWrapper>
    )
  }
};

export default ImageEditor;