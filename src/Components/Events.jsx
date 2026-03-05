import { useEffect, useState } from 'react';
import { getallEvents, deleteEvent } from '../service/api';
import { Link } from 'react-router-dom';

function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEvents = async () => {
        try {
            const response = await getallEvents();
            setEvents(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des événements", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cet événement ?")) {
            try {
                await deleteEvent(id);
                fetchEvents();
            } catch (error) {
                console.error("Erreur lors de la suppression", error);
            }
        }
    };

    if (loading) return <p>Chargement...</p>;

    return (
        <div>
            <h2>Liste des Événements</h2>
            {events.length === 0 && <p>Aucun événement trouvé.</p>}
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                {events.map((event) => (
                    <div key={event.id} className="event-card">
                        <h3>{event.name}</h3>
                        <p>Prix : {event.price} DT</p>
                        <p>Tickets : {event.nbTickets}</p>
                        <p>Participants : {event.nbParticipants}</p>
                        <div className="event-card-actions">
                            <Link to={`/events/${event.id}`} className="btn btn-blue">Détails</Link>
                            <Link to={`/events/update/${event.id}`} className="btn btn-orange">Update Event</Link>
                            <button onClick={() => handleDelete(event.id)} className="btn btn-red">Delete Event</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Events;
