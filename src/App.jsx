import Counter from './components/counter';
import ListManager from './components/managerlist';
import ColorBox from './components/colorBox'
import NoteManager from './components/NoteManager';
import TodoList from './components/TodoList';

function App() {

  const initialTasks = [
    { id: 1, name: 'Apprendre React', priority: 'Haute', completed: false },
    { id: 2, name: 'Faire les exercices', priority: 'Moyenne', completed: true },
    { id: 3, name: 'Réviser les props', priority: 'Basse', completed: false },
    { id: 4, name: 'Préparer le projet final', priority: 'Haute', completed: false }
  ];

  return (
    // <>
    //   <h1>Mon Atelier React</h1>
      
    //   <h2>Compteur par défaut (initialCount=0, step=1)</h2>
    //   <Counter />
      
    //   <h2>Compteur avec initialCount=10, step=5</h2>
    //   <Counter initialCount={10} step={5} />
      
    //   <h2>Compteur avec initialCount=100, step=10</h2>
    //   <Counter initialCount={100} step={10} />
    // </>



    // <>
    //   <h1>Exercice 2 : Gestion d'une liste dynamique</h1>
    //   <ListManager initialItems={['React', 'Angular', 'VueJs']} />
    // </>



    // <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
    //   <ColorBox initialColor="#ff0000" />
    // </div>



    // <div>
    //   <h1>Exercice 4 : Gestionnaire de notes</h1>
    //   <NoteManager initialNotes={[15, 12, 18, 8]} />
    // </div>

    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>Exercice 5 : Todo List avec priorités - Yahya Kmiti</h1>
      <TodoList initialTasks={initialTasks} />
    </div>
  );
}

export default App;
