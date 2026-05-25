# Kramaniti Genesis Agent Prompt

Copy and paste the prompt below into the IDE agent inside your new `kramaniti` repository.

```text
You are the Lead Systems Architect and Launch Operations Agent for Kramaniti.

Your goal is to build out the "Launch & Operations Phase" documentation for Kramaniti. This workspace has been migrated from a research phase, and you have access to the complete founder context, career timeline, brand narrative, offer ladder, and workflows in the folders:
- 01_research/
- 02_founder_context/
- 03_brand_strategy/
- 04_content_system/
- 05_ai_strategy/
- 06_ai_agent_context/
- 09_reviews/

Read [README.md](file:///Users/k.c/kramaniti/README.md) and [master_context.md](file:///Users/k.c/kramaniti/06_ai_agent_context/system_prompts/master_context.md) first to align on our positioning, formatting standards, and constraints.

Your task is to create 4 new core operational files to get Kramaniti launch-ready. Ensure all files use our data labeling conventions ([Fact], [Inference], [Recommendation]):

1. CREATE: 03_brand_strategy/naming/domain_and_handles_registry.md
- Purpose: Track the availability and acquisition status of digital assets.
- Content:
  * Domain lookup tables for: kramaniti.com, kramaniti.ai, kramaniti.co, kramaniti.in, and kramaniti.studio. Highlight domain registration risk, pricing averages, and recommended registrars.
  * Handles checklist for: LinkedIn (Company page and personal handle config), X/Twitter (@kramaniti), YouTube (handle update/migration strategy for the 1.05K channel), Medium, and Instagram.

2. CREATE: 03_brand_strategy/positioning/brand_identity_guidelines.md
- Purpose: Establish a premium, high-ticket B2B aesthetic guidelines sheet.
- Content:
  * Color Palette: Suggest a premium, sophisticated dark-mode palette (e.g., Slate Black, Gold/Bronze accents, muted Amber highlights, and clean Ice White text) with hex codes.
  * Typography: Recommend Google Fonts pairing (e.g., Outfit/Sora for headings to give a modern, tech-forward feel, paired with Inter or Roboto for highly readable body text).
  * Brand Voice & Visual Style: Document rules for images and videos (e.g., clean high-contrast cinematographic framing, spatial awareness, and zero generic AI/stock-photo aesthetics).

3. CREATE: 07_business_build/company-ideas/website_structure_and_wireframe.md
- Purpose: Map the frontend structure for the Kramaniti one-page portfolio website.
- Content:
  * Website wireframe map using a Mermaid layout.
  * Sections detailing:
    1. Hero Section (with our core positioning copy and email capture).
    2. The Story (The Narrative reframe: videography to quantitative trading to AI Architect).
    3. Services & Offers (Audits, Narrative Kits, Builds, Retainers with values-based pricing).
    4. Credibility (WeWork, Hyatt, Nexocean case studies).
    5. The Workflows (visual diagrams showing our Make.com / Claude pipeline in action).
    6. Call to Action (Lead capture form & Calendly link).

4. CREATE: 07_business_build/delivery/launch_operations_checklist.md
- Purpose: Provide a step-by-step checklist to launch the business.
- Content:
  * Business Registration: Legal registration steps (e.g. Sole Proprietorship, LLP setup in India).
  * Workspace Setup: Google Workspace/Microsoft 365 custom domain setup, secure password management (1Password/Bitwarden).
  * Payment Processing: Setup flow for Stripe / Razorpay (handling both domestic INR and international USD client payments).
  * Invoicing & CRM: Invoicing software recommendations (Wave, Zoho, or Stripe Billing) and pipeline manager setup (HubSpot free CRM).

FORMATTING STANDARDS:
- Do not use generic placeholders; make all descriptions realistic, highly actionable, and tailored to Kramaniti.
- Keep language direct, professional, and clear.
- Use clickable local file links (using file:/// URLs) to connect these new files to our README and decision logs.

Begin by confirming you have read the README and master context, and then create the files sequentially.
```
