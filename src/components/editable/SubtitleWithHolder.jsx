import React from 'react'
import { Button } from 'reactstrap';
import Editable from './Editable';
import DisplaySubtitleWithHolder from '../display/SubtitleWithHolder';
import PlainTextEditor from '../editingTools/PlainTextEditor'

const styles = {
  title: {
    margin: 0
  },
  headlineHolder: {
    backgroundColor: '#FFFFFF',
    padding: '2px 20px',
    borderRadius: '8px'
  }
}

class SubtitleWithHolder extends React.Component {
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
    this.props.updateHeader({ subtitle: text })
  }

  render() {
    if (this.state.editing) {
      return (
        <div className='display-subtitle edit-container'>
          <h3>
            <PlainTextEditor text={this.props.text} doneEditing={this.doneEditing} />
          </h3>
        </div>
      )
    }

    return (
      <Editable toggleEditing={this.toggleEditing}>
        <DisplaySubtitleWithHolder text={this.props.text} />
      </Editable>
    )
  }
};

export default SubtitleWithHolder;