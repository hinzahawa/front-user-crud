import { Col, Container, Row } from "react-bootstrap";

const NotFound = () => {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <Container style={style}>
      <Row className="justify-content-md-center text-center">
        <Col xs md lg="12">
          <h1>Not Found</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
