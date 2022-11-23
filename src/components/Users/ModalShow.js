import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import {
  actionAlertError,
  actionAlertSuccess,
} from "../../actions/AlertAction";
import { useDispatch, useSelector } from "react-redux";
import config from "../../config";
import errorMessageHandle from "../../helper/errorMessageHandle";
import headers from "../../helper/headersAPI";
import {
  actionClearSelectedDataUser,
  actionFetchUser,
} from "../../actions/UserAction";

const ModalShow = ({ isShow = false, isCreate = false, closeModal }) => {
  const dispatch = useDispatch();
  const { selectedUserData } = useSelector((state) => state.usersDataList);
  const initialState = {
    username: "",
    firstname: "",
    surname: "",
    password: "",
    birthday: "",
  };
  const [dataUser, setDataUser] = useState({ ...initialState });
  useEffect(() => {
    if (Object.keys(selectedUserData).length > 0) {
      setDataUser({ ...selectedUserData });
    }
  }, [selectedUserData]);
  const handleClose = () => {
    clearState();
    closeModal();
  };
  const clearState = () => {
    dispatch(actionClearSelectedDataUser());
    setDataUser({ ...initialState });
  };
  const onChangeForm = (key, value) => {
    setDataUser((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const createUser = () => {
    const URL = `${config.SERVER}/api/users`;
    axios
      .post(URL, dataUser, headers())
      .then(({ data: { message } }) => {
        dispatch(actionAlertSuccess({ message }));
        fetchAllUsers();
        handleClose();
      })
      .catch((err) => {
        let message = errorMessageHandle(err);
        dispatch(actionAlertError({ message }));
      });
  };
  const updateUser = () => {
    const URL = `${config.SERVER}/api/users`;
    axios
      .put(URL, dataUser, headers())
      .then(({ data: { message } }) => {
        dispatch(actionAlertSuccess({ message }));
        fetchAllUsers();
        handleClose();
      })
      .catch((err) => {
        let message = errorMessageHandle(err);
        dispatch(actionAlertError({ message }));
      });
  };
  const fetchAllUsers = () => {
    axios
      .get(`${config.SERVER}/api/users`, headers())
      .then(({ data }) => {
        dispatch(actionFetchUser(data));
      })
      .catch((err) => {
        let message = errorMessageHandle(err);
        dispatch(actionAlertError({ message }));
      });
  };
  const saveUser = (e) => {
    e.preventDefault();
    if (isCreate) createUser();
    else updateUser();
  };
  return (
    <>
      <Modal show={isShow} onHide={handleClose}>
        <Form onSubmit={saveUser}>
          <Modal.Header closeButton>
            <Modal.Title>{isCreate ? "Create User" : "Edit User"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                onChange={({ target: { value } }) =>
                  onChangeForm("username", value)
                }
                value={dataUser.username}
                disabled={!isCreate}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Firstname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter firstname"
                onChange={({ target: { value } }) =>
                  onChangeForm("firstname", value)
                }
                value={dataUser.firstname}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter surname"
                onChange={({ target: { value } }) =>
                  onChangeForm("surname", value)
                }
                value={dataUser.surname}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter password"
                onChange={({ target: { value } }) =>
                  onChangeForm("password", value)
                }
                value={dataUser.password}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter birthday"
                onChange={({ target: { value } }) =>
                  onChangeForm("birthday", value)
                }
                value={dataUser.birthday}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ModalShow;
