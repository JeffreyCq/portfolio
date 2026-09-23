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

    imagesNeeded: [
      "pipelines.png — Residential Sales and Nurture pipeline boards",
      "landing-page.png — landing page funnel (desktop + mobile)",
      "calendar-settings.png — Free Estimate Visit calendar settings",
      "a2-workflow.png, a2b-workflow.png, a2c-workflow.png — remaining workflow canvases",
      "a1-execution-log-hot.png, a1-execution-log-warm.png, a1-execution-log-nurture.png — execution logs",
      "opportunities-board.png — opportunities board after test runs",
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
    cover: null,
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
    published: true,
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
    published: true,
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
    published: true,
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
    published: true,
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
    title: "Operational Metrics Dashboard — Jira Forge App",
    slug: "quinstreet-jira-dashboard",
    category: "jira-forge",
    tags: ["atlassian-forge", "jira", "kpi", "charts", "sla", "typescript", "async-queue"],
    summary: "Atlassian Forge app that surfaces live operational KPIs for internal security and support Jira projects: SLA breach rate, time-in-progress, reopen rate, and backlog aging — with rule-based action suggestions and configurable thresholds.",
    role: "Design & build (solo)",
    tools: ["Atlassian Forge", "TypeScript", "React", "Forge KV Store", "Forge Events", "Jira REST API", "Jest"],
    status: "Completed",
    published: true,
    featured: false,
    cover: null,
    date: "Sep 2026",

    note: "Built for internal use at HomeBuddy (Quinstreet). Deployed to Atlassian Forge infrastructure.",

    overview: `Jira project page app built on Atlassian Forge for the INFOSEC, CT, and ATLAS internal teams. Pulls live Jira issue data, computes operational KPIs, and renders them as stat cards and charts. A rule-based "Insights" engine derives ranked, severity-tagged action suggestions from the same RAG thresholds used by the stat cards — deterministic, no AI dependency. A background async job handles heavy metric computation so the UI stays responsive.`,

    components: [
      {
        id: "kpis",
        title: "KPIs & Charts",
        type: "table",
        headers: ["Metric", "Visualization"],
        rows: [
          ["SLA breach rate", "RAG stat card + donut chart"],
          ["Average time-in-progress", "RAG stat card + line trend"],
          ["SLA compliance %", "RAG stat card"],
          ["Reopen rate", "RAG stat card"],
          ["Ticket volume by priority", "Horizontal bar chart"],
          ["Backlog aging buckets", "Stacked bar chart"],
          ["Status flow", "Stacked bar chart"],
        ],
      },
      {
        id: "insights",
        title: "Insights Engine",
        type: "list",
        items: [
          "Rule-based engine derives ranked, severity-tagged action suggestions from RAG thresholds",
          "Deterministic — no AI dependency; suggestions update as metrics change",
          "Configurable thresholds and agent exclusions via project settings page",
          "Project allowlist enforced both client-side and server-side (resolver guard)",
        ],
      },
      {
        id: "infra",
        title: "Infrastructure",
        type: "list",
        items: [
          "Background async compute job (15-minute timeout) via Forge Events queue",
          "KV-cached results with cache staleness detection",
          "Error boundary + global error handler wiring in the frontend",
          "Jest + Testing Library unit and component tests",
          "Semgrep security scanning in CI",
        ],
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
    tags: ["electron", "monaco-editor", "json", "desktop-app", "claude", "diff", "yaml", "csv"],
    summary: "Cross-platform Electron desktop app for working with JSON files: Monaco-powered editor, live tree viewer, format/repair/diff/convert tools, JSON Schema validation, and AI-assisted repair via Claude Haiku.",
    role: "Design & build (solo)",
    tools: ["Electron", "React", "TypeScript", "Monaco Editor", "Vite", "Anthropic SDK", "AJV", "electron-builder"],
    status: "Completed",
    published: true,
    featured: false,
    cover: null,
    date: "Sep 2026",

    overview: `Cross-platform Electron desktop application for working with JSON files at any scale. Combines a Monaco-powered editor (same engine as VS Code) with a live interactive tree view, a full set of transformation tools, and an AI-assisted repair feature powered by Claude Haiku. Ships as an NSIS installer and portable <code>.exe</code> for Windows, and a DMG for macOS.`,

    components: [
      {
        id: "editor",
        title: "Editor & Tabs",
        type: "list",
        items: [
          "Multi-tab editor with session restore, drag-to-reorder tabs, and unsaved-change tracking",
          "Monaco Editor (VS Code engine) with JSON syntax highlighting and error markers",
          "JSON Lines (JSONL / NDJSON) mode with per-line navigation",
          "File associations for <code>.json</code>, <code>.jsonl</code>, <code>.ndjson</code>; recent files list; drag-and-drop opening",
        ],
      },
      {
        id: "tools",
        title: "Transformation Tools",
        type: "list",
        items: [
          "Format (pretty-print), minify, repair, sort keys, escape / unescape",
          "AI-powered repair via Claude Haiku — optional Anthropic API key",
          "Side-by-side diff comparison between any two open files",
          "Global search across all open tabs",
          "JSON Schema validation (AJV)",
          "Export to YAML and CSV",
        ],
      },
    ],

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
    published: true,
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
    cover: null,
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
    cover: null,
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
