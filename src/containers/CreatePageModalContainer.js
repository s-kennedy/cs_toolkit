import React from 'react';
import Select from 'react-select';
import slugify from 'slugify';

import { connect } from 'react-redux'
import { createPage, toggleNewPageModal } from '../redux/actions';

import { Button, Modal } from 'reactstrap';
import { pageTypes, menuGroups } from '../utils/constants';

import css from 'react-select/dist/react-select.css';
import * as defaultContentJSON from '../fixtures/pageContent.json';

const mapStateToProps = (state) => {
  return {
    showNewPageModal: state.adminTools.showNewPageModal,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleNewPageModal: () => {
      dispatch(toggleNewPageModal())
    },
  }
}

class CreatePageModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {
        title: '',
        type: null,
        navigationGroup: null,
        displayTitle: '',
      }
    };
    this.updatePage = (field, value) => { this._updatePage(field, value) }
    this.onSubmit = () => { this._onSubmit() }
  }

  _updatePage(field, value) {
    this.setState({
      page: {
        ...this.state.page,
        [field]: value
      }
    })
  }

  _onSubmit() {
    const pageData = {
      title: this.state.page.title,
      slug: slugify(this.state.page.title, { lower: true, remove: /[$*_+~.,()'"!\-:@%^&?=]/g }),
      page_type: this.state.page.type.value.type,
      template: this.state.page.type.value.template,
      navigation: {
        group: this.state.page.navigationGroup.value,
        displayTitle: this.state.page.displayTitle
      },
      content: defaultContentJSON,

      // TODO: Add this back in for page types that use the pageWithHeader.jsx template

      // page_header: {
      //   title: this.state.page.title,
      //   subtitle: 'Subtitle placeholder',
      //   range_title: 'left',
      //   image: 'null'
      // }
    }

    this.props.createPage(pageData);
  }

  render() {
    return (
      <Modal isOpen={this.props.showNewPageModal}>

        <div className="modal-header">
          <h3 className="modal-title">Create new page</h3>
          <button type="button" className="close" aria-label="Close" onClick={this.props.onToggleNewPageModal}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div className="modal-body">
          <div className='form-group'>
            <label htmlFor='page_type'>Select page type:</label>
            <Select
              name='page_type'
              value={ this.state.page.type }
              options={ pageTypes }
              onChange={ selected => this.updatePage('type', selected) }
            />
          </div>

          <div className='form-group'>
            <label htmlFor='page_title'>Page title:</label>
            <input
              className='form-control'
              type='text'
              value={this.state.page.title }
              onChange={e => this.updatePage('title', e.currentTarget.value)}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='page_navigation_group'>Menu group:</label>
            <Select
              name='page_navigation_group'
              value={ this.state.page.navigationGroup }
              options={ menuGroups }
              onChange={ selected => this.updatePage('navigationGroup', selected) }
            />
          </div>

          <div className='form-group'>
            <label htmlFor='page_display_title'>Title to display in menu (optional):</label>
            <input
              name='page_display_title'
              className='form-control'
              type='text'
              value={this.state.page.displayTitle }
              onChange={e => this.updatePage('displayTitle', e.currentTarget.value)}
            />
          </div>
        </div>

        <div className="modal-footer">
          <Button type="button" className="btn btn-secondary" onClick={this.props.onToggleNewPageModal}>Close</Button>
          <Button onClick={this.onSubmit}>Create Page</Button>
        </div>

      </Modal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePageModalContainer);