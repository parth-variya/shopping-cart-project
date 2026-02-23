import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Badge, Button } from "react-bootstrap";
import "./Navbar.css";

export default function MyNavbar({ cartCount }) {

  const navigate = useNavigate();

  const isLogin = localStorage.getItem("userLogin") === "true";

  const handleLogout = () => {
    localStorage.removeItem("userLogin");
    alert("Logged out");
    navigate("/");
    window.location.reload();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>

        <Navbar.Brand as={Link} to="/">
          🛒 My Shop
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="ms-auto gap-3 align-items-center">

            <Nav.Link as={Link} to="/">Home</Nav.Link>

            <Nav.Link as={Link} to="/cart">
              Cart <Badge bg="danger">{cartCount}</Badge>
            </Nav.Link>

            {!isLogin && (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              </>
            )}

            {isLogin && (
              <>
                <Nav.Link as={Link} to="/orders">My Orders</Nav.Link>

                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}