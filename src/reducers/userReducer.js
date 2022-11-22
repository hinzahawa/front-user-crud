const initialState = {
  users: {},
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      const updatedState = { ...state.users, ...action.payload };
      return { ...state, users: updatedState };
    // const updatedState = {...state.users, action.payload}
    // return { ...state, posts: updatedState };
    default:
      return state;
  }
};
export default userReducer;
