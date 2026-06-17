import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function UploadMaterial() {

  const navigate = useNavigate();

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

      console.log(response.data);

      navigate(
        `/analysis/${response.data.file_id}`
      );

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
          Upload a PDF file for analysis
        </p>

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) =>
            setFile(
              e.target.files[0]
            )
          }
        />

        <button
          onClick={handleUpload}
        >
          Upload
        </button>

      </div>

    </div>
  );
}

export default UploadMaterial;