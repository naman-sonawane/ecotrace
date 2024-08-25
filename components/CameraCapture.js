import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

export default function CameraCapture({ onCapture }) {
  const videoRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().catch(error => console.error('Error playing video', error));
          };
          setIsCapturing(true);
        }
      } catch (error) {
        console.error('Error accessing camera', error);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const captureImage = async () => {
    if (videoRef.current) {
      const video = videoRef.current;

      // Create a canvas element
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the video frame to the canvas
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas content to Blob for sending to server
      canvas.toBlob(async (blob) => {
        // Convert Blob to JPEG
        const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });

        // Send the image to the server
        const formData = new FormData();
        formData.append('file', file);

        try {
          // Update this URL with your Vercel deployment URL
          const response = await axios.post('https://your-project-name.vercel.app/api/vback', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          const result = response.data.analysisResult;
          setAnalysisResult(result);

          // Call the onCapture function with the result
          onCapture(result);

        } catch (error) {
          console.error('Error analyzing image', error);
        }
      }, 'image/jpeg');
    } else {
      console.error('Error capturing image');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      setIsCapturing(false);
    }
  };

  return (
    <div>
      <video ref={videoRef} width="640" height="480" autoPlay />
      <div className="flex space-x-4 pt-4">
        <button 
          onClick={captureImage} 
          className="bg-gradient-to-r from-emerald-300 to-green-500 text-slate-800 font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Capture
        </button>

        <button 
          onClick={stopCamera} 
          className="bg-gradient-to-r from-red-300 to-red-500 text-slate-800 font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Stop
        </button>
      </div>
    </div>
  );
}
