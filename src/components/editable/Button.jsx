import React from 'react'
import { Button } from 'reactstrap';
import Link from 'gatsby-link';
import CustomButton from '../display/CustomButton'
import Editable from './Editable'
import ButtonEditor from '../editingTools/ButtonEditor'

class STCButton extends React.Component {
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

  _doneEditing(updatedButton) {
    this.toggleEditing();
    this.props.updateContent(this.props.sectionIndex, this.props.index, updatedButton)
  }

  render() {
    if (this.state.editing) {
      return (
        <ButtonEditor anchor={this.props.anchor} link={this.props.link} doneEditing={this.doneEditing} />
      )
    }

    return (
      <Editable toggleEditing={this.toggleEditing} {...this.props}>
        <CustomButton link={this.props.link} anchor={this.props.anchor} />
      </Editable>
    )
  }
};

export default STCButton;