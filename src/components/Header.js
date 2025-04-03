// src/components/Header.js
import { useState } from "react";
import { Navbar, Form, FormControl, Button } from "react-bootstrap";
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
    <Navbar
      expand="lg"
      className="header-custom mb-4 d-flex justify-content-between align-items-center"
    >
      <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 text-neon">
        Game Library
      </Navbar.Brand>
      <Form className="d-flex search-form mx-auto">
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
      <div className="auth-buttons d-flex align-items-center">
        {isSignedIn ? (
          <>
            <Link to="/bookmarks" className="btn btn-neon mx-2">
              Library
            </Link>
            <Button variant="neon" onClick={() => signOut()} className="mx-2">
              Logout
            </Button>
          </>
        ) : (
          <Button variant="neon" onClick={() => openSignIn()} className="mx-2">
            Sign In
          </Button>
        )}
      </div>
    </Navbar>
  );
}

export default Header;
