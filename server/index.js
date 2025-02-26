const express = require("express");
const cors = require("cors");
const app = express();

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
];
const account = "0x494ccCf9095EF67cA67B805D2DFE96C39877A995"; // First Ganache account

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("SomaliSeaTrace Server is running. Use POST /api/sync to sync catches.");
});

app.post("/api/sync", (req, res) => {
  const catches = req.body;
  console.log("Received catches for sync:", catches);
  catches.forEach((catchData) => {
    const processInfo = catchData.processingType
      ? `Processed as ${catchData.processingType} at ${catchData.processedAt}`
      : "Unprocessed";
    console.log(`Stored in blockchain: Catch #${catchData.id} - ${catchData.species}, ${catchData.weight} kg - ${processInfo}`);
  });
  res.status(200).json({ message: "Catches synced successfully", count: catches.length });
});

app.listen(5001, () => {
  console.log("Server running on http://localhost:5001");
});
