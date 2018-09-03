import React from "react";
import { graphql } from "gatsby";

import Helmet from "react-helmet";
import Grid from "@material-ui/core/Grid";
import NavigationContainer from "../containers/NavigationContainer";
import SidebarNavigationContainer from "../containers/SidebarNavigationContainer";
import NotificationContainer from "../containers/NotificationContainer";
import Overlay from "../components/Overlay";
import PageContentContainer from "../containers/PageContentContainer";
import PageHeaderContainer from "../containers/PageHeaderContainer";
import PageActionsContainer from "../containers/PageActionsContainer";
import CommentsSection from "../components/comments/CommentsSection";
import Footer from "../components/Footer";

import withRoot from '../utils/withRoot';
import "../assets/sass/custom.scss";
import favicon from '../assets/img/favicon.png'

import { connect } from "react-redux";
import {
  updatePageContent,
  updatePageMetaData,
} from "../redux/actions";

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


class PageWithHeader extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
    const { id, title, slug, page_type, navigation } = this.props.data.pages;
    const pageData = { id, title, slug, page_type, navigation };
    const content = {
      header: this.props.data.pages.page_header,
      body: JSON.parse(this.props.data.pages.content)
    };
    this.props.onUpdatePageContent(content);
    this.props.onUpdatePageMetaData(pageData);
  }

  componentDidMount() {
    this.setState({ url: window.location.href })
    if (window.location.hash) {
      setTimeout(() => {
        document.querySelector(`${window.location.hash}`).scrollIntoView();
      }, 0);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.pages.id !== this.props.data.pages.id) {
      const { id, title, slug, page_type, navigation } = this.props.data.pages;
      const pageData = { id, title, slug, page_type, navigation };
      const content = {
        header: this.props.data.pages.page_header,
        body: JSON.parse(this.props.data.pages.content)
      };
      this.props.onUpdatePageContent(content);
      this.props.onUpdatePageMetaData(pageData);
    }
  }

  render() {
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
              <div className={`basic-page ${this.props.pageData.page_type}`}>
                <PageActionsContainer pageData={this.props.pageData} url={this.state.url} />
                <PageHeaderContainer />
                <PageContentContainer pageId={this.props.data.pages.id} />
                <CommentsSection pageId={this.props.data.pages.id} />
                <Footer />
              </div>
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
  };
}

export default withRoot(connect(mapStateToProps, mapDispatchToProps)(PageWithHeader));

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

