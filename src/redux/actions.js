import axios from "axios";
import { DEPLOY_ENDPOINT } from "../utils/constants";
import firebase from "../firebase/init";

// AUTHENTICATION ------------------------

export function userLoggedIn(user = null) {
  return { type: "USER_LOGGED_IN", user };
}

export function userLoggedOut() {
  return { type: "USER_LOGGED_OUT" };
}

export function toggleRegistrationModal() {
  return { type: "TOGGLE_REGISTRATION_MODAL" };
}

// NOTIFICATIONS ------------------------

export function showNotification(message, color) {
  return { type: "SHOW_NOTIFICATION", message, color };
}

export function closeNotification() {
  return { type: "CLOSE_NOTIFICATION" };
}

// PAGE EDITING ------------------------

export function toggleEditing() {
  return { type: "TOGGLE_EDITING" };
}

export function toggleNewPageModal() {
  return { type: "TOGGLE_NEW_PAGE_MODAL" };
}

export function createPage(pageData) {
  return dispatch => {
    const db = firebase.database();
    db
      .ref("pages")
      .push(pageData)
      .then(snap => {
        if (Boolean(pageData.navigation.parentPage)) {
          db
            .ref(`pages/${pageData.navigation.parentPage}/navigation/nested/${snap.key}`)
            .set(true);
        }
        dispatch(toggleNewPageModal());
        dispatch(
          showNotification(
            "Your page has been saved. Publish your changes to view and edit your new page.",
            "success"
          )
        );
      });
  };
}

export function deletePage(page) {
  return dispatch => {
    const db = firebase.database();

    if (page.navigation.parentPage) {
      db.ref(`pages/${page.navigation.parentPage}/navigation/nested/${page.id}`).remove();
    }

    db
      .ref(`pages/${page.id}`)
      .remove(() => {
        dispatch(
          showNotification(
            "This page has been deleted. Publish your changes to make them public.",
            "success"
          )
        );
      });
  };
}

export function savePage(pageData, content) {
  return dispatch => {
    dispatch(savingPage());
    const db = firebase.database();
    const id = pageData.id;
    const data = {
      content: content.body,
      title: pageData.title
    };

    if (!!content.header) {
      data["page_header"] = content.header;
    }

    db.ref(`pages/${id}`).update(data, res => {
      return dispatch(
        showNotification(
          "Your changes have been saved. Publish your changes to make them public.",
          "success"
        )
      );
    });
  };
}

export function saveChanges(innerFunction) {
  return (dispatch, getState) => {
    Promise.resolve(dispatch(innerFunction)).then(() => {
      const pageData = getState().pageData;
      const pageContent = getState().content;

      dispatch(savePage(pageData, pageContent));
    });
  };
}

export function deploy() {
  return dispatch => {
    const url = `${DEPLOY_ENDPOINT}`;
    console.log(`Deploy command sent to ${url}`);

    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(token => {
        return axios.get(url, {
          headers: { Authorization: "Bearer " + token }
        });
      })
      .then(res => {
        console.log(res);
        if (res.data.status === "success") {
          dispatch(
            showNotification(
              "The website is being published - this will take a few minutes. Time to go grab a coffee :)",
              "success"
            )
          );
        } else {
          dispatch(
            showNotification(
              `There was an error deploying the site: ${res.data.message}`,
              "danger"
            )
          );
        }
      })
      .catch(err => {
        dispatch(
          showNotification(
            `There was an error deploying the site: ${err}`,
            "danger"
          )
        );
      });
  };
}

export function savingPage() {
  return { type: "SAVING_PAGE" };
}

export function savePageSuccess() {
  return { type: "SAVE_PAGE_SUCCESS" };
}

export function savePageFailure(err) {
  return { type: "SAVE_PAGE_FAILURE", err };
}

export function updatePageContent(content) {
  return { type: "UPDATE_PAGE_CONTENT", content };
}

export function updatePageHeader(header) {
  return { type: "UPDATE_PAGE_HEADER", header };
}

export function updatePageMetaData(pageData) {
  return { type: "UPDATE_PAGE_META_DATA", pageData };
}

export function updatePageTitle(title) {
  return { type: "UPDATE_PAGE_TITLE", title };
}

export function updateSectionContent(sectionIndex, contentIndex, newContent) {
  return {
    type: "UPDATE_SECTION_CONTENT",
    sectionIndex,
    contentIndex,
    newContent
  };
}

export function duplicateSection(sectionIndex) {
  return { type: "DUPLICATE_SECTION", sectionIndex };
}

export function deleteSection(sectionIndex) {
  return { type: "DELETE_SECTION", sectionIndex };
}

export function addContentItem(sectionIndex, contentType) {
  return { type: "ADD_CONTENT_ITEM", sectionIndex, contentType };
}

