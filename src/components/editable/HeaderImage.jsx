import React from 'react'

import DisplayHeaderImage from '../display/HeaderImage'
import Editable from './Editable'
import ImageEditor from '../editingTools/ImageEditor'

const styles = {
  header: {
    display: 'flex'
  }
}

class HeaderImage extends React.Component {
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

  _doneEditing(data) {
    this.toggleEditing();
    this.props.updateHeader({ image: data.source })
  }

  render() {
    if (this.state.editing) {
      return (
        <DisplayHeaderImage image={this.props.image} height={'auto'}>
          <div>
            <ImageEditor source={this.props.image} doneEditing={this.doneEditing} />
            {this.props.children}
          </div>
        </DisplayHeaderImage>
      )
    } else {
      return (
        <Editable toggleEditing={this.toggleEditing} fullWidth={true} height={'65vh'} {...this.props}>
          <DisplayHeaderImage image={this.props.image}>
            {this.props.children}
          </DisplayHeaderImage>
        </Editable>
      )
    }
  }
};

export default HeaderImage;