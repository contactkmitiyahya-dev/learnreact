// src/components/TodoList.jsx
import { useState } from 'react';

function TodoList({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('Moyenne');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() === '') return;
    
    const newTask = {
      id: Date.now(),
      name: taskName,
      priority: priority,
      completed: false
    };
    
    setTasks([...tasks, newTask]);
    setTaskName('');
    setPriority('Moyenne');
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Todo List de Yahya Kmiti</h2>
      
      {/* Statistiques */}
      <div style={styles.statsContainer}>
        <div style={styles.statBox}>
          <span style={styles.statNumber}>{totalTasks}</span>
          <span style={styles.statLabel}>Total</span>
        </div>
        <div style={styles.statBox}>
          <span style={styles.statNumber}>{completedTasks}</span>
          <span style={styles.statLabel}>Terminées</span>
        </div>
        <div style={styles.statBox}>
          <span style={styles.statNumber}>{totalTasks - completedTasks}</span>
          <span style={styles.statLabel}>En cours</span>
        </div>
      </div>

      {/* Barre de recherche */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Rechercher une tâche..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* Formulaire d'ajout */}
      <form onSubmit={handleSubmit} style={styles.formContainer}>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Nom de la tâche..."
          style={styles.taskInput}
        />
        <select 
          value={priority} 
          onChange={(e) => setPriority(e.target.value)}
          style={styles.prioritySelect}
        >
          <option value="Haute">Haute</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Basse">Basse</option>
        </select>
        <button type="submit" style={styles.addButton}>
          Ajouter
        </button>
      </form>

      {/* Liste des tâches */}
      <div style={styles.taskList}>
        {filteredTasks.length === 0 ? (
          <p style={styles.emptyMessage}>Aucune tâche trouvée</p>
        ) : (
          filteredTasks.map(task => (
            <div 
              key={task.id}
              style={{
                ...styles.taskItem,
                backgroundColor: task.completed ? '#f8f9fa' : 'white',
                opacity: task.completed ? 0.8 : 1
              }}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                style={styles.checkbox}
              />
              <span style={{
                ...styles.taskName,
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? '#6c757d' : '#212529'
              }}>
                {task.name}
              </span>
              <span style={{
                ...styles.priorityBadge,
                backgroundColor: 
                  task.priority === 'Haute' ? '#dc3545' :
                  task.priority === 'Moyenne' ? '#ffc107' : '#28a745',
                color: task.priority === 'Moyenne' ? '#212529' : 'white'
              }}>
                {task.priority}
              </span>
              <button 
                onClick={() => deleteTask(task.id)}
                style={styles.deleteButton}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px',
    fontSize: '24px'
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '30px',
    gap: '10px'
  },
  statBox: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  statNumber: {
    display: 'block',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#007bff'
  },
  statLabel: {
    fontSize: '14px',
    color: '#6c757d',
    marginTop: '5px'
  },
  searchContainer: {
    marginBottom: '20px'
  },
  searchInput: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    boxSizing: 'border-box'
  },
  formContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px'
  },
  taskInput: {
    flex: 2,
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px'
  },
  prioritySelect: {
    flex: 1,
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: 'white'
  },
  addButton: {
    padding: '12px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.2s'
  },
  taskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  taskItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    border: '1px solid #dee2e6',
    borderRadius: '6px',
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  checkbox: {
    width: '20px',
    height: '20px',
    marginRight: '15px',
    cursor: 'pointer'
  },
  taskName: {
    flex: 1,
    fontSize: '16px',
    transition: 'all 0.2s'
  },
  priorityBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    marginRight: '15px'
  },
  deleteButton: {
    width: '30px',
    height: '30px',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#dc3545',
    fontSize: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'background-color 0.2s'
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#6c757d',
    padding: '20px'
  }
};

export default TodoList;