// src/components/Sidebar.js
import { useState } from "react";
import { Form } from "react-bootstrap";

function Sidebar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    genres: "",
    year: "",
    ordering: "",
  });

  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="sidebar-custom p-4">
      <h5 className="text-neon mb-4">Filters</h5>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={filters.genres}
            onChange={(e) => handleChange("genres", e.target.value)}
            className="filter-input"
          >
            <option value="">All</option>
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Release Year</Form.Label>
          <Form.Control
            type="number"
            value={filters.year}
            onChange={(e) => handleChange("year", e.target.value)}
            className="filter-input"
            placeholder="e.g., 2020"
          />
        </Form.Group>
        <Form.Group>
          <Form.Check
            type="checkbox"
            label="Sort by Rating"
            checked={filters.ordering === "popularity"}
            onChange={(e) =>
              handleChange("ordering", e.target.checked ? "popularity" : "")
            }
            className="text-neon"
          />
        </Form.Group>
      </Form>
    </div>
  );
}

export default Sidebar;
