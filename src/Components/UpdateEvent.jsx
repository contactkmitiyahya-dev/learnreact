import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getallEvents, editEvent } from '../service/api';

function UpdateEvent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        img: '',
        price: 0,
        nbTickets: 0,
        nbParticipants: 0,
        like: false
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await getallEvents(id);
                setFormData(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'événement", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await editEvent(id, formData);
            navigate('/events');
        } catch (error) {
            console.error("Erreur lors de la modification", error);
            alert("Erreur lors de la modification de l'événement.");
        }
    };

    if (loading) return <p>Chargement...</p>;

    return (
        <div>
            <h2>Modifier l'Événement</h2>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nom de l'événement</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Image (nom du fichier)</label>
                        <input type="text" name="img" value={formData.img} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Prix</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} min="0" required />
                    </div>
                    <div className="form-group">
                        <label>Nombre de Tickets</label>
                        <input type="number" name="nbTickets" value={formData.nbTickets} onChange={handleChange} min="0" required />
                    </div>
                    <div className="form-group">
                        <label>Nombre de Participants</label>
                        <input type="number" name="nbParticipants" value={formData.nbParticipants} onChange={handleChange} min="0" required />
                    </div>
                    <button type="submit" className="btn btn-orange">Update Event</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateEvent;
