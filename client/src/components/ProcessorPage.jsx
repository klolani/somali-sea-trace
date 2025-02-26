import React, { useState } from "react";
import { getCatchById, updateCatch } from "../services/db";

function ProcessorPage() {
  const [catchId, setCatchId] = useState("");
  const [catchData, setCatchData] = useState(null);
  const [processingType, setProcessingType] = useState("");
  const [message, setMessage] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await getCatchById(catchId);
      if (data) {
        setCatchData(data);
        setMessage("Catch found!");
      } else {
        setMessage("Catch not found.");
        setCatchData(null);
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!processingType) {
      setMessage("Please select a processing type.");
      return;
    }

    try {
      const updatedCatch = {
        ...catchData,
        processingType,
        processedAt: new Date().toISOString(),
        synced: false, // Reset sync status
      };
      await updateCatch(updatedCatch);
      setMessage("Catch verified and updated!");
      setCatchData(updatedCatch);
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Processor Verification</h1>
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label className="block text-lg">Catch ID (from QR)</label>
            <input
              type="text"
              value={catchId}
              onChange={(e) => setCatchId(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter catch ID"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Search Catch
          </button>
        </form>

        {catchData && (
          <div className="mt-4">
            <p>Catch #{catchData.id}</p>
            <p>Species: {catchData.species}</p>
            <p>Weight: {catchData.weight} kg</p>
            <p>Location: {catchData.latitude}, {catchData.longitude}</p>
            <p>Caught: {catchData.timestamp}</p>

            <form onSubmit={handleVerify} className="space-y-4 mt-4">
              <div>
                <label className="block text-lg">Processing Type</label>
                <select
                  value={processingType}
                  onChange={(e) => setProcessingType(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Type</option>
                  <option value="Fresh">Fresh</option>
                  <option value="Frozen">Frozen</option>
                  <option value="Canned">Canned</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                Verify & Process
              </button>
            </form>
          </div>
        )}
        {message && <p className="text-center text-sm mt-4">{message}</p>}
      </div>
    </div>
  );
}

export default ProcessorPage;
