// src/components/Bookmarks.js
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { removeBookmark } from "../store/bookmarkSlice";
import { useUser } from "@clerk/clerk-react";

function Bookmarks({ searchQuery }) {
  // Removed filters prop
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

  // Filter bookmarks by search query only
  const filteredBookmarks = searchQuery
    ? bookmarks.filter((game) =>
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : bookmarks;

  return (
    <div className="p-4">
      <Row className="justify-content-center">
        {filteredBookmarks.length === 0 ? (
          <p className="text-center">
            No games match your search or your library is empty.
          </p>
        ) : (
          filteredBookmarks.map((game) => (
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
