import React from 'react';

import PageContentContainer from '../containers/PageContentContainer'
import PageTitleContainer from '../containers/PageTitleContainer'

import { savePage } from '../utils/API';
import { auth } from '../utils/init';

import { connect } from 'react-redux'
import { updatePageContent, updatePageMetaData } from '../redux/actions'

class AboutPage extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    const { id, title, slug, page_type } = this.props.data.pages;
    const pageData = { id, title, slug, page_type };
    const content = {
      header: this.props.data.pages.page_header,
      body: JSON.parse(this.props.data.pages.content)
    }
    this.props.onUpdatePageContent(content);
    this.props.onUpdatePageMetaData(pageData)
  }

  render() {
    return (
      <div className='about'>
        <PageTitleContainer />
        <PageContentContainer />
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    content: state.content,
    pageData: state.pageData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdatePageContent: (content) => {
      dispatch(updatePageContent(content))
    },
    onUpdatePageMetaData: (pageData) => {
      dispatch(updatePageMetaData(pageData))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage)


export const query = graphql`
  query AboutPageQuery($slug: String!) {
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