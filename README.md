# 💚 MamaVoice — Voice-First AI Maternal Health Companion

[![Nuxt 4](https://img.shields.io/badge/Nuxt-4.x-00DC82?logo=nuxt.js&logoColor=white)](https://nuxt.com)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vuedotjs&logoColor=white)](https://vuejs.org)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-4.x-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Monnify API](https://img.shields.io/badge/Payment-Monnify-0056B3)](https://monnify.com)
[![YarnGPT](https://img.shields.io/badge/TTS-YarnGPT-F43F5E)](https://yarngpt.ai)
[![Live Site](https://img.shields.io/badge/Live%20Site-mamavoice.com.ng-2E7D32?logo=google-chrome&logoColor=white)](https://www.mamavoice.com.ng/)

MamaVoice is a premium, voice-first AI maternal health companion specifically built for mothers and caregivers in Nigerian and African communities. By allowing users to speak and receive guidance in their native language, MamaVoice bridges the literacy and digital divide, delivering vital, culturally relevant health information directly to those who need it most.

🌐 **Live Application Website:** [https://www.mamavoice.com.ng/](https://www.mamavoice.com.ng/)

📱 **Android Mobile App (APK):** [https://drive.google.com/drive/folders/1fQ0mRQxszoZkIJqM8P52P68Zvs8FL5YE?usp=drive_link](https://drive.google.com/drive/folders/1fQ0mRQxszoZkIJqM8P52P68Zvs8FL5YE?usp=drive_link)

🎬 **Demo Video Link:** [https://drive.google.com/drive/folders/1yT9x6QGMaTN_VHY9PFLDw51-kduMNDwQ?usp=drive_link](https://drive.google.com/drive/folders/1yT9x6QGMaTN_VHY9PFLDw51-kduMNDwQ?usp=drive_link)

📊 **Presentation Slides:** [https://drive.google.com/drive/folders/1aQtS_cSqRWsilp6q5-E2c8OMp1bsiRQ_?usp=drive_link](https://drive.google.com/drive/folders/1aQtS_cSqRWsilp6q5-E2c8OMp1bsiRQ_?usp=drive_link)

⚙️ **Authenticated Users Production Backend API:** [https://mama-voice.vercel.app](https://mama-voice.vercel.app)

📂 **Frontend Repository:** [https://github.com/iyanuloluwa-Miracle/mamavoice-web-version](https://github.com/iyanuloluwa-Miracle/mamavoice-web-version)

📂 **Backend Repository:** [https://github.com/Izzy678/mama-voice-backend-hackathon](https://github.com/Izzy678/mama-voice-backend-hackathon)

---

## 🎥 Demo Video
> [!IMPORTANT]
> Watch our project walkthrough demonstrating real-time voice consultations in local dialects, the onboarding flow, and the Monnify donation interface.
> 
> 👉 **[Watch the Demo Video on Google Drive](https://drive.google.com/drive/folders/1yT9x6QGMaTN_VHY9PFLDw51-kduMNDwQ?usp=drive_link)**

---

## 📊 Presentation Slides
> [!NOTE]
> View our project presentation deck detailing the problem statement, architecture, local language AI voice integration, and Monnify donation workflow.
> 
> 👉 **[View Presentation Slides on Google Drive](https://drive.google.com/drive/folders/1aQtS_cSqRWsilp6q5-E2c8OMp1bsiRQ_?usp=drive_link)**

---

## 📱 Native Mobile Application (Android APK)
> [!TIP]
> Our native mobile app is currently in active development to bring seamless voice consultations directly to Android devices. You can download and test the preliminary APK build directly:
> 
> 📲 **[Download MamaVoice Android APK on Google Drive](https://drive.google.com/drive/folders/1fQ0mRQxszoZkIJqM8P52P68Zvs8FL5YE?usp=drive_link)**

---

## 📖 The Problem & Story

### The Problem
* **High Mortality Rates:** Sub-Saharan Africa accounts for a disproportionate percentage of global maternal and infant mortality.
* **Language Barriers:** Most online health portals are text-heavy and written in English, leaving non-English speaking or low-literacy mothers in rural areas underserved.
* **Lack of Indigenous TTS:** Modern phones and web browsers standardly lack text-to-speech engine support for major African languages like Yoruba, Hausa, or Igbo.

### The Solution
MamaVoice serves as a warm, virtual midwife. Mothers can hold natural voice conversations in **Yoruba, Hausa, Igbo, Nigerian Pidgin, or English**. The AI understands local idioms and references culturally relevant nutrition (e.g., advising on *pap / akamu*, *ugu leaves*, *zobo*) while maintaining strict clinical boundary warnings (automatically advising clinical visits for emergencies like heavy bleeding or high fever).

---

## ✨ Key Features

1. **Multilingual Voice-First Interface:** Speak naturally using built-in browser Speech-to-Text (STT) and listen in five languages.
2. **Dual-Backend TTS (Text-to-Speech) System:**
   * **YarnGPT Integration:** Powers natural, native-sounding voices for Yoruba (*"Wura"*), Igbo (*"Chinenye"*), and Hausa (*"Zainab"*).
   * **Browser Speech Synthesis:** Seamlessly fallback to browser engines for English and Pidgin.
3. **Strict Maternal Health Scope:** Powered by Claude AI (Anthropic SDK) with a system prompt that blocks non-health inquiries and guides maternal wellness.
4. **Supporter Donation System (via Monnify):** Supports credit cards and bank transfers to fund TTS voice generation, allowing mothers to use the application free of charge.

---

## 💳 Monnify API Integration Workflow

MamaVoice integrates **Monnify** to handle secure local donations. Since the project uses advanced TTS engines, donation monetization ensures long-term sustainability. Below is the API integration workflow implemented in this application:

```mermaid
sequenceDiagram
    autonumber
    actor Supporter
    participant FE as Frontend (Nuxt Page)
    participant BE as Backend (H3 Event Handler)
    participant DB as Neon Database
    participant MN as Monnify API

    Supporter->>FE: Fill amount & submit
    FE->>BE: POST /api/donate/initialize
    BE->>MN: Fetch auth login token (cached)
    MN-->>BE: Auth Access Token
    BE->>MN: POST /api/v1/.../init-transaction
    MN-->>BE: checkoutUrl & paymentReference
    BE->>DB: Save Pending Donation
    BE-->>FE: Return checkoutUrl
    FE->>Supporter: Redirect to Monnify checkout
    Supporter->>MN: Process payment (Card / Transfer)
    MN-->>FE: Redirect to /donate/callback?paymentReference=...
    FE->>BE: GET /api/donate/verify?paymentReference=...
    BE->>MN: GET /api/v2/.../transactions/query
    MN-->>BE: Return Transaction Status (PAID/FAILED)
    BE->>DB: Update Status to SUCCESS / FAILED
    BE-->>FE: Success / Failure status
    FE-->>Supporter: Display thank you message

    Note over MN,BE: Asynchronous Webhook Backup (in case user exits early)
    MN->>BE: Webhook POST /api/donate/webhook (Header: monnify-signature)
    BE->>BE: Validate SHA-512 signature using MONNIFY_SECRET_KEY
    alt Valid Signature
        BE->>DB: Update Status to SUCCESS / FAILED
        BE-->>MN: HTTP 200 OK
    else Invalid Signature
        BE-->>MN: HTTP 400 Bad Request
    end
```

### Monnify Integration Components
* **Authentication Caching:** Tokens are requested once per hour and cached in memory ([monnify.ts](file:///c:/Users/Iyanu/OneDrive/Desktop/mamavoice-web/server/utils/monnify.ts#L19-L77)) to optimize runtime speed.
* **Robust Webhooks:** The server endpoint ([webhook.post.ts](file:///c:/Users/Iyanu/OneDrive/Desktop/mamavoice-web/server/api/donate/webhook.post.ts)) verifies signatures via HMAC SHA-512 to prevent spoofing.
* **Verification Callback:** The callback route ([verify.get.ts](file:///c:/Users/Iyanu/OneDrive/Desktop/mamavoice-web/server/api/donate/verify.get.ts)) serves as a real-time verification system if webhooks are delayed.

---

## 🛠️ Step-by-Step Local Setup Guide

Follow these steps to configure and run MamaVoice locally:

### 1. Prerequisites
Ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org) (v18.x or later)
* npm, pnpm, or yarn
* A Neon Database (Serverless PostgreSQL) URL

### 2. Clone the Project
```bash
git clone <repository-url>
cd mamavoice-web
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Copy the env template file and populate it with your API credentials:
```bash
cp .env.example .env
```
Open the `.env` file and set the values:
```env
# Anthropic API Key (Claude AI Chat)
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# YarnGPT API Key (Nigerian Languages TTS)
YARNGPT_API_KEY=your_yarngpt_api_key_here

# Neon Database URL (PostgreSQL Connection String)
DATABASE_URL=postgres://username:password@hostname/dbname?sslmode=require

# Monnify API Configuration
MONNIFY_API_KEY=your_monnify_api_key_here
MONNIFY_SECRET_KEY=your_monnify_secret_key_here
MONNIFY_CONTRACT_CODE=your_monnify_contract_code_here
MONNIFY_IS_PROD=false

# Application Settings
NUXT_PUBLIC_API_BASE_URL=https://mama-voice.vercel.app
```
> [!WARNING]
> Never commit your `.env` file to the public source code repository. Keep your keys secret.

### 5. Database Schema Auto-Initialization
MamaVoice uses Neon Serverless SQL. You do **not** need to run any manual database migration scripts. On application startup, the file [db.ts](file:///c:/Users/Iyanu/OneDrive/Desktop/mamavoice-web/server/utils/db.ts#L24-L57) automatically checks if the `donations` table exists and creates it if missing.

### 6. Run the Application
Start the Nuxt local development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### 7. Production Build & Preview
To bundle the project for production deployment:
```bash
npm run build
npm run preview
```

---

## 📂 Codebase Architecture

```
mamavoice-web/
├── app/                  # Frontend Application
│   ├── assets/           # Main styling, Tailwind CSS base, and brand tokens
│   ├── components/       # UI items, onboarding cards, navbar, and footer
│   ├── composables/      # Speech, voice logic, local storage chat persistence
│   ├── layouts/          # Page layouts (landing, chat, default)
│   └── pages/            # Application routes (index, chat, donate, onboarding)
├── server/               # Backend API Engine
│   ├── api/              # Server-side endpoints
│   │   ├── chat.post.ts  # Claude AI chat endpoint with maternal health scoping
│   │   ├── tts.post.ts   # Proxies local language TTS chunks to YarnGPT
│   │   └── donate/       # Monnify endpoints (initialize, verify, webhook)
│   └── utils/            # Shared DB and Monnify helper utilities
├── i18n/                 # Localization files (EN, YO, HA, IG, PCM translation)
├── .env.example          # Environment variable template
└── README.md             # Project documentation
```

---

## 🔐 Security & Clean Coding Practices

* **Zero Exposed Secrets:** No API keys are written in client-side code. All Anthropic, YarnGPT, and Monnify API credentials remain server-side behind secure Nuxt server routes.
* **Input Validation:** Backend endpoints run strict validation schemas for inputs (e.g. validating donation minimum amounts, verifying email structures, and sanitizing prompt logs).
* **Safe Redirect URLs:** Dynamic redirects for payment verification are dynamically constructed from client host headers, supporting scalable staging/production environments automatically.
