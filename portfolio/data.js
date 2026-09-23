// portfolio/data.js
// ─────────────────────────────────────────────────────────────────────────────
// To add a new project: add an entry to PROJECTS below (published: true to show it).
// To add a new category: add an entry to CATEGORIES below.
// No other files need to change.
// ─────────────────────────────────────────────────────────────────────────────

// type: 'automation' groups workflow/integration projects
//       'software'  groups built apps, tools, and libraries
const CATEGORIES = [
  {
    slug: 'gohighlevel',
    label: 'GoHighLevel',
    color: '#f97316',
    bg: 'rgba(249,115,22,0.08)',
    description: 'CRM pipelines, workflows, funnels and lead automation',
    type: 'automation',
  },
  {
    slug: 'n8n',
    label: 'n8n',
    color: '#e11d48',
    bg: 'rgba(225,29,72,0.07)',
    description: 'Self-hosted workflow automation and API integrations',
    type: 'automation',
  },
  {
    slug: 'aws-lambda',
    label: 'AWS Lambda',
    color: '#d97706',
    bg: 'rgba(217,119,6,0.08)',
    description: 'Serverless functions, event-driven processing',
    type: 'automation',
  },
  {
    slug: 'power-automate',
    label: 'Power Automate',
    color: '#0078d4',
    bg: 'rgba(0,120,212,0.07)',
    description: 'Microsoft 365 flows and business process automation',
    type: 'automation',
  },
  {
    slug: 'web-app',
    label: 'Web App',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.07)',
    description: 'Full-stack web applications built with Next.js, React, and PostgreSQL',
    type: 'software',
  },
  {
    slug: 'desktop',
    label: 'Desktop',
    color: '#0891b2',
    bg: 'rgba(8,145,178,0.07)',
    description: 'Native desktop applications for Windows and macOS',
    type: 'software',
  },
  {
    slug: 'python',
    label: 'Python',
    color: '#2563eb',
    bg: 'rgba(37,99,235,0.07)',
    description: 'Python tools, libraries, and automation scripts',
    type: 'software',
  },
  {
    slug: 'jira-forge',
    label: 'Atlassian Forge',
    color: '#0052CC',
    bg: 'rgba(0,82,204,0.07)',
    description: 'Jira and Confluence apps built on Atlassian Forge',
    type: 'software',
  },
];

