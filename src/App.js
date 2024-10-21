import React, { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");

  // Base API URL dari environment variable
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  console.log("API_BASE_URL:", API_BASE_URL);

  //Function to handle encryption
  const handleEncrypt = async () => {
    if (!message) {
      alert("Please enter message encryption.");
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}`, {
        message: message
      });
      setEncryptedMessage(response.data.encrypted_message);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received. Check network connection.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
      }
    }
  };

  // Function to handle decryption
  const handleDecrypt = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/decrypt`, {
        encrypted_message: encryptedMessage,
      });
      setDecryptedMessage(response.data.decrypted_message);
    } catch (error) {
      console.error("Error during decryption:", error);
    }
  };

  return (
    <div style={{
      padding: "20px",
      backgroundColor: "#f0f0f0",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
    }}>
      <h2 style={{ textAlign: "center" }}>Mohd Qorib Alqowiy</h2>
      <p style={{ textAlign: "center" }}>NIM 23.51.1429</p>
  
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Encryption and Decryption RSA-2048</h1>
  
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />
      </div>
  
      <button
        onClick={handleEncrypt}
        style={{
          backgroundColor: "#4CAF50",
          color: "#fff",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Encrypt
      </button>
  
      {encryptedMessage && (
        <div style={{ marginTop: "20px" }}>
          <h3>Encrypted Message:</h3>
          <p style={{ fontSize: "16px" }}>{encryptedMessage}</p>
        </div>
      )}
  
      {encryptedMessage && (
        <>
          <button
            onClick={handleDecrypt}
            style={{
              backgroundColor: "#4CAF50",
              color: "#fff",
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              marginTop: "20px"
            }}
          >
            Decrypt
          </button>
  
          {decryptedMessage && (
            <div style={{ marginTop: "20px" }}>
              <h3>Decrypted Message:</h3>
              <p style={{ fontSize: "16px" }}>{decryptedMessage}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;