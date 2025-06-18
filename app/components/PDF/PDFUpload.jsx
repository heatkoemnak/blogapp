'use client';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaRegFilePdf } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const PDFUpload = ({ setMatchedJobs }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];

      setSelectedFile(file);
      setIsLoading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append('resume', file);

      try {
        const response = await axios.post('/api/upload', formData, {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        });

        setMatchedJobs(response.data.matchedJobs);
        toast.success('Resume processed successfully!');
      } catch (error) {
        console.error('Error uploading file:', error);
        toast.error('Error processing resume');
      } finally {
        setIsLoading(false);
      }
    },
    [setMatchedJobs]
  );

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div className="p-3 border-2 border-dashed rounded-lg text-center">
      <div
        {...getRootProps()}
        className={`p-8 cursor-pointer ${
          isDragActive ? 'bg-blue-50' : 'bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        {isLoading ? (
          <div>
            <p>Uploading... {uploadProgress}%</p>
            <progress value={uploadProgress} max="100" className="w-full" />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center mb-4">
              {isDragActive
                ? 'Drop your resume here'
                : 'Drag & drop your resume PDF here, or click to select'}
            </div>
            {selectedFile && (
              <div className='flex items-center bg-blue-gray-50 p-2 gap-2 rounded-md'>
                <FaRegFilePdf color="red" size={35} />
                <p className="text-sm text-gray-500">
                  Selected file: {selectedFile.name}
                </p>
                <MdDelete
                  className="cursor-pointer"
                  size={20}
                  onClick={handleRemoveFile}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PDFUpload;

