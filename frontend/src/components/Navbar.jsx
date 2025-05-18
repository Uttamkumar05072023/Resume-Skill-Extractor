import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-4 shadow-lg backdrop-blur-sm bg-opacity-90 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-white/90 p-2 rounded-lg shadow-lg transform group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
              <svg className="w-8 h-8 text-gradient-to-r from-purple-600 to-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-white text-xl md:text-2xl font-bold tracking-tight font-serif">Resume Skill Extractor</span>
              <span className="text-purple-100 text-sm font-light tracking-wide">Transform your resume into insights</span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 