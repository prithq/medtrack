import React, { useState, useEffect } from 'react';
import { User, Activity } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DoctorView = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role !== 'doctor') {
      navigate('/dashboard');
      return;
    }
    fetchMyPatients();
  }, [user, navigate]);

  const fetchMyPatients = async () => {
    try {
      const res = await api.get('/doc/my-patients');
      setPatients(res.data);
    } catch (error) {
      console.error("Error fetching patients", error);
      setError('Failed to load patients');
    } finally {
      setLoading(false);
    }
  };

  const handlePatientClick = async (patientId) => {
    setError('');
    setSelectedPatient(patientId);
    try {
      const res = await api.get('/doc/patient/logs', {
        params: { patientId }
      });
      if (res.data.message) {
        setError(res.data.message);
        setRecords([]);
      } else {
        setRecords(res.data);
      }
    } catch (err) {
      console.error(err);
      setError('Error fetching patient records');
      setRecords([]);
    }
  };

  if (!user || user.role !== 'doctor') {
    return null;
  }

  return (
    <div className="container mx-auto px-6 py-10 max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Doctor Portal</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Patient List */}
        <div className="lg:col-span-1">
          <Card title="My Patients">
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : patients.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-500">No patients have granted you access yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {patients.map((patient) => (
                  <button
                    key={patient.id}
                    onClick={() => handlePatientClick(patient.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${selectedPatient === patient.id
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/20 rounded-full">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{patient.name}</p>
                        <p className="text-xs text-gray-500">{patient.email}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Patient Records */}
        <div className="lg:col-span-2">
          {!selectedPatient ? (
            <Card>
              <div className="text-center py-20 text-gray-500">
                <User className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>Select a patient to view their medical records</p>
              </div>
            </Card>
          ) : (
            <Card title={
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                <span>Patient Records</span>
              </div>
            }>
              {error && <p className="mb-4 text-red-600 font-bold">{error}</p>}

              {records.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  <p>No records found for this patient.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {records.map((r) => (
                    <div key={r._id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-grow">
                          <h4 className="font-bold text-lg text-gray-800">
                            {r.medicineName} <span className="text-sm font-normal text-gray-500">({r.dosage})</span>
                          </h4>
                          <p className="text-gray-600 font-medium text-sm mt-1">
                            {new Date(r.takenAt || r.created_at || r.date).toLocaleString()}
                          </p>
                          {r.note && (
                            <p className="mt-2 text-gray-700 bg-white p-2 rounded text-sm border border-gray-200">
                              {r.note}
                            </p>
                          )}
                        </div>
                        <span className={`text-xs font-bold uppercase px-2 py-1 rounded ml-4 ${r.status === 'missed' ? 'bg-red-100 text-red-700' :
                            r.status === 'late' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                          }`}>
                          {r.status || 'Taken'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorView;
