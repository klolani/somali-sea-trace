import React, { useState } from "react";
import { saveCatch } from "../services/db";
import QRCode from "qrcode";

const speciesOptions = ["Tuna", "Lobster", "Snapper"];

function CatchForm() {
  const [species, setSpecies] = useState("");
  const [weight, setWeight] = useState("");
  const [message, setMessage] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [lastCatch, setLastCatch] = useState(null); // Store last catch

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!species || !weight || isNaN(weight)) {
      setMessage("Please fill all fields correctly.");
      return;
    }

    try {
      let latitude = 11.275;
      let longitude = 49.181;
      if (navigator.geolocation) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 10000,
          });
        });
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
      } else {
        console.warn("Geolocation not supported, using fallback.");
      }

      const catchData = {
        id: Date.now().toString(),
        species,
        weight: parseFloat(weight),
        latitude,
        longitude,
        timestamp: new Date().toISOString(),
        synced: false,
      };

      await saveCatch(catchData);
      setMessage("Catch logged successfully!");
      setLastCatch(catchData); // Save for QR display

      const qrText = JSON.stringify(catchData);
      const qrUrl = await QRCode.toDataURL(qrText);
      setQrCodeUrl(qrUrl);

      setSpecies("");
      setWeight("");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-lg">Species</label>
        <select
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Species</option>
          {speciesOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-lg">Weight (kg)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full p-2 border rounded"
          step="0.1"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Submit Catch
      </button>
      {message && <p className="text-center text-sm">{message}</p>}
      {qrCodeUrl && lastCatch && (
        <div className="mt-4 text-center">
          <p>Scan this QR for Catch #{lastCatch.id}:</p>
          <img src={qrCodeUrl} alt="Catch QR Code" className="mx-auto" />
        </div>
      )}
    </form>
  );
}

export default CatchForm;