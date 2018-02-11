import { connect } from 'react-redux'
import { toggleEditing, savePage, toggleNewPageModal, createPage, deploy } from '../redux/actions'
import AdminToolbar from '../components/AdminToolbar'

const mapStateToProps = (state, ownProps) => {
  const allowEditing = state.adminTools.userRoles && state.adminTools.userRoles.includes('Editor')
  return {
    isLoggedIn: state.adminTools.isLoggedIn,
    isEditingPage: state.adminTools.isEditingPage,
    content: state.content,
    pageData: state.pageData,
    allowEditing: allowEditing
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleEditing: () => {
      dispatch(toggleEditing())
    },
    onToggleNewPageModal: () => {
      dispatch(toggleNewPageModal())
    },
    createPage: (pageData, token) => {
      dispatch(createPage(pageData, token))
    },
    savePage: (pageData, content, token) => {
      dispatch(savePage(pageData, content, token))
    },
    deploy: (token) => {
      dispatch(deploy(token))
    }
  }
}

const AdminToolbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminToolbar)

export default AdminToolbarContainer;