export function deleteContentItem(sectionIndex, contentIndex) {
  return { type: "DELETE_CONTENT_ITEM", sectionIndex, contentIndex };
}

export function addSection(sectionIndex, sectionType) {
  return { type: "ADD_SECTION", sectionIndex, sectionType };
}

// NAVIGATION ------------------------

export function openMenu() {
  return { type: "OPEN_MENU" };
}

export function closeMenu() {
  return { type: "CLOSE_MENU" };
}

// INTERACTIVE TOOLS ----------------------

export function getToolData(toolId) {
  return dispatch => {
    firebase
      .database()
      .ref(`interactive_tools/${toolId}`)
      .once("value")
      .then(snapshot => {
        const toolData = snapshot.val();
        dispatch(updateToolData(toolData));
      });
  };
}

export function saveToolData(toolId, toolData, slug, toolType) {
  return (dispatch, getState) => {
    const state = getState();

    if (!state.adminTools.isLoggedIn) {
      return dispatch(
        showNotification("Please log in to save your work.", "warning")
      );
    }

    const userId = state.adminTools.user.uid;
    const newToolData = { ...toolData, userId: userId };
    const title = toolData.title ? toolData.title : "No title";

    const dataToUpdate = {
      [`/interactive_tools/${toolId}`]: newToolData,
      [`/users/${userId}/interactive_tools/${toolId}`]: {
        title: title,
        slug: slug,
        toolType: toolType
      }
    };

    console.log('dataToUpdate', dataToUpdate)

    firebase
      .database()
      .ref()
      .update(dataToUpdate)
      .then(() => {
        dispatch(updateToolData(toolData));
        dispatch(showNotification("Your changes have been saved.", "success"));
      }).catch(err => {
        console.log('ERROR', err)
      })
  };
}

export function updateToolData(toolData) {
  return { type: "UPDATE_TOOL_DATA", toolData };
}

export function updateTools(tools) {
  return { type: "UPDATE_TOOLS", tools };
}

export function toggleEditingTool() {
  return { type: "TOGGLE_EDITING_TOOL" };
}

export function deleteInteractiveTool(toolId) {
  return (dispatch, getState) => {
    const state = getState();
    const userId = state.adminTools.user.uid;
    const tools = { ...state.adminTools.user.interactive_tools};
    delete tools[toolId]

    const dataToUpdate = {
      [`/interactive_tools/${toolId}`]: null,
      [`/users/${userId}/interactive_tools/${toolId}`]: null
    };

    firebase
      .database()
      .ref()
      .update(dataToUpdate)
      .then((err) => {
        if (err) {
          return dispatch(showNotification("There was an error deleting your tool: " + err))
        }
        dispatch(updateTools(tools))
        dispatch(showNotification("Your interactive tool has been deleted.", "success"));
      });
  };
}

// BOOKMARKING --------------------

export function updateBookmarks(bookmarks) {
  return { type: "UPDATE_BOOKMARKS", bookmarks };
}

export function saveLastVisitedPage(title, pathname) {
  return (dispatch, getState) => {
    const db = firebase.database();
    const userId = getState().adminTools.user.uid;
    const pageData = { title, pathname }

    db.ref(`users/${userId}/bookmarks/lastVisitedPage`).set(pageData).then(snapshot => {
      console.log('saved last visted page')
      console.log('snapshot val', snapshot.val())
    })
  }
}

export function addBookmark(pageId) {
  return (dispatch, getState) => {
    const db = firebase.database();
    const state = getState();

    if (!state.adminTools.isLoggedIn) {
      return dispatch(
        showNotification("Please log in bookmark this page.", "warning")
      );
    }

    const userId = state.adminTools.user.uid;
    const bookmarks = { ...state.adminTools.user.bookmarks };
    bookmarks[pageId] = true


    db.ref(`users/${userId}/bookmarks/${pageId}`).set(true).then(err => {
      console.log('saving bookmark response', err);
      if (err) {
        return dispatch(showNotification("There was an error saving your bookmark.", "error"));
      }

      dispatch(updateBookmarks(bookmarks));
      dispatch(showNotification("This page has been bookmarked. You can manage your bookmarks in your Dashboard.", "success"));
    })
  }
}

export function deleteBookmark(pageId) {
  return (dispatch, getState) => {
    const db = firebase.database();
    const state = getState();
    const userId = state.adminTools.user.uid;
    const bookmarks = { ...state.adminTools.user.bookmarks };
    delete bookmarks[pageId];

    db.ref(`users/${userId}/bookmarks/${pageId}`).remove().then(err => {
      if (err) {
        return dispatch(showNotification("There was an error deleting your bookmark: " + err))
      }
      dispatch(updateBookmarks(bookmarks))
      dispatch(showNotification("Your bookmark has been deleted.", "success"));
    })
  }
}