import { useState, useEffect } from 'react';
import { checkBackendStatus } from '../services/api';
import ResumeUploader from '../components/ResumeUploader';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-purple-200/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-200/30 to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-indigo-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden p-6 md:p-10 transform transition-all duration-300 hover:shadow-3xl border border-white/20">
            <div className="text-center mb-10">
              <div className="inline-block p-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl mb-6 shadow-lg">
                <svg className="w-10 h-10 text-gradient-to-r from-purple-600 to-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent font-serif">
                Extract Skills From Your Resume
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                Upload your resume and we'll analyze it to identify your key skills.
                <span className="text-purple-600 font-medium"> Get insights into your professional profile instantly.</span>
              </p>
            </div>
            <ResumeUploader />
          </div>
        </div>
      </main>
    </div>
  );
} 