import React, { useState, useEffect } from 'react';
import { Container, Row, Alert } from 'react-bootstrap';
import Event from './Event';
import eventsData from '../events.json';

function Events() {
    const [events, setEvents] = useState(eventsData);
    const [showWelcome, setShowWelcome] = useState(false);
    const [bookAlert, setBookAlert] = useState({ show: false, eventId: null });

    // ── Lifecycle : componentDidMount ──────────────────────────────────────────
    useEffect(() => {
        console.log('✅ componentDidMount — Events component mounted');
        setShowWelcome(true);
        const welcomeTimer = setTimeout(() => setShowWelcome(false), 3000);

        // ── Lifecycle : componentWillUnmount ─────────────────────────────────────
        return () => {
            clearTimeout(welcomeTimer);
            console.log('🗑️ componentWillUnmount — Events component unmounted');
        };
    }, []);

    // ── Lifecycle : componentDidUpdate ─────────────────────────────────────────
    useEffect(() => {
        console.log('🔄 componentDidUpdate — events state changed:', events);
    }, [events]);

    // ── Book an event ──────────────────────────────────────────────────────────
    const buy = (id) => {
        setEvents((prev) =>
            prev.map((event) => {
                if (event.id === id && event.nbTickets > 0) {
                    return {
                        ...event,
                        nbTickets: event.nbTickets - 1,
                        nbParticipants: event.nbParticipants + 1,
                    };
                }
                return event;
            })
        );
        // Show booking confirmation alert for 2 seconds
        setBookAlert({ show: true, eventId: id });
        setTimeout(() => setBookAlert({ show: false, eventId: null }), 2000);
    };

    // ── Toggle Like / Dislike ──────────────────────────────────────────────────
    const toggleLike = (id) => {
        setEvents((prev) =>
            prev.map((event) =>
                event.id === id ? { ...event, like: !event.like } : event
            )
        );
    };

    console.log('🖥️ Events component rendering...');

    return (
        <Container className="py-4">

            {/* ── Welcome Alert (mounts for 3 seconds) ─────────────────────────── */}
            {showWelcome && (
                <Alert
                    variant="info"
                    className="text-center fw-semibold shadow-sm"
                    style={{ borderRadius: '10px', fontSize: '1rem' }}
                >
                    👋 Bienvenue sur notre plateforme d'événements !
                </Alert>
            )}

            {/* ── Header ───────────────────────────────────────────────────────── */}
            <div className="text-center mb-5">
                <h1 className="fw-bold" style={{ color: '#2d2d2d', fontSize: '2rem' }}>
                    🎉 Événements à venir
                </h1>
                <p className="text-muted">
                    Découvrez les prochains événements et réservez votre place dès maintenant.
                </p>
                <hr
                    style={{
                        maxWidth: '80px',
                        borderWidth: '3px',
                        borderColor: '#4158D0',
                        margin: '0 auto',
                    }}
                />
            </div>

            {/* ── Events Grid ──────────────────────────────────────────────────── */}
            <Row>
                {events.map((event) => (
                    <Event
                        key={event.id}
                        event={event}
                        buy={buy}
                        toggleLike={toggleLike}
                        showBookAlert={bookAlert.show && bookAlert.eventId === event.id}
                    />
                ))}
            </Row>
        </Container>
    );
}

export default Events;
/////////