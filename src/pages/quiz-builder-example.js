import React, { Component } from "react";
import Layout from "../layouts/index";
import Footer from "../components/Footer";
import Survey from '../components/editable/Survey';

import { connect } from "react-redux";

class SurveyPage extends Component {
  state = {
    surveyData: {pages:[{name:"page1",elements:[{type:"text",name:"question1",title:"What do you think about this?"}]}]}
  }

  saveSurvey = (surveyData) => {
    this.setState({ surveyData });
  }

  render() {
    return (
      <Layout>
        <Survey surveyData={this.state.surveyData} isEditing={this.props.isEditingPage} />
        <Footer />
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.adminTools.isLoggedIn,
    user: state.adminTools.user,
    isEditingPage: state.adminTools.isEditingPage,
  };
};

export default connect(mapStateToProps, null)(SurveyPage);