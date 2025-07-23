// src/pages/Journal.jsx
import { useState, useEffect } from 'react';
import { saveData, loadData } from '../utils/localStorageHelpers';
import { Link } from 'react-router-dom';

export default function Journal() {
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [entries, setEntries] = useState([]);

  // Load data from localStorage on first render
  useEffect(() => {
    setEntries(loadData());
  }, []);

  const handleDelete = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
    saveData(updatedEntries);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalCategory = customCategory || category;
    const newEntry = { date, category: finalCategory, amount };

    const updated = [...entries, newEntry];
    saveData(updated);
    setEntries(updated);

    setDate('');
    setCategory('');
    setCustomCategory('');
    setAmount('');
  };

  return (
    <div className="container">
      <h1>📝 Spending Journal</h1>
      <Link to="/" className="top-right-link">📊 Back to Analytics</Link>

      {/* Entry Form */}
      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">--Select--</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
        </select>

        <label>Or Add Custom Category:</label>
        <input
          type="text"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
        />

        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <button type="submit">Add Entry</button>
      </form>

      {/* Entry List */}
      <h2 style={{ marginTop: '2rem' }}>📋 Your Entries</h2>
      {entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <ul className="journal-list">
          {entries.map((entry, index) => (
            <li key={index} className="journal-item">
              <span>
                <strong>{entry.date}</strong> – {entry.category} – ${entry.amount}
              </span>
              <button onClick={() => handleDelete(index)} className="delete-btn">
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}