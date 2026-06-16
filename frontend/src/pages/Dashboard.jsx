import React, { useState, useEffect } from 'react';
import QRCode from "react-qr-code";
import { Copy, Share2, Plus, Trash2, Pill, Activity, UserPlus } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [showQR, setShowQR] = useState(false);
  const [logs, setLogs] = useState([]);
  const [qrValue, setQrValue] = useState('');
  const [loading, setLoading] = useState(true);

  // Form State
  const [showForm, setShowForm] = useState(false);
  const [showAccessForm, setShowAccessForm] = useState(false);
  const [doctorEmail, setDoctorEmail] = useState('');
  const [formData, setFormData] = useState({
    medicineName: '',
    dosage: '',
    status: 'taken',
    note: ''
  });

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    // Redirect doctors to their portal if they somehow land here
    if (user.role === 'doctor') {
      navigate('/doctor');
      return;
    }
    fetchLogs();
  }, [user, navigate]);

  const fetchLogs = async () => {
    try {
      const res = await api.get('/log/get');
      setLogs(res.data);
    } catch (error) {
      console.error("Error fetching logs", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddLog = async (e) => {
    e.preventDefault();
    try {
      await api.post('/log/add', formData);
      fetchLogs(); // Refresh list
      setShowForm(false);
      setFormData({ medicineName: '', dosage: '', status: 'taken', note: '' });
    } catch (error) {
      console.error("Error adding log", error);
      alert("Failed to add log");
    }
  };

  const handleDeleteLog = async (logId) => {
    if (!window.confirm("Are you sure you want to delete this log?")) return;
    try {
      await api.delete(`/log/delete/${logId}`);
      setLogs(logs.filter(log => log._id !== logId));
    } catch (error) {
      console.error("Error deleting log", error);
    }
  };

  const handleGrantAccess = async (e) => {
    e.preventDefault();
    if (!doctorEmail) return;
    try {
      await api.post('/doc/grant-access', { doctorEmail });
      alert("Access granted to " + doctorEmail);
      setShowAccessForm(false);
      setDoctorEmail('');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to grant access. Ensure email matches a registered doctor.");
    }
  };

  const generateQR = async () => {
    if (!showQR) {
      try {
        const res = await api.post('/public/create');
        const token = res.data.token;
        const url = `${window.location.origin}/emergency/${token}`;
        setQrValue(url);
        setShowQR(true);
      } catch (error) {
        console.error("Error generating QR", error);
        alert("Failed to generate Emergency QR");
      }
    } else {
      setShowQR(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(qrValue);
    alert('Emergency Link Copied!');
  };

  if (!user) {
    return (
      <div className="container mx-auto p-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Please Log In to view Dashboard</h2>
        <Button variant="primary" onClick={() => navigate('/login')}>Sign In</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Health Dashboard</h1>
          <p className="text-gray-500">Welcome, {user.name} <span className="text-xs bg-gray-200 px-2 py-1 rounded ml-2">ID: {user.id}</span></p>
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setShowAccessForm(!showAccessForm)} className="flex items-center gap-2">
            <UserPlus className="w-4 h-4" /> Grant Access
          </Button>
          <Button variant="secondary" onClick={generateQR} className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            {showQR ? 'Hide QR' : 'Emergency QR'}
          </Button>
          <Button variant="primary" onClick={() => setShowForm(!showForm)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Record
          </Button>
        </div>
      </div>

      {showAccessForm && (
        <Card title="Grant Doctor Access" className="mb-8 border-blue-200 bg-blue-50">
          <p className="mb-4 text-sm text-gray-600">Allow a doctor to view your medical logs by entering their registered email address.</p>
          <form onSubmit={handleGrantAccess} className="flex gap-4 items-end">
            <Input
              className="flex-grow"
              label="Doctor Email"
              placeholder="doctor@example.com"
              type="email"
              value={doctorEmail}
              onChange={(e) => setDoctorEmail(e.target.value)}
              required
            />
            <Button type="submit" variant="primary">Grant Read Access</Button>
          </form>
          <button onClick={() => setShowAccessForm(false)} className="mt-2 text-sm text-gray-500 underline">Cancel</button>
        </Card>
      )}

      {showQR && qrValue && (
        <div className="mb-8 animate-fade-in">
          <Card className="text-center bg-gray-50 border-gray-200">
            <h2 className="text-xl font-bold mb-2">Emergency Access</h2>
            <p className="mb-4 text-sm text-gray-500">Share this QR with first responders.</p>
            <div className="bg-white p-3 inline-block rounded-lg shadow-sm border border-gray-200 mb-4">
              <QRCode value={qrValue} size={150} />
            </div>
            <div className="flex justify-center">
              <Button variant="secondary" onClick={copyLink} className="text-sm">
                <Copy className="w-4 h-4 inline mr-2" /> Copy Link
              </Button>
            </div>
          </Card>
        </div>
      )}

      {showForm && (
        <Card title="Add New Log" className="mb-8 border-primary/20">
          <form onSubmit={handleAddLog} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="medicineName"
                label="Medicine Name"
                placeholder="e.g. Ibuprofen"
                value={formData.medicineName}
                onChange={handleInputChange}
                required
              />
              <Input
                name="dosage"
                label="Dosage"
                placeholder="e.g. 200mg"
                value={formData.dosage}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="input-clean"
                >
                  <option value="taken">Taken</option>
                  <option value="missed">Missed</option>
                  <option value="late">Late</option>
                </select>
              </div>
              <Input
                name="note"
                label="Notes (Optional)"
                placeholder="Any side effects?"
                value={formData.note}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button type="submit" variant="primary">Save Log</Button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" /> Recent Logs
        </h2>

        {loading ? <p className="text-gray-500">Loading records...</p> : logs.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500">No records found. Add your first log!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {logs.map((record) => (
              <Card key={record._id} className="transition-shadow hover:shadow-md">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${record.status === 'missed' ? 'bg-red-100 text-red-600' :
                        record.status === 'late' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-green-100 text-green-600'
                      }`}>
                      <Pill className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-800">{record.medicineName} <span className="text-sm font-normal text-gray-500">({record.dosage})</span></h4>
                      <p className="text-sm text-gray-500">{new Date(record.created_at || record.takenAt || Date.now()).toLocaleString()}</p>
                      {record.note && <p className="mt-1 text-gray-700 bg-gray-50 p-2 rounded text-sm">{record.note}</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`text-sm font-bold uppercase px-2 py-1 rounded ${record.status === 'missed' ? 'bg-red-100 text-red-700' :
                        record.status === 'late' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                      }`}>
                      {record.status}
                    </span>
                    <button
                      onClick={() => handleDeleteLog(record._id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete Log"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
