import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(name, email, password, role);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      console.error("Registration error:", err);
      const msg = err.response?.data?.message || 'Registration failed. Please check if the server is running.';
      setError(msg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <Card title="Create Account" className="w-full max-w-md">
        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 font-bold border border-red-400 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex flex-col">
            <label className="mb-1 font-bold">I am a...</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="rounded border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          <Button variant="primary" type="submit" className="w-full mt-4">Sign Up</Button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="font-bold underline">Sign In</Link>
        </p>
      </Card>
    </div>
  );
};

export default Register;
