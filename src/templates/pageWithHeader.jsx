import React from "react";
import { graphql } from "gatsby";
import Layout from "../layouts/index";

import PageContentContainer from "../containers/PageContentContainer";
import PageHeaderContainer from "../containers/PageHeaderContainer";
import PageActionsContainer from "../containers/PageActionsContainer";

import { connect } from "react-redux";
import {
  updatePageContent,
  updatePageMetaData,
  saveLastVisitedPage
} from "../redux/actions";

class PageWithHeader extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    const { id, title, slug, page_type } = this.props.data.pages;
    const pageData = { id, title, slug, page_type };
    const content = {
      header: this.props.data.pages.page_header,
      body: JSON.parse(this.props.data.pages.content)
    };
    this.props.onUpdatePageContent(content);
    this.props.onUpdatePageMetaData(pageData);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.trackLastVisitedPage);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.trackLastVisitedPage);
  }

  trackLastVisitedPage = () => {
    this.props.saveLastVisitedPage(
      this.props.pageData.title,
      this.props.location.pathname
    );
  };

  render() {
    console.log('this.props', this.props)
    return (
      <Layout>
        <div className={`page-with-header ${this.props.pageData.page_type}`}>
          <PageActionsContainer pageData={this.props.pageData} />
          <PageHeaderContainer />
          <PageContentContainer />
        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    content: state.content,
    pageData: state.pageData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdatePageContent: content => {
      dispatch(updatePageContent(content));
    },
    onUpdatePageMetaData: pageData => {
      dispatch(updatePageMetaData(pageData));
    },
    saveLastVisitedPage: (title, pathname) => {
      dispatch(saveLastVisitedPage(title, pathname));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageWithHeader);

export const query = graphql`
  query PageWithHeaderQuery($slug: String!) {
    pages(slug: { eq: $slug }) {
      page_header {
        image
        range_title
        subtitle
        title
      }
      id
      content
      title
      slug
      template
      page_type
    }
  }
`;
