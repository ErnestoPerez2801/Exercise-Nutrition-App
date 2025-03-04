import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import Login from '../components/Login';

const LoginPage: React.FC = () => {
  return (
    <div>
      <PageTitle />
      <Login />
      <p>
        Don't have an account?{' '}
        <Link to="/register" style={{ color: 'blue', textDecoration: 'underline' }}>
          Register here
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
