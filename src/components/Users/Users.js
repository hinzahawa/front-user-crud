import { useEffect, useState } from "react";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import config from "../../config";
import { useDispatch } from "react-redux";
import { actionAlertError } from "../../actions/AlertAction";
import errorMessageHandle from "../../helper/errorMessageHandle";
import ModalShow from "./ModalShow";
import validateToken from "../../helper/validateToken";
import { useNavigate } from "react-router-dom";
import headers from "../../helper/headersAPI";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function TableUsers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [usersData, setUsersData] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState({});
  const openModal = (isCreate) => {
    setIsShow(true);
    setIsCreate(isCreate);
  };
  const closeModal = () => {
    setIsShow(false);
    setIsCreate(false);
  };
  const selectedUser = ({ ...user }) => {
    const initialUser = { ...user };
    if (initialUser) {
      initialUser.password = "";
      openModal(false);
      setSelectedUserData({ ...initialUser });
    }
  };
  useEffect(() => {
    if (validateToken())
      axios
        .get(`${config.SERVER}/api/users`, headers())
        .then(({ data }) => {
          setUsersData(data);
        })
        .catch((err) => {
          let message = errorMessageHandle(err);
          dispatch(actionAlertError({ message }));
        });
    else {
      cookies.remove("XSv8T");
      navigate("/");
    }
  }, []);
  return (
    <Container>
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
              {usersData.map((user, index) => {
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
                      <Button variant="danger">Delete</Button>
                    </td>
                  </tr>
                );
              })}
              {/* <AddUserTable /> */}
              <ModalShow
                isShow={isShow}
                isCreate={isCreate}
                closeModal={closeModal}
                selectedUserData={selectedUserData}
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
