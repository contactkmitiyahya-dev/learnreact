import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Events from './Components/Events';
import EventDetails from './Components/EventDetails';
import AddEvent from './Components/AddEvent';
import UpdateEvent from './Components/UpdateEvent';
import NavigationBar from './Components/NavigationBar';

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: '20px' }}>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/add" element={<AddEvent />} />
          <Route path="/events/update/:id" element={<UpdateEvent />} />
          <Route path="/events/:id" element={<EventDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
