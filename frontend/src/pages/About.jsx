import React from 'react';
import Card from '../components/Card';
import { Shield, Lock, Zap, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <h1 className="text-4xl font-black mb-8 border-b-4 border-primary pb-2 inline-block">About MedTrack</h1>

      <div className="space-y-8 text-lg font-medium leading-relaxed">
        <p>
          MedTrack is a cutting-edge, decentralized health management system designed to give power back to patients.
          In an era where medical data is often fragmented across different clinics and hospitals, MedTrack
          provides a unified, patient-centric hub for all your medical history.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <Card title="Privacy First">
            <Shield className="w-8 h-8 text-primary mb-2" />
            <p className="text-sm">Your data belongs to you. We use end-to-end security measures to ensure that only you and your authorized healthcare providers can access your records.</p>
          </Card>

          <Card title="Instant Sharing">
            <Zap className="w-8 h-8 text-primary mb-2" />
            <p className="text-sm">No more carrying physical files. Grant access to your doctor with a single click, and they can see your entire medication timeline instantly.</p>
          </Card>

          <Card title="Emergency Ready">
            <Heart className="w-8 h-8 text-primary mb-2" />
            <p className="text-sm">Our unique Emergency QR system ensures that first responders can see critical info like blood type and allergies even if you are unconscious.</p>
          </Card>

          <Card title="Future of Health">
            <Lock className="w-8 h-8 text-primary mb-2" />
            <p className="text-sm">By decentralizing medical records, we reduce administrative overhead and help preventing medical errors caused by incomplete patient history.</p>
          </Card>
        </div>

        <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 mt-12">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p>
            To bridge the gap between patients and providers through technology, ensuring that high-quality,
            accurate medical data is always available where and when it's needed most—saving lives and
            improving health outcomes globally.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
