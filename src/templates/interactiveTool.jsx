import React from "react";

import Helmet from "react-helmet";
import NavigationContainer from "../containers/NavigationContainer";
import SidebarNavigationContainer from "../containers/SidebarNavigationContainer";
import NotificationContainer from "../containers/NotificationContainer";
import Overlay from "../components/Overlay";
import Footer from "../components/Footer";

import Grid from "@material-ui/core/Grid";
import withRoot from '../utils/withRoot';

import { connect } from "react-redux";
import { graphql } from 'gatsby';
import uuidv4 from "uuid/v4";
import Typography from "@material-ui/core/Typography";
import Editable from "../components/editable/Editable";
import PlainTextEditor from "../components/editingTools/PlainTextEditor";
import RichTextEditor from "../components/editingTools/RichTextEditor";

import ChildSensitiveMatrix from "../components/interactiveTools/ChildSensitiveMatrix";
import EngagementChecklist from "../components/interactiveTools/EngagementChecklist";
import ObjectiveTree from "../components/interactiveTools/ObjectiveTree";
import ProblemPrioritization from "../components/interactiveTools/ProblemPrioritization";
import ProblemTree from "../components/interactiveTools/ProblemTree";
import RiskAssumptionMatrix from "../components/interactiveTools/RiskAssumptionMatrix";
import RiskMitigationPlan from "../components/interactiveTools/RiskMitigationPlan";
import RiskPlot from "../components/interactiveTools/RiskPlot";
import TheoryOfChange from "../components/interactiveTools/TheoryOfChange";

import {
  getToolData,
  saveToolData,
  toggleEditingTool,
  saveToolPage,
  updateToolPageData
} from "../redux/actions";

import "../assets/sass/custom.scss";
import favicon from '../assets/img/favicon.png'

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  body: {
    flexGrow: '1',
  },
  navbarOffset: {
    height: '74px'
  }
}

const toolMap = {
  'child-sensitive-assessment-matrix': ChildSensitiveMatrix,
  'checklist-engagement-children': EngagementChecklist,
  'objective-tree': ObjectiveTree,
  'problem-prioritization-worksheet': ProblemPrioritization,
  'problem-tree': ProblemTree,
  'risk-assumption-matrix': RiskAssumptionMatrix,
  'risk-mitigation-plan': RiskMitigationPlan,
  'risk-plot': RiskPlot,
  'theory-of-change': TheoryOfChange
}

class InteractiveToolTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.updateToolPageData(this.props.data.toolPages);
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
    this.props.saveToolData(
      toolId,
      newData,
      slug,
      this.props.toolPageData.title
    );
    this.props.history.push(
      `${this.props.history.location.pathname}?id=${toolId}`
    );
  };

  savePageData = field => input => {
    this.props.saveToolPage(this.props.data.toolPages.id, field, input.text);
  };

  render() {
    const toolData = this.props.toolData || {};
    const fields = toolData.fields;
    const title = toolData.title;
    const allowEditing =
      !this.state.toolId ||
      (this.props.user &&
        this.props.user.interactive_tools &&
        Boolean(this.props.user.interactive_tools[this.state.toolId]));
    const Tool = toolMap[this.props.data.toolPages.id]

    return (
      <div style={styles.page}>
        <Helmet>
          <title>
            Child Sensitivity in Poverty Alleviation Programming: An Analytical
            Toolkit
          </title>
          <meta
            charSet="utf-8"
            description="Child Sensitivity in Poverty Alleviation Programming: An Analytical Toolkit"
            keywords="children, Save the Children, poverty alleviation, poverty reduction, child sensitivity, toolkit"
            viewport="width=device-width,initial-scale=1.0,maximum-scale=1"
          />
          <link rel="icon" href={favicon} type="image/x-icon" />
        </Helmet>
        <Overlay />
        <NotificationContainer />
        <NavigationContainer />
        <div style={styles.navbarOffset} />
        <Grid container>
          <Grid item md={9} sm={12} xs={12}>
            <div style={styles.body}>

              <div className="interactive-tool">
                <section>
                  <div className="title">
                    <Typography variant="display1" gutterBottom>
                      <Editable
                        editor={PlainTextEditor}
                        handleSave={this.savePageData("title")}
                        content={{ text: this.props.toolPageData.title }}
                        isEditing={this.props.isEditingPage}
                        {...this.props}
                      >
                        {this.props.toolPageData.title ||
                          this.props.data.toolPages.title}
                      </Editable>
                    </Typography>
                  </div>
                  <div className="instructions">
                    <Typography variant="display3" gutterBottom>
                      <Editable
                        isEditing={this.props.isEditingPage}
                        editor={PlainTextEditor}
                        handleSave={this.savePageData("header")}
                        content={{ text: this.props.toolPageData.header }}
                        {...this.props}
                      >
                        {this.props.toolPageData.header ||
                          this.props.data.toolPages.header}
                      </Editable>
                    </Typography>
                    <Editable
                      isEditing={this.props.isEditingPage}
                      editor={RichTextEditor}
                      handleSave={this.savePageData("paragraph")}
                      content={{ text: this.props.toolPageData.paragraph }}
                      {...this.props}
                    >
                      <div
                        className="para"
                        dangerouslySetInnerHTML={{
                          __html:
                            this.props.toolPageData.paragraph ||
                            this.props.data.toolPages.paragraph
                        }}
                      />
                    </Editable>
                  </div>
                </section>
                <section>
                  <Tool
                    tableData={fields}
                    title={title}
                    handleSave={this.saveTool}
                    allowEditing={allowEditing}
                    toolId={this.state.toolId}
                  />
                </section>
              </div>
              <Footer />

            </div>
          </Grid>
          <Grid item md={3}>
            <SidebarNavigationContainer />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isEditingTool: state.interactiveTool.isEditing,
    isEditingPage: state.adminTools.isEditingPage,
    toolData: state.interactiveTool.toolData,
    toolPageData: state.toolPageData,
    user: state.adminTools.user
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
    },
    saveToolPage: (pageId, field, content) => {
      dispatch(saveToolPage(pageId, field, content));
    },
    updateToolPageData: data => {
      dispatch(updateToolPageData(data));
    }
  };
};

export default withRoot(connect(mapStateToProps, mapDispatchToProps)(InteractiveToolTemplate));

export const query = graphql`
  query ($id: String!){
    toolPages(id: { eq: $id }) {
      id
      title
      header
      paragraph
    }
  }
`;

