import { Link } from 'react-router-dom';

function NavigationBar() {
    return (
        <nav>
            <Link to="/events">Tous les Événements</Link>
            <Link to="/events/add">Add new Event</Link>
        </nav>
    );
}

export default NavigationBar;
