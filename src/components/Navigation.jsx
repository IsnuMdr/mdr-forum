import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ayncLogout } from "../states/auth/action";

export default function Navigation() {
  const { authUser = null } = useSelector((states) => states);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    if (window.confirm("Are you sure?")) {
      dispatch(ayncLogout());
      navigate("/login");
    }
  };

  return (
    <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark">
      <Container>
        <Link to="/" className="navbar-brand fw-bold">
          MDR-Forum
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link
              to="/"
              className={`nav-link ${
                location.pathname === "/" || location.pathname?.split("/")[1] === "thread"
                  ? "active"
                  : ""
              }`}
            >
              Threads
            </Link>
            <Link
              to="/leaderboards"
              className={`nav-link ${location.pathname === "/leaderboards" && "active"}`}
            >
              Leaderboards
            </Link>
          </Nav>
          {authUser === null ? (
            <Nav>
              <Link to="/login" className="nav-link">
                <button className="btn btn-block btn-outline-primary">Login</button>
              </Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link>
                <button onClick={logout} className="btn btn-block btn-outline-danger">
                  Logout
                </button>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
