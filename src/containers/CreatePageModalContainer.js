import React from 'react';
import slugify from 'slugify';

import { connect } from 'react-redux'
import { toggleNewPageModal } from '../redux/actions';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { pageTypes, menuGroups } from '../utils/constants';

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
        type: '',
        navigationGroup: '',
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
    const open = Boolean(this.props.showNewPageModal);
    return (
      <Dialog open={open  } aria-labelledby="create-page-dialogue">
        <DialogTitle id="create-page-dialogue">Add new page</DialogTitle>

        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="page-type">Select page type</InputLabel>
            <Select
              value={ this.state.page.type }
              onChange={ selected => this.updatePage('type', selected) }
              inputProps={{
                name: 'page-type',
                id: 'page-type',
              }}
            >
              {
                pageTypes.map(type => (
                  <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                ))
              }
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              className='form-control'
              type='text'
              label={"Page title"}
              value={this.state.page.title }
              onChange={e => this.updatePage('title', e.currentTarget.value)}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="menu-group">Select menu group</InputLabel>
            <Select
              value={ this.state.page.navigationGroup }
              onChange={ selected => this.updatePage('navigationGroup', selected) }
              inputProps={{
                name: 'menu-group',
                id: 'menu-group',
              }}
            >
              {
                menuGroups.map(group => (
                  <MenuItem key={group.value} value={group.value}>{group.label}</MenuItem>
                ))
              }
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              name='page_display_title'
              className='form-control'
              type='text'
              label={"Title to display in menu (optional)"}
              value={this.state.page.displayTitle }
              onChange={e => this.updatePage('displayTitle', e.currentTarget.value)}
            />
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button color="default" onClick={this.props.onToggleNewPageModal}>Close</Button>
          <Button color="primary" onClick={this.onSubmit}>Create Page</Button>
        </DialogActions>

      </Dialog>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePageModalContainer);