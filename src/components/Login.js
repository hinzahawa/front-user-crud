import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validateToken from "../helper/validateToken";
import errorMessageHandle from "../helper/errorMessageHandle";
import config from "../config";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { actionAlertSuccess, actionAlertError } from "../actions/AlertAction";
import { actionAssignUser } from "../actions/UserAction";
import { decodeToken } from "react-jwt";

const cookies = new Cookies();
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setData] = useState({ username: "", password: "" });
  useEffect(() => {
    // if (validateToken()) navigate("/movies_list");
  }, []);
  const onChangeForm = ({ key, value }) => {
    setData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const LoginServer = async (event) => {
    event.preventDefault();
    axios
      .post(`${config.SERVER}/api/users/login`, { ...formData })
      .then(({ data: { token, message } }) => {
        cookies.set("auth_token", token);
        dispatch(actionAlertSuccess({ message }));
        const userData = decodeToken(token);
        dispatch(actionAssignUser(userData));
        // navigate("/movies_list");
      })
      .catch((err) => {
        let message = errorMessageHandle(err);
        dispatch(actionAlertError({ message }));
        navigate("/");
      });
  };
  const buttonSumitDisabiled =
    formData.username === "" || formData.password === "";
  return (
    <div className="form-login">
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col xs md lg="auto"></Col>
          <Col md lg="4">
            <Card>
              <Card.Body>
                <Form onSubmit={LoginServer}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email or Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter email or username"
                      value={formData.username}
                      onChange={({ target: { value } }) =>
                        onChangeForm({ key: "username", value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={({ target: { value } }) =>
                        onChangeForm({ key: "password", value })
                      }
                    />
                  </Form.Group>
                  <div className="text-center">
                    <Button
                      variant="primary"
                      type="submit"
                      className="btn-login"
                      disabled={buttonSumitDisabiled}
                    >
                      Log in
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col xs md lg="auto"></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
