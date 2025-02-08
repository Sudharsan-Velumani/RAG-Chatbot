import React, { useState } from "react";
import axios from "axios";

function FileUpload({ setConversation }) {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    if (e.dataTransfer.files.length > 0) {
      setFiles([...e.dataTransfer.files]);
    }
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleProcess = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await axios.post("http://127.0.0.1:8000/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Response:", response.data);
      setConversation({ id: response.data.conversation_id });
    } catch (error) {
      console.error("Error processing files:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className={`upload-area ${dragging ? "dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h2>Upload Document</h2>

      <input type="file" id="file-upload" multiple onChange={handleFileChange} accept=".pdf" hidden />
      <label htmlFor="file-upload" className="upload-label">
        {files.length > 0 ? (
          files.map((file, index) => <p key={index}>{file.name}</p>)
        ) : (
          <p>Drag & Drop or Click to Upload</p>
        )}
      </label>

      <button onClick={handleProcess} disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Process"}
      </button>
    </div>
  );
}

export default FileUpload;
