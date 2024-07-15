import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    // Fetch all feedback on component mount
    axios.get('http://localhost:8080/feedback')
      .then(response => {
        setFeedbackList(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the feedback!', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && feedback) {
      const newFeedback = { name, email, feedback };
      axios.post('http://localhost:8080/feedback', newFeedback)
        .then(response => {
          setFeedbackList([...feedbackList, response.data]);
          setName('');
          setEmail('');
          setFeedback('');
        })
        .catch(error => {
          console.error('There was an error submitting the feedback!', error);
        });
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/feedback/${id}`)
      .then(() => {
        setFeedbackList(feedbackList.filter(feedbackItem => feedbackItem.id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the feedback!', error);
      });
  };

  return (
    <div className="App">
      <h1>Feedback Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Feedback:</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <h2>Feedback List</h2>
      <ul>
        {feedbackList.map((feedbackItem) => (
          <li key={feedbackItem.id}>
            <strong>Name:</strong> {feedbackItem.name}<br />
            <strong>Email:</strong> {feedbackItem.email}<br />
            <strong>Feedback:</strong> {feedbackItem.feedback}
            <button className = "button" onClick={() => handleDelete(feedbackItem.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

