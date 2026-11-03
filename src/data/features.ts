export interface FeatureItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'core' | 'privacy' | 'productivity' | 'architecture';
  verifiedNote?: string;
  bulletPoints: string[];
}

export interface ShowcaseSlide {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  width: number;
  height: number;
  highlights: { title: string; desc: string }[];
}

export const showcaseSlides: ShowcaseSlide[] = [
  {
    id: 'new-tab',
    eyebrow: 'Everyday Workspace',
    title: 'A New Tab Designed Around Focus & Intention',
    description:
      'Start every session with a calm, customizable dashboard. Fast access to your favorite shortcuts, continue recent browsing, launch quick actions, and customize your visual theme with serene landscapes or custom wallpapers.',
    imageSrc: '/assets/screenshots/s1.png',
    imageAlt: 'SIDB Browser New Tab page featuring custom wallpaper, search bar, shortcuts, and quick actions',
    width: 1903,
    height: 1026,
    highlights: [
      {
        title: 'Instant Search & Suggestions',
        desc: 'Unified address bar and homepage search supporting Google, DuckDuckGo, Bing, and Brave.',
      },
      {
        title: 'Quick Actions & Shortcuts',
        desc: 'Launch private windows, reopen downloads, review history, or organize your shortcut grid in seconds.',
      },
      {
        title: 'Theme & Wallpaper Control',
        desc: 'Switch between dark scenery, celestial midnight, aurora gradients, or custom local background images.',
      },
    ],
  },
  {
    id: 'ai-workspace',
    eyebrow: 'Intelligent Assistance',
    title: 'Focused AI Assistance, Strictly On Your Terms',
    description:
      'SIDB AI is an optional, non-intrusive companion powered by NVIDIA hosted models using your personal API key. Page content is never shared automatically — only when you explicitly request a summary, explanation, or translation.',
    imageSrc: '/assets/screenshots/s2.png',
    imageAlt: 'SIDB AI assistant workspace interface showing summarization, translation, and key point actions',
    width: 1908,
    height: 993,
    highlights: [
      {
        title: 'Explicit User Consent',
        desc: 'Nothing is read until you ask. No continuous background scanning and zero transmission from private windows.',
      },
      {
        title: 'Side Panel or Full Workspace',
        desc: 'Use the quick sidebar panel for immediate page summaries or expand to full-screen for deep coding and research.',
      },
      {
        title: 'Your Own Model & Key',
        desc: 'Direct connection to NVIDIA developer models with API keys encrypted locally using your operating system credentials.',
      },
    ],
  },
  {
    id: 'settings-data',
    eyebrow: 'Local Sovereignty',
    title: 'Independent Profiles, SQLite Storage & Daily Backups',
    description:
      'Your browsing data belongs solely to you. Each profile runs with dedicated SQLite databases and isolated Chromium storage. Automatic rolling daily backups guarantee your bookmarks and history are safe without cloud dependencies.',
    imageSrc: '/assets/screenshots/s3.png',
    imageAlt: 'SIDB Browser settings screen showing appearance controls, profile isolation, and backup management',
    width: 1919,
    height: 1029,
    highlights: [
      {
        title: 'Isolated Multi-Profiles',
        desc: 'Personal, Work, and Study profiles maintain isolated cookies, sessions, bookmarks, and distinct preferences.',
      },
      {
        title: 'Automatic Daily Backups',
        desc: 'Local rolling backups store your 5 latest configuration snapshots with one-click export and import.',
      },
      {
        title: 'Zero Telemetry by Default',
        desc: 'No user tracking, no third-party telemetry, and no automatic background crash uploads.',
      },
    ],
  },
];

