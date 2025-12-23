import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import PersonForm from './components/PersonForm';
import PersonList from './components/PersonList';
import HealthCheck from './components/HealthCheck';

function App() {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingPerson, setEditingPerson] = useState(null);
  const [apiStatus, setApiStatus] = useState('checking');

  // Fetch all persons
  const fetchPersons = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/person');
      setPersons(response.data);
    } catch (err) {
      setError('Failed to fetch persons');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Check API health
  const checkHealth = async () => {
    try {
      await axios.get('/');
      setApiStatus('online');
    } catch (err) {
      setApiStatus('offline');
    }
  };

  // Add new person
  const handleAddPerson = async (formData) => {
    try {
      await axios.post('/api/person', formData);
      setError(null);
      fetchPersons();
    } catch (err) {
      setError('Failed to add person');
      console.error('Add error:', err);
    }
  };

  // Update person
  const handleUpdatePerson = async (id, formData) => {
    try {
      await axios.put(`/api/person/${id}`, formData);
      setError(null);
      setEditingPerson(null);
      fetchPersons();
    } catch (err) {
      setError('Failed to update person');
      console.error('Update error:', err);
    }
  };

  // Delete person
  const handleDeletePerson = async (id) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      try {
        await axios.delete(`/api/person/${id}`);
        setError(null);
        fetchPersons();
      } catch (err) {
        setError('Failed to delete person');
        console.error('Delete error:', err);
      }
    }
  };

  // Initial load
  useEffect(() => {
    checkHealth();
    fetchPersons();
    const healthInterval = setInterval(checkHealth, 5000);
    return () => clearInterval(healthInterval);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>👥 Person Management System</h1>
          <HealthCheck status={apiStatus} />
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {error && <div className="error-banner">{error}</div>}

          <div className="content-wrapper">
            <div className="form-section">
              <PersonForm
                onSubmit={editingPerson ? (data) => handleUpdatePerson(editingPerson.id, data) : handleAddPerson}
                editingPerson={editingPerson}
                onCancel={() => setEditingPerson(null)}
              />
            </div>

            <div className="list-section">
              <PersonList
                persons={persons}
                loading={loading}
                onEdit={(person) => setEditingPerson(person)}
                onDelete={handleDeletePerson}
                onRefresh={fetchPersons}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 Person Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
