// src/pages/Journal.jsx
import { useState } from 'react';
import { saveData, loadData } from '../utils/localStorageHelpers';
import { Link } from 'react-router-dom';

export default function Journal() {
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [entries, setEntries] = useState(loadData());

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
    <div style={{ padding: 20 }}>
      <h1>📝 Spending Journal</h1>

      <form onSubmit={handleSubmit}>
        <label>Date:</label><br />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required /><br />

        <label>Category:</label><br />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">--Select--</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
        </select><br />

        <label>Or Add Custom Category:</label><br />
        <input type="text" value={customCategory} onChange={(e) => setCustomCategory(e.target.value)} /><br />

        <label>Amount:</label><br />
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required /><br /><br />

        <button type="submit">Add Entry</button>
      </form>

      <br />
      <Link to="/">📊 Back to Analytics</Link>
    </div>
  );
}