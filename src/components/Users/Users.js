import { useEffect, useState } from "react";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
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
    dispatch(actionSelectedDataUser(initialUser));
    openModal(false);
  };
  useEffect(() => {
    if (validateToken())
      axios
        .get(`${config.SERVER}/api/users`, headers())
        .then(({ data }) => {
          dispatch(actionFetchUser(data));
        })
        .catch((err) => {
          let message = errorMessageHandle(err);
          dispatch(actionAlertError({ message }));
        });
    else {
      cookies.remove("XSv8T");
      navigate("/");
    }
  }, [dispatch, navigate]);
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
          })
          .catch((err) => {
            let message = errorMessageHandle(err);
            dispatch(actionAlertError({ message }));
          })
          .finally(() => {
            axios
              .get(`${config.SERVER}/api/users`, headers())
              .then(({ data }) => {
                dispatch(actionFetchUser(data));
              })
              .catch((err) => {
                let message = errorMessageHandle(err);
                dispatch(actionAlertError({ message }));
              });
          });
      }
    });
  };
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs md lg="12">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>No.</th>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Birthday</th>
                {/* <th>Password</th> */}
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.firstname}</td>
                    <td>{user.surname}</td>
                    <td>{user.birthday}</td>
                    {/* <td>{user.password}</td> */}
                    <td className="text-center">
                      <Button
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
                // selectedUserData={selectedUserData}
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
