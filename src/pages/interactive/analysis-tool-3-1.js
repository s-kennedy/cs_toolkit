import React from "react";
import { connect } from "react-redux";
import uuidv4 from "uuid/v4";

import { getToolData, saveToolData, toggleEditingTool } from "../../redux/actions";

import ObjectiveTree from "../../components/interactiveTools/ObjectiveTree";

const TOOL_TYPE = 'Objective Tree Worksheet'

class ObjectiveTreePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const queryString = this.props.location.search;
    const params = new URLSearchParams(queryString);
    let toolId = params.get("id");
    if (toolId) {
      this.props.getToolData(toolId);
    } else {
      toolId = uuidv4()
      this.props.history.push(`${this.props.history.location.pathname}?id=${toolId}`)
    }
    this.setState({ toolId });
  }

  saveTool = input => {
    const newData = { ...this.props.toolData, ...input };
    const slug = this.props.location.pathname;
    this.props.saveToolData(this.state.toolId, newData, slug, TOOL_TYPE);
  };

  render() {
    const toolData = this.props.toolData || {};
    const fields = toolData.fields;
    const title = toolData.title;

    return (
      <div className="interactive-tool">
        <div className="title">
          <h1>{TOOL_TYPE}</h1>
        </div>
        <ObjectiveTree
          tableData={fields}
          title={title}
          handleSave={this.saveTool}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isEditing: state.interactiveTool.isEditing,
    toolData: state.interactiveTool.toolData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getToolData: id => {
      dispatch(getToolData(id));
    },
    saveToolData: (id, data, slug, type) => {
      dispatch(saveToolData(id, data, slug, type));
    },
    toggleEditingTool: () => {
      dispatch(toggleEditingTool());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveTreePage);
