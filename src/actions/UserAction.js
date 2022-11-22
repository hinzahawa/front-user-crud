const actionAssignUser = (data) => {
  return {
    type: "ASSIGN_USER",
    payload: data,
  };
};
module.exports = { actionAssignUser };
