const actionAssignUser = (data) => {
  return {
    type: "ASSIGN_MY_USER",
    payload: data,
  };
};
const actionFetchUser = (data) => {
  return {
    type: "FETCH_USER",
    payload: data,
  };
};
const actionSelectedDataUser = (data) => {
  return {
    type: "SELECTED_USER",
    payload: data,
  };
};
const actionClearSelectedDataUser = (data) => {
  return {
    type: "CLEAR_SELECTED_USER",
  };
};
module.exports = {
  actionAssignUser,
  actionFetchUser,
  actionSelectedDataUser,
  actionClearSelectedDataUser,
};
