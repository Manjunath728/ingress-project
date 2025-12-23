import React from 'react';
import './PersonList.css';

function PersonList({ persons, loading, onEdit, onDelete, onRefresh }) {
  if (loading && persons.length === 0) {
    return (
      <div className="person-list">
        <h2>📋 People</h2>
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading persons...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="person-list">
      <div className="list-header">
        <h2>📋 People ({persons.length})</h2>
        <button onClick={onRefresh} className="btn-refresh" title="Refresh list">
          🔄
        </button>
      </div>

      {persons.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👤</div>
          <p>No persons found</p>
          <span>Add a new person to get started</span>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="persons-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {persons.map((person) => (
                <tr key={person.id} className="person-row">
                  <td className="id-cell">
                    <span className="id-badge">{person.id}</span>
                  </td>
                  <td className="name-cell">{person.name}</td>
                  <td className="email-cell">{person.email}</td>
                  <td className="actions-cell">
                    <button
                      onClick={() => onEdit(person)}
                      className="btn-action btn-edit"
                      title="Edit person"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onDelete(person.id)}
                      className="btn-action btn-delete"
                      title="Delete person"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PersonList;
