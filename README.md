# Karan Chordia Workspace (KC-HDT-AIS)

Welcome to the canonical operating workspace and knowledge base for the professional transition, branding, content, and AI strategy system of Karan Chordia.

This workspace is designed to be **human-readable** (for founders, clients, and partners) and **AI-agent-ready** (with structured formats, clear identifiers, and semantic files that subagents can digest without noise).

---

## 1. Workspace Structure Map

```
/
├── 00_inbox/                  # Incoming files, client briefs, raw inputs
├── 01_research/               # Base intelligence layer
│   ├── sources/               # Source registries and web logs
│   ├── notes/                 # Research logs and backlog items
│   ├── timeline/              # Online footprint histories
│   ├── footprint/             # Platform exports and scrape transcripts
│   └── archive/               # Historical artifacts
├── 02_founder_context/        # Core founder profiles
│   ├── bio/                   # Executive summaries and narrative bios
│   ├── background/            # Verified history and backgrounder docs
│   ├── skills/                # Core skill clusters and verification levels
│   ├── timeline/              # career timeline files
│   └── gaps/                  # Specific gap assessments
├── 03_brand_strategy/         # Strategic brand layer
│   ├── positioning/           # Competitive analyses, differentiators
│   ├── narrative/             # Brand storytelling copy
│   ├── icp/                   # Ideal Client Profile definitions
│   ├── competitors/           # Competitive landscape research
│   ├── offers/                # Offer ladder, packaging, pricing structures
│   └── naming/                # Rebranding suggestions & evaluation sheets
├── 04_content_system/         # Inbound inbound content engine
│   ├── pillars/               # Core storytelling themes
│   ├── formats/               # Recurring social & video layouts
│   ├── repurposing/           # AI-driven repurposing workflows
│   └── editorial-calendar/    # Production schedules
├── 05_ai_strategy/            # Strategic delivery blueprints
│   ├── services/              # AI audit formats
│   ├── workflows/             # Delivery workflows & sequence diagrams
│   ├── use-cases/             # Client success scenarios
│   ├── automations/           # Internal/External tooling specs
│   └── prompts/               # System and utility prompts
├── 06_ai_agent_context/       # System contexts for autonomous agents
│   ├── system_prompts/        # Master context and prompt guidelines
│   ├── agent_roles/           # Specialized agent definitions (JTBD)
│   ├── operating_rules/       # AI constraints and safety rules
│   ├── memory/                # Long-term state storage
│   └── handoff_docs/          # Handoff protocols
├── 07_business_build/         # Commercial structures
│   ├── company-ideas/         # Corporate model analyses
│   ├── service-packaging/     # Contract shapes & pitch scopes
│   ├── pricing/               # Standardized tier models
│   ├── sales/                 # Discovery questions & scripts
│   └── delivery/              # Onboarding and handover checklists
├── 08_assets/                 # Static media and references
│   ├── logos/                 # Branding vectors
│   ├── references/            # Case studies, raw reference files
│   ├── screenshots/           # UI examples
│   └── exports/               # Exported PDF packages
├── 09_reviews/                # Governance and log records
│   ├── audit-log/             # System change logs
│   ├── decision-log/          # Major design & branding decisions
│   └── next-steps/            # Execution backlogs & handoffs
└── README.md                  # This file
```

---

## 2. Document Conventions & Data Labels

To maintain strict data integrity, every file must clearly label its claims using one of the following prefixes:
*   **`[Fact]`**: Verifiable, publicly documented evidence with source URLs/citations (e.g., specific employment dates, registered domains, published videos).
*   **`[Inference]`**: Logical extensions of facts that are highly probable but not explicitly written (e.g., transitioning to AI due to previous technical/trading adaptabilities).
*   **`[Unverified]`**: Claims that are mentioned in sources but lack secondary verification or direct confirmation (e.g., third-party credits without accessible project logs).
*   **`[Recommendation]`**: Actionable suggestions, strategic choices, or branding steps proposed to guide execution.

---

## 3. File Naming & Style Conventions

1.  **File Naming:** Use snake_case for all markdown files (e.g., `founder_background.md`, `source_registry.md`).
2.  **File Headers:** Every major document should begin with a metadata block detailing its **Purpose**, **Key Findings**, **Evidence**, **Interpretation**, **Implications**, **Open Questions**, and **Next Steps**.
3.  **Cross-Linking:** Use full `file:///` URLs to cross-link related documents within this workspace to enable rapid navigation for agents and editors.
4.  **No Placeholders:** Never use filler text or lorem ipsum. Use realistic examples, structured drafts, or leave as a declared gap in `research_backlog.md`.

---

## 4. How to Update This Workspace

1.  **Founder Feedback:** When the founder clarifies a point (e.g., the Nexocean duration), update the status in `research_log.md` and move the relevant point from `[Unverified]` to `[Fact]` in all context files.
2.  **Audit Trail:** Document the change in `/Users/k.c/KC-HDT-AIS/09_reviews/decision-log/decisions.md`.
3.  **AI Readiness:** Ensure system prompts in `06_ai_agent_context` are synchronized with any changes to service offerings or branding choices.
