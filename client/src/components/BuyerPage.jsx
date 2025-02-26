import React, { useState } from "react";
import Web3 from "web3";

const web3 = new Web3("http://localhost:8545"); // Ganache
const contractAddress = "0x732e6d5a8738BCC942Da3ef418973cA07c05E6ee"; // From Remix
const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "id",
				"type": "string"
			}
		],
		"name": "CatchStored",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "species",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "weight",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "processingType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "timestamp",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "processedAt",
				"type": "string"
			}
		],
		"name": "storeCatch",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "catches",
		"outputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "species",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "weight",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "processingType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "timestamp",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "processedAt",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			}
		],
		"name": "getCatch",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "species",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "weight",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "processingType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "timestamp",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "processedAt",
						"type": "string"
					}
				],
				"internalType": "struct CatchStorage.Catch",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]; // Paste ABI here
const contract = new web3.eth.Contract(contractABI, contractAddress);

function BuyerPage() {
  const [catchId, setCatchId] = useState("");
  const [catchData, setCatchData] = useState(null);
  const [message, setMessage] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!catchId) {
      setMessage("Please enter a catch ID.");
      return;
    }

    try {
      const data = await contract.methods.getCatch(catchId).call();
      if (data.id === "") {
        setMessage("Catch not found on blockchain.");
        setCatchData(null);
      } else {
        setCatchData({
          id: data.id,
          species: data.species,
          weight: data.weight / 1000, // Convert grams back to kg
          processingType: data.processingType,
          timestamp: data.timestamp,
          processedAt: data.processedAt,
        });
        setMessage("Catch verified successfully!");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Buyer Verification</h1>
        <form onSubmit={handleVerify} className="space-y-4">
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
            Verify Catch
          </button>
        </form>

        {catchData && (
          <div className="mt-4">
            <p><strong>Catch #{catchData.id}</strong></p>
            <p>Species: {catchData.species}</p>
            <p>Weight: {catchData.weight} kg</p>
            <p>Processing: {catchData.processingType || "Unprocessed"}</p>
            <p>Caught: {new Date(catchData.timestamp).toLocaleString()}</p>
            {catchData.processedAt && (
              <p>Processed: {new Date(catchData.processedAt).toLocaleString()}</p>
            )}
            <p className="text-green-600 mt-2">Verified on Blockchain</p>
          </div>
        )}
        {message && <p className="text-center text-sm mt-4">{message}</p>}
      </div>
    </div>
  );
}

export default BuyerPage;
