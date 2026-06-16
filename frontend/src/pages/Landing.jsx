import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, QrCode, Stethoscope, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const Landing = () => {
  return (
    <div className="flex flex-col gap-16 px-6 py-12 md:py-20 lg:px-20">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
        <div className="bg-primary px-4 py-1 border-2 border-black rounded-full font-bold shadow-neo text-sm uppercase tracking-wider">
          New Standard in Health Data
        </div>
        <h1 className="text-5xl md:text-7xl font-black leading-tight">
          Your Medical History, <br />
          <span className="text-primary text-stroke-gray-100 text-stroke-1 tracking-tight">
            Decentralized.
          </span>
        </h1>
        <p className="text-xl md:text-2xl font-medium max-w-2xl">
          MedTrack puts you in control. Access your records, share with doctors instantly, and ensure critical info is available in emergencies via QR.
        </p>
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <Link to="/register">
            <Button variant="primary" className="text-lg px-8 py-4">Get Started <ArrowRight className="inline ml-2" /></Button>
          </Link>
          <Link to="/about">
            <Button variant="secondary" className="text-lg px-8 py-4">Learn More</Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card title="Secure Records" className="bg-white">
          <ShieldCheck className="h-12 w-12 mb-4 text-primary fill-black" />
          <p className="font-medium">All your medical history stored securely and accessible only by you and authorized doctors.</p>
        </Card>
        <Card title="Emergency QR" className="bg-primary">
          <QrCode className="h-12 w-12 mb-4" />
          <p className="font-medium">Generate a lock-screen QR code that first responders can scan to view allergies and blood type.</p>
        </Card>
        <Card title="Doctor Access" className="bg-white">
          <Stethoscope className="h-12 w-12 mb-4 text-primary fill-black" />
          <p className="font-medium">Grant temporary access to healthcare providers to view your logs and add new entries.</p>
        </Card>
      </section>
    </div>
  );
};

export default Landing;
