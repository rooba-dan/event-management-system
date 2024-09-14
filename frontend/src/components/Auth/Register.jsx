import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';
import { register } from '../../services/authService';
import { validateEmail, validatePassword } from '../../utils/validators';
import Input from '../common/Input';
import Button from '../common/Button';

function Register() {
  const [userData, setUserData] = useState({ name: '', email: '', password: '', role: 'attendee' });
  const { loginUser } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(userData.email)) {
      addNotification('Please enter a valid email address', 'error');
      return;
    }

    if (!validatePassword(userData.password)) {
      addNotification('Password must be at least 8 characters long', 'error');
      return;
    }

    try {
      const response = await register(userData);
      loginUser(response.data);
      addNotification('Registration successful', 'success');
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      addNotification('Registration failed. Please try again.', 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          name="name"
          value={userData.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={userData.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={userData.password}
          onChange={handleChange}
          required
        />
        <div>
          <label htmlFor="role" className="block mb-1">Role</label>
          <select
            id="role"
            name="role"
            value={userData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="attendee">Attendee</option>
            <option value="organizer">Organizer</option>
          </select>
        </div>
        <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600">
          Register
        </Button>
      </form>
      <p className="mt-4 text-center">
        Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
      </p>
    </div>
  );
}

export default Register;