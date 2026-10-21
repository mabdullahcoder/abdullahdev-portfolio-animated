/**
 * Portfolio project showcase. `accent` tints each card.
 *
 * Media: put a real screenshot at `public/images/projects/<id>.png` (or .jpg/.webp/.avif) and it
 * replaces the mockup automatically. `shot` picks its frame — "browser" (web/desktop apps),
 * "phone" (mobile apps) or "full" (artwork that fills the panel). Without a screenshot, `visual`
 * selects the illustrative mockup (see components/sections/products/visuals).
 *
 * Replace `url` with each project's live site, repo or case study.
 */
export const PRODUCTS = [
  {
    id: "lumen",
    name: "Lumen",
    accent: "#3b6cff",
    logo: "lumen",
    url: "#",
    tags: ["Personal project", "Electron", "OpenAI"],
    headline: ["A browser with an", "AI reading assistant"],
    description:
      "A lightweight Electron browser with a built-in AI sidebar that summarizes articles and saves highlights to a reading list. I built the React UI, a small Node.js API for saved highlights, and the OpenAI integration.",
    visual: "lumen",
    shot: "browser",
  },
  {
    id: "vault-mail",
    name: "Vault Mail",
    accent: "#21c26a",
    logo: "vault-mail",
    url: "#",
    tags: ["Internship", "React Native", "REST API"],
    headline: ["Mobile email client", "with privacy built in"],
    description:
      "During my internship I built the React Native inbox for an encrypted email service — search, labels and masked aliases — connected to the team's REST API. My first time shipping features to real users.",
    visual: "vault-mail",
    shot: "phone",
  },
  {
    id: "unify-api",
    name: "Unify API",
    accent: "#8b7bff",
    logo: "unify-api",
    url: "#",
    tags: ["Personal project", "Node.js", "PostgreSQL"],
    headline: ["One endpoint for", "multiple AI models"],
    description:
      "A small API gateway that routes requests to 10+ AI models through a single endpoint, with API keys, rate limiting and a usage dashboard. Built with Express, TypeScript and PostgreSQL, plus a React playground.",
    visual: "unify-api",
    shot: "browser",
  },
  {
    id: "taskpilot",
    name: "Taskpilot",
    accent: "#c8f23f",
    logo: "taskpilot",
    url: "#",
    tags: ["Hackathon", "Electron", "AI"],
    headline: ["Automate everyday tasks", "with AI skills"],
    description:
      "Built with a team of three in a 48-hour hackathon: a desktop app where small AI skills triage email, book meetings and send a daily digest. I owned the backend, the Gmail and Calendar integrations, and the skill toggles.",
    visual: "taskpilot",
    shot: "browser",
  },
  {
    id: "polychat",
    name: "Polychat",
    accent: "#6b7bff",
    logo: "polychat",
    url: "#",
    tags: ["Freelance", "Next.js", "Stripe"],
    headline: ["Five AI models", "in one chat app"],
    description:
      "A freelance project: an AI chat app that lets users switch between GPT, Claude, Gemini and more in one conversation, with streaming replies and image generation. I built it end to end — Next.js, Node.js, auth and Stripe subscriptions.",
    visual: "polychat",
    shot: "browser",
  },
  {
    id: "morph",
    name: "Morph",
    accent: "#25d07a",
    logo: "morph",
    url: "#",
    tags: ["Personal project", "React Native", "Firebase"],
    headline: ["Turn any photo into", "AI-styled art"],
    description:
      "A mobile app that applies AI style effects — anime, clay, retro and more — to photos using an image-generation API. Firebase handles accounts, storage and saved results, and the effect queue runs on a small Node.js worker.",
    visual: "morph",
    shot: "phone",
  },
  {
    id: "signchain",
    name: "SignChain",
    accent: "#2ad4ff",
    logo: "signchain",
    url: "#",
    tags: ["Capstone project", "Next.js", "Solidity"],
    headline: ["Document signing", "verified on-chain"],
    description:
      "My capstone project: a document-signing web app that stores a hash of every signed file on an Ethereum testnet, creating a tamper-proof audit trail. Built with Next.js, ethers.js and a simple Solidity contract.",
    visual: "signchain",
    shot: "browser",
  },
  {
    id: "localmind",
    name: "LocalMind",
    accent: "#4f8cff",
    logo: "localmind",
    url: "#",
    tags: ["Open source", "Tauri", "React"],
    headline: ["Chat with AI models", "fully offline"],
    description:
      "My first open-source project: a desktop app for downloading and chatting with open-weight models like Llama and Qwen through Ollama, completely offline. Built with Tauri, React and TypeScript. Issues and pull requests welcome.",
    visual: "localmind",
    shot: "browser",
  },
];
