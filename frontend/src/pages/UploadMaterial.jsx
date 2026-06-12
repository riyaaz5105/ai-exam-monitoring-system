import { useState } from "react";
import API from "../services/api";

function UploadMaterial() {

  const [file, setFile] = useState(null);

  const handleUpload = async () => {

    if (!file) {
      alert("Select a file first");
      return;
    }

    const formData = new FormData();

    formData.append(
      "file",
      file
    );

    try {

      const response = await API.post(
        "/material/upload",
        formData
      );

      alert(response.data.message);

    } catch (error) {

      console.log(error);

      alert("Upload Failed");

    }
  };

  return (
    <div className="upload-page">

      <div className="upload-card">

        <h1>Upload Material</h1>

        <p>
          Upload PDF, PPT, DOCX or Notes
        </p>

        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />

        <button onClick={handleUpload}>
          Upload
        </button>

      </div>

    </div>
  );
}

export default UploadMaterial;