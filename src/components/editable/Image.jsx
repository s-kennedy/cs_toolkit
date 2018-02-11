import React from 'react'
import Editable from './Editable';
import DisplayImage from '../display/Image';
import ImageEditor from '../editingTools/ImageEditor';


class Image extends React.Component {
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
        <ImageEditor source={this.props.source} caption={this.props.caption} doneEditing={this.doneEditing} />
      )
    }

    return (
      <Editable toggleEditing={this.toggleEditing} {...this.props}>
        <DisplayImage source={this.props.source} caption={this.props.caption} />
      </Editable>
    )
  }
};

export default Image;