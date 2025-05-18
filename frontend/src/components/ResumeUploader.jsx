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

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange({ target: { files: e.dataTransfer.files } });
    }
  };

  // Prevent default drag over behavior
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="flex flex-col items-center justify-center w-full">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-50">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl transform group-hover:scale-150 transition-transform duration-500"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl transform group-hover:scale-150 transition-transform duration-500"></div>
            </div>

            <div className="flex flex-col items-center justify-center pt-4 pb-4 relative z-10">
              <div className="p-3 bg-white/90 rounded-xl shadow-md mb-2 transform group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                <svg className="w-8 h-8 text-gradient-to-r from-purple-600 to-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
              </div>
              <p className="mb-1 text-sm text-gray-600">
                <span className="font-semibold text-purple-600">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF or TXT files</p>
            </div>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.txt"
              disabled={uploadStatus === 'uploading'}
              className="hidden"
            />
          </label>
        </div>

        {selectedFile && (
          <div className="mt-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100 transform transition-all duration-300 animate-fadeIn shadow-sm">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-white rounded-lg shadow-sm">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <p className="text-sm text-purple-700">
                Selected file: <span className="font-medium">{selectedFile.name}</span>
              </p>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleUpload}
        disabled={!selectedFile || uploadStatus === 'uploading'}
        className="w-full py-2.5 px-6 text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-xl hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-base flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        {uploadStatus === 'uploading' ? (
          <>
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Uploading...</span>
          </>
        ) : (
          <span>Upload Resume</span>
        )}
      </button>
    </div>
  );
}

export default ResumeUploader; 