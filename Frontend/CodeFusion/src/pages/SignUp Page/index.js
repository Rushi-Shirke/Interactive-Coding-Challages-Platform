import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import SignUp from './SignUp'; // Import SignUp component
import './SignUp.css'; // Assuming you have your main CSS styles here

const Index = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
    setSuccess(false);
  };

  // Form submission handler with validation
  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    // Validation logic
    if (!username || !email || !password) {
      setError('All fields are required.');
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(username)) {
      setError('Full Name should contain only letters.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    // Simulate a successful sign-up
    setSuccess(true);
    setFormData({ username: '', email: '', password: '' });
  };

  return (
    <div>
      <SignUp
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        error={error}
        success={success}
      />
    </div>
  );
};

ReactDOM.render(<Index />, document.getElementById('root'));
