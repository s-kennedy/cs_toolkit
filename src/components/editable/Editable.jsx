import React from "react";
import PropTypes from 'prop-types';
import EditorWrapper from "../editingTools/EditorWrapper";
import { connect } from 'react-redux';
import { toggleOverlay } from '../../redux/actions';

class Editable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
  }

  toggleEditing = () => {
    this.setState({ active: !this.state.active });
    this.props.toggleOverlay();
  };

  handleDelete = () => {
    this.props.deleteContent(this.props.sectionIndex, this.props.index);
  };

  handleSave = () => {
    this.toggleEditing();
    this.props.handleSave(this.editor.state.content);
  };

  render() {
    if (this.props.isEditing) {
      const Editor = this.props.editor;

      return (
        <EditorWrapper
          active={this.state.active}
          toggleEditing={this.toggleEditing}
          handleDelete={this.handleDelete}
          handleSave={this.handleSave}
          fullWidth={this.props.fullWidth}
          disableDelete={this.props.disableDelete}
        >
          {this.state.active && (
            <Editor
              handleChange={this.props.handleChange}
              ref={editor => (this.editor = editor)}
              content={this.props.content}
              { ...this.props }
            />
          )}
          {(!this.state.active || !!this.props.showChildren) && this.props.children}
        </EditorWrapper>
      );
    } else {
      return this.props.children;
    }
  }
}

Editable.propTypes = {
  editor: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  content: PropTypes.object.isRequired,
  handleChange: PropTypes.func,
  deleteContent: PropTypes.func,
};

Editable.defaultProps = {
  isEditing: false
}


const mapDispatchToProps = dispatch => {
  return {
    toggleOverlay: () => {
      dispatch(toggleOverlay());
    }
  }
}

export default connect(null, mapDispatchToProps)(Editable);
