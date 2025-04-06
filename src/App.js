// src/App.js
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import GameGrid from "./components/GameGrid";
import GameDetail from "./components/GameDetail";
import Bookmarks from "./components/Bookmarks";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [filters, setFilters] = useState({
    genres: "",
    year: "",
    ordering: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header onSearch={handleSearch} />
        <Container fluid className="main-content">
          <Row>
            <Col md={3}>
              <Sidebar onFilterChange={handleFilterChange} />
            </Col>
            <Col md={9}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <GameGrid filters={filters} searchQuery={searchQuery} />
                  }
                />
                <Route path="/game/:id" element={<GameDetail />} />
                <Route
                  path="/bookmarks"
                  element={
                    <Bookmarks filters={filters} searchQuery={searchQuery} />
                  }
                />
              </Routes>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
