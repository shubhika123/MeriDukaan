# MerchantPilot AI

> **Agentic Merchant Onboarding & Campaign Activation Platform for Offline SMBs**

MerchantPilot AI is an agentic AI platform designed to guide offline SMB (Small & Medium Business) merchants from initial signup and business profiling to campaign strategy formulation, creative generation, channel connection, troubleshooting, and live activation on digital ad platforms.

---

## 🚀 Problem & Solution

### Problem
Offline SMB merchants (gyms, sweet shops, salons, local restaurants, apparel stores) want to advertise on platforms like Facebook & Instagram to grow their customer base. However, they face significant hurdles:
- Uncertainty in setting campaign objectives & targeting.
- Difficulty in creating high-converting ad copy variants.
- Friction in linking Facebook Pages, Instagram profiles, and WhatsApp Business accounts.
- Frustration when technical errors or verification delays occur, causing merchant drop-off.

### Solution
MerchantPilot AI deploys specialized AI agents to autonomously handle each stage of the merchant journey:
1. **Onboarding Agent**: Collects business details conversationally (in English & Hindi) and identifies missing profile fields.
2. **Campaign Strategy Agent**: Translates business parameters into a structured campaign plan (Objective, Audience, Location Radius, Budget, Duration, CTA).
3. **Creative Agent**: Synthesizes 3 ad copy variants (Offer-focused, Trust-focused, Local-focused) with interactive approval, rejection feedback, and regeneration.
4. **Troubleshooting Agent**: Leverages vector RAG knowledge retrieval to diagnose channel connection errors or OTP timeouts, automatically dispatching escalation tickets to human operations when retries fail.
5. **Operations Agent**: Analyzes live activation funnel metrics across the merchant directory to detect friction bottlenecks and recommend interventions.

---

## 📐 System Architecture

```
                                 [ Merchant / Operations UI ]
                                              │
                                              ▼
                                 ┌─────────────────────────┐
                                 │   Agent Orchestrator    │
                                 └────────────┬────────────┘
                                              │
         ┌──────────────────┬─────────────────┼──────────────────┬──────────────────┐
         │                  │                 │                  │                  │
         ▼                  ▼                 ▼                  ▼                  ▼
┌─────────────────┐ ┌────────────────┐ ┌───────────────┐ ┌────────────────┐ ┌────────────────┐
│ Onboarding      │ │ Campaign       │ │ Creative      │ │Troubleshooting │ │ Operations     │
│ Agent           │ │ Strategy Agent │ │ Agent         │ │ Agent (RAG)    │ │ Bottleneck Agt │
└────────┬────────┘ └───────┬────────┘ └───────┬───────┘ └───────┬────────┘ └───────┬────────┘
         │                  │                 │                  │                  │
         └──────────────────┴─────────┬───────┴──────────────────┴──────────────────┘
                                      │
                                      ▼
                        ┌───────────────────────────┐
                        │   Meta Ads Sandbox Tools  │
                        ├───────────────────────────┤
                        │ • check_facebook_conn()   │
                        │ • check_instagram_conn()  │
                        │ • connect_facebook()      │
                        │ • connect_instagram()     │
                        │ • create_campaign_draft() │
                        │ • set_targeting()         │
                        │ • set_budget()            │
                        │ • upload_creative()       │
                        │ • publish_campaign()      │
                        └─────────────┬─────────────┘
                                      │
                                      ▼
                        ┌───────────────────────────┐
                        │  In-Memory State Store    │
                        │  & Human Escalation SLA   │
                        └───────────────────────────┘
```

---

## 🛠️ Specialized AI Agents

| Agent Name | Role & Functionality | Key Tools Executed |
| :--- | :--- | :--- |
| **Agent 1: Onboarding Agent** | Collects business details conversationally; detects missing profile fields; extracts Hinglish/Hindi intents; updates merchant profile. | `get_merchant_profile()`, `update_merchant_profile()`, `validate_business_details()` |
| **Agent 2: Campaign Strategy Agent** | Recommends campaign objective, audience targeting radius, budget allocation, and CTA button based on business type. | `create_campaign_draft()`, `set_targeting()`, `set_budget()` |
| **Agent 3: Creative Agent** | Synthesizes 3 distinct ad variants (Variant A: Offer-focused, Variant B: Trust-focused, Variant C: Local-focused) with Customer Journey Mapping. | `upload_creative()` |
| **Agent 4: Troubleshooting Agent** | Grounded in vector RAG knowledge base. Diagnoses OTP delays, connection errors, or budget limits; triggers escalation tickets after 3 failed retries. | `search_knowledge_base()`, `verify_whatsapp_otp()`, `create_escalation_ticket()` |
| **Agent 5: Operations Agent** | Computes real dropoff percentages on the dataset, identifies activation bottlenecks, and suggests operational fixes. | `analyze_activation_funnel()` |

---

