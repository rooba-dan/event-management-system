import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';
import { login } from '../../services/authService';
import Input from '../common/Input';
import Button from '../common/Button';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { loginUser } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials);
      loginUser(response.data);
      addNotification('Login successful', 'success');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      addNotification('Login failed. Please check your credentials.', 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          name="email"
          type="email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600">
          Login
        </Button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
      </p>
    </div>
  );
}

export default Login;