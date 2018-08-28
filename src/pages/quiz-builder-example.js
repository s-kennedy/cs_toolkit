import React, { Component } from "react";
import Layout from "../layouts/index";
import Footer from "../components/Footer";
import Survey from '../components/editable/Survey';

import { connect } from "react-redux";

class SurveyPage extends Component {
  state = {
    text: {pages:[{name:"page1",elements:[{type:"text",name:"question1",title:"What do you think about this?"}]}]}
  }

  saveSurvey = (text) => {
    this.setState({ text });
  }

  render() {
    return (
      <Layout>
        <Survey text={this.state.text} title="Demo Survey" isEditing={this.props.isEditingPage} />
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