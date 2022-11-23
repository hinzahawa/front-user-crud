const initialState = { usersList: [], selectedUserData: {} };
// const initialState = [];
const UsersDataListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER":
      state = {
        usersList: [...action.payload],
        selectedUserData: { ...state.selectedUserData },
      };
      return { ...state };
    case "SELECTED_USER":
      state = {
        usersList: [...state.usersList],
        selectedUserData: { ...action.payload },
      };
      return { ...state };
    case "CLEAR_SELECTED_USER":
      state = {
        usersList: [...state.usersList],
        selectedUserData: { ...initialState.selectedUserData },
      };
      return { ...state };
    default:
      return state;
  }
};
export default UsersDataListReducer;
