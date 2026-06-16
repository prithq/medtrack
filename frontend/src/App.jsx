import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Emergency from './pages/Emergency';
import DoctorView from './pages/DoctorView';
import About from './pages/About';

import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-bg text-dark font-sans flex flex-col">
          <ConditionalNavbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/emergency/:id" element={<Emergency />} />
              <Route path="/doctor" element={<DoctorView />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <ConditionalFooter />
        </div>
      </Router>
    </AuthProvider>
  );
}

// Helper components to hide Navbar/Footer on emergency route
import { useLocation } from 'react-router-dom';

const ConditionalNavbar = () => {
  const location = useLocation();
  if (location.pathname.includes('/emergency')) return null;
  return <Navbar />;
};

const ConditionalFooter = () => {
  const location = useLocation();
  if (location.pathname.includes('/emergency')) return null;
  return <Footer />;
};

export default App;
