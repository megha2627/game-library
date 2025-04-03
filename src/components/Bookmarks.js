// src/components/Bookmarks.js
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { removeBookmark } from "../store/bookmarkSlice";
import { useUser } from "@clerk/clerk-react";

function Bookmarks({ filters, searchQuery }) {
  const { isSignedIn } = useUser();
  const bookmarks = useSelector((state) => state.bookmarks.games);
  const dispatch = useDispatch();

  if (!isSignedIn) {
    return (
      <div className="text-center text-neon">
        Please sign in to view your library.
      </div>
    );
  }

  // Filter bookmarks
  const filteredBookmarks = bookmarks.filter((game) => {
    // Search filter
    const matchesSearch = searchQuery
      ? game.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    // Genre filter
    const matchesGenre = filters.genres
      ? game.genres &&
        Array.isArray(game.genres) &&
        game.genres.some((genre) => genre.slug === filters.genres)
      : true;

    // Year filter
    const matchesYear = filters.year
      ? game.released &&
        typeof game.released === "string" &&
        game.released.split("-")[0] === filters.year.toString()
      : true;

    return matchesSearch && matchesGenre && matchesYear;
  });

  // Sort by rating
  const sortedBookmarks =
    filters.ordering === "popularity"
      ? [...filteredBookmarks].sort(
          (a, b) => Number(b.rating || 0) - Number(a.rating || 0)
        )
      : filteredBookmarks;

  return (
    <div className="p-4">
      <Row className="justify-content-center">
        {sortedBookmarks.length === 0 ? (
          <p className="text-center">No games match your filters or search.</p>
        ) : (
          sortedBookmarks.map((game) => (
            <Col md={4} key={game.id} className="mb-4">
              <Card className="game-card">
                <Card.Img
                  variant="top"
                  src={game.background_image}
                  className="game-img"
                />
                <Card.Body>
                  <Card.Title className="text-neon">{game.name}</Card.Title>
                  <div className="d-flex justify-content-between">
                    <Link to={`/game/${game.id}`}>
                      <Button variant="neon" className="me-2">
                        Details
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      onClick={() => dispatch(removeBookmark(game.id))}
                    >
                      Remove
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
}

export default Bookmarks;