## 🛠️ Meta Ads Sandbox Tools

The system visibly logs tool activity in the UI (`Meta Ads Sandbox` tab & `Agent Console`):
- `check_facebook_connection(merchantId)`
- `check_instagram_connection(merchantId)`
- `connect_facebook(merchantId, pageName)`
- `connect_instagram(merchantId, handle)`
- `create_campaign_draft(merchantId, objective, name)`
- `upload_creative(merchantId, campaignId, creativeId, hookSnippet)`
- `set_targeting(merchantId, campaignId, location, radius, audience)`
- `set_budget(merchantId, campaignId, budget)`
- `publish_campaign(merchantId, campaignId)`
- `get_campaign_status(merchantId, campaignId)`

---

## 📚 RAG Knowledge Base

The Troubleshooting Agent accesses a vector RAG knowledge repository containing documentation on:
- **Meta Ads Setup**: Link Facebook Business Page & Instagram Creator profiles.
- **WhatsApp Verification**: OTP retry thresholds, number unbinding, and 60-second timeouts.
- **Campaign Objectives**: Local SMB guidance for Lead Generation vs. Traffic.
- **Creative Guidelines**: Policy rules on health/fitness claims and before/after photos.
- **Operational Escalation SLA**: 15-minute response SLA for high-priority tickets.

Every response from the Troubleshooting Agent displays grounded source citations (e.g., `Source: WhatsApp Verification Guide (kb-whatsapp-verification)`).

---

## 📊 Agent Evaluation Suite

MerchantPilot AI includes an interactive **Agent Evaluation** page evaluating 20 programmatic scenarios across onboarding, routing, tool selection, troubleshooting, escalation, and RAG grounding.

### Metrics Evaluated
- **Task Success Rate**: % of scenarios completing goal correctly (Target: > 90%).
- **Tool-Call Accuracy**: % of tool invocations matching exact parameters (Target: > 95%).
- **Escalation Accuracy**: Zero false positive human escalations (Target: 100%).
- **Grounded Response Rate**: RAG semantic match against knowledge docs (Target: > 95%).
- **Average Latency**: Response time in milliseconds (~380ms).
- **Token Cost Estimate**: Programmatic cost accounting per scenario execution.

---

## ⚡ 3-5 Minute Scripted Demo Guide (GlowFit Gym)

To test the application end-to-end:
1. Click the prominent **"⚡ Load GlowFit Gym Demo"** button in the top navigation bar.
2. The **Scripted Demo Guide** modal will launch.
3. Follow the 13 step-by-step prompts:
   - Onboarding Agent extracts profile details for GlowFit Gym in Sector 62 Noida.
   - Campaign Strategy Agent generates a Lead Generation strategy (₹5,000 budget).
   - Creative Agent generates 3 ad variants.
   - Reject Variant C -> AI regenerates a hyper-local version.
   - Merchant approves all variants.
   - Facebook connects -> WhatsApp verification times out after 3 retries.
   - Troubleshooting Agent diagnoses via RAG and creates Escalation Ticket **#ESC-1042**.
   - Operations Dashboard updates funnel metrics live!

---

## 🧰 Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Lucide Icons, Canvas-Confetti.
- **Backend**: Next.js API Routes & Server Actions.
- **State & Database**: In-Memory Runtime Store (`lib/db/store.ts`) with pre-seeded demo dataset (8 SMB merchants) and PostgreSQL environment readiness.
- **AI Abstraction**: Provider-agnostic LLM client (`lib/ai/index.ts`) supporting OpenAI/Gemini/Anthropic API keys with zero-downtime intelligent local fallback reasoning.

---

## 🌐 Deployment Instructions (Vercel)

MerchantPilot AI is fully configured for zero-setup deployment to **Vercel**.

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd paytm
```

### Step 2: Install Dependencies & Run Locally
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

### Step 3: Deploy to Vercel
```bash
npx vercel
```
Or connect your GitHub repository directly to Vercel.

#### Environment Variables (Optional)
Set the following in Vercel project settings:
```env
LLM_API_KEY=your_optional_llm_api_key
LLM_MODEL=gpt-4o-mini
```
*(If no API key is provided, the application automatically uses its intelligent local agent engine, ensuring the demo works 100% reliably).*

---

## ⚠️ Limitations & Disclosure

- **Simulated Meta Integration**: All Meta Ads, Facebook Page linking, Instagram auth, and WhatsApp verification API calls run inside the **Meta Ads Sandbox**. They are clearly labeled as simulated integrations to demonstrate tool calling without requiring real OAuth credentials.
- **Simulated Customer-Journey Analytics**: Funnel mapping (Awareness → Interest → Consideration → Trust → Action) represents qualitative AI copy structure analysis, not real measured ad performance statistics.
- **Synthetic Dataset**: Demo merchants (GlowFit Gym, Sharma Sweets, Urban Threads, etc.) are synthetic examples created for demonstration purposes.
