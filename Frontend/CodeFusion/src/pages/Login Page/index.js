import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Login from './Login'; 
import './Login.css'

const Index = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
    setSuccess(false); 
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    
    if (!email || !password) {
      setError('All fields are required.');
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

    
    setSuccess(true);
    setFormData({ email: '', password: '' }); // Reset form on success
  };

  return (
    <div>
      <Login
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
