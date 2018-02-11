import React from 'react'

import DisplayName from '../display/Name'
import Editable from './Editable'
import PlainTextEditor from '../editingTools/PlainTextEditor'

class Name extends React.Component {
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
        <PlainTextEditor doneEditing={this.doneEditing} text={this.props.text} />
      )
    }

    return (
      <Editable toggleEditing={this.toggleEditing} {...this.props}>
        <DisplayName text={this.props.text} />
      </Editable>
    )
  }
};

export default Name;