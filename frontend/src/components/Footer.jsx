import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t-2 border-black bg-white py-8 text-center font-bold">
      <p>&copy; {new Date().getFullYear()} MedTrack</p>
    </footer>
  );
};

export default Footer;
