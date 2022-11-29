import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import config from "../../config";
import { useDispatch, useSelector } from "react-redux";
import {
  actionAlertError,
  actionAlertSuccess,
} from "../../actions/AlertAction";
import errorMessageHandle from "../../helper/errorMessageHandle";
import ModalShow from "./ModalShow";
import validateToken from "../../helper/validateToken";
import { useNavigate } from "react-router-dom";
import headers from "../../helper/headersAPI";
import Cookies from "universal-cookie";
import {
  actionFetchUser,
  actionSelectedDataUser,
} from "../../actions/UserAction";
import Swal from "sweetalert";
import SetDataUserStore from "../../helper/asignUserData";

const cookies = new Cookies();

function TableUsers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { usersList } = useSelector((state) => state.usersDataList);
  const [isShow, setIsShow] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const openModal = (isCreate) => {
    setIsShow(true);
    setIsCreate(isCreate);
  };
  const closeModal = () => {
    setIsShow(false);
    setIsCreate(false);
  };
  const selectedUser = (user) => {
    const initialUser = { ...user };
    delete initialUser.password;
    dispatch(actionSelectedDataUser(initialUser));
    openModal(false);
  };
  useEffect(() => {
    if (validateToken()) {
      SetDataUserStore(dispatch);
      fetchAllUsers()
    } else {
      cookies.remove("XSv8T");
      navigate("/");
    }
  }, [dispatch, navigate]);
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
  const deleteUser = (id) => {
    Swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((value) => {
      if (value) {
        const URL = `${config.SERVER}/api/users?id=${id}`;
        axios
          .delete(URL, headers())
          .then(({ data: { message } }) => {
            dispatch(actionAlertSuccess({ message }));
            fetchAllUsers();
          })
          .catch((err) => {
            let message = errorMessageHandle(err);
            dispatch(actionAlertError({ message }));
          });
      }
    });
  };
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs md lg="12">
          <Table striped bordered hover responsive role="table-list-users">
            <thead>
              <tr>
                <th>No.</th>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Birthday</th>
                {/* <th>Password</th> */}
                <th className="text-center">action</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user, index) => {
                return (
                  // eslint-disable-next-line jsx-a11y/aria-role
                  <tr key={index} role="row-user">
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.firstname}</td>
                    <td>{user.surname}</td>
                    <td>{user.birthday}</td>
                    {/* <td>{user.password}</td> */}
                    <td className="text-center">
                      <Button
                        role={`btn-row-user-${index}`}
                        variant="warning"
                        onClick={() => {
                          selectedUser(user);
                        }}
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => {
                          deleteUser(user.id);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
              <ModalShow
                isShow={isShow}
                isCreate={isCreate}
                closeModal={closeModal}
              />
            </tbody>
          </Table>
          <Button
            variant="success"
            onClick={() => {
              openModal(true);
            }}
          >
            Add
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
const Users = () => {
  return (
    <>
      <TableUsers />
    </>
  );
};

export default Users;
