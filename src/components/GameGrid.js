// src/components/GameGrid.js
import { useState, useEffect } from "react";
import { Row, Col, Card, Button, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchGames } from "../services/api";

function GameGrid({ filters, searchQuery }) {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const params = {
          page,
          page_size: 12,
          search: searchQuery || undefined,
          genres: filters.genres || undefined,
          dates:
            filters.year && !isNaN(filters.year)
              ? `${filters.year}-01-01,${filters.year}-12-31`
              : undefined,
          ordering: filters.ordering === "popularity" ? "-rating" : undefined,
        };
        console.log("Filters received:", filters); // Debug: Check filters
        console.log("API Params:", params); // Debug: Check params
        const data = await fetchGames(params);
        console.log("API Response:", data); // Debug: Check response
        setGames(data.results || []);
        setTotalPages(Math.ceil(data.count / 12) || 1);
        setError(null);
      } catch (error) {
        console.error("Error fetching games:", error);
        setGames([]);
        setError("Unable to load games.");
      }
    };
    loadGames();
  }, [page, filters, searchQuery]);

  if (error) return <div className="text-danger text-center">{error}</div>;

  return (
    <div className="game-grid p-4">
      <Row>
        {games.map((game) => (
          <Col md={4} key={game.id} className="mb-4">
            <Card className="game-card">
              <Card.Img
                variant="top"
                src={game.background_image}
                className="game-img"
              />
              <Card.Body>
                <Card.Title className="text-neon text-truncate">
                  {game.name}
                </Card.Title>
                <Card.Text className="text-truncate">
                  {game.description?.slice(0, 100)}...
                </Card.Text>
                <Card.Text className="text-truncate">
                  Tags:{" "}
                  {game.tags
                    ?.slice(0, 3)
                    .map((t) => t.name)
                    .join(", ")}
                </Card.Text>
                <Card.Text>Rating: {game.rating}</Card.Text>
                <Link to={`/game/${game.id}`}>
                  <Button variant="neon">Details</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination className="justify-content-center mt-4 pagination-custom">
        <Pagination.Prev onClick={() => setPage((p) => Math.max(1, p - 1))} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        />
      </Pagination>
    </div>
  );
}

export default GameGrid;