export const coreFeatures: FeatureItem[] = [
  {
    id: 'adaptive-tabs',
    title: 'Adaptive Tab System',
    tagline: 'Horizontal bar or vertical rail with collapsible groups',
    description:
      'Seamlessly switch between a classic top tab bar and an ergonomic vertical tab rail. Organize workflows into color-coded collapsible tab groups, pin critical pages, and search open tabs with Ctrl+Shift+A.',
    category: 'productivity',
    bulletPoints: [
      'Toggle horizontal or vertical layouts without losing active state',
      'Color-coded tab groups with one-click collapse/expand',
      'Instant tab search and quick audio mute controls',
    ],
  },
  {
    id: 'sleeping-tabs',
    title: 'On-Demand Sleeping Tabs',
    tagline: 'Save system memory without unpredictable tab closing',
    description:
      'Put heavy tabs to sleep on demand. A sleeping tab is dimmed with a moon indicator and releases RAM while preserving URL history. SIDB never closes or sleeps your tabs automatically against your will.',
    category: 'core',
    bulletPoints: [
      'Preserves exact scroll position and navigation history upon wake',
      'Protected tabs: active audio/video, forms, and pinned tabs never sleep',
      'Explicit user control — no unexpected reloads during active work',
    ],
  },
  {
    id: 'command-palette',
    title: 'Unified Command Palette',
    tagline: 'Lightning-fast keyboard navigation across every feature',
    description:
      'Press Ctrl+K from anywhere to open the command palette. Jump to open tabs, switch profiles, open downloads, toggle Shield, or adjust settings without taking your fingers off the keyboard.',
    category: 'productivity',
    bulletPoints: [
      'Accessible via universal Ctrl+K shortcut',
      'Search bookmarks, history, and browser settings in real time',
      'Quick actions for private windows, screenshots, and QR codes',
    ],
  },
  {
    id: 'private-windows',
    title: 'Truly Ephemeral Private Windows',
    tagline: 'Separate Chromium sessions that leave zero trace upon exit',
    description:
      'Private windows operate in a completely isolated temporary Chromium session. Closing the window instantly destroys cookies, cache, and session storage. Downloaded files are kept safely in your folder.',
    category: 'privacy',
    bulletPoints: [
      'Zero history written to normal profile databases',
      'Completely isolated cookie jar — no session bleeding',
      'AI assistant and contextual memory are strictly disabled in private mode',
    ],
  },
  {
    id: 'data-ownership',
    title: 'Local SQLite Architecture',
    tagline: 'Direct, typed database storage with automated rolling backups',
    description:
      'Built with SQLite and Drizzle ORM. Bookmarks, history, and settings are stored locally in standard databases on your machine. Automatic 5-day backup retention safeguards your workspace.',
    category: 'architecture',
    bulletPoints: [
      'Structured SQLite storage per profile (%APPDATA%\\SIDB on Windows)',
      'Standard HTML bookmark import & export for cross-browser mobility',
      'Automatic rolling backups with one-click restore',
    ],
  },
  {
    id: 'desktop-experience',
    title: 'Modern Chromium Engine',
    tagline: 'Electron 45 & Chromium 156 with WebContentsView architecture',
    description:
      'Enjoy full compatibility with modern web standards, streaming platforms, and web apps while benefiting from a tailored, lightweight native desktop shell with hardware acceleration.',
    category: 'core',
    bulletPoints: [
      'Modern Chromium 156 rendering with full web standard support',
      'High-performance WebContentsView architecture',
      'Native keyboard shortcuts, zoom controls, and print previews',
    ],
  },
];

export const shieldDetails = {
  title: 'SIDB Shield',
  subtitle: 'Native Ad & Tracker Defense Built Directly into the Request Pipeline',
  description:
    'SIDB Shield filters network traffic before unwanted connections consume bandwidth, memory, or battery. Designed with transparency and realistic capabilities.',
  pillars: [
    {
      title: 'Filter List Engine',
      description:
        'Processes standard, community-verified blocklists (EasyList, EasyPrivacy) locally. Automatically checks for list updates daily in the background and rolls back safely if an update fails.',
    },
    {
      title: 'Best-Effort YouTube Ad Protection',
      description:
        'Engineered to block common video ads and interrupting promotional popups on YouTube. Because platforms evolve delivery techniques continuously, Shield is designed for honest, reliable best-effort mitigation without brittle hacks.',
    },
    {
      title: 'Tracker & Popup Prevention',
      description:
        'Stops third-party analytics scripts, invisible fingerprinting pixels, and aggressive new-window popups before they launch.',
    },
    {
      title: 'Safe Browsing & Encrypted DNS',
      description:
        'Optional integration with Google Safe Browsing warning dialogues for malicious URLs, alongside configurable DNS-over-HTTPS (DoH) with transparent system DNS fallback.',
    },
  ],
  transparencyPoints: [
    'No claims of 100% ad blocking across every site — web standards and delivery techniques change constantly.',
    'No false claims of complete anonymity or untraceable browsing.',
    'Granular per-site whitelist toggles so you can instantly enable ads for content creators you support.',
    'Shield statistics provide clear counts of requests intercepted during each browsing session.',
  ],
};

