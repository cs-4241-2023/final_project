import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone'

function App() {
  // Hooks.
  const [URL, setURL] = useState('');
  const [file, setFile] = useState(null);
  const [dropText, setDropText] = useState('Choose A File Or Drag It Here');
  const [uploadMessage, setUploadMessage] = useState(null);

  const getFile = (acceptedFiles) => {
	/*
	If the dropped file is less than 5MB, store it.
	*/
    setURL('');
    const inFile = acceptedFiles[0];
    if (inFile.size > 5300000) {
      setDropText('File is too big! The limit is 5MB');
    } else {
      setFile(inFile);
      setDropText(inFile.name);
    }
  };

  const convertFileToBase64 = (file) => new Promise((resolve, reject) => {
	/*
	Convert the content of the given file to a base64 string.
	*/
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  const uploadFile = async () => {
	/*
	Upload the file to S3.
	*/
	// No File.
    if (file === null) {
      setUploadMessage('Please upload a file')
    } else {
	  // Convert the file body to base64.
      let file_body = (await convertFileToBase64(file)).split(',')[1];

      const requestData = {
        fileName: file.name,
        fileBody: file_body
      }
      // POST request to express.js server.
      const response = await axios.post('/uploadfile', requestData);
      let data = response.data;

	  // Success.
	  if(data.statusCode === 200) {
		// Set the URL and notify the user.
	 	setURL(data.body.url);
		setUploadMessage('File succesfully uploaded! Copy the link and share!');
	  } else {
		setUploadMessage('Error uploading file');
	  }
    }
  }

  const copyLink = () => {
	/*
	Copy the S3 presigned link to the uploaded file to the user's clipboard. 
	*/
    if(URL !== '') {
      navigator.clipboard.writeText(URL)
      .then(() => {
        setUploadMessage('URL copied to clipboard!');
      })
    } else {
      setUploadMessage('Please upload a file');
    }
  };

  const clearFile = () => {
	/*
	Remove the file from the dropzone.
	*/
    setURL('');
    setFile(null);
    setUploadMessage('');
    setDropText('Choose A File Or Drag It Here');
  };

  return (
    <div>
      <div className="Top-Logo">
        <img src="/24ours.png" alt="Logo" width="250" height="125" />
      </div>
      <div className="container mt-4">
        <div className="App">
          <div className="Container">
            <div className="Top-Form">
              <button className="btn btn-success" onClick={copyLink}>Copy</button>
              <span className="form-control" id="URL-Field">{URL}</span>
              <button className="btn btn-primary" onClick={uploadFile}>Submit</button>
            </div>
            <div className="File-Input">
              <div className="Close-Button">
                <button type="button" className="btn-close btn-close-custom" aria-label="Close" onClick={clearFile}></button>
              </div>
              <Dropzone onDrop={getFile}>
                {({ getRootProps, getInputProps }) => (
                  <section className="Upload-Area">
                    <div className="Drop-Area" {...getRootProps()}>
                      <input {...getInputProps()} />
                      <span className="Drop-Text">{dropText}</span>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            {uploadMessage && <div className="Upload-Message">{uploadMessage}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;