import React from 'react'

import DisplayAction from '../display/Action'
import Editable from './Editable'
import LinkEditor from '../editingTools/LinkEditor'

class Action extends React.Component {
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

  _doneEditing(updatedLink) {
    this.toggleEditing();
    this.props.updateContent(this.props.sectionIndex, this.props.index, updatedLink)
  }

  render() {
    if (this.state.editing) {
      return (
        <LinkEditor doneEditing={this.doneEditing} anchor={this.props.anchor} link={this.props.link} />
      )
    }

    return (
      <Editable toggleEditing={this.toggleEditing} {...this.props}>
        <DisplayAction anchor={this.props.anchor} link={this.props.link} />
      </Editable>
    )
  }
};

export default Action;