const PROJECTS = [
  // ── GoHighLevel ─────────────────────────────────────────────────────────────
  {
    title: "Contractor Lead Capture & Speed-to-Lead System",
    slug: "ghl-contractor-lead-system",
    category: "gohighlevel",
    tags: ["crm", "lead-routing", "lead-scoring", "workflows", "funnels", "appointments", "compliance"],
    summary: "End-to-end GoHighLevel build for a roofing & HVAC contractor: lead capture, automated scoring and routing, speed-to-lead follow-up, appointment handling and reply alerts.",
    role: "Design & build (solo)",
    tools: ["GoHighLevel", "Workflows", "Funnels", "Forms", "Calendars", "Pipelines", "Custom Fields", "Custom Values"],
    status: "Completed",
    published: true,
    featured: true,
    cover: "img/ghl-contractor-lead-system/cover.png", // workflows list view
    date: "Sep 2026",

    note: "Portfolio/demo sub-account with fictional business data.",

    overview: `Demo build for a fictional contractor, <strong>Summit Roofing &amp; HVAC (Beverly Hills, CA)</strong>. Home-service leads go cold within minutes — the goal was a system that captures leads, scores and routes them instantly, follows up automatically until they book, and alerts sales at the right moments. Designed around how lead delivery works in the home-services lead generation industry.`,

    architectureMermaid: `flowchart TD
    LP[Landing Page Funnel] --> F[Form: Free Estimate Request]
    CAL[Calendar: Free Estimate Visit] -->|booking| A2C
    F --> A1[A1 – Intake & Routing]
    A1 -->|score, tags, opportunity| P1[(Pipeline: Residential Sales)]
    A1 -->|just researching| P2[(Pipeline: Nurture)]
    A1 -->|not booked| A2[A2 – Speed-to-Lead Follow-up]
    A2 -->|no response after 7 days| P2
    A2 -. lead replies .-> A2B[A2b – Customer Replied]
    A2 -. lead books .-> A2C[A2c – Appointment Booked]
    A2B -->|stage: Contacted + alert| P1
    A2C -->|stage: Estimate Scheduled + reminders| P1`,

    components: [
      {
        id: "custom-fields",
        title: "Custom Fields",
        subtitle: 'Contact · folder "Lead Details"',
        type: "table",
        headers: ["Field", "Type", "Purpose"],
        rows: [
          ["Service Type", "Dropdown", "Roof Repair, Roof Replacement, AC Repair, HVAC Install – routing & tagging"],
          ["Project Urgency", "Dropdown", "Emergency, Within 2 weeks, Within 1–3 months, Just researching – scoring & nurture routing"],
          ["Property Type", "Dropdown", "Single Family, Townhouse, Commercial"],
          ["Homeowner", "Radio", "Yes / No"],
          ["Lead Source Detail", "Single line", "Set by automation (form name or vendor + ID)"],
          ["Lead Score", "Number", "0–100, calculated by workflow"],
          ["Vendor Lead ID", "Single line", "For external vendor leads (dedup & reconciliation)"],
        ],
        note: "Standard Postal Code field reused instead of creating a duplicate ZIP field.",
      },
      {
        id: "tags",
        title: "Tags",
        type: "text",
        content: `Prefixed naming convention with categories:<br>
          <code>src:website</code> <code>src:vendor</code> <code>vendor:homeleadspro</code>
          <code>svc:roofing</code> <code>svc:hvac</code> <code>status:hot</code>
          <code>status:responded</code> <code>status:nurture</code> <code>appt:booked</code>
          <code>opp:sales</code> <code>data:incomplete</code>`,
      },
      {
        id: "pipelines",
        title: "Pipelines",
        type: "list",
        items: [
          "<strong>Residential Sales:</strong> New Lead (10%) → Contacted (25%) → Estimate Scheduled (50%) → Estimate Completed (70%) → Proposal Sent (85%)",
          "<strong>Nurture:</strong> New (5%) → Engaged (15%) → Re-activated (30%)",
          "Won/Lost handled with opportunity <strong>status</strong>, not as stages, to keep conversion reporting accurate.",
        ],
      },
      {
        id: "assets",
        title: "Assets",
        type: "list",
        items: [
          "Landing page funnel (Offer → Appointment → Thank You)",
          'Form "Free Estimate Request" with A2P-compliant, optional (unchecked) SMS consent checkboxes',
          'Calendar "Free Estimate Visit": 60-min slots, 30-min travel buffer, 4-hour minimum notice, max 6/day, form embedded with date/time first',
          "Custom Value <code>Booking Link</code> reused across all messages",
        ],
      },
    ],

    workflows: [
      {
        id: "A1",
        name: "New Lead Intake & Routing",
        trigger: "Form Submitted (Free Estimate Request)",
        steps: [
          "Tags source, sets Lead Source Detail, resets Lead Score to 0",
          "Branches by service type → applies <code>svc:roofing</code> or <code>svc:hvac</code> tags",
          "Lead scoring with Math Operation actions: Emergency +50, Within 2 weeks +30, Homeowner +20, Commercial +10",
          "\"Just researching\" → opportunity in Nurture pipeline, then exits",
          "Sales-ready → opportunity in Residential Sales / New Lead, assign owner (only if unassigned)",
          "Score ≥ 70 → adds <code>status:hot</code> + instant email alert to assigned rep",
          "Waits 2 min, checks <code>appt:booked</code> tag — if absent → enrolls in A2",
          "Branches re-converge with Go To actions (no duplicated logic)",
        ],
      },
      {
        id: "A2",
        name: "Speed-to-Lead Follow-up",
        badge: "7-day sequence",
        trigger: "Enrolled by A1 when lead has not yet booked",
        steps: [
          "Immediate: SMS + email with booking link, call task for rep at +5 min",
          "Day 1: follow-up SMS",
          "Day 3: social-proof email",
          "Day 7: \"breakup\" SMS + email",
          "Day 8: finds open sales opportunity → marks Lost (\"No response\") → moves lead to Nurture pipeline",
          "Stop-on-reply enabled. Send window: Mon–Sat 8 AM–8 PM (TCPA quiet hours).",
        ],
      },
      {
        id: "A2b",
        name: "Customer Replied",
        trigger: "Customer Replied (conversation event)",
        steps: [
          "Adds <code>status:responded</code> tag",
          "Finds open sales opportunity → moves to Contacted (no backward movement if already further along)",
          "Alerts the assigned rep",
          "Re-entry disabled to prevent alert spam within one conversation",
        ],
      },
      {
        id: "A2c",
        name: "Appointment Booked",
        trigger: "Customer Booked Appointment (Free Estimate Visit)",
        steps: [
          "Adds <code>appt:booked</code> tag, removes contact from A2 sequence",
          "Finds open sales opportunity → moves to Estimate Scheduled; if none exists, creates it there",
          "Alerts the assigned rep",
          "Reminders: 24h before (email + SMS) and 2h before (SMS), timed from appointment start",
        ],
      },
    ],

    designDecisions: [
      {
        title: "Race condition between triggers",
        body: "A calendar booking fires both \"Form Submitted\" and \"Appointment Booked\" nearly simultaneously. A1 waits 2 minutes and checks <code>appt:booked</code> before starting follow-up, so booked leads never receive \"please book\" messages.",
      },
      {
        title: "Lead score not accumulating",
        body: "Execution logs showed Math Operation actions ran but the result wasn't persisted. Fixed by mapping each operation's output explicitly back to the Lead Score custom field.",
      },
      {
        title: "Inverted condition bug",
        body: "An If/Else branch was set to \"is not Emergency\", which would have scored the wrong leads. Caught during test execution and corrected.",
      },
      {
        title: "Deprecated actions",
        body: "GHL is deprecating Create/Update Opportunity. The build uses the new Create Opportunity, Find Opportunity, and Update Opportunity actions throughout.",
      },
      {
        title: "Update Opportunity needs context",
        body: "With a non-opportunity trigger, Update Opportunity does nothing unless a Find Opportunity step runs first. Initially solved with a tag as a state flag; refactored to Find Opportunity (status = Open), which checks real opportunity state so closed/lost deals don't block a new one.",
      },
      {
        title: "Contact deduplication during tests",
        body: "Submissions updated the same contact due to GHL's email/phone dedup and the form's sticky-contact cookie. Correct production behavior — testing used unique phone numbers and incognito sessions.",
      },
      {
        title: "Compliance",
        body: "Optional SMS consent checkboxes (unchecked by default), STOP opt-out text in every SMS, quiet-hours send window enforced. US SMS requires A2P 10DLC registration.",
      },
      {
        title: "Maintainability",
        body: "Descriptive action names throughout, Go To convergence instead of duplicated branches, Custom Values for all links, prefixed tags with categories.",
      },
    ],

    testing: {
      description: "A1 validated end-to-end with three test leads (hot, warm, nurture): tags, Lead Score, pipeline/stage and rep alerts checked against expected results and verified in execution logs.<br><strong>A2, A2b and A2c are built and published; end-to-end testing pending.</strong>",
      table: {
        headers: ["Test", "Input", "Expected"],
        rows: [
          ["Hot", "Roof Repair · Emergency · Single Family · Homeowner", "Score 70 · <code>status:hot</code> · Residential Sales / New Lead · rep alert"],
          ["Warm", "AC Repair · Within 2 weeks · Commercial · Not homeowner", "Score 40 · Residential Sales / New Lead · no alert"],
          ["Nurture", "HVAC Install · Just researching · Townhouse · Homeowner", "Score 20 · Nurture / New"],
        ],
      },
    },

    nextSteps: [
      "External lead vendor integration: inbound webhook + n8n ingestion pipeline with logging and failure alerts (Project B)",
      "Round-robin assignment by service type (roofing vs HVAC reps)",
      "Post-job review request workflow",
      "Export the whole setup as a GHL Snapshot",
    ],

    images: [
      { src: "img/ghl-contractor-lead-system/a1-workflow.webp", alt: "A1 – New Lead Intake & Routing workflow canvas (full view at 29% zoom)" },
      { src: "img/ghl-contractor-lead-system/custom-fields.png", alt: "Custom fields – Lead Details folder showing all 7 fields" },
      { src: "img/ghl-contractor-lead-system/form.png", alt: "Free Estimate Request form with A2P-compliant SMS consent checkboxes" },
      { src: "img/ghl-contractor-lead-system/tags.png", alt: "Tags list with prefixed naming convention and categories" },
      { src: "img/ghl-contractor-lead-system/pipelines.png", alt: "Residential Sales and Nurture pipeline boards" },
      { src: "img/ghl-contractor-lead-system/landing-page.png", alt: "Landing page funnel – desktop view" },
      { src: "img/ghl-contractor-lead-system/calendar-settings.png", alt: "Free Estimate Visit calendar settings" },
      { src: "img/ghl-contractor-lead-system/a2-workflow.png", alt: "A2 – Speed-to-Lead Follow-up workflow canvas" },
      { src: "img/ghl-contractor-lead-system/a2b-workflow.png", alt: "A2b – Customer Replied workflow canvas" },
      { src: "img/ghl-contractor-lead-system/a2c-workflow.png", alt: "A2c – Appointment Booked workflow canvas" },
      { src: "img/ghl-contractor-lead-system/a1-execution-log-hot.png", alt: "A1 execution log – hot lead test" },
      { src: "img/ghl-contractor-lead-system/a1-execution-log-warm.png", alt: "A1 execution log – warm lead test" },
      { src: "img/ghl-contractor-lead-system/a1-execution-log-nurture.png", alt: "A1 execution log – nurture lead test" },
      { src: "img/ghl-contractor-lead-system/opportunities-board.png", alt: "Opportunities board after test runs" },
    ],

  },

  // ── n8n (placeholder, unpublished) ──────────────────────────────────────────
  {
    title: "Wazuh Active Response Alerting Pipeline",
    slug: "n8n-wazuh-alerting",
    category: "n8n",
    tags: ["siem", "alerting", "microsoft-teams", "postgresql", "webhooks"],
    summary: "n8n pipeline that ingests Wazuh active response events, enriches them via PostgreSQL lookups, deduplicates alerts, and posts structured notifications to Microsoft Teams.",
    role: "Design & build (solo)",
    tools: ["n8n", "PostgreSQL", "Microsoft Teams", "Wazuh", "Webhooks"],
    status: "In progress",
    published: false,
    featured: false,
    cover: null,
    date: "2026",
  },

  // ── AWS Lambda (placeholder, unpublished) ────────────────────────────────────
  {
    title: "Serverless Lead Enrichment",
    slug: "aws-lambda-lead-enrichment",
    category: "aws-lambda",
    tags: ["lambda", "api-gateway", "lead-enrichment", "serverless", "python"],
    summary: "AWS Lambda function triggered via API Gateway that enriches inbound leads with reverse phone/address lookups before inserting into a CRM pipeline.",
    role: "Design & build (solo)",
    tools: ["AWS Lambda", "API Gateway", "Python", "DynamoDB"],
    status: "Planned",
    published: false,
    featured: false,
    cover: null,
    date: "2026",
  },

  // ── Power Automate (placeholder, unpublished) ────────────────────────────────
  {
    title: "Employee Onboarding Flow",
    slug: "power-automate-onboarding",
    category: "power-automate",
    tags: ["microsoft-365", "sharepoint", "teams", "onboarding", "approval-flows"],
    summary: "Power Automate flow that orchestrates end-to-end employee onboarding: provisioning tasks, approval gates, SharePoint document library setup, and Teams welcome message.",
    role: "Design & build (solo)",
    tools: ["Power Automate", "Microsoft 365", "SharePoint", "Teams", "Approvals"],
    status: "Planned",
    published: false,
    featured: false,
    cover: null,
    date: "2026",
  },

  // ── AWS Lambda — Homebuddy Teams Bot ────────────────────────────────────────
  {
    title: "Homebuddy Integrations Bot",
    slug: "homebuddy-integrations-bot",
    category: "aws-lambda",
    tags: ["rag", "aws-bedrock", "teams-bot", "knowledge-base", "amazon-nova", "embeddings"],
    summary: "AWS Lambda–powered Microsoft Teams bot that answers natural-language questions from Partnership Managers about CRM integration setup and troubleshooting, using a RAG pipeline over a Confluence-derived knowledge base.",
    role: "Design & build (solo)",
    tools: ["AWS Lambda", "Amazon Bedrock", "Amazon Nova Pro", "Titan Embeddings v2", "S3", "Microsoft Teams", "Node.js"],
    status: "Completed",
    published: true,
    featured: false,
    cover: "img/homebuddy-integrations-bot/cover.png",
    date: "Aug 2026",

    overview: `Internal AI assistant built for HomeBuddy's Partnership Managers. PMs ask natural-language questions — integration setup steps, lead-field placeholders, troubleshooting — and the bot retrieves the most relevant chunks from a Confluence-derived knowledge base stored in S3, runs them through Amazon Nova Pro via Bedrock, and posts a concise reply back in the Teams thread. Deployed as an AWS Lambda function behind a Teams Outgoing Webhook.`,

    architectureMermaid: `flowchart TD
    PM[Partnership Manager] -->|question in Teams| TW[Teams Outgoing Webhook]
    TW -->|HMAC-validated POST| L[AWS Lambda Handler]
    L --> CL[Question Classifier]
    CL -->|integration / faq / placeholder| R[RAG Pipeline]
    CL -->|disambiguation| DA[Disambiguation Flow]
    CL -->|greeting / silent| SR[Short Reply]
    R --> EMB[Titan Text Embeddings v2]
    EMB --> S3[(S3 Knowledge Base)]
    S3 --> RR[Optional Cohere Rerank]
    RR --> GEN[Amazon Nova Pro — Generation]
    GEN -->|reply| L
    L -->|thread reply| PM
    L --> HIST[(S3 Conversation History)]
    L --> FB[(S3 Feedback Store)]`,

    components: [
      {
        id: "classifier",
        title: "Question Classifier",
        type: "list",
        items: [
          "<strong>integration</strong> — CRM setup and auth steps (HubSpot, Salesforce, Phonexa, etc.)",
          "<strong>faq</strong> — General HomeBuddy process questions",
          "<strong>placeholder</strong> — Lead field placeholder lookups with synonym matching",
          "<strong>disambiguation</strong> — Multiple auth templates for one CRM: bot asks which applies before answering",
          "<strong>greeting / silent</strong> — Short canned replies; no Bedrock call",
        ],
      },
      {
        id: "rag",
        title: "RAG Pipeline",
        type: "list",
        items: [
          "Cosine similarity search over Titan Text Embeddings v2 index stored in S3",
          "Hybrid keyword/metadata boost for named CRM integrations",
          "Optional Bedrock Agent Runtime cross-encoder (Cohere Rerank) for reranking",
          "60-second deduplication window drops duplicate Teams webhook deliveries",
          "Per-channel thread-map in S3 ensures correct <code>replyToId</code> even when Teams omits it",
        ],
      },
      {
        id: "memory",
        title: "Memory & Feedback",
        type: "list",
        items: [
          "2-hour session TTL with rolling conversation history (last 4 turns) in S3",
          "PM feedback commands: <code>feedback: question | {{placeholder}}</code> and <code>!feedback: free text</code> — corrections written back to S3",
          "Feedback store used for future retrieval override and few-shot examples",
          "Escalation webhook (Teams MessageCard) fires on unanswered questions",
          "<code>--echo</code> debug flag shows retrieval diagnostics to authorized PMs only",
        ],
      },
    ],

    designDecisions: [
      {
        title: "Deterministic classifier before LLM",
        body: "Routing by question type (integration / faq / placeholder / disambiguation / greeting) keeps Bedrock calls only for questions that actually need generation. Greetings and silent messages never hit the model.",
      },
      {
        title: "Thread-map workaround",
        body: "Teams Outgoing Webhooks sometimes omit <code>replyToId</code>, causing replies to land as new threads. A per-channel thread-map in S3 fixes this by storing the correct thread ID from the first message.",
      },
      {
        title: "Feedback loop as retrieval override",
        body: "When a PM corrects a wrong answer, the feedback is written to S3 and used to override retrieval for the same question pattern in future calls — without retraining or rebuilding the index.",
      },
      {
        title: "Disambiguation before generation",
        body: "When a CRM has multiple auth templates (OAuth vs. API key vs. org ID), the bot asks the PM which applies before generating setup steps. This eliminated a class of wrong-template answers.",
      },
    ],

    nextSteps: [
      "Rebuild knowledge base index from live Confluence via Confluence API (currently Confluence-derived manual export)",
      "Add intent confidence threshold — low-confidence queries go to escalation instead of generation",
      "Expose feedback dashboard to team leads for QA review",
    ],
  },

  // ── Power Automate — Wazuh AR Migration ─────────────────────────────────────
  {
    title: "Wazuh Active Response Alerting — n8n to Power Automate Migration",
    slug: "wazuh-ar-power-automate",
    category: "power-automate",
    tags: ["wazuh", "siem", "active-response", "aws-bedrock", "claude", "teams", "sharepoint", "ai-triage"],
    summary: "Migrates a Wazuh Active Response alerting pipeline from n8n + PostgreSQL to Power Automate + SharePoint, with an AWS Lambda + Claude Haiku triage layer that analyzes escalated events and posts Adaptive Card decisions to a Microsoft Teams SOC channel.",
    role: "Design & build (solo)",
    tools: ["Power Automate", "AWS Lambda", "Amazon Bedrock", "Claude Haiku 4.5", "SharePoint Online", "Microsoft Teams", "AbuseIPDB", "Python"],
    status: "Completed",
    published: false,
    featured: false,
    cover: null,
    date: "Sep 2026",

    overview: `Full migration of the Wazuh Active Response alerting pipeline from a self-hosted n8n + PostgreSQL stack to Microsoft Power Automate with SharePoint as the datastore — eliminating self-hosted infrastructure while adding an AI triage layer. When Wazuh fires an Active Response event, the Power Automate flow parses the alert, applies deterministic escalation rules, and routes ~1–5% of events to an AWS Lambda function that invokes Claude Haiku via Amazon Bedrock for a structured triage verdict. The result is posted to a Microsoft Teams SOC channel as an Adaptive Card with approve / false-positive / escalate action buttons.`,

    architectureMermaid: `flowchart TD
    W[Wazuh Manager] -->|Active Response event| PA[Power Automate HTTP Trigger]
    PA --> PARSE[Parse & normalize alert]
    PARSE --> RULES{Deterministic escalation\\n6 conditions}
    RULES -->|no escalation| LOG[(SharePoint: AR_Alerts_Log)]
    RULES -->|escalate| CACHE{AI verdict\\ncached?}
    CACHE -->|hit — 60 min TTL| CARD
    CACHE -->|miss| LM[AWS Lambda]
    LM --> IP[AbuseIPDB enrichment]
    LM --> BED[Amazon Bedrock\\nClaude Haiku 4.5]
    BED -->|structured verdict| GUARD[Code-side guardrails]
    GUARD --> CARD[Teams Adaptive Card\\napprove / FP / escalate]
    CARD -->|analyst action| DEC[(SharePoint: AR_Decisions)]
    CARD -->|false-positive| AL[(SharePoint: AR_Allowlist)]`,

    components: [
      {
        id: "sharepoint-lists",
        title: "SharePoint Lists (replacing PostgreSQL)",
        type: "table",
        headers: ["List", "Purpose"],
        rows: [
          ["AR_Alerts_Log", "All incoming Wazuh events with parse metadata"],
          ["AR_Allowlist", "IPs and users cleared as false positives by analysts"],
          ["AR_Decisions", "Analyst verdicts — feeds future few-shot examples for the model"],
        ],
      },
      {
        id: "escalation-rules",
        title: "Deterministic Escalation Rules",
        type: "list",
        items: [
          "6 conditions evaluated before any AI call — only matches reach Bedrock",
          "Private IPs, missing users, low-reputation scores, and non-IP-block actions are blocked by code-side guardrails even if the model disagrees",
          "60-minute per-<code>group_key</code> AI verdict cache — zero extra Bedrock calls for repeat attackers",
        ],
      },
      {
        id: "ai-layer",
        title: "AI Triage Layer",
        type: "list",
        items: [
          "AWS Lambda (Python 3.12, arm64) invoked by Power Automate HTTP action",
          "Only aggregated statistics reach Claude — no raw log data (prompt-injection guardrail)",
          "Output is a validated closed-enum action: <code>block</code>, <code>monitor</code>, <code>false_positive</code>, or <code>escalate_human</code>",
          "Graceful AI fallback to <code>escalate_human</code> on Bedrock timeout or throttle — no alert is lost",
          "AbuseIPDB IP reputation enrichment as optional pre-filter",
        ],
      },
    ],

    designDecisions: [
      {
        title: "Deterministic pre-filter before AI",
        body: "6 escalation conditions keep AI cost to ~1–5% of total events. The model only sees events that passed all rules, so the prompt never contains noise.",
      },
      {
        title: "Prompt-injection guardrails",
        body: "Only aggregated statistics (counts, ratios, IP reputation scores) reach the model. Raw log data and user-controlled strings are never included in the prompt.",
      },
      {
        title: "Feedback loop into future triage",
        body: "Analyst false-positive actions populate <code>AR_Allowlist</code>. <code>AR_Decisions</code> accumulates verdicts that serve as few-shot examples in future Bedrock calls, improving accuracy over time.",
      },
      {
        title: "Migration: parallel-run phase",
        body: "The migration plan includes a parallel-run phase where both n8n and Power Automate process events for 1–2 weeks, with outputs compared before decommissioning n8n.",
      },
      {
        title: "SQL injection fix during migration",
        body: "The original n8n pipeline had a SQL injection risk in a Code node building raw queries. Replaced with parameterized SharePoint OData filters in Power Automate.",
      },
    ],

    nextSteps: [
      "Deploy to production and run parallel phase against live n8n pipeline",
      "Populate AR_Decisions with 20+ labelled examples to activate few-shot prompting",
      "Add weekly digest report: top blocked IPs, FP rate, AI vs. analyst agreement rate",
      "Decommission self-hosted n8n and PostgreSQL after validation period",
    ],
  },

  // ── Web App — AI Detector ────────────────────────────────────────────────────
  {
    title: "AI Content Detector",
    slug: "ai-detector",
    category: "web-app",
    tags: ["claude", "ai-detection", "pdf", "docx", "next-js", "prompt-caching"],
    summary: "Web app that detects AI-generated text in PDF and DOCX documents. Breaks the document into segments, scores each one with Claude Sonnet, and generates per-segment rewrite recommendations with a full exportable PDF report.",
    role: "Design & build (solo)",
    tools: ["Next.js", "React", "TypeScript", "Claude Sonnet 4.6", "Anthropic SDK", "pdf-parse", "mammoth", "jsPDF", "Docker"],
    status: "Completed",
    published: false,
    featured: false,
    cover: null,
    date: "Apr 2026",

    overview: `Spanish-language web app for analyzing academic and professional documents for AI-generated content. Users upload a PDF or DOCX (up to 20 MB), optionally provide context (e.g., "undergraduate thesis on climate change"), and get per-segment AI probability scores (0–100%) from Claude Sonnet 4.6, color-coded green/amber/red, with Spanish-language rewrite recommendations for flagged segments. Results export as a styled PDF report. No document storage — everything is processed in-memory.`,

    components: [
      {
        id: "pipeline",
        title: "Analysis Pipeline",
        type: "list",
        items: [
          "Drag-and-drop file upload for PDF and DOCX (up to 20 MB)",
          "Two-phase pipeline: text extraction API route → Claude analysis API route",
          "Prompt caching on the system prompt for cost and latency efficiency",
          "Per-segment AI probability score (0–100%) with color-coded results",
          "Document-level global summary and per-segment Spanish rewrite recommendations",
        ],
      },
      {
        id: "ui",
        title: "UI & Export",
        type: "list",
        items: [
          "Animated score gauge and progress bar during analysis",
          "Filterable segment view: All / AI-flagged / Human",
          "Dedicated Recommendations tab for rewrite suggestions",
          "Exportable PDF report with dark theme (jsPDF + html2canvas)",
          "No document storage — zero persistence, privacy-first",
        ],
      },
    ],

    nextSteps: [
      "Add English-language mode",
      "Support plain text and Google Docs URL as input sources",
      "Add batch processing for multiple documents",
    ],
  },

  // ── Web App — IdeaCreativa ───────────────────────────────────────────────────
  {
    title: "Idea Creativa — Business Management System",
    slug: "idea-creativa",
    category: "web-app",
    tags: ["next-js", "postgresql", "prisma", "aws-s3", "pdf-generation", "crm", "inventory"],
    summary: "Full-stack business management web app for a creative print studio: client management, quote lifecycle with PDF export, job/work-order tracking, inventory with movement history, and a public quote request page.",
    role: "Design & build (solo)",
    tools: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "Tailwind CSS", "AWS S3", "React PDF Renderer", "Docker"],
    status: "In progress",
    published: false,
    featured: false,
    cover: null,
    date: "Sep 2026",

    overview: `Full-stack business management system built for <strong>Idea Creativa</strong>, a Panamanian creative design and printing studio. Covers the full operational workflow from the admin panel: client management, service catalog, quote generation (with PDF export and a public web request form), job/work-order tracking, inventory management with movement history, a portfolio gallery, and a hero slider — all behind role-based authentication.`,

    components: [
      {
        id: "modules",
        title: "Modules",
        type: "table",
        headers: ["Module", "Key features"],
        rows: [
          ["Clients", "Full CRUD, contact history"],
          ["Quotes", "Draft → Pending → Sent → Approved/Rejected/Expired lifecycle, PDF generation, printable view"],
          ["Jobs / Work orders", "Quote-to-job conversion, status tracking, assigned operario"],
          ["Inventory", "Stock entries/exits/adjustments, movement history, low-stock alerts"],
          ["Gallery", "Portfolio images uploaded to AWS S3"],
          ["Public form", "Unauthenticated visitors submit quote requests from the website"],
        ],
      },
      {
        id: "auth",
        title: "Auth & Roles",
        type: "list",
        items: [
          "<strong>ADMIN</strong> — full access to all modules and settings",
          "<strong>VENDEDOR</strong> — clients, quotes, jobs; no inventory settings",
          "<strong>OPERARIO</strong> — view and update assigned jobs only",
        ],
      },
    ],

    nextSteps: [
      "Email notifications on quote approval/rejection",
      "Client portal for viewing quote status without logging in",
      "Reporting dashboard: revenue by service, monthly quote conversion rate",
    ],
  },

  // ── Web App — VidriosYVentanasW ──────────────────────────────────────────────
  {
    title: "Vidrios & Ventanas — Business Management System",
    slug: "vidrios-ventanas",
    category: "web-app",
    tags: ["next-js", "postgresql", "prisma", "aws-s3", "pdf-generation", "quotes", "telegram"],
    summary: "Full-stack business management web app for a glass and windows company: client CRM, product catalog with custom types, quote workflow with optional tax and PDF export, and a public customer quote request page with Telegram integration.",
    role: "Design & build (solo)",
    tools: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "Tailwind CSS", "AWS S3", "jsPDF", "Recharts", "Telegram API"],
    status: "In progress",
    published: false,
    featured: false,
    cover: null,
    date: "Apr 2026",

    overview: `Full-stack business management system for a glass and windows (vidrios y ventanas) company in Panama. Handles the complete sales workflow: client management, a product catalog supporting fixed and custom product types, quote creation with line items and optional tax percentage, and a public <code>/cotizar</code> page where customers submit requests. Quotes print as formatted PDFs with product SVG diagrams. A Telegram integration surfaces incoming customer requests to the sales team.`,

    components: [
      {
        id: "quote-flow",
        title: "Quote Workflow",
        type: "list",
        items: [
          "Status lifecycle: Draft → Sent → Accepted / Declined",
          "Line-item quotes with fixed products or custom product definitions",
          "Optional tax percentage per quote (configurable, not hardcoded)",
          "Print-optimized PDF layout with product SVG diagrams",
          "Public <code>/cotizar</code> page — unauthenticated customer submissions",
        ],
      },
      {
        id: "other",
        title: "Other Features",
        type: "list",
        items: [
          "Role-based auth: ADMIN vs. VENDEDOR",
          "Product gallery with S3-backed image management",
          "Dashboard with Recharts charts (revenue, quote volume)",
          "Telegram session integration for routing incoming customer requests",
        ],
      },
    ],
  },

  // ── Jira Forge — Quinstreet Dashboard ───────────────────────────────────────
  {
    title: "Operational Dashboard — Jira Forge App",
    slug: "quinstreet-jira-dashboard",
    category: "jira-forge",
    tags: ["atlassian-forge", "jira", "kpi", "charts", "sla", "typescript", "async-queue", "forge-kvs", "forge-events", "semgrep", "jest"],
    summary: "Production Jira Cloud app I designed and built end-to-end for an internal IT/Security service desk. Live operational KPIs — SLA compliance, backlog aging, team workload, escalations — rendered natively inside Jira with a rule-based focus-area engine, configurable thresholds, and a background async compute path that works around Forge's 25-second function limit.",
    role: "Design & build (solo)",
    tools: ["Atlassian Forge", "TypeScript", "@forge/resolver", "@forge/kvs", "@forge/events", "Jira REST API", "Jest / ts-jest", "ESLint", "Semgrep"],
    status: "Completed",
    published: true,
    featured: false,
    cover: "img/quinstreet-jira-dashboard/cover.png",
    date: "Sep 2026",

    note: "Built for internal use at HomeBuddy (Quinstreet). Deployed to Atlassian Forge infrastructure.",

    overview: `Native Jira Cloud app built on Atlassian Forge (UI Kit) for the internal INFOSEC, CT, and ATLAS service-desk teams. Replaces ad-hoc JQL searches and manual reporting with a live operations dashboard rendered directly in Jira's own navigation — no export, no separate BI tool. Fully configurable per project (field mappings, SLA thresholds, status names, aging buckets) without a redeploy. A rule-based "suggested focus areas" panel flags out-of-range metrics without calling an LLM.`,

    components: [
      {
        id: "metrics",
        title: "Metrics & Filters",
        type: "table",
        headers: ["Metric / Feature", "Detail"],
        rows: [
          ["SLA compliance & breach rate", "RAG stat card + donut chart; threshold configurable per project"],
          ["First-response & resolution time", "Reads native SLA field when configured; falls back to first-comment timestamp"],
          ["Reopen rate", "RAG stat card; flags rework patterns"],
          ["Ticket volume by priority", "Horizontal bar chart"],
          ["Backlog aging buckets", "Stacked bar chart; bucket ranges admin-configurable"],
          ["Team workload", "Assignee-level breakdown"],
          ["Date-range presets", "3 / 7 / 15 / 30 / 90 days, custom range"],
          ["Multi-select filters", "Priority, request type, assignee, status; 'hide internal agents' toggle"],
        ],
      },
      {
        id: "insights",
        title: "Rule-Based Insights Engine",
        type: "list",
        items: [
          "Ranks and severity-tags metrics that fall outside the configured healthy range",
          "Fully deterministic — no LLM, no external API; suggestions update as metrics change",
          "Thresholds, field mappings, and labels are admin-configurable per project",
          "Same RAG thresholds used by both stat cards and the insights panel — single source of truth",
        ],
      },
      {
        id: "infra",
        title: "Infrastructure",
        type: "list",
        items: [
          "Bounded synchronous path for initial load; <code>@forge/events</code> async queue (900-second budget) for full-depth refreshes",
          "KVS-backed cache keyed per project <em>and</em> per filter combination — changing filters is a cache read",
          "Trend series (week / month / quarter) pre-bucketed at compute time; chart granularity changes need no recompute",
          "Metrics computed with app identity (not viewer identity) for consistent numbers across permission levels",
          "TypeScript strict mode, Jest test suite with Forge harness + realistic API fixtures, ESLint, Semgrep SAST",
        ],
      },
    ],

    designDecisions: [
      {
        title: "Worked around Forge's 25-second hard limit with a split compute path",
        body: "User-invoked Forge functions cannot exceed 25 seconds — no exceptions, no config flag. I split the compute path: a bounded synchronous load for the initial render, and a <code>@forge/events</code> async consumer (900-second budget) for full-depth refreshes, coordinated through a KVS cache. No workaround hacks — a real architectural split.",
      },
      {
        title: "Cut third-party API calls by ~90% without losing accuracy",
        body: "The naive implementation issued two extra REST calls per ticket (changelog + comments). Fixed by: requesting changelog inline via the search endpoint's <code>expand</code> parameter; reading first-response time from a native SLA field with a fallback; replacing a paged count call with a single approximate-count endpoint; and pre-bucketing all trend series at compute time so granularity changes are cache reads.",
      },
      {
        title: "Found and fixed a silent timezone bug in generated JQL",
        body: "Absolute UTC datetime literals in JQL are evaluated against the Jira site's <em>own</em> configured timezone, not UTC — invisible on a 90-day window but large enough to silently include/exclude tickets on a 3-day window. Fixed by switching rolling presets to JQL's native relative-date literals (<code>created >= -3d</code>) and custom ranges to plain calendar dates with exclusive end boundaries.",
      },
      {
        title: "Designed for cost, not just correctness",
        body: "After shipping, I profiled real Jira API usage: removed a scheduled background trigger recomputing every project every 5 minutes regardless of traffic; excluded the single highest-volume project (the dominant cost driver) rather than over-engineering for its outlier scale; replaced a 'load everything in batches' design with a single bounded fetch plus a 'showing partial data' state — simpler and objectively cheaper.",
      },
      {
        title: "App identity for metric consistency across permission levels",
        body: "Metrics are computed with the app's own Jira identity rather than the viewer's. User-identity calls were silently returning zero/partial results for viewers without direct issue-level access — a bug invisible in testing that only surfaced with live users. Switching to app identity made every viewer see the same numbers.",
      },
    ],

    nextSteps: [
      "Add weekly email digest for team leads (Forge scheduled trigger)",
      "Extend to additional Jira projects via the settings allowlist",
      "Add anomaly detection: flag weeks where SLA breach rate spikes vs. 4-week average",
    ],
  },

  // ── Desktop — HomebuddyFormatter (JAM) ──────────────────────────────────────
  {
    title: "JAM — JSON Any Modifier",
    slug: "jam-json-modifier",
    category: "desktop",
    tags: ["electron", "monaco-editor", "json", "desktop-app", "claude", "diff", "yaml", "csv", "ndjson", "ajv", "electron-builder"],
    summary: "Cross-platform Electron desktop app for working with JSON files: Monaco-powered editor, live tree viewer, format / repair / diff / convert tools, JSON Schema validation, AI-assisted repair via Claude Haiku, and 5 built-in themes.",
    role: "Design & build (solo)",
    tools: ["Electron 32", "React 18", "TypeScript", "Monaco Editor", "electron-vite", "Anthropic SDK", "AJV", "electron-builder", "js-yaml", "GitHub Actions"],
    status: "Completed",
    published: true,
    featured: false,
    cover: "img/jam-json-modifier/cover.png",
    date: "Sep 2026",

    overview: `JAM started as a small internal formatter and grew into a complete JSON workbench. It replaces the browser-tab JSON viewers and the copy-paste cycle with a dedicated native app: open files, inspect their tree, transform and validate them, and compare two versions side by side — all without leaving the editor. Ships as an NSIS installer and portable <code>.exe</code> for Windows, and a universal DMG (Intel + Apple Silicon) for macOS.`,

    components: [
      {
        id: "tabs",
        title: "Multi-Tab Editor",
        type: "list",
        items: [
          "Open multiple JSON files simultaneously, each in its own tab; drag tabs to reorder",
          "Unsaved-changes indicator (dot) per tab; close-confirm dialog with Save / Discard / Cancel",
          "Session restore — all tabs from the last session come back on launch, including unsaved edits",
          "File associations for <code>.json</code>, <code>.jsonl</code>, <code>.ndjson</code>; drag-and-drop opening; recent files list (last 8)",
          "Auto-save: saves disk-backed files 800 ms after last keystroke when enabled",
        ],
      },
      {
        id: "monaco",
        title: "Monaco Editor",
        type: "list",
        items: [
          "VS Code engine: syntax highlighting, bracket-pair colorization, code folding, JSON autocomplete",
          "Per-tab model isolation — switching tabs is instant, no remount or content flash",
          "Configurable font size (11–20 px), word wrap, minimap, indent size (2 / 4 spaces / tabs)",
          "Resizable split between editor and tree view via drag handle",
        ],
      },
      {
        id: "tree",
        title: "Real-Time JSON Tree",
        type: "list",
        items: [
          "Recursive tree view updates as you type (300 ms debounce, instant on tab switch)",
          "Search / filter by key or value across the entire tree",
          "Click any value to copy it to clipboard",
          "JSON Lines mode: tree updates to the selected line with per-line error indicators",
        ],
      },
      {
        id: "transforms",
        title: "JSON Transforms",
        type: "list",
        items: [
          "<strong>Format</strong> — pretty-print with configurable indent",
          "<strong>Minify</strong> — collapse to a single line",
          "<strong>Repair</strong> — rule-based fix for trailing commas, unquoted keys, and common syntax errors via <code>jsonrepair</code>",
          "<strong>AI Repair</strong> — sends malformed JSON to Claude Haiku; returns valid JSON even for heavily corrupted input",
          "<strong>Sort Keys</strong> — alphabetical recursive key sort",
          "<strong>Escape / Unescape</strong> — convert to embeddable string and back",
        ],
      },
      {
        id: "tools",
        title: "Tools & Utilities",
        type: "list",
        items: [
          "<strong>File Compare</strong> — side-by-side diff of any two open tabs via Monaco DiffEditor",
          "<strong>Search All Tabs</strong> — full-text search over every open tab's raw content; click a match to jump to it",
          "<strong>JSON Schema Validation</strong> — paste any schema, validate with AJV; error list with JSON path per violation",
          "<strong>Export YAML</strong> — converts JSON to YAML via js-yaml, saves with Save dialog",
          "<strong>Export CSV</strong> — flattens a JSON array-of-objects to CSV",
          "<strong>CRM Script Builder</strong> — section-based form that generates a structured JSON payload and loads it into the editor",
        ],
      },
      {
        id: "settings",
        title: "Settings & Themes",
        type: "table",
        headers: ["Section", "Options"],
        rows: [
          ["Appearance", "5 built-in themes (Dark · Light · Matrix · Pink Flamingo · Sunset); custom accent color per theme"],
          ["Editor", "Font size, indent size, word wrap, minimap toggle"],
          ["Files", "Auto-save toggle, clear session"],
          ["AI", "Anthropic API key (stored in localStorage — user-owned)"],
          ["Shortcuts", "Full keyboard shortcut reference"],
        ],
      },
      {
        id: "shortcuts",
        title: "Keyboard Shortcuts",
        type: "table",
        headers: ["Shortcut", "Action"],
        rows: [
          ["Ctrl/⌘ + O", "Open file"],
          ["Ctrl/⌘ + T", "New tab"],
          ["Ctrl/⌘ + W", "Close tab"],
          ["Ctrl/⌘ + S", "Save"],
          ["Ctrl/⌘ + Shift + F", "Format JSON"],
          ["Ctrl/⌘ + Shift + M", "Minify"],
          ["Ctrl/⌘ + R", "Repair (rule-based)"],
          ["Ctrl/⌘ + Shift + R", "AI Repair"],
          ["Ctrl/⌘ + Shift + K", "Sort keys"],
          ["Ctrl/⌘ + ] / [", "Next / previous tab"],
          ["Ctrl/⌘ + Shift + A", "Search all tabs"],
          ["Ctrl/⌘ + ,", "Settings"],
        ],
      },
    ],

    designDecisions: [
      {
        title: "Main / Renderer / Preload split (Electron security model)",
        body: "<code>contextBridge</code> exposes a typed <code>window.electronAPI</code> surface so the renderer never touches Node directly. All file system and IPC logic lives in <code>electron/main.ts</code>; the React app is completely unaware of Electron internals.",
      },
      {
        title: "Per-tab Monaco model isolation",
        body: "Each tab maps to a unique Monaco model via <code>path={tab.id}</code>. Switching tabs is instant — no remount, no content flash. Background tabs stay as raw strings; the editor only parses the active model, keeping memory flat regardless of how many files are open.",
      },
      {
        title: "Stable listener + mutable ref for keyboard shortcuts",
        body: "The keyboard event listener registers once on mount (<code>[]</code> deps) and always invokes the latest handler through a ref. Avoids adding and removing dozens of listeners on every render — a subtle but measurable perf fix at high shortcut density.",
      },
      {
        title: "Debounced session serialization to localStorage",
        body: "Open tabs (including dirty content) are serialized every 500 ms, debounced. On launch the session rehydrates before the first render. Clean disk-backed tabs are silently refreshed from disk in case the file changed while the app was closed.",
      },
      {
        title: "User-owned API key for AI Repair",
        body: "The Anthropic API key is stored in localStorage and never leaves the user's machine. This avoids running a backend proxy, eliminates per-user billing on my end, and keeps the feature available for power users who already have an API key.",
      },
    ],

    images: [
      { src: "img/jam-json-modifier/screen-1.png", alt: "JAM welcome screen — recent files and keyboard shortcuts" },
      { src: "img/jam-json-modifier/screen-2.png", alt: "JAM editor — Monaco JSON editor with live tree view" },
      { src: "img/jam-json-modifier/screen-3.png", alt: "JAM Transform menu — Format, Minify, Repair, AI Repair" },
      { src: "img/jam-json-modifier/screen-4.png", alt: "JAM editor in Matrix green theme" },
    ],

    downloads: {
      note: "JAM is free. Coming soon to official app stores.",
      stores: [
        { name: "Microsoft Store", platform: "windows" },
        { name: "Mac App Store", platform: "mac" },
      ],
    },

    nextSteps: [
      "Add JSON-to-TypeScript type generation",
      "Add JSONPath query runner with live results panel",
      "macOS notarization for Gatekeeper compliance",
    ],
  },

  // ── Desktop — Labascom ───────────────────────────────────────────────────────
  {
    title: "LabInventario — Lab Inventory System",
    slug: "labascom-lab-inventory",
    category: "desktop",
    tags: ["wpf", "csharp", "dotnet", "sqlite", "kardex", "inventory", "pdf-reports", "material-design"],
    summary: "Native Windows desktop app for permanent inventory management at a health ministry laboratory. Implements a Kardex-style perpetual inventory system with full movement history, weighted average cost, lot/expiry tracking, and printable PDF reports.",
    role: "Design & build (solo)",
    tools: ["C#", ".NET 8", "WPF", "Entity Framework Core", "SQLite", "Material Design XAML", "CommunityToolkit.MVVM", "QuestPDF"],
    status: "Completed",
    published: false,
    featured: false,
    cover: null,
    date: "Apr 2026",

    note: "Built for Labascom / Ministerio de Salud de Panamá. Fully offline — no server required.",

    overview: `Native Windows desktop application for the perpetual inventory management of a government health laboratory. Implements a <strong>Kardex-style</strong> tracking system: every stock entry and exit is recorded with running balances, weighted average cost, and lot/expiry data. Generates printable PDF inventory reports filtered by category. Fully offline — runs on a local SQLite database with no server or internet connection required.`,

    components: [
      {
        id: "modules",
        title: "Modules",
        type: "list",
        items: [
          "<strong>Articles</strong> — product registry with categories, unit of measure, location, and card number",
          "<strong>Almacén</strong> — warehouse view for current stock levels",
          "<strong>Kardex</strong> — full movement history per article: entry/exit, running balance, weighted average cost, lot number, expiry date",
          "<strong>Reports</strong> — inventory reports filtered by category, generated and printed as PDF via QuestPDF",
        ],
      },
      {
        id: "tech",
        title: "Architecture",
        type: "list",
        items: [
          "MVVM pattern with CommunityToolkit.MVVM 8 and per-view ViewModels",
          "Entity Framework Core + SQLite local database",
          "Material Design in XAML (MaterialDesignThemes 5.1) sidebar navigation",
          "Publish script targeting <code>net8.0-windows</code> with self-contained deployment",
        ],
      },
    ],
  },

  // ── Python — Wazuh Easylogger ────────────────────────────────────────────────
  {
    title: "Wazuh Easylogger",
    slug: "wazuh-easylogger",
    category: "python",
    tags: ["wazuh", "siem", "python-library", "cli", "logging", "syslog", "webhook", "devtools"],
    summary: "Python library and interactive CLI wizard that adds structured, Wazuh-ready logging to any Python application in minutes — auto-generating the ossec.conf block, a custom JSON decoder, and a step-by-step integration guide.",
    role: "Design & build (solo)",
    tools: ["Python", "PyYAML", "questionary", "requests", "syslog", "logging"],
    status: "Completed",
    published: true,
    featured: false,
    cover: "img/wazuh-easylogger/cover.png",
    date: "Sep 2026",

    overview: `Python library that eliminates the manual configuration friction of integrating custom application logs into Wazuh SIEM. Running the interactive wizard (<code>python -m easylogger.wizard</code>) generates a ready-to-use <code>log_config.yaml</code>, the exact <code>ossec.conf</code> block to paste into the Wazuh Manager, a custom JSON decoder, and a step-by-step <code>GUIDE.md</code> — all tailored to the app's transport and format choices.`,

    components: [
      {
        id: "wizard",
        title: "Interactive Wizard",
        type: "list",
        items: [
          "Covers app type, transport, log format, and auth preferences",
          "Three transport backends: local file, syslog TCP/UDP, HTTP webhook",
          "YAML-driven configuration with multi-handler support (e.g., file + syslog simultaneously)",
          "Non-blocking webhook handler using a background queue thread",
          "Safe for re-initialization — no duplicate handler accumulation",
        ],
      },
      {
        id: "output",
        title: "Generated Artifacts",
        type: "list",
        items: [
          "<code>log_config.yaml</code> — ready-to-use logging configuration",
          "<code>ossec.conf</code> snippet — paste directly into the Wazuh Manager",
          "Custom JSON decoder XML for Wazuh Manager",
          "<code>GUIDE.md</code> — step-by-step integration walkthrough",
          "Real-world examples for Google Workspace addons, AWS Lambda, and Docker containers",
        ],
      },
    ],

    designDecisions: [
      {
        title: "Structured JSON log format",
        body: "All logs emit ISO timestamp, level, logger name, module, and line number as JSON. This makes Wazuh decoder rules simple and deterministic — no regex guesswork.",
      },
      {
        title: "Wizard generates, not configures",
        body: "The library never touches ossec.conf directly. Instead it generates the correct config snippet and outputs it for the user to paste, keeping the integration auditable and reversible.",
      },
    ],

    nextSteps: [
      "Package and publish to PyPI",
      "Add Wazuh Cloud transport backend",
      "Add unit tests for all transport handlers",
    ],
  },

  // ── Python — Confluence KB Sync Tool ─────────────────────────────────────
  {
    title: "Confluence KB Sync Tool",
    slug: "confluence-kb-tool",
    category: "python",
    tags: ["python", "cli", "jinja2", "confluence", "yaml", "click", "keyring", "knowledge-base", "ai-assisted", "pip"],
    summary: "pip-installable Python CLI that syncs local files to Confluence — Jinja2 templates for page layout, YAML for content, OS keyring for credentials. Built by generalizing a single-company KB pipeline (118 production Confluence pages) into a fully reusable, zero-domain-logic engine any team can adopt.",
    role: "Sole engineer — architecture, implementation, verification, content authoring",
    tools: ["Python", "Click", "Jinja2", "PyYAML", "Confluence REST API", "OS keyring"],
    status: "Completed",
    published: true,
    featured: false,
    cover: "img/confluence-kb-tool/cover.png",
    date: "Sep 2026",
    repoUrl: "https://github.com/JeffreyCq/confluence-kb-tool",

    overview: `Started as a refactor of a single-company pipeline that synced 118 CRM integration pages to Confluence. Every piece of page copy was hardcoded in Python and all field names were company-specific — meaning non-engineers couldn't update the KB and nothing could be reused elsewhere. I extracted content into an editable <code>content.yaml</code>, ported layout to Jinja2 templates, and then generalized the whole engine into <code>confluence-kb-tool</code>: a pip-installable, Click-based CLI (<code>kb-tool init / preview / push / index / auth</code>) with zero domain-specific logic in the installable package. The original company's setup became the reference implementation.`,

    components: [
      {
        id: "engine",
        title: "Sync Engine",
        type: "list",
        items: [
          "Find / create / update Confluence pages by title; resumable batching; dry-run mode",
          "\"Preserve everything after a marker\" semantics — hand-written notes below a divider are never overwritten",
          "Configurable field names via <code>kb-tool.yaml</code> — zero domain logic in the installable package",
          "<code>kb-tool init</code> scaffolds a new project: <code>kb-tool.yaml</code>, <code>content.yaml</code>, and a starter Jinja2 template",
        ],
      },
      {
        id: "rendering",
        title: "Jinja2 Rendering",
        type: "list",
        items: [
          "Page layout defined in an editable <code>.j2</code> template — structure is configurable per project, not just the words",
          "Project-supplied <code>helpers.py</code> exposes custom logic (regex classification, formatting) without the core engine importing it",
          "Content text lives in <code>content.yaml</code>: warnings, credential guides, troubleshooting bullets, per-integration notes — all editable by non-engineers",
        ],
      },
      {
        id: "auth",
        title: "Credential & Config Handling",
        type: "list",
        items: [
          "Credentials stored in OS keyring (Windows Credential Manager / macOS Keychain / Secret Service) via <code>kb-tool auth set</code>",
          "Environment-variable override still supported for scripting and CI",
          "All project configuration in a single <code>kb-tool.yaml</code> — one file to onboard a new team",
        ],
      },
      {
        id: "content",
        title: "AI-Assisted Content (\"How to get credentials\")",
        type: "list",
        items: [
          "Extended the KB with a per-integration \"How to get these values\" section across 118 third-party CRM systems",
          "Parallel research agents against public vendor documentation; instructions only written where a verifiable source exists, cited inline",
          "For the ~40% of niche vendors with no public docs: shipped an honest generic fallback and logged the gap to a tracked follow-up list — never fabricated steps",
        ],
      },
    ],

    designDecisions: [
      {
        title: "Byte-for-byte verification for every refactor step",
        body: "The KB was live in production and could not regress. Every change — content extraction, Jinja port, CLI rewrite — was verified by rendering old and new code paths for all 118 real records and diffing character-for-character. Any difference was treated as a bug until proven intentional. This caught a real bug: YAML line-folding and Jinja whitespace trimming each silently inject stray characters at block boundaries — invisible when eyeballed, but caught immediately by a diff against a known-good baseline.",
      },
      {
        title: "helpers.py pattern for custom logic without coupling",
        body: "Templates often need project-specific formatting functions (regex classification, field transforms). Rather than embedding them in the core engine or requiring a fork, the CLI imports a project-supplied <code>helpers.py</code> at runtime — the core never depends on it directly. Custom logic stays in the project, not the package.",
      },
      {
        title: "Honest fallback instead of fabricated AI output",
        body: "The risk with AI-assisted content for a KB used by non-technical PMs giving instructions to clients: plausible-sounding but wrong steps cause real downstream errors. For vendors with no public documentation, I shipped a generic fallback and tracked the gap for manual research — trading completeness for trustworthiness.",
      },
    ],

    nextSteps: [
      "Publish to PyPI",
      "Add support for bulk attachment uploads alongside page content",
      "Add a diff preview command to show what would change before pushing",
    ],
  },

  // ── n8n: Wazuh Security Alerts Pipeline ──────────────────────────────────
  {
    title: "Wazuh Security Alerts Pipeline",
    slug: "wazuh-security-alerts-n8n",
    category: "n8n",
    tags: ["wazuh", "siem", "active-response", "mitre-attck", "postgresql", "teams", "adaptive-cards", "alerting"],
    summary: "n8n workflow that ingests Wazuh Active Response events, enriches them with MITRE ATT&CK metadata and 24-hour attack statistics from PostgreSQL, and routes 6 contextual alert types to Microsoft Teams as Adaptive Cards — with a SQL anti-spam lock to prevent duplicate alerts.",
    role: "Design & build (solo)",
    tools: ["n8n", "JavaScript", "PostgreSQL", "Microsoft Teams", "Power Automate", "Wazuh"],
    status: "Completed",
    published: true,
    featured: false,
    cover: "img/wazuh-security-alerts-n8n/cover.png",
    date: "Sep 2026",

    overview: `A security alerting pipeline built on n8n that bridges Wazuh's Active Response system with Microsoft Teams.

Every time Wazuh blocks an IP or fires a high-level rule, it calls this workflow's webhook. The workflow:
1. Parses the nested Wazuh AR payload and extracts MITRE ATT&CK fields
2. Inserts the event into a PostgreSQL log table
3. Runs a 24-hour CTE analytics query to classify the threat severity
4. Builds a context-rich Adaptive Card (6 alert types, AbuseIPDB link, MITRE details)
5. Posts the card to Microsoft Teams via Power Automate

The key engineering constraint: Wazuh can fire dozens of events per second during a brute-force attack. A naive webhook-per-event would flood Teams. The solution is a SQL anti-spam lock that guarantees at most one card per threshold crossing, regardless of how many events arrive simultaneously.`,

    architectureMermaid: `flowchart TD
    WZ["Wazuh Manager\\nActive Response"] -->|"POST /webhook/wazuh-ar"| WH["Webhook Trigger"]
    WH --> JS1["Parse Payload\\n(JavaScript)\\nextract: rule · level · MITRE\\nIP · user · agent · command"]
    JS1 --> PG1[("PostgreSQL\\nINSERT ar_alerts_log\\nreturns new row id")]
    PG1 --> PG2["CTE Analytics\\n24h window per group_key\\n6 escalation conditions\\nanti-spam: last_id = this_id?"]
    PG2 --> IF{"Row\\nreturned?"}
    IF -->|"No — another event\\nfired first"| STOP(["Stop"])
    IF -->|"Yes — this event\\nis the threshold trigger"| JS2["Build Smart Card\\n6 alert types\\nAdaptive Card JSON"]
    JS2 --> HTTP["HTTP Request"]
    HTTP --> PA["Power Automate\\nHTTP trigger"]
    PA --> TEAMS["Teams Channel\\nAdaptive Card"]`,

    components: [
      {
        id: "schema",
        title: "PostgreSQL — ar_alerts_log",
        type: "list",
        description: "Every Wazuh AR event is written here. The table drives both the analytics query and the deduplication lock.",
        items: [
          "<code>id</code> — SERIAL PK, used for anti-spam lock",
          "<code>created_at</code> — TIMESTAMPTZ, window anchor for CTE",
          "<code>rule_id</code> — Wazuh rule identifier (e.g. 40112 = valid account after failures)",
          "<code>rule_level</code> — Wazuh severity level (1-15)",
          "<code>rule_description</code> — human-readable rule label",
          "<code>agent</code> — Wazuh agent (hostname) that fired the rule",
          "<code>source_ip</code> — attacker IP (null for user-only events)",
          "<code>source_user</code> — attacker username (null for IP-only events)",
          "<code>group_key</code> — normalized attacker identifier: IP or <code>user:username</code>",
          "<code>command</code> — AR action: BLOCKED or UNBLOCKED",
          "<code>mitre_id</code> — MITRE technique ID (e.g. T1110.001)",
          "<code>mitre_tactic</code> — MITRE tactic name (e.g. Credential Access)",
          "<code>mitre_technique</code> — MITRE technique name",
          "<code>program</code> — source program (sshd, pam_unix, etc.)",
          "<code>raw</code> — full original JSON payload as JSONB",
        ],
      },
      {
        id: "cte",
        title: "CTE Analytics Query — 6 Escalation Conditions",
        type: "list",
        description: "A single SQL query with 4 CTEs aggregates 24 hours of activity for the current group_key and returns a row only when at least one escalation condition is met AND the anti-spam lock passes.",
        items: [
          "<strong>window_alerts</strong> — all events for this group_key in the past 24h",
          "<strong>ip_stats</strong> — attack count, distinct agents targeted, max severity, MITRE technique count, and whether rule 40112 fired",
          "<strong>agent_stats</strong> — distinct source IPs hitting any targeted agent in the past 1h (coordinated attack detection)",
          "<strong>first_seen</strong> — whether this group_key has ever appeared before in the log",
        ],
      },
      {
        id: "alert-types",
        title: "Alert Type Classifier (Priority Order)",
        type: "list",
        description: "The Build Smart Card node evaluates conditions in priority order — first match wins — and sets the card color, severity label, and description accordingly.",
        items: [
          "🚨 <strong>SEVERE — Account Compromise:</strong> <code>has_valid_account_hit = true</code> (rule 40112: successful login attempt detected after prior auth failures from same IP/user)",
          "🔥 <strong>CRITICAL — High-Severity Single Event:</strong> <code>max_severity ≥ 12</code> (Wazuh level 12+ = active exploitation or root compromise)",
          "🧩 <strong>WARNING — Multi-Stage Attack Pattern:</strong> <code>distinct_techniques ≥ 2</code> (attacker using multiple MITRE ATT&CK techniques — indicates progression, not just scanning)",
          "🎯 <strong>WARNING — Coordinated Attack:</strong> <code>distinct_sources_1h ≥ 5</code> (five or more IPs targeting the same host within 1h — botnet or distributed scan)",
          "🆕 <strong>INFO — New Attacker:</strong> <code>is_first_seen = true</code> (first time this group_key appears in the log — creates baseline visibility)",
          "🔴/🟠 <strong>Milestone:</strong> <code>attack_count ≥ 15</code> → CRITICAL, <code>≥ 10</code> → WARNING, else ⚠️ threshold (fires every 5 hits via <code>attack_count % 5 = 0</code>)",
        ],
      },
      {
        id: "payload-parser",
        title: "Payload Parser — Wazuh Active Response Envelope",
        type: "list",
        description: "Wazuh wraps AR events in a nested envelope. The parser navigates the full path and normalizes the data, including MITRE enrichment from nested arrays.",
        items: [
          "Root path: <code>body.ar_events[0].all_fields.data.parameters.alert</code>",
          "MITRE ID: first entry in <code>rule.mitre.id[]</code>",
          "MITRE tactic: first entry in <code>rule.mitre.tactic[]</code>",
          "MITRE technique: first entry in <code>rule.mitre.technique[]</code>",
          "source_ip: <code>data.srcip</code> (may be undefined for account-name-only rules)",
          "source_user: <code>data.dstuser || data.srcuser</code>",
          "group_key: <code>source_ip</code> if present, else <code>user:source_user</code> — used as the deduplication and aggregation key",
        ],
      },
    ],

    designDecisions: [
      {
        title: "SQL anti-spam lock prevents alert flooding",
        body: `The query's HAVING clause includes: <code>AND last_inserted_id = $current_insert_id</code>.

After every INSERT, the workflow queries the latest row id for this group_key. If another event arrived between the INSERT and the query (common during brute-force storms), <code>last_inserted_id</code> will differ from the id we just inserted, and the query returns empty — no card is sent.

This makes n8n's sequential node execution act as a distributed lock: only the event that atomically claims the "latest row" for its group_key fires the Teams notification.`,
      },
      {
        title: "group_key abstraction — IP or user:",
        body: `Some Wazuh rules fire on username without a source IP (e.g. rule 40112 — Account Compromise — reports the target username, not the attacker IP). Without abstraction, these events would never aggregate.

The group_key is set as:
- <code>source_ip</code> if available
- <code>user:${'{'}source_user{'}'}</code> otherwise (the <code>user:</code> prefix prevents collisions with actual IP strings)

Every CTE join and anti-spam lock uses group_key, so user-based and IP-based events flow through identical logic.`,
      },
      {
        title: "Alert priority — account compromise ranks above raw severity",
        body: "Rule 40112 (successful login after brute-force failures) gets the highest severity tier even if the rule_level is moderate (e.g. 10). A successful compromise matters more than a loud-but-failed level-12 scan. The classifier checks conditions in explicit priority order, not by numeric level.",
      },
      {
        title: "Relay via Power Automate instead of direct Teams webhook",
        body: "Microsoft Teams' incoming webhook connector does not support Adaptive Card v1.4 (actionable buttons, badge elements). Power Automate does. The n8n workflow builds the full Adaptive Card JSON and POSTs it to a Power Automate HTTP trigger, which relays it to Teams using the connector that supports richer card syntax.",
      },
    ],

    nextSteps: [
      "Add a suppression list: skip alerts for known-safe IPs (pen-test ranges, monitoring systems)",
      "Store sent-card metadata in a second table for incident tracking and replay",
      "Add a Slack fallback channel for when Teams is unavailable",
      "Migrate alert routing from Power Automate relay to direct Teams Graph API calls",
    ],
  },

  // ── n8n: Wazuh Weekly SOC Report ─────────────────────────────────────────
  {
    title: "Wazuh Weekly SOC Report",
    slug: "wazuh-weekly-soc-report",
    category: "n8n",
    tags: ["wazuh", "siem", "soc", "reporting", "postgresql", "html-dashboard", "email-automation"],
    summary: "Scheduled n8n workflow that queries a week of Wazuh Active Response events from PostgreSQL, builds a self-contained interactive HTML dashboard (KPI grid, trend chart, MITRE tactics breakdown, paginated log), and delivers it as an email attachment every Monday via Power Automate — no file server or external storage required.",
    role: "Design & build (solo)",
    tools: ["n8n", "JavaScript", "PostgreSQL", "Power Automate", "HTML/CSS", "Wazuh"],
    status: "Completed",
    published: true,
    featured: false,
    cover: "img/wazuh-weekly-soc-report/cover.png",
    date: "Sep 2026",

    overview: `A weekly reporting workflow that turns raw Wazuh Active Response logs into a polished security dashboard delivered to email every Monday at 8am.

The workflow queries 7 days of events from the same \`ar_alerts_log\` table used by the real-time alerting pipeline, processes them into 6 KPIs and a ranked findings list, then injects the data into a self-contained HTML dashboard. The dashboard is base64-encoded and sent as an email attachment via Power Automate — no Azure blob storage, no CDN, no file server.

Recipients get a single \`.html\` file they can open locally in any browser. The dashboard renders entirely client-side: interactive filters, sortable tables, trend charts, and MITRE ATT&CK breakdowns all work offline from the attachment.`,

    architectureMermaid: `flowchart TD
    CRON["Schedule Trigger\\nEvery Monday 8am"] --> PG["PostgreSQL\\n7-day window from ar_alerts_log\\nincludes is_first_seen flag\\nreturns full JSON array"]
    PG --> CODE["Build HTML Dashboard\\n(Code node)\\nDecode base64 template\\nInject alert JSON into template\\nCompute 6 KPIs + findings ranking\\nBase64-encode final HTML"]
    CODE --> HTTP["HTTP Request\\nPOST to Power Automate\\nfilename + base64 file\\n+ stats summary body"]
    HTTP --> PA["Power Automate\\nOffice 365 Outlook connector"]
    PA --> EMAIL["Email + HTML Attachment\\nwazuh-weekly-report-YYYY-MM-DD.html\\nself-contained interactive dashboard"]`,

    components: [
      {
        id: "sql-query",
        title: "PostgreSQL Query — 7-Day Window",
        type: "list",
        description: "Pulls all events from the past 7 days and enriches each row with an `is_first_seen` flag using a JOIN against the full historical minimum.",
        items: [
          "<code>window_alerts</code> CTE — all rows from <code>ar_alerts_log</code> with <code>created_at >= now() - interval '7 days'</code>",
          "<code>first_seen</code> CTE — <code>MIN(created_at)</code> per <code>group_key</code> across the entire table (not just the window)",
          "<code>is_first_seen</code> flag — true when the group_key's first-ever appearance falls within the 7-day window",
          "Returns all event fields including MITRE data, command (BLOCKED/UNBLOCKED), agent, source info",
          "Full result set wrapped in <code>json_agg</code> → single JSON column for the Code node to receive",
        ],
      },
      {
        id: "kpis",
        title: "6 KPIs Computed in Code Node",
        type: "list",
        description: "The Code node aggregates the raw event list into the summary numbers shown in the dashboard header and sent in the email body.",
        items: [
          "<strong>Total events</strong> — raw count of all AR events in the 7-day window",
          "<strong>Unique sources</strong> — distinct <code>group_key</code> values (IPs + users)",
          "<strong>Blocked</strong> — events where <code>command === 'BLOCKED'</code>",
          "<strong>Critical (≥ 12)</strong> — events with <code>rule_level ≥ 12</code>",
          "<strong>Compromised accounts</strong> — group_keys that triggered rule 40112 (valid login after brute-force)",
          "<strong>New sources</strong> — group_keys appearing for the first time this week (<code>is_first_seen = true</code>)",
        ],
      },
      {
        id: "findings",
        title: "Findings Ranking — Priority Order",
        type: "list",
        description: "Each unique attacker (group_key) is evaluated and emitted as a finding if it meets any threshold. Findings are sorted by rank then hit count.",
        items: [
          "🚨 <strong>rank 0 — Account Compromise:</strong> group_key has <code>hasAccountHit = true</code> (rule 40112 fired)",
          "🔥 <strong>rank 1 — High-Severity:</strong> level ≥ 12 event (not rule 40112)",
          "🔴 <strong>rank 1 — Sustained Attack:</strong> ≥ 15 hits from same source",
          "🧩 <strong>rank 2 — Multi-Stage:</strong> ≥ 2 distinct MITRE techniques from same source",
          "🟠 <strong>rank 2 — Repeated Attacks:</strong> ≥ 10 hits from same source",
          "🎯 <strong>rank 2 — Coordinated Attack:</strong> ≥ 5 distinct sources hitting same host within 90-minute sliding window",
        ],
      },
      {
        id: "dashboard",
        title: "SOC Radar — Self-Contained HTML Dashboard",
        type: "list",
        description: "The dashboard is a fully static HTML file with the week's alert data embedded as JSON. No server needed after delivery — all rendering, filtering, and charting happens in the browser.",
        items: [
          "<strong>KPI grid</strong> — 6 stat cards with severity-coded colors",
          "<strong>Investigation priority feed</strong> — ranked findings list generated server-side",
          "<strong>Events per day bar chart</strong> — inline SVG, no chart library dependency",
          "<strong>MITRE ATT&CK tactics chart</strong> — tactic distribution with 7 color slots",
          "<strong>Top offending sources table</strong> — sortable, with hit count and max severity",
          "<strong>Most targeted hosts table</strong> — agent names with event counts",
          "<strong>Full log table</strong> — paginated, all fields, with search and 4-dropdown filter bar (days / severity / command / priority)",
          "<strong>Agent chips</strong> — quick filter by hostname",
          "<strong>Export / Print</strong> — native browser print, no PDF library",
          "<strong>Copy summary for Teams</strong> — one-click copy of KPI summary text",
          "Light + dark mode via <code>prefers-color-scheme</code> + manual toggle",
          "Fonts: IBM Plex Sans + IBM Plex Mono + Barlow Condensed (Google Fonts)",
        ],
      },
      {
        id: "delivery",
        title: "Delivery — base64 Attachment via Power Automate",
        type: "list",
        description: "The Code node base64-encodes the final HTML and sends it to Power Automate as a JSON payload. Power Automate's Office 365 Outlook connector attaches the decoded file to an email.",
        items: [
          "File: <code>wazuh-weekly-report-YYYY-MM-DD.html</code>",
          "Email subject: <code>Weekly SOC Report — wazuh-weekly-report-YYYY-MM-DD.html</code>",
          "Email body: plain-text KPI summary (total, unique sources, blocked, critical, compromised accounts, new sources)",
          "Attachment method: base64 string in POST body → Power Automate decodes and attaches via Outlook connector",
          "No Azure blob storage, no SharePoint, no n8n binary file storage — the file lives only in the POST payload",
        ],
      },
    ],

    designDecisions: [
      {
        title: "HTML template embedded as base64 in the Code node",
        body: `The dashboard HTML is a large string with backticks, template literals, and double quotes throughout. Embedding it directly inside a JavaScript string in the n8n Code node would require escaping hundreds of characters.

Instead, the template is stored as a base64 string in a <code>const TEMPLATE_B64</code> at the top of the node, then decoded at runtime with <code>Buffer.from(TEMPLATE_B64, 'base64').toString('utf-8')</code>. This makes the template fully self-contained in the workflow JSON with zero escaping issues and easy to update by re-encoding.`,
      },
      {
        title: "Data injected via a placeholder comment in the template",
        body: `The HTML template contains the sentinel: <code>/*__ALERTS_JSON__*/[]/*__END_ALERTS_JSON__*/</code>. The Code node does a single string replace: <code>template.replace("/*__ALERTS_JSON__*/[]/*__END_ALERTS_JSON__*/", JSON.stringify(rawAlerts))</code>.

This avoids any DOM manipulation at generation time. The template's own JavaScript reads the resulting literal array at load time, so the dashboard is completely static after injection.`,
      },
      {
        title: "base64 attachment avoids blob storage and app registration",
        body: `Sending an HTML file via email requires either a file server (SharePoint, Azure Blob, S3) or an app registration to call the Mail API directly. Both are non-trivial to set up and add infrastructure dependencies.

The Power Automate Office 365 Outlook connector accepts a base64 file payload natively — no app registration, no storage account, no SAS tokens. The tradeoff is a larger HTTP payload (~1.3× the HTML file size), but for a weekly report under ~500 KB this is negligible.`,
      },
      {
        title: "Coordinated attack detection uses 90-minute sliding window",
        body: `The real-time alerting pipeline detects coordinated attacks using a 1-hour window via SQL (<code>created_at >= now() - interval '1 hour'</code> per agent). In the weekly report, the same detection runs client-side in JavaScript using a 90-minute window with a two-pointer sweep over sorted timestamps.

The extended window catches slower coordinated scans that might spread events just outside a 60-minute window, and the client-side implementation avoids adding another SQL query to the weekly report job.`,
      },
    ],

    nextSteps: [
      "Add a trend section comparing this week vs last week for each KPI",
      "Include a MITRE ATT&CK heatmap (matrix view) in the HTML dashboard",
      "Store generated reports in a PostgreSQL table for historical access without re-running the query",
      "Add a Teams message alongside the email with the top 3 findings inline",
    ],
  },

  // ── n8n: Grafana CRM Alert Notifications ──────────────────────────────────
  {
    title: "Grafana CRM Alert Notifications",
    slug: "grafana-crm-alerts-n8n",
    category: "n8n",
    tags: ["grafana", "alertmanager", "crm", "postgresql", "teams", "adaptive-cards", "monitoring"],
    summary: "n8n workflow that bridges Grafana Alertmanager to Microsoft Teams. Ingests Grafana webhook payloads, logs each CRM integration failure to PostgreSQL, and fires a Teams Adaptive Card when a contractor crosses error milestones (5 / 10 / 15 per day) — using the same SQL anti-spam lock to prevent duplicate alerts.",
    role: "Design & build (solo)",
    tools: ["n8n", "JavaScript", "PostgreSQL", "Grafana", "Microsoft Teams", "Power Automate"],
    status: "Completed",
    published: true,
    featured: false,
    cover: "img/grafana-crm-alerts-n8n/cover.png",
    date: "Sep 2026",

    overview: `Grafana monitors CRM integration health across dozens of active campaigns. When an integration fails, Grafana fires an alertmanager webhook — but the raw alert payload is noisy: it includes datasource errors, infrastructure alerts, and repeated firings for the same event.

This workflow filters the noise, logs every real CRM failure to PostgreSQL, and escalates only when a contractor crosses a daily error milestone (5, 10, or 15 errors). The same SQL anti-spam lock used in the Wazuh pipeline ensures that rapid parallel webhook firings never produce duplicate Teams cards.

The result is a clean escalation path: on-call engineers see a Teams card that names the contractor, lists affected campaigns and integrations, and links directly to the campaign admin page, the Grafana panel, and a one-click silence URL.`,

    architectureMermaid: `flowchart TD
    GF["Grafana Alertmanager"] -->|"POST /webhook/grafana-crm-alerts"| WH["Webhook Trigger"]
    WH --> JS1["Parse + Filter\\n(Code node)\\nKeep: status=firing, has context_campaign labels\\nSkip: DatasourceNoData\\nExtract: campaign · contractor · integration · status_code"]
    JS1 --> PG1[("PostgreSQL\\nINSERT crm_alerts\\nreturns new row id")]
    PG1 --> PG2["Milestone Query\\nCTE: count errors since last daily reset\\nMilestones: 5 · 10 · 15 per contractor\\nAnti-spam: last_inserted_id = this_id?"]
    PG2 --> IF{"Milestone\\nhit?"}
    IF -->|"No row returned"| STOP(["Stop"])
    IF -->|"error_count present"| JS2["Build Smart Card\\n3 severity tiers\\nContractor · campaigns · integrations\\n3 action buttons"]
    JS2 --> HTTP["HTTP Request"]
    HTTP --> PA["Power Automate"]
    PA --> TEAMS["Teams Adaptive Card\\n+ Grafana link + Silence URL"]`,

    components: [
      {
        id: "schema",
        title: "PostgreSQL — crm_alerts",
        type: "list",
        description: "Every firing CRM alert is persisted here. The table accumulates the full day's failures per contractor and is the source for milestone counting.",
        items: [
          "<code>id</code> — SERIAL PK, used for anti-spam lock",
          "<code>received_at</code> — timestamp of when the alert arrived in n8n (mapped from Grafana's <code>startsAt</code>)",
          "<code>campaign_id</code> — Grafana label <code>context_campaign_id</code>",
          "<code>campaign_name</code> — Grafana label <code>context_campaign_name</code>",
          "<code>contractor_id</code> — Grafana label <code>context_contractor_id</code>",
          "<code>contractor_name</code> — Grafana label <code>context_contractor_name</code>",
          "<code>integration</code> — integration name from Grafana label",
          "<code>status_code</code> — HTTP status code returned by the integration",
          "<code>starts_at</code> — original Grafana alert start time",
          "<code>generator_url</code> — deep link to the specific Grafana panel that fired",
          "<code>silence_url</code> — pre-filled Grafana silence URL for one-click suppression",
          "<code>campaign_url</code> — direct link to the campaign in the CRM admin console",
          "<code>reviewed</code> — BOOLEAN DEFAULT false, for manual triage workflow",
        ],
      },
      {
        id: "filter",
        title: "Alert Filter — Context Label Guard",
        type: "list",
        description: "Grafana sends all alerts to the same webhook. The Code node filters down to only the alerts that represent real CRM failures.",
        items: [
          "Keep only alerts with <code>status === 'firing'</code> — ignores resolved/pending states",
          "Skip any alert where <code>alertname</code> includes <code>'DatasourceNoData'</code> — these are Grafana datasource connection issues, not real CRM failures",
          "Keep only alerts that have at least one label starting with <code>'context_campaign'</code> — guarantees the alert has campaign context and was fired by a CRM integration rule",
          "Passes through each alert as its own n8n item for parallel downstream processing",
        ],
      },
      {
        id: "milestone-query",
        title: "Milestone SQL Query — Daily Contractor Error Count",
        type: "list",
        description: "After each insert, a CTE query counts today's total errors for this contractor and returns a row only when a milestone (5, 10, or 15 errors) is hit exactly.",
        items: [
          "<strong>Window anchor:</strong> <code>received_at >= COALESCE((SELECT MAX(ran_at) FROM report_log WHERE report_type = 'daily'), CURRENT_DATE)</code> — resets on each daily report run",
          "<strong>Per-contractor aggregation:</strong> <code>COUNT(*)</code> total errors, <code>COUNT(DISTINCT campaign_name)</code> affected campaigns, <code>STRING_AGG</code> for campaign list, integration list, status codes",
          "<strong>Milestone filter:</strong> <code>WHERE error_count IN (5, 10, 15)</code> — exactly three escalation thresholds",
          "<strong>Anti-spam lock:</strong> <code>AND last_inserted_id = {{ current insert id }}</code> — guarantees only the event that pushed the count to the threshold fires the card",
          "Also returns <code>generator_url</code>, <code>silence_url</code>, <code>campaign_url</code> for card action buttons",
        ],
      },
      {
        id: "smart-card",
        title: "Teams Adaptive Card — 3 Severity Tiers",
        type: "list",
        description: "The Smart Card node maps the milestone error count to a severity tier and builds a fully structured Adaptive Card with contractor context and actionable buttons.",
        items: [
          "🚨 <strong>SEVERE (≥ 15 errors):</strong> 'Escalate to Client Now' — red Attention theme, message: all integrations may be broken",
          "🔴 <strong>CRITICAL (≥ 10 errors):</strong> 'Client Likely Broken' — red Attention theme, message: check all campaigns immediately",
          "⚠️ <strong>WARNING (= 5 errors):</strong> 'Repeated Client Failures' — Warning theme, message: monitor, count is rising",
          "Card header: emoji + severity title + error count (large) + subtitle",
          "Info block: Contractor name · Campaigns affected count · Campaign list · Integrations involved · Status codes",
          "Action button: 📋 View Last Campaign → direct link to CRM admin filtered to that campaign",
          "Action button: 📊 View in Grafana → deep link to the Grafana panel that fired",
          "Action button: 🔕 Silence Alert → pre-filled Grafana silence URL, one click to suppress",
        ],
      },
    ],

    designDecisions: [
      {
        title: "Milestone-only firing prevents alert fatigue",
        body: `Grafana can fire the same alert repeatedly as it re-evaluates on its interval. Without a threshold, every individual CRM failure would generate a Teams card — unusable at scale.

The query uses <code>WHERE error_count IN (5, 10, 15)</code> (exact match, not ≥) so cards fire only at three meaningful escalation points. Combined with the anti-spam lock, a contractor that reaches 5 errors generates exactly one WARNING card, one CRITICAL card at 10, and one SEVERE card at 15 — regardless of how many webhook calls arrive.`,
      },
      {
        title: "Daily window reset via report_log",
        body: `Error counts need to reset daily so contractors don't accumulate milestones across multiple days. The window anchor is: <code>received_at >= COALESCE((SELECT MAX(ran_at) FROM report_log WHERE report_type = 'daily'), CURRENT_DATE)</code>.

When the daily report job runs, it writes a row to <code>report_log</code>. The next Grafana alert after that timestamp starts a fresh count. This couples the alert window to the reporting cycle — both systems see the same day boundary without a separate cron or reset job.`,
      },
      {
        title: "Anti-spam lock — same pattern as Wazuh real-time pipeline",
        body: `Grafana alertmanager can replay alerts if n8n returns a non-2xx response, and multiple firing alerts can arrive in rapid succession. Without a lock, two parallel executions could both read <code>error_count = 5</code> and each send a card.

The lock: <code>AND last_inserted_id = {{ $('Insert rows in a table').item.json.id }}</code> compares the row id the current execution just inserted against the maximum id for this contractor. If another execution inserted a row between this INSERT and this SELECT, the ids differ and the query returns empty. Only the execution that atomically claims "latest row" sends the card.`,
      },
      {
        title: "context_campaign label convention — Grafana alert labeling standard",
        body: `Grafana routes all alerts to the same webhook contact point. The filter requires at least one label key starting with <code>context_campaign</code> to distinguish CRM integration alerts from infrastructure alerts (node down, datasource errors, etc.) that share the same contact point.

This convention was established in the Grafana alert rules: every rule that monitors a CRM integration adds <code>context_campaign_id</code> and <code>context_campaign_name</code> labels from the query's data. Infrastructure rules don't, so they pass through n8n without touching PostgreSQL.`,
      },
    ],

    nextSteps: [
      "Add a <code>reviewed</code> flag update endpoint so triage actions from Teams can mark alerts as reviewed",
      "Implement a fourth milestone (≥ 20 errors) that pages the on-call engineer via SMS/PagerDuty",
      "Build a daily summary card from the same <code>crm_alerts</code> table, analogous to the Wazuh weekly report",
      "Add deduplication at the INSERT level to prevent the same Grafana alert from logging twice on retries",
    ],
  },

  // ── Power Automate: IT Support KB Bot ────────────────────────────────────
  {
    title: "IT Support KB Answer Bot",
    slug: "it-support-kb-power-automate",
    category: "power-automate",
    tags: ["ai-builder", "sharepoint", "teams", "knowledge-base", "it-support", "nlp"],
    summary: "Power Automate flow that monitors a Microsoft Teams IT Support channel and auto-answers incoming questions using AI Builder. Loads the full knowledge base from a SharePoint list on every run, sends the KB + the user's question to an AI Builder custom prompt, and replies in-thread — or gracefully escalates to the IT team when confidence is insufficient.",
    role: "Design & build",
    tools: ["Power Automate", "AI Builder", "Microsoft Teams", "SharePoint", "Microsoft 365"],
    status: "Completed",
    published: true,
    featured: false,
    cover: "img/it-support-kb-power-automate/cover.png",
    date: "Jun 2026",

    overview: `An AI-powered Q&A bot for internal IT Support, built entirely within the Microsoft 365 ecosystem — no external APIs, no Azure OpenAI subscription, no custom backend.

The flow monitors a Teams channel by polling every minute for new messages. When a question arrives, it pulls up to 100 entries from a SharePoint knowledge base list (each entry has a title, question, answer, keywords, and status), formats them as a single text block, and passes both the KB and the user's question to an AI Builder custom prompt that returns a structured JSON response.

If the AI finds a match with sufficient confidence, the bot replies in the thread with the answer. If not, it replies with a standard escalation message tagging the IT team — so no question is silently dropped.

The knowledge base lives in SharePoint, making it editable by non-technical IT staff without touching the flow. Adding a new Q&A pair is as simple as adding a row to the list.`,

    architectureMermaid: `flowchart TD
    POLL["Teams Trigger\\nPoll every 1 minute\\nIT Support channel"] -->|"new message batch"| EACH["Apply to Each"]
    EACH --> EXTRACT["Compose\\nextract message body text"]
    EXTRACT --> SP["SharePoint — Get Items\\nIT Support KB list\\ntop 100 entries"]
    SP --> SEL["Select\\nmap fields:\\nTitle · Question · Answer\\nKeywords · Status"]
    SEL --> JOIN["Compose\\njoin all KB entries\\nas newline-separated text block"]
    JOIN --> AI["AI Builder\\nCustom Prompt\\nInputs: KBItems + UserQuestion\\nOutput: JSON schema"]
    AI --> PARSE["Parse JSON\\nanswerFound · confidence\\nanswer · source"]
    PARSE --> COND{"answer_found?"}
    COND -->|"true"| YES["Reply in thread\\nAI-generated answer\\n(Flow Bot)"]
    COND -->|"false"| NO["Reply in thread\\n'No confirmed answer found'\\nTag IT Support team"]`,

    components: [
      {
        id: "kb-schema",
        title: "SharePoint Knowledge Base — List Schema",
        type: "list",
        description: "The knowledge base is a standard SharePoint list, editable directly by IT staff. The flow maps internal SharePoint field names to readable keys before passing to AI Builder.",
        items: [
          "<code>Title</code> — entry name / topic label",
          "<code>field_1</code> (Question) — the canonical form of the question",
          "<code>field_2</code> (Answer) — the approved answer text",
          "<code>field_3</code> (Keywords) — comma-separated keywords for AI matching",
          "<code>field_5</code> (Status) — Active / Draft / Deprecated; lets IT staff retire entries without deleting them",
          "Up to 100 entries loaded per run via <code>$top=100</code> on the SharePoint connector",
        ],
      },
      {
        id: "ai-prompt",
        title: "AI Builder Custom Prompt — Structured Output",
        type: "list",
        description: "The prompt receives the full KB as a text block and the user's Teams message, and is instructed to return a fixed JSON schema so Power Automate can parse it deterministically.",
        items: [
          "Input: <code>KBItems</code> — all KB entries joined with double newlines",
          "Input: <code>UserQuestion</code> — raw Teams message body (HTML stripped by Compose step)",
          "Output schema: <code>{ answer_found: boolean, confidence: float 0–1, answer: string, source: string }</code>",
          "<code>answer_found: false</code> instructs the flow to escalate instead of guessing — prevents hallucinated answers reaching users",
          "<code>source</code> field tracks which KB entry was matched, for future logging",
          "Runs on AI Builder standard tier — no Azure OpenAI subscription or custom deployment needed",
        ],
      },
      {
        id: "reply-logic",
        title: "Reply Logic — Thread-Aware Responses",
        type: "list",
        description: "Both reply actions use the Teams connector's 'Reply to conversation' operation, targeting the original message's ID so the response appears as a thread reply.",
        items: [
          "Reply target: <code>parentMessageId = items('Apply_to_each')['id']</code> — anchors to the original question",
          "Poster: Flow Bot identity (no personal account impersonation)",
          "Success reply: AI-generated answer wrapped in paragraph HTML",
          "Fallback reply: <code>'I couldn't find a confirmed answer in the current IT Support KB. IT Support team, please review this question.'</code>",
          "Both branches post to the same group + channel, maintaining full thread context",
        ],
      },
    ],

    designDecisions: [
      {
        title: "SharePoint list as knowledge base — zero-code updates for IT staff",
        body: `Using a SharePoint list instead of a database or JSON file means IT staff can update the KB directly in the SharePoint web UI without touching Power Automate. Adding a new Q&A pair, retiring an outdated entry, or flagging a draft are all list operations.

The flow's Select step maps the internal <code>field_1/2/3/5</code> column names to readable keys (<code>Question</code>, <code>Answer</code>, <code>Keywords</code>, <code>Status</code>) so the prompt sees clean labels regardless of how SharePoint names the columns internally.`,
      },
      {
        title: "Full KB reload on every run — simplicity over caching",
        body: `The flow fetches all 100 KB items fresh on every trigger run rather than caching them in a variable or storage. This means every answer is always based on the current KB state — no stale cache to invalidate, no sync job to maintain.

The tradeoff is a SharePoint API call per message. At IT Support volume (low single-digit messages per minute peak), this is negligible. If the KB grew past 100 entries or volume spiked, pagination or a caching layer would become necessary.`,
      },
      {
        title: "Structured JSON output schema prevents prompt brittleness",
        body: `Free-text AI output is hard to act on in a no-code environment. The AI Builder custom prompt is instructed to always return a JSON object with four typed fields. Power Automate's Parse JSON action then validates and extracts each field, so the Condition check on <code>answer_found</code> is a clean boolean gate.

If the AI returns malformed JSON, the Parse JSON step fails and the run errors — which is preferable to silently sending a malformed reply to the Teams channel.`,
      },
      {
        title: "Poll trigger instead of push — Teams connector limitation",
        body: `Power Automate's Teams 'When a new channel message is added' trigger uses polling (every 1 minute on the standard tier) rather than a push webhook. This means there's up to a 60-second delay between a question being posted and the bot replying.

For an IT Support Q&A bot, a 60-second response time is acceptable and often faster than waiting for a human teammate. A premium trigger or Azure Bot Framework integration would reduce latency to near-real-time but would require additional licensing.`,
      },
    ],

    nextSteps: [
      "Log answered questions and confidence scores to a SharePoint list for KB gap analysis",
      "Add a 'thumbs up / thumbs down' reaction listener to collect implicit quality feedback on answers",
      "Upgrade to per-channel adaptive polling — higher frequency during business hours, lower overnight",
      "Add a KB admin command: a special message prefix that lets IT staff add a new KB entry directly from Teams",
    ],
  },

  // ── Power Automate: Contractor Benefits Lead Enrichment ───────────────────
  {
    title: "Contractor Benefits Lead Enrichment",
    slug: "contractor-benefits-enrichment-pa",
    category: "power-automate",
    tags: ["lead-enrichment", "excel", "ricochet", "api", "webhook", "data-sync", "homeservices"],
    summary: "Two-step Power Automate flow that acts as a webhook microservice: receives a lead ID and company name, looks up that contractor's benefits from an Excel table in SharePoint, and writes all 10 benefit fields to the lead record via the Ricochet API in a single PUT — no code, no database.",
    role: "Design & build",
    tools: ["Power Automate", "Excel Online", "SharePoint", "Ricochet API"],
    status: "Completed",
    published: true,
    featured: false,
    cover: "img/contractor-benefits-enrichment-pa/cover.png",
    date: "May 2026",

    overview: `A lightweight webhook that bridges two systems with no custom code: an Excel spreadsheet maintained by the sales/ops team, and Ricochet's lead management API.

When a lead is matched to a contractor in Ricochet, the upstream system calls this flow with the lead ID and company name. The flow looks up the contractor's row in the Excel benefits table and immediately pushes all 10 benefit fields (financing options, warranty, promotions, insurance acceptance, senior/veteran discounts, quote validity, etc.) to the lead record.

The result: every Ricochet lead automatically carries the contractor's full benefits profile without anyone manually copying data between the spreadsheet and the CRM. The ops team keeps the spreadsheet; the flow keeps the leads in sync.`,

    architectureMermaid: `flowchart TD
    CALLER["Upstream System\\n(lead matching service)"] -->|"POST {Leadid, Company}"| HTTP_IN["HTTP Trigger\\n(webhook)"]
    HTTP_IN --> XL["Excel Online\\nList rows from SharePoint table\\nFilter: Company_Name = Company\\nreturns matching contractor row"]
    XL --> API["HTTP PUT\\nRicochet API\\n/leads/{Leadid}\\n10 benefit fields from first() row"]
    API --> RICO["Ricochet Lead Record\\nenriched with contractor benefits"]`,

    components: [
      {
        id: "trigger",
        title: "HTTP Trigger — Webhook Interface",
        type: "list",
        description: "The flow exposes a standard Power Automate HTTP trigger, turning it into a callable webhook that any upstream service can invoke without Power Automate credentials.",
        items: [
          "Method: POST, auth: All (URL-authenticated via the auto-generated SAS token in the trigger URL)",
          "Input schema: <code>{ Leadid: string, Company: string }</code>",
          "<code>Leadid</code> — the Ricochet lead record to update",
          "<code>Company</code> — the contractor company name, used as the lookup key in the Excel table",
        ],
      },
      {
        id: "excel-lookup",
        title: "Excel Online — Contractor Benefits Table",
        type: "list",
        description: "The Excel table in SharePoint is the single source of truth for contractor benefits. The flow queries it with an OData filter to return only the matching company row.",
        items: [
          "Source: Excel Online (Business) — file hosted in a SharePoint group drive",
          "Filter: <code>Company_Name eq '{Company}'</code> — OData filter applied server-side",
          "Lookup: <code>first(body('Enumerar_las_filas_de_una_tabla')['value'])</code> — takes the first matching row",
          "10 columns mapped: Phone Number, Offers Financing?, Offer Promotions?, Offer Warranty?, Accept Insurance Claims?, Offer Other Products or Services?, Offer Senior Discount?, Offer Military Discount?, How Long is quote good for?, Additionals Comments",
        ],
      },
      {
        id: "ricochet-put",
        title: "Ricochet API — Lead Enrichment PUT",
        type: "list",
        description: "A single HTTP PUT call updates all 10 benefit fields on the lead record simultaneously.",
        items: [
          "Endpoint: <code>PUT https://ricochet.me/api/v4/leads/{Leadid}</code>",
          "Auth: <code>X-AUTH-TOKEN</code> header (API key, value masked)",
          "<code>company_contact_number</code> ← Excel 'Phone Number'",
          "<code>financing_options</code> ← Excel 'Offers Financing?'",
          "<code>runs_promotions_offers</code> ← Excel 'Offer Promotions?'",
          "<code>offer_warranty</code> ← Excel 'Offer Warranty?'",
          "<code>accepts_insurance_claims</code> ← Excel 'Accept Insurance Claims?'",
          "<code>offer_other_products</code> ← Excel 'Offer Other Products or Services?'",
          "<code>offers_senior_discounts</code> ← Excel 'Offer Senior Discount?'",
          "<code>offers_veteran_discounts</code> ← Excel 'Offer Military Discount?'",
          "<code>how_long_quote_is_good_for</code> ← Excel 'How Long is quote good for?'",
          "<code>Additional_Comments</code> ← Excel 'Additionals Comments'",
        ],
      },
    ],

    designDecisions: [
      {
        title: "Excel as the benefits data store — ops-owned, no IT dependency",
        body: `Contractor benefits change frequently: a contractor adds financing, drops a discount, updates their quote validity window. If this data lived in a database, every change would require a developer or an admin panel.

By keeping the benefits in an Excel table on SharePoint, the sales/ops team can update it directly. The flow always reads the latest version — no cache to invalidate, no migration to run. The only rule: the Company_Name column must exactly match what the upstream system sends as the Company parameter.`,
      },
      {
        title: "HTTP trigger turns Power Automate into a microservice",
        body: `Instead of building a dedicated API server or Lambda function for a simple lookup-and-write operation, the HTTP trigger endpoint on Power Automate handles the request. The trigger URL contains a SAS token that authenticates callers without requiring them to have Microsoft 365 credentials.

Any system that can make an HTTP POST can call this flow — the lead matching service, a CRM webhook, or a manual trigger from Postman during testing. This makes the flow independently testable and decoupled from the caller's tech stack.`,
      },
      {
        title: "Single PUT for all 10 fields — atomic update",
        body: `All 10 benefit fields are sent in one HTTP PUT body rather than 10 separate PATCH calls. This means Ricochet either receives the full contractor benefits profile or nothing — there's no partial state where some fields are updated and others aren't.

The tradeoff is that if the Excel row is missing a field, Ricochet receives an empty string for that field rather than leaving the existing value untouched. For this use case, the Excel table is maintained to always have complete rows, so partial updates weren't a concern.`,
      },
    ],

    nextSteps: [
      "Add error handling: if no Excel row matches the company name, return a 404-style response body instead of sending empty fields to Ricochet",
      "Add a response action to return the Ricochet API response status back to the caller",
      "Replace the Excel lookup with a SharePoint List for better filtering, versioning, and multi-user editing support",
      "Log each enrichment call to an audit table (company, leadId, timestamp) for troubleshooting data mismatches",
    ],
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function getCategoryBySlug(slug) {
  return CATEGORIES.find(c => c.slug === slug) || { slug, label: slug, color: '#888', bg: '#f5f5f5' };
}

function getProjectBySlug(slug) {
  return PROJECTS.find(p => p.slug === slug) || null;
}

function getPublishedProjects() {
  return PROJECTS.filter(p => p.published).sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
}
