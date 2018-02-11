import React from 'react'

import Editable from './Editable';
import DisplayTitle from '../display/Title';
import PlainTextEditor from '../editingTools/PlainTextEditor'


class Title extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = { editing: false }
    this.toggleEditing = () => this._toggleEditing()
    this.handleEditorChange = (event) => this._handleEditorChange(event)
    this.doneEditing = (text) => this._doneEditing(text);
  }

  _toggleEditing() {
    this.setState({ editing: !this.state.editing })
  }

  _handleEditorChange (event) {
    const text = event.currentTarget.value;
    this.setState({ text });
  };

  _doneEditing(text) {
    this.toggleEditing();
    this.props.updateTitle(text)
  }

  render() {
    if (this.state.editing) {
      return (
        <h2>
          <PlainTextEditor text={this.props.text} doneEditing={this.doneEditing} />
        </h2>
      )
    }

    return (
      <Editable toggleEditing={this.toggleEditing}>
        <DisplayTitle text={this.props.text} />
      </Editable>
    )
  }
};

export default Title;