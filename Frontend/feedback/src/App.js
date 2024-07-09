import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/feedback')
      .then(response => {
        setFeedbackList(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the feedback!', error);
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (name && email && feedback) {
      const newFeedback = { name, email, feedback };
      axios.post('http://localhost:8080/feedback', newFeedback)
        .then(response => {
          setFeedbackList([...feedbackList, newFeedback]);
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

  return (
    <div className="App">
      <h1>Feedback Form</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            className='write'
            id='name'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name" 
            required
            />
        </div>
        <div>
          <label htmlFor='mail'>Email:</label>
          <input
            className='write'
            id='mail'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email" 
            required
          />
        </div>
        <div>
          <label htmlFor='fb'>Feedback:</label>
          <textarea
            className='write'
            id='fb'
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your feedback" 
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <h2>Feedback List</h2>
      <ul>
        {feedbackList.map((feedbackItem, index) => (
          <li key={index}>
            <strong>Name:</strong> {feedbackItem.name}<br />
            <strong>Email:</strong> {feedbackItem.email}<br />
            <strong>Feedback:</strong> {feedbackItem.feedback}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
