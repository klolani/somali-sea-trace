import React, { useEffect } from "react";
import CatchForm from "./components/CatchForm";
import { syncCatches } from "./services/db";

function App() {
  useEffect(() => {
    const syncInterval = setInterval(() => {
      if (navigator.onLine) {
        syncCatches()
          .then(() => console.log("Sync successful"))
          .catch((err) => console.error("Sync failed:", err));
      } else {
        console.log("Offline, skipping sync");
      }
    }, 60000); // Every minute
    return () => clearInterval(syncInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">SomaliSeaTrace</h1>
        <CatchForm />
      </div>
    </div>
  );
}

export default App;