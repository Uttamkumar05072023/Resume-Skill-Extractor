import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 shadow-md animate-fadeIn">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Resume Skill Extractor
        </Link>
        
      </div>
    </nav>
  );
}

export default Navbar; 