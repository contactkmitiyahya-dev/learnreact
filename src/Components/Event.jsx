import React from 'react';
import { Card, Col, Badge, Button, Alert } from 'react-bootstrap';
import placeholderImg from '../assets/placeholder.jpg';
import reactImg from '../assets/react.jpg';
import jsImg from '../assets/js.jpg';
import opImg from '../assets/op.jpg';

const imageMap = {
  'react.jpg': reactImg,
  'js.jpg': jsImg,
  'op.jpg': opImg,
  'placeholder.jpg': placeholderImg,
};

function Event({ event, buy, toggleLike, showBookAlert }) {
  const { id, name, description, img, price, nbTickets, nbParticipants, like } = event;
  const isSoldOut = nbTickets === 0;

  return (
    <Col xs={12} sm={6} lg={4} className="mb-4">
      <Card
        className="h-100 shadow-sm border-0"
        style={{ borderRadius: '12px', overflow: 'hidden', position: 'relative' }}
      >
        {/* ── Card Image ─────────────────────────────────────────────────── */}
        <Card.Img
          variant="top"
          src={imageMap[img] || placeholderImg}
          alt={name}
          style={{ height: '200px', objectFit: 'cover' }}
        />

        {/* ── Sold Out overlay badge ────────────────────────────────────── */}
        {isSoldOut && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '200px',
              backgroundColor: 'rgba(0,0,0,0.55)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1.4rem',
                letterSpacing: '2px',
                border: '3px solid #fff',
                padding: '6px 18px',
                borderRadius: '8px',
              }}
            >
              🚫 SOLD OUT
            </span>
          </div>
        )}

        <Card.Body className="d-flex flex-column">
          {/* ── Event Name ──────────────────────────────────────────────── */}
          <Card.Title className="fw-bold" style={{ fontSize: '1.1rem', color: '#2d2d2d' }}>
            {name}
          </Card.Title>

          {/* ── Description ─────────────────────────────────────────────── */}
          <Card.Text className="text-muted" style={{ fontSize: '0.88rem', flexGrow: 1 }}>
            {description}
          </Card.Text>

          {/* ── Info badges ─────────────────────────────────────────────── */}
          <div className="d-flex flex-wrap gap-2 mt-2 mb-3">
            <Badge bg="primary" className="px-2 py-1">
              🎟️ {nbTickets} Tickets
            </Badge>
            <Badge bg="success" className="px-2 py-1">
              👥 {nbParticipants} Participants
            </Badge>
            <Badge
              bg={price === 0 ? 'warning' : 'dark'}
              text={price === 0 ? 'dark' : 'white'}
              className="px-2 py-1"
            >
              {price === 0 ? 'FREE' : `${price} DT`}
            </Badge>
          </div>

          {/* ── Booking confirmation Alert (2 seconds) ──────────────────── */}
          {showBookAlert && (
            <Alert
              variant="success"
              className="py-1 px-2 mb-2 text-center"
              style={{ fontSize: '0.85rem', borderRadius: '8px' }}
            >
              ✅ You have booked an event
            </Alert>
          )}

          {/* ── Action Buttons ───────────────────────────────────────────── */}
          <div className="d-flex gap-2 mt-auto">
            {/* Book an event */}
            <Button
              variant={isSoldOut ? 'secondary' : 'outline-primary'}
              size="sm"
              className="flex-grow-1 fw-semibold"
              style={{ borderRadius: '8px' }}
              disabled={isSoldOut}
              onClick={() => buy(id)}
            >
              {isSoldOut ? 'Sold Out' : '🎫 Book an event'}
            </Button>

            {/* Like / Dislike toggle */}
            <Button
              variant={like ? 'danger' : 'outline-danger'}
              size="sm"
              style={{ borderRadius: '8px', minWidth: '80px' }}
              onClick={() => toggleLike(id)}
            >
              {like ? '❤️ Dislike' : '🤍 Like'}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Event;
