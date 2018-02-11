import React from 'react'
import ImageUploader from '../../assets/js/react-images-upload/index.js';
import EditorWrapper from './EditorWrapper';

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
    this.state = { source: this.props.source, caption: this.props.caption }
    this.toggleEditing = () => this._toggleEditing()
    this.handleImageChange = (image) => this._handleImageChange(image)
    this.handleCaptionChange = (val) => this._handleCaptionChange(val)
    this.handleDoneEditing = () => this._handleDoneEditing();
  }

  _handleCaptionChange(event) {
    const caption = event.currentTarget.value;
    this.setState({ caption })
  }

  _handleImageChange(image) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({ source: reader.result })
    }
    reader.readAsDataURL(image[0]);
  }

  _handleDoneEditing() {
    this.props.doneEditing({ source: this.state.source, caption: this.state.caption })
  }

  render() {
    const { text } = this.state;

    return (
      <EditorWrapper handleDoneEditing={this.handleDoneEditing}>
        <ImageUploader
          withIcon={true}
          withPreview={true}
          buttonText='Choose an image'
          imgExtension={['.jpg', '.gif', '.png']}
          onChange={this.handleImageChange}
        />
        {
          this.props.caption &&
          <input value={this.state.caption} onChange={this.handleCaptionChange} />
        }
      </EditorWrapper>
    )
  }
};

export default ImageEditor;