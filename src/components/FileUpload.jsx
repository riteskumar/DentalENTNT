import React, { useState } from 'react';

const FileUpload = ({ onFileSelect }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // TODO
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setPreview(base64String);
        onFileSelect({ file, base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadContainerStyle = {
    border: '2px dashed #ccc',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    marginBottom: '20px'
  };

  const previewStyle = {
    maxWidth: '200px',
    maxHeight: '200px',
    marginTop: '10px'
  };

  return (
    <div style={uploadContainerStyle}>
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*,.pdf"
        style={{ marginBottom: '10px' }}
      />
      {preview && (
        <div>
          {preview.startsWith('data:image') ? (
            <img src={preview} alt="Preview" style={previewStyle} />
          ) : (
            <div style={{ marginTop: '10px' }}>
              <p>File selected (PDF)</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;