import { useContext } from "react";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actionAlertClear } from "../actions/AlertAction";

const AlertPopUp = () => {
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.alert);
  const variant = error ? "danger" : "success ";
  const msg = error ? "Error!" : "Success";
  const close = () => {
    dispatch(actionAlertClear());
  };
  if (message) {
    return (
      <Alert variant={variant} onClose={() => close()} dismissible>
        <Alert.Heading>{msg}</Alert.Heading>
        <p>{message}</p>
      </Alert>
    );
  }
};

export default AlertPopUp;
