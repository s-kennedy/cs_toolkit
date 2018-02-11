import React from 'react'
import { Button } from 'reactstrap';
import DisplayHeader from '../display/Header'
import Editable from './Editable'
import PlainTextEditor from '../editingTools/PlainTextEditor'

const styles = {
  header: {
    display: 'flex'
  }
}

class Header extends React.Component {
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
    this.props.updateContent(this.props.sectionIndex, this.props.index, { text })
  }

  render() {
    if (this.state.editing) {
      return (
        <div className='header' style={styles.header}>
          <h3>
            <PlainTextEditor doneEditing={this.doneEditing} text={this.props.text} />
          </h3>
        </div>
      )
    }

    return (
      <Editable toggleEditing={this.toggleEditing} {...this.props}>
        <DisplayHeader text={this.props.text} />
      </Editable>
    )
  }
};

export default Header;