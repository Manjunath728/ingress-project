import React, { useState, useEffect } from 'react';
import './PersonForm.css';

function PersonForm({ onSubmit, editingPerson, onCancel }) {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingPerson) {
      setFormData({
        name: editingPerson.name,
        email: editingPerson.email
      });
    } else {
      setFormData({ name: '', email: '' });
    }
    setErrors({});
  }, [editingPerson]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({ name: '', email: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="person-form">
      <h2>{editingPerson ? '✏️ Edit Person' : '➕ Add New Person'}</h2>
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter person's name"
            className={errors.name ? 'input-error' : ''}
            disabled={isSubmitting}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className={errors.email ? 'input-error' : ''}
            disabled={isSubmitting}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : editingPerson ? 'Update' : 'Add'}
          </button>
          {editingPerson && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default PersonForm;
