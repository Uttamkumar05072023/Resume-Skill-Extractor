import { useState, useEffect } from 'react';
import { checkBackendStatus } from '../services/api';
import ResumeUploader from '../components/ResumeUploader';

export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-100 to-blue-200 py-12 flex items-center justify-center">
      <div className="max-w-4xl w-full px-4">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden p-10 animate-fadeIn">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Skill Extractor</h1>
            <p className="text-gray-600">Upload your resume to extract key skills.</p>
          </div>
          <div className="pb-6">
            <ResumeUploader />
          </div>
        </div>
      </div>
    </div>
  );
} 