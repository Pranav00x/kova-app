# kova-app

React Native (Expo Router) mobile app for **Kova** — an onchain neobank on Base. This repo is the client: onboarding/KYC, wallet + card UI, vault + savings goals, spend analytics, and the super-app layer (travel, recharges, bills).

## What lives here vs. elsewhere

```mermaid
graph LR
    subgraph kova-app [this repo]
        A[Onboarding / KYC UI]
        B[Home dashboard]
        C[Card screen]
        D[Vault + Savings Goals]
        E[Send / Receive]
        F[Super-app screens]
    end
    subgraph kova-api
        G[Auth, users, wallets]
        H[Card webhooks]
        I[Vault indexing]
    end
    subgraph kova-contracts
        J[KovaVault]
        K[KovaSavingsGoal]
        L[KovaCardSession]
    end

    A --> G
    B --> G
    C --> H
    D --> I
    D --> J
    D --> K
    C --> L
```

## Screen map (Phase 1 target — 15-16 screens per the Master Brief)

```mermaid
flowchart TD
    Welcome --> OTP[Phone/Email OTP Login]
    OTP --> KYC[KYC: doc upload + selfie]
    KYC --> Home[Home Dashboard]
    Home --> Card[Card screen]
    Home --> Vault[Vault screen]
    Home --> Send[Send / Receive]
    Home --> Analytics[Spend Analytics]
    Home --> Settings
    Vault --> Goals[Savings Goals]
    Vault --> SIP[Crypto SIP]
    Home --> SuperApp[Super-app: Travel / Recharge / Bills]
```

## Auth + wallet creation flow (target)

```mermaid
sequenceDiagram
    participant U as User
    participant App as kova-app
    participant API as kova-api
    participant ZD as ZeroDev
    participant Chain as Base

    U->>App: Sign up (phone/email)
    App->>API: Request OTP
    API-->>U: OTP via SMS/email
    U->>App: Enter OTP
    App->>API: Verify OTP
    API-->>App: Session JWT
    App->>ZD: Create ERC-4337 smart account
    ZD->>Chain: Deploy KovaAccount (via factory)
    Chain-->>App: Smart account address
    App->>API: Store wallet address
```

## Stack
- Expo + Expo Router, TypeScript
- Zustand for state
- viem + ZeroDev SDK for onchain interactions (account creation, session keys)
- Tamagui or NativeWind for UI, Reanimated for micro-interactions (per design brief)

## Roadmap (this repo's slice of the Master Brief)

```mermaid
gantt
    dateFormat  YYYY-MM-DD
    title Kova App — Phase 1-3
    section Phase 1 (MVP)
    Onboarding + KYC UI           :p1a, 2026-08-01, 30d
    Home dashboard + wallet       :p1b, after p1a, 20d
    Card screen (virtual)         :p1c, after p1b, 20d
    Vault screen (basic yield)    :p1d, after p1b, 20d
    section Phase 2
    Savings Goals + Crypto SIP    :p2a, after p1d, 30d
    Travel / rail booking UI      :p2b, after p2a, 30d
    section Phase 3
    Bills, OTT, Fastag UI         :p3a, after p2b, 30d
    Kova Black premium screens    :p3b, after p3a, 20d
```

## Getting started
```bash
npm install
npm start
```

## Status
Empty scaffold — screens above are the target, not yet built. See [Immediate next steps](#) below for what's in progress.
