import axios from "axios";
import { API_URL, DEPLOY_ENDPOINT } from "../utils/constants";
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

export function createPage(pageData, token) {
  return dispatch => {
    console.log(pageData);
    const url = `${API_URL}/pages/`;
    const data = {
      page: pageData
    };

    axios
      .post(url, data, { headers: { Authorization: "Bearer " + token } })
      .then(res => {
        dispatch(toggleNewPageModal());
        if (res.status === 200) {
          dispatch(showNotification("Your page has been created.", "success"));
        } else {
          dispatch(
            showNotification(
              "There was an error creating your page, please try again.",
              "danger"
            )
          );
        }
      })
      .catch(err => {
        dispatch(toggleNewPageModal());
        dispatch(
          showNotification(
            `There was an error creating your page: ${err}`,
            "danger"
          )
        );
      });
  };
}

export function savePage(pageData, content, token) {
  return dispatch => {
    dispatch(savingPage());

    const db = firebase.database();
    const id = pageData.id;
    const data = {
      content: content.body,
      page_header: content.header,
      title: pageData.title
    };

    db.ref(`pages/${id}`).update(data, () => {
      dispatch(
        showNotification(
          "Your changes have been saved. Deploy the website to make the changes public.",
          "success"
        )
      );
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
              "The website is being deployed - this will take a few minutes. Time to go grab a coffee :)",
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
  return { type: "OPEN_MENU" }
}

export function closeMenu() {
  return { type: "CLOSE_MENU" }
}