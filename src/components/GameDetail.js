// src/components/GameDetail.js
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../store/bookmarkSlice";
import { fetchGameDetails } from "../services/api";

function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks.games);
  const isBookmarked = bookmarks.some((b) => b.id === Number(id));

  useEffect(() => {
    const loadGame = async () => {
      const data = await fetchGameDetails(id);
      setGame(data);
    };
    loadGame();
  }, [id]);

  const handleBookmark = () => {
    if (isBookmarked) {
      dispatch(removeBookmark(Number(id)));
    } else {
      dispatch(
        addBookmark({
          id: Number(id),
          name: game.name,
          background_image: game.background_image,
        })
      );
    }
  };

  if (!game) return <div className="text-center text-neon">Loading...</div>;

  return (
    <Container className="game-detail p-4">
      <Row>
        <Col>
          <h1 className="text-neon mb-4">{game.name}</h1>
          <img
            src={game.background_image}
            alt={game.name}
            className="hero-img mb-4"
          />
          <p className="lead">{game.description_raw}</p>
          <p>
            <strong>Rating:</strong> {game.rating}
          </p>
          {game.screenshots && (
            <div className="screenshot-gallery">
              <h5 className="text-neon">Screenshots</h5>
              <Row>
                {game.screenshots.map((shot, idx) => (
                  <Col md={4} key={idx} className="mb-3">
                    <img
                      src={shot.image}
                      alt="screenshot"
                      className="screenshot-img"
                    />
                  </Col>
                ))}
              </Row>
            </div>
          )}
          <Button onClick={handleBookmark} variant="neon" className="mt-3">
            {isBookmarked ? "Remove from Library" : "Add to Library"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default GameDetail;
