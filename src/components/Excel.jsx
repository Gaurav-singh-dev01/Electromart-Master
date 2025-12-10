import React, { useState } from "react";
import axios from "axios";

export default function ExcelUpload() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select an Excel file first");

    const formData = new FormData();
    formData.append("excel", file);

    try {
      const res = await axios.post("http://localhost:5000/api/products/upload-excel", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(`${res.data.message}. Inserted rows: ${res.data.inserted}`);
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Upload Products Excel</h2>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br /><br />
      <button disabled={!file} onClick={handleUpload}>
        Upload Excel
      </button>
    </div>
  );
}