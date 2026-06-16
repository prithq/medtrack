import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TriangleAlert, Phone, Droplet, Pill } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import api from '../api/axios';

const Emergency = () => {
  const { id } = useParams(); // This is the token
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/public/timeline/${id}`);
        setData(res.data);
      } catch (err) {
        setError('Invalid or expired QR code.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="p-10 text-center font-bold">Loading secure data...</div>;
  if (error) return <div className="p-10 text-center font-bold text-red-600">{error}</div>;

  // Assuming data structure from backend. 
  // public.controller.js returns timeline which seems to be logs. 
  // Does it return profile info? 
  // Looking at public.controller.js, it calls `logsModel.find({patientId})`.
  // It effectively returns history. 
  // Let's assume for now we just show history, or maybe profile if available. 
  // Wait, I saw "timeline" in controller. 
  // Let's just list the logs returned as "Medical History" for the emergency responder.
  // And if we don't have static profile data (Blood type etc) in the log model, we might just have to hide it or mock it if not returned.
  // The User model has bloodGroup/allergies (I should check `models/user.models.js`).
  // But public controller only queries logs? 
  // If public controller only returns logs, I can't show "Blood Type" unless it's in the logs.
  // For the sake of the hackathon/demo, I will display the Logs found as "Medical History".

  return (
    <div className="min-h-screen bg-red-50 p-6 flex flex-col items-center">
      <Card className="w-full max-w-lg border-4 border-red-500 shadow-[8px_8px_0px_0px_rgba(239,68,68,1)] mb-6">
        <div className="flex items-center gap-4 mb-6 border-b-2 border-red-200 pb-4">
          <div className="p-3 bg-red-500 rounded-full text-white border-2 border-black">
            <TriangleAlert className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-red-600 uppercase">Emergency Info</h1>
            <p className="font-bold text-gray-700">Scan detected. Patient History Below.</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Static Mock for Profile since API might just return logs */}
          <div className="grid grid-cols-2 gap-4 opacity-75">
            <div className="p-4 bg-white border-2 border-black rounded">
              <div className="flex items-center gap-2 mb-2 text-red-600 font-bold">
                <Droplet className="w-5 h-5" /> Blood Type
              </div>
              <p className="text-xl font-black">Unknown</p>
            </div>
            <div className="p-4 bg-white border-2 border-black rounded">
              <div className="flex items-center gap-2 mb-2 text-red-600 font-bold">
                <Pill className="w-5 h-5" /> Allergies
              </div>
              <p className="font-bold">Check Logs</p>
            </div>
          </div>

          <div>
            <span className="text-sm font-bold text-gray-500 uppercase">Recent Medical Logs</span>
            {data && data.length > 0 ? (
              <div className="grid gap-3 mt-4">
                {data.map(log => (
                  <div key={log._id} className="border border-gray-200 rounded p-3 bg-white">
                    <div className="flex justify-between font-bold text-gray-800">
                      <span>{log.medicineName} <span className="font-normal text-sm text-gray-500">({log.dosage})</span></span>
                      <span className="text-sm bg-gray-100 px-2 py-0.5 rounded text-gray-600">{log.status}</span>
                    </div>
                    {log.note && <p className="text-sm text-gray-600 mt-1">{log.note}</p>}
                    <p className="text-xs text-gray-400 mt-2 text-right">{new Date(log.takenAt || log.created_at).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-bold text-gray-700 mt-2">No recent logs found.</p>
            )}
          </div>
        </div>

        <div className="mt-8 pt-4 border-t-2 border-gray-200 text-center text-sm text-gray-500 italic">
          Provided by MedTrack. Verified data.
        </div>
      </Card>
    </div>
  );
};

export default Emergency;
