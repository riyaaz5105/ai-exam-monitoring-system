import { useParams } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

function Analysis() {

  const { fileId } = useParams();

  const [concepts, setConcepts] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const handleExtract = async () => {

    setLoading(true);

    try {

      const response =
        await API.post(
          `/material/extract-concepts/${fileId}`
        );

      setConcepts(
        response.data.concepts
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed to extract concepts"
      );

    }

    setLoading(false);
  };

  return (

    <div
      style={{
        padding: "40px"
      }}
    >

      <h1>
        Material Analysis
      </h1>

      <button
        onClick={handleExtract}
      >
        Extract Concepts
      </button>

      {loading && (
        <p>
          Analyzing Material...
        </p>
      )}

      <div
        style={{
          marginTop: "20px"
        }}
      >

        {concepts.map(
          (concept, index) => (

            <div
              key={index}
              style={{
                padding: "10px"
              }}
            >
              ✅ {concept}
            </div>

          )
        )}

      </div>

    </div>

  );
}

export default Analysis;