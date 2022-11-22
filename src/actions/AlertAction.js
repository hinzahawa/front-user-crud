const actionAlertSuccess = (data) => {
  return {
    type: "ALERT_SUCCESS",
    payload: data,
  };
};
const actionAlertError = (data) => {
  return {
    type: "ALERT_ERROR",
    payload: data,
  };
};
const actionAlertClear = () => {
  return {
    type: "ALERT_CLEAR",
  };
};

module.exports = { actionAlertSuccess, actionAlertError, actionAlertClear };
