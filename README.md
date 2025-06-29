# 🌾 Blockchain-Based Drought Index Insurance Platform

## 📌 What is this?

A decentralized insurance platform that automatically compensates **maize farmers in Malawi** when drought conditions hit — without the need to manually file claims or prove losses.

Powered by **smart contracts** and **Chainlink’s decentralized oracle network**, this platform connects blockchain with real-world weather data to deliver fast, fair, and automated insurance for vulnerable agricultural communities.

---

## 🌍 Why This Matters

In Malawi, **maize is a staple crop**, and thousands of smallholder farmers lose their entire income every year due to **droughts** and **irregular rainfall**. Traditional insurance is:
- Slow
- Hard to access
- Often untrusted

This project introduces a **transparent and automatic alternative** using blockchain and oracles.

---

## 🧠 How It Works

### 1. Policy Design
Farmers choose between three types of drought insurance:
- 🌼 **Flowering Stage**
- 🌽 **Grain Filling Stage**
- 🌦️ **Full Season**

Each option covers a specific period in the maize crop cycle that is most vulnerable to drought. Instead of waiting for losses, the platform monitors **rainfall data** in real-time and triggers payouts automatically if conditions are met.

---

### 2. Smart Contracts
Smart contracts are used to:
- Store farmer info and policy details.
- Accept premium payments.
- Automatically issue payouts when drought triggers occur.
- Emit events for transparency.

Each insurance policy is **represented as an NFT**, ensuring traceable and verifiable ownership.

---

### 3. Weather Data via Chainlink Functions
- Rainfall data is fetched from trusted weather APIs.
- Logic is executed off-chain using **Chainlink Functions**, and the result (rainfall in mm) is sent back to the smart contract.
- If rainfall is below the drought threshold, the contract triggers a payout — instantly and without bias.

---

### 4. Scheduled Checks via Chainlink Automation
- Rainfall checks happen **automatically and periodically** (e.g., daily) using **Chainlink Automation**.
- This ensures that farmers don’t need to manually request anything — if the drought happens, the contract knows.

---

### 5. Metadata on IPFS
Farmer details (name, farm size, crop type, location) are stored off-chain on **IPFS**.
Only essential data is kept on-chain to reduce costs and improve efficiency.

---

## 🔗 Architecture Summary

| Layer             | Tech Used                        |
|------------------|----------------------------------|
| Smart Contract    | Solidity + Foundry               |
| Oracle Layer      | Chainlink Functions + Automation |
| Frontend          | Next.js + Wagmi                  |
| Blockchain        | Ethereum Sepolia / Polygon Mumbai|
| Metadata Storage  | IPFS (linked to NFTs)            |
| Policy Representation | ERC721 NFTs                 |

---

## 🧩 Example Workflow

1. A farmer selects the “Flowering Stage” policy (around January).
2. The smart contract locks their premium.
3. Chainlink Functions fetch rainfall data daily.
4. If there are, for example, **3 consecutive dry days**, a payout is automatically issued to the farmer’s wallet.
5. The payout is recorded on-chain. No claims, no paperwork.

---

## 🔮 Future Possibilities

- 🌱 Support other crops (e.g., rice, cassava).
- 👥 Add DAO-based policy governance.
- 📱 Mobile onboarding for farmers.
- 📊 Analytics dashboards for NGOs and insurers.
- 🌍 Expansion across Sub-Saharan Africa.

---

## 🧑‍💻 Team Hackat

Built with 💡 during **Chainlink Chromion Hackathon 2025** by:

- [@Youssefahmed88](https://github.com/Youssefahmed88)
- [@MSTFA77](https://github.com/MSTFA77)
- [@YousefMedhat56](https://github.com/YousefMedhat56)

---

## 📎 Status

This project is in the **prototyping phase**. The concept, logic, and integration approach have been clearly outlined. Development of the smart contracts, Chainlink functions, and testing environment is underway.

---

## 📽️ Demo

Video demo to be added before final submission.
