import React from "react";
import FontAwesome from "react-fontawesome";
import { connect } from "react-redux";
import EditorWrapper from "../editingTools/EditorWrapper";

class Editable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false };
  }

  toggleEditing = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  handleDelete = () => {
    this.props.deleteContent(this.props.sectionIndex, this.props.index);
  };

  handleSave = () => {
    this.toggleEditing();
    console.log('EDITOR STATE', this.editor.state)
    console.log('EDITOR CONTENT', this.editor.state.content);
    this.props.handleSave(this.editor.state.content);
  };

  render() {
    if (this.props.isEditingPage) {
      const Editor = this.props.editor;

      return (
        <EditorWrapper
          isEditing={this.state.isEditing}
          toggleEditing={this.toggleEditing}
          handleDelete={this.handleDelete}
          handleSave={this.handleSave}
          fullWidth={this.props.fullWidth}
          disableDelete={this.props.disableDelete}
        >
          {this.state.isEditing && (
            <Editor
              handleChange={this.props.handleChange}
              ref={editor => (this.editor = editor)}
              content={this.props.content}
              { ...this.props }
            />
          )}
          {(!this.state.isEditing || !!this.props.showChildren) && this.props.children}
        </EditorWrapper>
      );
    } else {
      return this.props.children;
    }
  }
}

const mapStateToProps = state => {
  return {
    isEditingPage: state.adminTools.isEditingPage
  };
};

export default connect(mapStateToProps, null)(Editable);
