import { connect } from 'react-redux'
import { toggleEditing, savePage, toggleNewPageModal, createPage, deploy } from '../redux/actions'
import AdminToolbar from '../components/AdminToolbar'

const mapStateToProps = (state, ownProps) => {
  const allowEditing = state.adminTools.user && state.adminTools.user.isEditor;
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
    createPage: (pageData) => {
      dispatch(createPage(pageData))
    },
    savePage: (pageData, content) => {
      dispatch(savePage(pageData, content))
    },
    deploy: () => {
      dispatch(deploy())
    }
  }
}

const AdminToolbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminToolbar)

export default AdminToolbarContainer;