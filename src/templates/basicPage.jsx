import React from "react";
import { graphql } from "gatsby";
import Layout from "../layouts/index";

import PageContentContainer from "../containers/PageContentContainer";
import PageTitleContainer from "../containers/PageTitleContainer";
import PageActionsContainer from "../containers/PageActionsContainer";
import CommentsSection from "../components/comments/CommentsSection";
import Footer from "../components/Footer";

import { connect } from "react-redux";
import {
  updatePageContent,
  updatePageMetaData,
  saveLastVisitedPage
} from "../redux/actions";

class BasicPage extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
    const { id, title, slug, page_type, navigation } = this.props.data.pages;
    const pageData = { id, title, slug, page_type, navigation };
    const content = {
      body: JSON.parse(this.props.data.pages.content)
    };
    this.props.onUpdatePageContent(content);
    this.props.onUpdatePageMetaData(pageData);
  }

  componentDidMount() {
    this.setState({ url: window.location.href })
  }

  // componentWillUnmount() {
  //   window.removeEventListener("beforeunload", this.trackLastVisitedPage);
  // }

  // trackLastVisitedPage = () => {
  //   this.props.saveLastVisitedPage(
  //     this.props.pageData.title,
  //     this.props.location.pathname
  //   );
  // };

  render() {
    return (
      <Layout>
        <div className={`basic-page ${this.props.pageData.page_type}`}>
          <PageActionsContainer pageData={this.props.pageData} url={this.state.url} />
          <PageTitleContainer />
          <PageContentContainer />
          <CommentsSection pageId={this.props.data.pages.id} />
          <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(BasicPage);

export const query = graphql`
  query BasicPageQuery($slug: String!) {
    pages(slug: { eq: $slug }) {
      id
      content
      title
      slug
      template
      page_type
      navigation {
        parentPage
      }
    }
  }
`;
