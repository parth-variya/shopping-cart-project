import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Badge, Button } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import "./Navbar.css";

export default function MyNavbar({ cartCount }) {

  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);   // ✅ control state

  const isLogin = localStorage.getItem("userLogin") === "true";

  const handleLogout = () => {
    localStorage.removeItem("userLogin");
    toast.info("Logged out successfully");
    setExpanded(false);   // ✅ close menu
    navigate("/");
  };

  const closeMenu = () => setExpanded(false);  // ✅ reusable function

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
      expanded={expanded}   // ✅ control navbar
    >
      <Container>

        <Navbar.Brand
          as={Link}
          to="/"
          onClick={closeMenu}   // ✅ close on click
        >
          🛒 My Shop
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(expanded ? false : true)}
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-3 align-items-center">

            <Nav.Link as={Link} to="/" onClick={closeMenu}>
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/cart" onClick={closeMenu}>
              Cart <Badge bg="danger">{cartCount}</Badge>
            </Nav.Link>

            {!isLogin && (
              <>
                <Nav.Link as={Link} to="/login" onClick={closeMenu}>
                  Login
                </Nav.Link>

                <Nav.Link as={Link} to="/signup" onClick={closeMenu}>
                  Signup
                </Nav.Link>
              </>
            )}

            {isLogin && (
              <>
                <Nav.Link as={Link} to="/orders" onClick={closeMenu}>
                  My Orders
                </Nav.Link>

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