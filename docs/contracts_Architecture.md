# 🌾 Decentralized Weather-based Crop Insurance System

## 📌 Overview

This document provides a professional, modular, and extensible **System Design Specification** for a decentralized crop insurance platform. The system targets small-scale farmers in regions like **Malawi**, offering seasonal insurance against climate-related events like droughts or heavy rainfall.

The system architecture separates concerns across several smart contracts and Chainlink services for scalability, auditability, and decentralization.

---

## 🧱 Smart Contract Architecture

### 1️⃣ **Main Contract – **``

Manages the lifecycle of crop insurance policies:

#### Core Responsibilities:

- Create new policies (full-season or sub-season)
- Manage farmer subscriptions
- Enforce subscription constraints
- Coordinate with Treasury & Payout Engine

#### Key Features:

- Only one **full-season** policy per farmer per season
- Sub-seasonal policies can be purchased if full-season wasn’t
- Subscription has deadlines
- Integrates with Treasury contract for fund deposit
- Tracks policy status (Active, Paused, PayoutTriggered)
- External trigger callable by `PayoutEngine`

---

### 2️⃣ **Treasury Contract – **``

Handles all funds securely with optional multisig support.

#### Core Responsibilities:

- Receive subscription funds
- Release funds to `PayoutEngine` on payout request
- Optional: Use Chainlink **ETH/USD Price Feed** for valuation

---

### 3️⃣ **Payout Engine Contract – **``

Coordinates payout distribution based on policy trigger.

#### Core Responsibilities:

- Receives trigger request from `WeatherOracle`
- Validates payout conditions
- Interacts with Treasury to release funds
- Notifies `PolicyManager` to mark the policy as triggered

---

### 4️⃣ **Weather Oracle Contract – **``

Fetches and validates weather data using Chainlink.

#### Core Responsibilities:

- Uses **Chainlink Functions** or **External Adapters**
- Pulls rainfall or temperature data from APIs
- Periodically checks via Chainlink Automation (Keepers)
- If threshold is exceeded, triggers payout logic

#### External APIs:

- Malawi Meteorological Dept API
- OpenWeatherMap API
- NASA’s POWER API

---

### 5️⃣ **NFT Contract – **``

Mints unique NFTs to represent a farmer's policy subscription.

#### Core Responsibilities:

- Mint NFTs on successful subscription
- Each NFT includes metadata:
  - Farmer address
  - Policy ID & season
  - Type (full/sub)
  - Timestamp
- Useful for traceability, resale (if allowed), and UI/UX

---

## 🔁 System Workflow

```plaintext
Farmer Registers Wallet
      ↓
PolicyManager exposes active policies
      ↓
Farmer subscribes to a policy (PolicyManager → Treasury)
      ↓
NFT minted (PolicyNFT)
      ↓
WeatherOracle checks condition (Chainlink Automation + Functions)
      ↓
Trigger Detected → PayoutEngine notifies PolicyManager
      ↓
Treasury releases funds to eligible farmers
      ↓
Policy marked as PayoutTriggered
```

---

## 🔒 Security Measures

- **Modifiers**: `onlyOwner`, `onlyPayoutEngine`, `validPolicy`
- **Safe Transfers**: Funds handled via Treasury only
- **Seasonal Lock-In**: Can't double-subscribe to overlapping full/sub policies
- **Oracle Validation**: Chainlink decentralized oracles prevent manipulation

---

## 🔗 Chainlink Integration Summary

| Use Case           | Tool                  | Notes                              |
| ------------------ | --------------------- | ---------------------------------- |
| Fetch Weather Data | Chainlink Functions   | API-based rainfall data            |
| Periodic Check     | Chainlink Automation  | Scheduled condition checks         |
| ETH/USD Pricing    | Chainlink Price Feeds | Convert premiums to stable pricing |

---

## 🌍 Real-World Considerations

- **Localized logic**: Policy timing aligns with crop seasons in Malawi
- **Farmer-first UX**: NFT shows proof of subscription
- **No replanting assumption**: Farmers can't resubscribe immediately after harvest

---

## 📦 Contracts & Interfaces Summary

| Contract        | Purpose                         |
| --------------- | ------------------------------- |
| `PolicyManager` | Core insurance logic            |
| `Treasury`      | Secure fund storage             |
| `PayoutEngine`  | Validate & distribute payouts   |
| `WeatherOracle` | Get & analyze weather data      |
| `PolicyNFT`     | Represent subscriptions as NFTs |

---

## ✅ Next Steps for Development Team

-

---

## 👨‍💻 Maintainer

**Lead Engineer**: Youssef Ahmed\
**Role**: Blockchain Team Lead & Architect\
**Version**: v1.0 – June 2025

---

> This document is intended to guide all contributors and stakeholders through the architecture, flows, and contracts of the Decentralized Weather-Based Crop Insurance System.

