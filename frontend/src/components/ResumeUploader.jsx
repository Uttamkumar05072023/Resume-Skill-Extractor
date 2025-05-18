import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ResumeUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error
  const [extractedSkills, setExtractedSkills] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadStatus('idle'); // Reset status on new file selection
    setExtractedSkills(null); // Clear previous results
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log('No file selected.');
      return;
    }

    setUploadStatus('uploading');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${backendUrl}/api/upload-resume`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUploadStatus('success');

      navigate('/skills', { state: { skills: data.skills } });

    } catch (error) {
      console.error('Upload failed:', error);
      setUploadStatus('error');
    }
  };

  return (
    <div className="mt-10 p-6 bg-white rounded-lg shadow-xl max-w-md mx-auto animate-fadeIn">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Upload Your Resume</h2>
      
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <label className="block w-full">
          <span className="sr-only">Choose file</span>
          <input 
            type="file" 
            onChange={handleFileChange} 
            accept=".pdf,.txt" 
            disabled={uploadStatus === 'uploading'}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          />
        </label>
        <button 
          onClick={handleUpload} 
          disabled={!selectedFile || uploadStatus === 'uploading'}
          className="w-full sm:w-auto px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        >
          {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </div>
  );
}

export default ResumeUploader; 