// portfolio/data.js
// ─────────────────────────────────────────────────────────────────────────────
// To add a new project: add an entry to PROJECTS below (published: true to show it).
// To add a new category: add an entry to CATEGORIES below.
// No other files need to change.
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    slug: 'gohighlevel',
    label: 'GoHighLevel',
    color: '#f97316',
    bg: 'rgba(249,115,22,0.08)',
    description: 'CRM pipelines, workflows, funnels and lead automation',
  },
  {
    slug: 'n8n',
    label: 'n8n',
    color: '#e11d48',
    bg: 'rgba(225,29,72,0.07)',
    description: 'Self-hosted workflow automation and API integrations',
  },
  {
    slug: 'aws-lambda',
    label: 'AWS Lambda',
    color: '#d97706',
    bg: 'rgba(217,119,6,0.08)',
    description: 'Serverless functions, event-driven processing',
  },
  {
    slug: 'power-automate',
    label: 'Power Automate',
    color: '#0078d4',
    bg: 'rgba(0,120,212,0.07)',
    description: 'Microsoft 365 flows and business process automation',
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
    cover: "img/ghl-contractor-lead-system/cover.png",
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
      { src: "img/ghl-contractor-lead-system/a1-workflow.png", alt: "A1 – New Lead Intake & Routing workflow canvas" },
      { src: "img/ghl-contractor-lead-system/pipelines.png", alt: "Residential Sales and Nurture pipeline boards" },
      { src: "img/ghl-contractor-lead-system/custom-fields.png", alt: "Custom fields configuration in GHL" },
      { src: "img/ghl-contractor-lead-system/form.png", alt: "Free Estimate Request form with SMS consent checkboxes" },
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
      "cover.png — A1 workflow canvas (zoomed out)",
      "custom-fields.png",
      "pipelines.png",
      "form.png",
      "landing-page.png (desktop + mobile)",
      "calendar-settings.png",
      "a1-workflow.png, a2-workflow.png, a2b-workflow.png, a2c-workflow.png",
      "a1-execution-log-hot.png, a1-execution-log-warm.png, a1-execution-log-nurture.png",
      "opportunities-board.png",
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
