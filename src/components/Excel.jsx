import React, { useState, useRef } from "react";
import axios from "axios";
import Header from "./headerComponent/Header";
import Footer from "./footerComponent/Footer";
import "../assets/css/style.css";
import iconExcel from "../assets/img/icon_excel.png";
import Swal from "sweetalert2";
import iconwrong from "../assets/img/icon_cross.png";

export default function ExcelUpload() {
  const [fileList, setFileList] = useState([]);
  const [showAll, setShowAll] = useState(false); // 🔥 view more
  const fileInputRef = useRef();

  /* ===============================
     ADD FILES (NEW FILES ON TOP)
  =============================== */
  const addFiles = (files) => {
    const newFiles = Array.from(files).map((file) => ({
      file,
      progress: 0,
      status: "ready",
    }));

    // ✅ NEW FILES TOP PAR
    setFileList((prev) => [...newFiles, ...prev]);
  };

  /* ===============================
     DRAG & DROP
  =============================== */
  const handleDrop = (e) => {
    e.preventDefault();
    addFiles(e.dataTransfer.files);
  };

  /* ===============================
     UPLOAD SINGLE FILE
  =============================== */
const uploadFile = async (file, override = false) => {
  try {
    // reset progress to 0
    setFileList((prev) =>
      prev.map((item) =>
        item.file === file
          ? { ...item, status: "uploading", progress: 0 }
          : item
      )
    );

    const formData = new FormData();
    formData.append("excel", file);

    const res = await axios.post(
      `http://localhost:5000/api/products/upload-excel?override=${override}`,
      formData,
      {
        // 🔥 REAL PROGRESS (0 → 100)
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          setFileList((prev) =>
            prev.map((item) =>
              item.file === file
                ? { ...item, progress: percent }
                : item
            )
          );
        },
      }
    );

    // success
    setFileList((prev) =>
      prev.map((item) =>
        item.file === file
          ? { ...item, status: "success", progress: 100 }
          : item
      )
    );

    Swal.fire("Success", res.data.message, "success");
  } catch (err) {
    /* duplicate logic same as before */
    if (err.response?.status === 409) {
      const duplicates = err.response.data.duplicates;

      const result = await Swal.fire({
        title: "Duplicate Products Found",
        html: `
          <p>These products already exist:</p>
          <b>${duplicates.join(", ")}</b>
          <br/><br/>
          <p>Do you want to override them?</p>
        `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Override",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        return uploadFile(file, true);
      } else {
        Swal.fire("Cancelled", "Upload cancelled", "info");
        return;
      }
    }

    // error
    setFileList((prev) =>
      prev.map((item) =>
        item.file === file ? { ...item, status: "error" } : item
      )
    );

    Swal.fire("Error", "Upload failed due to server error", "error");
  }
};

  /* ===============================
     UPLOAD ALL FILES
  =============================== */
  const handleUpload = async () => {
    if (fileList.length === 0) {
      return Swal.fire("Warning", "Please select files first", "warning");
    }

    for (let item of fileList) {
      if (item.status === "ready" || item.status === "error") {
        await uploadFile(item.file);
      }
    }
  };

  /* ===============================
     VIEW MORE LOGIC
  =============================== */
  const visibleFiles = showAll ? fileList : fileList.slice(0, 2);

  return (
    <>
      <Header />

      <div className="upload-container">
        <h2>Upload Excel Files</h2>

        {/* DROP ZONE */}
        <div
          className="upload-box"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
        >
          <input
            type="file"
            accept=".xlsx,.xls"
            multiple
            hidden
            ref={fileInputRef}
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = "";
            }}
          />

          <div className="upload-icon">📄</div>
          <p>Drag & drop files or click anywhere</p>
          <p className="size-limit">Max file size 100MB each</p>
        </div>

        {/* UPLOAD BUTTON */}
        <button
          className="upload-btn"
          style={{ marginTop: "20px" }}
          onClick={handleUpload}
          disabled={fileList.length === 0}
        >
          Upload All Files
        </button>

        {/* FILE LIST */}
        {visibleFiles.map((item, i) => (
          <div className="file-card" key={i}>
            <div className="file-info">
              <div className="d-flex align-items-center">
                <div className="file-preview">
                  <img src={iconExcel} alt="excel" />
                </div>
                <div>
                  <p className="file-name">{item.file.name}</p>
                  <span className="file-size">
                    {(item.file.size / 1024).toFixed(1)} KB
                  </span>
                </div>
              </div>

              {/* REMOVE FILE */}
              <button
                className="remove-btn"
                onClick={() =>
                  setFileList((prev) =>
                    prev.filter((_, index) => index !== i)
                  )
                }
              >
                <img src={iconwrong} alt="remove" />
              </button>
            </div>

            {item.status === "uploading" && (
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            )}

            {item.status === "error" && (
              <p className="error-text">Upload failed</p>
            )}

            {item.status === "success" && (
              <p className="success-text">✔ Uploaded successfully</p>
            )}
          </div>
        ))}

        {/* VIEW MORE BUTTON */}
        {fileList.length > 2 && (
          <button
            className="view-more-btn"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll
              ? "View Less"
              : `View More (${fileList.length - 2})`}
          </button>
        )}
      </div>

      <Footer />
    </>
  );
}