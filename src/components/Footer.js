// src/components/Footer.js
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-custom mt-5">
      <Container>
        <Row className="py-4 align-items-center">
          {/* Branding Section with Logo */}
          <Col md={4} className="text-center text-md-start mb-4 mb-md-0">
            <div className="footer-logo">
              <div className="logo-container">
                <span className="logo-text">Gamez</span>
                <span className="logo-subtext">Play</span>
              </div>
            </div>
            <p className="footer-text">Your ultimate gaming universe.</p>
            <p className="footer-copyright">
              © {new Date().getFullYear()} All Rights Reserved
            </p>
          </Col>

          {/* Navigation Section */}
          <Col md={4} className="text-center mb-4 mb-md-0">
            <h5 className="footer-title text-neon mb-3">Explore</h5>
            <ul className="list-unstyled footer-nav">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/bookmarks" className="footer-link">
                  Library
                </Link>
              </li>
              <li>
                <a href="#top" className="footer-link">
                  Back to Top
                </a>
              </li>
            </ul>
          </Col>

          {/* Social Media Section */}
          <Col md={4} className="text-center text-md-end">
            <h5 className="footer-title text-neon mb-3">Connect With Us</h5>
            <div className="footer-social">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link mx-2"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link mx-2"
              >
                <i className="fab fa-discord"></i>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link mx-2"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </Col>
        </Row>
        <hr className="footer-divider" />
        <Row>
          <Col className="text-center">
            <p className="footer-bottom-text">
              Built with <span className="neon-heart">♥</span> by Gamers
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
