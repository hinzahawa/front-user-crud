import { Container, Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function NavBar() {
  const userData = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const logout = () => {
    cookies.remove("XSv8T");
    navigate("/");
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            React Bootstrap
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <NavDropdown
              title={
                <Image
                  src={"https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt="UserName profile image"
                  roundedCircle
                  style={{ width: "30px" }}
                />
              }
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">{userData.username}</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Setting</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  logout();
                }}
              >
                Log out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
