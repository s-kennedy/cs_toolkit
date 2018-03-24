import { connect } from 'react-redux'
import {
  toggleEditing,
  savePage,
  toggleNewPageModal,
  createPage,
  deletePage,
  deploy
} from '../redux/actions'
import AdminToolbar from '../components/navigation/AdminToolbar'

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
    deletePage: (id) => {
      dispatch(deletePage(id))
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