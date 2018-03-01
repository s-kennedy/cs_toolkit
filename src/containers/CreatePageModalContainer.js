import React from 'react';
import Select from 'react-select';
import css from 'react-select/dist/react-select.css';

import { connect } from 'react-redux'
import { createPage, toggleNewPageModal } from '../redux/actions';

import { Button, Modal } from 'reactstrap';
import { PAGE_TYPES } from '../utils/constants';

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
    this.state = { page: {} };
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
    const data = this.state.page;
    console.log('page data', data);
    this.props.createPage(data);
  }

  render() {
    const parentPageOptions = this.props.pages.map((page) => {
      return { label: `${page.node.title}`, value: page.node }
    })
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
              options={ PAGE_TYPES }
              onChange={ selected => this.updatePage('type', selected) }
            />
          </div>
          <div className='form-group'>
            <label htmlFor='page_title'>Page title:</label>
            <input
              className='form-control'
              type='text'
              onChange={e => this.updatePage('title', e.currentTarget.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='page_parent'>Parent page (optional):</label>
            <Select
              name='page_parent'
              value={ this.state.page.parent }
              options={ parentPageOptions }
              onChange={ selected => this.updatePage('parent', selected) }
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