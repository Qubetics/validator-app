# 📘 Validator Application

This project is a **Validator Application** built on top of the **Cosmos blockchain ecosystem**.  
It allows users to interact with a Cosmos-based network as a validator — helping secure the blockchain, manage staking, and monitor performance.

The application provides a clean user interface for:

- 🌐 Connecting to the Cosmos network
- 📊 Viewing validator performance and uptime
- 🛡 Staking and delegation management
- 🔁 Real-time updates via WebSocket or RPC
- 🧾 Transaction and account tracking
- ⚙️ Node and governance insights

It’s designed to be scalable, fast, and easy to integrate with any Cosmos SDK-based chain.

##

## 📂 Folder Structure

```
your-project/
├── public/
│   └── index.html
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```

---

## 🛠️ Getting Started

Follow these steps to clone and run the application locally.

### 📥 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
```

### 📂 2. Move into the Project Directory

```bash
cd your-repo-name
```

```Checkout to prod branch
git checkout testnet
```

```Checkout to new branch from prod
git checkout -b Branch_Name
```

### 📦 3. Install Dependencies

```bash
npm install
# use --f flag if you find error while installing the packages.
# or
yarn install
```

### ▶️ 4. Start the Development Server

```bash
npm start
# or
yarn start
```

Your app will now be running at:

```
http://localhost:3000
```

---

## 📋 Requirements

- Node.js (version 16 or above recommended)
- npm or yarn

---

## 🧪 Available Scripts

In the project directory, you can run:

| Command         | Description                      |
| --------------- | -------------------------------- |
| `npm start`     | Runs the app in development mode |
| `npm run build` | Builds the app for production    |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## ENV Example

REACT_APP_EXPLORER_API_URL="YOUR_SITE_API_URL"
REACT_APP_EXPLORER_NAVIGATION_URL="YOUR_SITE_URL"
REACT_APP_VALIDATOR_API="YOUR_NATIVE_API_URL"
REACT_APP_NAME= APP_NAME
REACT_APP_CURRENCY=CURRENCY
REACT_APP_DECIMAL= TOKEN_DECIMAL
REACT_APP_DENOM=DENOM
REACT_APP_MIN_STAKE_AMOUNT=MIN_STAKE_AMOUNT
REACT_APP_FEE_DEDUCTION= MIN_FEE_DEDUCTION
REACT_APP_JAIL_TIME= JAIL_TIME
REACT_APP_DEACTIVATION_TIME= DEACTIVATING_TIME







