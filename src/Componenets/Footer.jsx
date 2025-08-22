import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#064232] text-white py-6 mt-20">
      <div className="max-w-7xl mx-auto text-center px-6">
        <p className="text-sm">
          Created with ❤️ by{" "}
          <span className="text-white font-semibold">Dhanush</span>
        </p>
        <p className="text-xs text-white mt-2">
          © {new Date().getFullYear()} SnapLanding AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
