import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userData = await login(email, password);
      // Redirect based on role
      if (userData && userData.role === 'doctor') {
        navigate('/doctor');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <Card title="Sign In" className="w-full max-w-md">
        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 font-bold border border-red-400 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
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
          <Button variant="primary" type="submit" className="w-full">Sign In</Button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/register" className="font-bold underline">Sign Up</Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
