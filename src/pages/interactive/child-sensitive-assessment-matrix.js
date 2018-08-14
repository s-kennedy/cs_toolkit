import React from "react";
import { connect } from "react-redux";
import { graphql } from 'gatsby';
import uuidv4 from "uuid/v4";
import Typography from '@material-ui/core/Typography';
import Layout from '../../layouts/index';
import Footer from '../../components/Footer'
import Editable from '../../components/editable/Editable'
import PlainTextEditor from '../../components/editingTools/PlainTextEditor'
import Paragraph from '../../components/editable/Paragraph'

import { getToolData, saveToolData, toggleEditingTool } from "../../redux/actions";

import ChildSensitiveMatrix from "../../components/interactiveTools/ChildSensitiveMatrix";

const TOOL_TYPE = 'Child Sensitive Assessment Matrix'

class MatrixPage extends React.Component {
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
      this.setState({ toolId });
    }
  }

  saveTool = input => {
    const newData = { ...this.props.toolData, ...input };
    const slug = this.props.location.pathname;
    const toolId = this.state.toolId || uuidv4();
    this.props.saveToolData(toolId, newData, slug, TOOL_TYPE);
    this.props.history.push(`${this.props.history.location.pathname}?id=${toolId}`)
  };

  saveTitle = input => {
    console.log(input)
  }

  render() {
    const toolData = this.props.toolData || {};
    const fields = toolData.fields;
    const title = toolData.title;

    return (
      <Layout>
        <div className="interactive-tool">
          <section>
            <div className="title">
              <Typography variant="display1" gutterBottom>{this.props.data.toolPages.title}</Typography>
            </div>
            <div className="instructions">
              <Typography variant="display3" gutterBottom>
                <Editable
                  editor={PlainTextEditor}
                  handleSave={this.saveTitle}
                  content={{ text: this.props.data.toolPages.header }}
                  {...this.props}
                >
                  {this.props.data.toolPages.header}
                </Editable>
              </Typography>
              <Paragraph text={this.props.data.toolPages.paragraph} handleSave={this.saveTitle} />
            </div>
          </section>
          <section>
            <ChildSensitiveMatrix
              tableData={fields}
              title={title}
              handleSave={this.saveTool}
            />
          </section>
        </div>
        <Footer />
      </Layout>
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

export default connect(mapStateToProps, mapDispatchToProps)(MatrixPage);

export const query = graphql`
  query {
    toolPages(id: { eq: "child-sensitive-assessment-matrix" }) {
      id
      title
      header
      paragraph
    }
  }
`;

