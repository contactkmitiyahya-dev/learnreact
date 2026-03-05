import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getallEvents } from '../service/api';

function EventDetails() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await getallEvents(id);
                setEvent(response.data);
            } catch (err) {
                console.error("Erreur, l'événement n'existe pas", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchEventDetails();
    }, [id]);

    if (loading) return <p>Chargement...</p>;

    if (error || !event) {
        return (
            <div>
                <p className="error-msg">Event does not exist</p>
                <Link to="/events">Retour à la liste</Link>
            </div>
        );
    }

    return (
        <div className="detail-card">
            <h2>{event.name}</h2>
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Prix:</strong> {event.price} DT</p>
            <p><strong>Tickets disponibles:</strong> {event.nbTickets}</p>
            <p><strong>Participants:</strong> {event.nbParticipants}</p>
            <br />
            <Link to="/events">← Retour aux événements</Link>
        </div>
    );
}

export default EventDetails;
