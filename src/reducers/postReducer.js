const initialState = [];
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_POST":
      state.push(action.payload);
      return [...state] 
    // const updatedState = [...state.posts, action.payload];
    // return { ...state, updatedState };
    default:
      return state;
  }
};
export default postReducer;
