import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldPlus, Menu, X, LogOut, User } from 'lucide-react';
import Button from './Button';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="border-b-2 border-black bg-bg px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-black uppercase tracking-tight">
          <ShieldPlus className="h-8 w-8 fill-primary stroke-black stroke-2" />
          MedTrack
        </Link>

        <div className="hidden md:flex items-center gap-6 font-bold">
          <Link to="/" className="hover:underline hover:decoration-2 hover:underline-offset-4">Home</Link>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2"><User className="w-5 h-5" /> {user.name || 'User'}</span>
              {user.role !== 'doctor' && (
                <Link to="/dashboard">
                  <Button variant="primary">Dashboard</Button>
                </Link>
              )}
              <button onClick={handleLogout} className="hover:text-red-500">
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login"><Button variant="secondary">Sign In</Button></Link>
              <Link to="/register"><Button variant="primary">Sign Up</Button></Link>
            </div>
          )}
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t-2 border-black mt-4 py-4 flex flex-col gap-4 font-bold text-center bg-bg">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          {user ? (
            <>
              {user.role !== 'doctor' && (
                <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
              )}
              <button onClick={() => { handleLogout(); setIsOpen(false); }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>Sign In</Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
