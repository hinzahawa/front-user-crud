const addPost = (postData) => {
  return {
    type: "ADD_POST",
    payload: postData,
  };
};

module.exports = { addPost };
