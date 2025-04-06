// src/components/Header.js
import { useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";

function Header({ onSearch }) {
  const [query, setQuery] = useState("");
  const { signOut, openSignIn } = useClerk();
  const { isSignedIn } = useUser();

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <Navbar expand="lg" className="header-custom mb-4">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="app-logo">
          <div className="logo-container">
            <span className="logo-text">Gamez</span>
            <span className="logo-subtext">Play</span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Form className="d-flex search-form mx-auto my-2 my-lg-0">
            <FormControl
              type="text"
              placeholder="Search games..."
              value={query}
              onChange={handleSearch}
              className="search-input me-2"
            />
            <Button variant="neon" onClick={() => onSearch(query)}>
              Search
            </Button>
          </Form>
          <Nav className="auth-buttons ms-auto">
            {isSignedIn ? (
              <>
                <Link
                  to="/bookmarks"
                  className="btn btn-neon nav-link mx-2 my-1"
                >
                  Library
                </Link>
                <Button
                  variant="neon"
                  onClick={() => signOut()}
                  className="nav-link mx-2 my-1"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="neon"
                onClick={() => openSignIn()}
                className="nav-link mx-2 my-1"
              >
                Sign In
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
