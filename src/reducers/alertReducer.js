const initialState = { message: "", error: false };
const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ALERT_SUCCESS":
      state = { ...state, ...action.payload, error: false };
      return { ...state };
    case "ALERT_ERROR":
      state = { ...action.payload, error: true };
      return { ...state };
    case "ALERT_CLEAR":
      state = { ...initialState };
      return { ...state };
    default:
      return state;
  }
};
export default alertReducer;
