import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:3001/upload', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (

    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
       
        paddingLeft: '10px', // Adjust as needed
      }}
    >
      <h3 >Excel File Upload</h3>
      <Box sx={{paddingTop:'30px'}} >
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </Box>
    </Box>
   
  );
};

export default FileUpload;
