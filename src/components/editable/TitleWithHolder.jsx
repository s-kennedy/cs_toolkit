import React from 'react'
import { Button } from 'reactstrap';
import Editable from './Editable';
import DisplayTitleWithHolder from '../display/TitleWithHolder';
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

class TitleWithHolder extends React.Component {
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
    this.props.updateHeader({ title: text })
  }

  render() {
    if (this.state.editing) {
      return (
        <div className='display-title edit-container'>
          <h1 className="display-3">
            <PlainTextEditor text={this.props.text} doneEditing={this.doneEditing} />
          </h1>
        </div>
      )
    }

    return (
      <Editable toggleEditing={this.toggleEditing}>
        <DisplayTitleWithHolder text={this.props.text} />
      </Editable>
    )
  }
};

export default TitleWithHolder;