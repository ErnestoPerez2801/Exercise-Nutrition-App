import React, { useState } from 'react';
import { buildPath } from './Path'; // Your function to build API URLs
// import { storeToken } from '../tokenStorage'; // If you want to store JWT on registration

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [login, setLogin]         = useState('');
  const [password, setPassword]   = useState('');
  const [message, setMessage]     = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const body = {
        FirstName: firstName,
        LastName: lastName,
        Login: login,
        Password: password
      };

      const response = await fetch(buildPath('api/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const res = await response.json();
      if (!response.ok) {
        // e.g. 400 or 500
        setMessage(res.error || 'Registration failed');
      } else {
        // If you want to auto-login the user, you'd store the JWT here:
        // storeToken(res.jwtToken);

        // Display success or navigate to a different page
        setMessage('Registration successful!');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred while registering');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <p style={{ color: 'red' }}>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input 
            type="text" 
            value={firstName} 
            onChange={e => setFirstName(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input 
            type="text" 
            value={lastName} 
            onChange={e => setLastName(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Login</label>
          <input 
            type="text" 
            value={login} 
            onChange={e => setLogin(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
