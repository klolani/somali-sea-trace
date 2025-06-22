# SomaliSeaTrace

**SomaliSeaTrace** is a blockchain-based web application that enhances traceability in Somalia’s fisheries supply chain.
Built for a pilot in Bosaso, it allows fishers to log catches, processors to verify and process them, and buyers to confirm provenance via an Ethereum blockchain.
The app leverages QR codes and a UI to combat illegal fishing and boost export credibility.

---

## Features

- **Fisher Catch Logging**: Fishers log catches (species, weight, location) with automatic QR code generation.
- **Processor Verification**: Processors search catches by ID, add processing details (e.g., "Frozen"), and update records.
- **Buyer Verification**: Buyers input catch IDs to retrieve and verify details from the blockchain.
- **Blockchain Integration**: Catches are stored immutably on a local Ethereum network (Ganache).
- **Offline Support**: Uses IndexedDB for local storage, syncing when online.

---
```bash
## Project Structure

somali-sea-trace/
├── client/                # React frontend
│   ├── src/
│   │   ├── App.jsx        # Fisher page (catch logging)
│   │   ├── components/
│   │   │   ├── CatchForm.jsx   # Catch input form with QR
│   │   │   ├── Navbar.jsx      # Navigation bar
│   │   │   ├── ProcessorPage.jsx  # Processor verification page
│   │   │   └── BuyerPage.jsx      # Buyer verification page
│   │   ├── services/
│   │   │   └── db.js       # IndexedDB and sync logic
│   │   ├── index.css       # Tailwind CSS setup
│   │   └── main.jsx        # Entry point with routing
│   ├── package.json        # Client dependencies and scripts
│   └── tailwind.config.js  # Tailwind configuration
├── server/                # Node.js backend
│   ├── contracts/
│   │   └── CatchStorage.sol  # Solidity contract
│   ├── index.js           # Server with blockchain sync
│   └── package.json       # Server dependencies
└── README.md              # This file

```
---

## Prerequisites

- **Node.js**: v16+ (includes npm).
- **Ganache**: Local Ethereum blockchain ([install guide](https://trufflesuite.com/ganache/)).
- **Remix IDE**: For contract deployment ([remix.ethereum.org](https://remix.ethereum.org/)).
- **Browser**: Modern browser (e.g., Chrome) with geolocation enabled.

---

## Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd somali-sea-trace
```

### 2. Install Dependencies
```
### Client
cd client
npm install

### Server
cd server
npm install
```

### 3. Set Up Ethereum Blockchain
```
Run Ganache:
ganache
```

- Note the RPC URL (http://127.0.0.1:8545) and first account address.
- Deploy Smart Contract:
- Open server/contracts/CatchStorage.sol in Remix IDE.
- Compile (Solidity 0.8.x).
- Deploy to Ganache (Web3 Provider, http://127.0.0.1:8545).
- Copy the deployed contract address (e.g., 0x123...) and ABI (from "Compilation Details").
- Update Server:
- Edit server/index.js:

```
const contractAddress = "0xYourContractAddress"; // From Remix
const contractABI = [ /* Your ABI from Remix */ ];
const account = "0xYourAccountAddress"; // First Ganache 0xYourAccountAddress
```

Update Client:
Edit client/src/components/BuyerPage.jsx:

```
const contractAddress = "0xYourContractAddress"; // Match server
const contractABI = [ /* Your ABI from Remix */ ];
```

Running the Application
Start Ganache:
```
ganache
```

Start Server:
```
cd server
npm start
Runs on http://localhost:5001.
```

Start Client:
```
cd client
npm run dev
Opens at http://localhost:5174 (or similar).
```

### Usage
#### Fisher (Home Page)
- URL: http://localhost:5174/
- Action: Select species, enter weight, and submit. A QR code appears with the catch ID.
- Sync: Catches sync to the blockchain every minute (check server logs for tx hashes).

#### Processor
- URL: http://localhost:5174/processor
- Action: Enter a catch ID (from QR), search, select processing type (e.g., "Frozen"), verify.
- Sync: Updates sync to the blockchain.

#### Buyer
- URL: http://localhost:5174/buyer
- Action: Enter a catch ID, verify. Displays blockchain-stored details if found.

### Development Notes
#### Tech Stack:
- Frontend: React, Vite, Tailwind CSS, Web3.js, React Router.
- Backend: Node.js, Express, Web3.js.
- Blockchain: Ethereum (Ganache), Solidity.
- Storage: IndexedDB for offline caching, Ethereum for permanent records.

### Extending the App
- QR Scanning: Add html5-qrcode for camera-based QR reading.
- Dashboard: Create a /dashboard route for analytics (e.g., catch stats).
- Production: Replace Ganache with a testnet (e.g., Sepolia) and secure API keys.

### License
- This project is unlicensed—feel free to adapt it for fisheries or beyond!

### Contact
- Built with 💙 by Kijana. Questions? Reach out on [Email](klolani@yahoo.com).
- `To whom much has been given, much shall be required`
