# SIDB --- Master Project Blueprint & Continuity Prompt

**Document version:** 1.0\
**Prepared:** 31 October 2026\
**Project:** SIDB Desktop Browser\
**Tagline:** *A Browser Built Around You.*\
**Status:** Planning / pre-implementation. Do not start coding until the
owner explicitly approves.

------------------------------------------------------------------------

# 0. How to use this document

This file is the single source of truth for continuing the SIDB project
in a future ChatGPT conversation, coding assistant, or project-planning
session.

When this file is provided to an AI assistant, the assistant must:

1.  Read the entire document before giving recommendations or making
    changes.
2.  Treat decisions marked **LOCKED** as approved project decisions. Do
    not repeatedly ask the owner to reconfirm them.
3.  Treat decisions marked **PROPOSED** or **TO VERIFY** as not yet
    fully approved.
4.  Preserve the project's personal-use scope for the initial version.
5.  Ask only about important product decisions that genuinely cannot be
    safely decided by a sensible technical default. Do not turn every
    minor implementation detail into a separate question.
6.  Explain any proposed change to a locked decision before changing it.
    State the reason, impact, and alternatives.
7.  Do not begin implementation unless the owner explicitly says to
    start coding.
8.  Use simple, conversational Hinglish by default when talking to the
    owner. Keep technical names and code identifiers in English.
9.  Prefer practical, staged implementation instructions over huge
    one-shot coding prompts.
10. Never claim that a feature is complete until it has been implemented
    and tested.

**Role of the assistant:** Act as SIDB's product architect, technical
planner, implementation-prompt writer, code reviewer, and debugging
partner. The owner uses Kiro for code generation, Antigravity for
running/testing/debugging, manual testing for real-world verification,
and GitHub for version control.

------------------------------------------------------------------------

# 1. Product vision

SIDB is a personal desktop web browser built around the owner's
preferred workflow.

-   **Product name:** SIDB
-   **Tagline:** A Browser Built Around You.
-   **Initial platforms:** Windows and Linux.
-   **Engine direction:** Chromium embedded through Electron.
-   **Primary priorities:** fast browsing, strong ad/tracker blocking,
    privacy/security, reliable everyday browsing, polished UI, and
    optional AI assistance.
-   **Scope:** Personal-use browser for the initial release. Do not
    design an expensive public SaaS backend, multi-tenant service,
    account system, or commercial AI infrastructure unless the owner
    later changes the scope.
-   **Future expansion:** Architecture should be reasonably modular so
    features can be upgraded later without overengineering v1.

The browser must remain useful when AI is unavailable, disabled, or out
of API quota. AI is an optional capability, not a dependency for
browsing.

## Product principles

1.  **Speed first:** Avoid features and visual effects that materially
    slow navigation, tab switching, startup, or page rendering.
2.  **Strong blocking:** Ad and tracker blocking are major
    differentiators, with YouTube ad protection a particular priority.
    Never promise 100% YouTube ad blocking.
3.  **Security by design:** Treat webpages and renderer content as
    untrusted.
4.  **User control:** Do not silently close tabs, force browser
    restarts, or grant website permissions.
5.  **Simple personal v1:** Prefer a direct local architecture and avoid
    unnecessary servers and infrastructure.
6.  **Maintainability:** Use clear modules, typed interfaces, tests,
    migrations, and incremental Git commits.
7.  **Honest claims:** Measure performance and blocking effectiveness.
    Do not invent benchmark numbers or claim unsupported security
    guarantees.

------------------------------------------------------------------------

# 2. Development workflow and responsibilities

The owner has selected this workflow:

  -----------------------------------------------------------------------
  Tool                                Responsibility
  ----------------------------------- -----------------------------------
  Kiro                                Generate and implement code in
                                      small, scoped tasks

  Antigravity                         Launch the app, run tests, inspect
                                      errors, debug and validate

  Manual testing                      Verify actual browser behavior and
                                      usability

  ChatGPT                             Product planning, architecture,
                                      Kiro prompts, code review,
                                      debugging guidance

  Git + GitHub                        Version control, milestones, backup
                                      and collaboration
  -----------------------------------------------------------------------

## Workflow rules

-   Do not ask Kiro to build the entire browser in one giant prompt.
-   Start with a verified foundation, then implement one coherent
    feature at a time.
-   Before each task, tell Kiro which files/modules it may change and
    which areas must not be changed.
-   Ask Kiro to inspect the existing repository before editing it.
-   Require Kiro to explain its plan before large or risky changes.
-   After each feature: build, lint/type-check, run unit/integration
    tests, launch in Antigravity, manually verify, then commit.
-   Use small, meaningful Git commits after working milestones.
-   Never overwrite working backend/browser logic merely to improve
    frontend styling.
-   Keep a changelog and update this document when an approved product
    decision changes.
-   Kiro's available credits are limited (the owner mentioned 2,000
    credits); token/credit use is variable. Prioritize a usable v1 and
    avoid wasteful broad prompts.

------------------------------------------------------------------------

# 3. Approved technology stack --- LOCKED

Do not replace these technologies without explaining a concrete
compatibility or maintenance reason.

  Layer                            Selected technology
  -------------------------------- --------------------------------------------------
  Desktop shell                    Electron
  Browser engine                   Chromium bundled with Electron
  Browser page container           Electron `WebContentsView`
  UI                               React
  Language                         TypeScript
  Build tool                       Vite
  Styling                          Tailwind CSS
  Motion                           Framer Motion, used sparingly
  UI state                         Zustand
  Local database                   SQLite
  Database access/migrations       Drizzle ORM
  Package manager                  npm
  Packaging                        Electron Forge
  Version control                  Git + GitHub
  Unit tests                       Vitest
  End-to-end tests                 Playwright, where compatible with Electron setup
  Manual runtime verification      Antigravity
  Website/landing page             Cloudflare Pages
  Installer/release distribution   GitHub Releases initially

### Technical cautions

-   Use a maintained, mutually compatible set of package versions. Check
    current Electron and Electron Forge documentation before
    implementation.
-   `WebContentsView` is preferred. Do not build the browser around
    deprecated Electron `<webview>` tags.
-   Electron Forge is a packaging/build tool, not a complete automatic
    update service.
-   Windows and Linux update delivery may need different mechanisms.
    Verify the current supported updater/release approach before
    promising automatic updates.
-   Use npm and commit `package-lock.json`.
-   Do not add MongoDB, Firebase, Redis, Docker, a Python backend, or a
    separate Node server to v1 unless a specific requirement proves they
    are necessary.
-   Do not add an external backend merely to make the browser
    architecture look more complex.

------------------------------------------------------------------------

# 4. High-level application architecture

SIDB is a desktop Electron application with two main execution areas:

## Main process

Owns privileged desktop and browser operations:

-   App lifecycle and windows
-   Browser profiles and persistent sessions
-   `WebContentsView` creation, positioning, navigation and destruction
-   Tab lifecycle and tab groups
-   Download handling
-   Permission handling
-   Popup/new-window policy
-   SQLite access and migrations
-   Ad/tracker request filtering
-   Safe Browsing integration
-   Update checks and installation flow
-   Secure IPC handlers
-   Logging and backup services

## Renderer process

Owns the visible application UI:

-   Browser chrome (tabs, toolbar, address bar)
-   Sidebar
-   New Tab page
-   Bookmarks, history and downloads pages
-   Settings and customization
-   SIDB Shield screens
-   AI panel and AI workspace
-   Command palette and productivity UI

## Preload bridge

-   Expose only narrow, explicit APIs through `contextBridge`.
-   Do not expose raw Node APIs, filesystem access, arbitrary IPC, or
    unrestricted Electron objects.
-   Validate all renderer-to-main input.
-   Keep a shared, typed IPC contract in a shared module.
-   Treat renderer input as untrusted even when it comes from SIDB's own
    UI.

## Data flow principle

The React renderer should not directly control privileged Electron APIs.
It should request a narrowly defined action through the preload bridge;
the main process validates and performs it.

------------------------------------------------------------------------

# 5. Security baseline --- LOCKED

Use secure Electron defaults:

-   `contextIsolation: true`
-   `nodeIntegration: false`
-   `sandbox: true` wherever compatible with the selected preload
    architecture
-   A minimal preload script
-   Strict, validated IPC channels
-   Content Security Policy appropriate for the packaged application
-   No arbitrary remote code execution
-   No `eval` or dynamically executed remote scripts
-   Restrict navigation and popup creation according to policy
-   Do not allow untrusted pages to navigate the privileged app window
-   Validate URLs and schemes before navigation or opening external
    links
-   Use least privilege for filesystem and OS access
-   Keep secrets out of source code, renderer state, logs, crash reports
    and Git
-   Review all third-party dependencies and their licenses/security
    posture

**Important:** Browser pages are untrusted websites. Never give a
webpage access to the SIDB preload bridge or privileged APIs.

Use Electron's supported secure storage facility (such as `safeStorage`)
for the NVIDIA API key where supported. Handle unavailable OS encryption
gracefully and explain the fallback; do not silently store secrets as
plaintext. Never hardcode the key in source code or package it into the
app.

------------------------------------------------------------------------

# 6. Browser window and UI design --- LOCKED DIRECTION

The owner has supplied SIDB visual design screenshots in earlier project
conversations. Those approved screenshots are the primary visual
reference. If they are not attached in a future conversation, ask the
owner to re-upload them before attempting pixel-level implementation. Do
not substitute unrelated browser designs.

## Visual direction

**Premium Hybrid Design:**

-   Main browser: premium dark glassmorphism with restrained purple/blue
    accents.
-   Toolbar and tabs: clean, compact and modern.
-   Sidebar: subtle glass treatment.
-   Settings and management pages: clean, readable and less visually
    busy.
-   AI assistant: futuristic but restrained glass panel.
-   Dark theme is default; light theme is available.
-   Animations should be smooth, short and lightweight.
-   Avoid excessive blur, shadows, gradients, glow, large transitions
    and unnecessary animation.
-   UI must remain readable and usable at common desktop sizes and on
    modest hardware.

## Layout decisions

### Adaptive tabs --- LOCKED

Support both:

1.  Horizontal tabs across the top.
2.  Vertical tabs in a left-side tab rail.

The user can switch between layouts. Preserve tab state and behavior
when switching. Support pinned tabs, groups, tab search and tab
operations in both layouts.

### Smart sidebar --- LOCKED

-   Compact by default.
-   Expand on hover or click.
-   Collapse when appropriate.
-   Keyboard shortcut to toggle.
-   Setting to keep it permanently expanded.
-   Avoid hover behavior that makes the interface unstable or
    inaccessible.

### AI interface --- LOCKED

Provide both: - Quick AI side panel alongside the current webpage. -
Full-screen AI workspace for longer tasks.

Both use the same configured NVIDIA model in v1.

------------------------------------------------------------------------

# 7. Main browser functionality

## Navigation and address bar

Implement:

-   Address bar that accepts URLs and search queries.
-   Search query uses the configured default search engine.
-   Back, forward, reload and stop.
-   Home/New Tab action.
-   Loading indicator and page title.
-   Favicon.
-   Secure connection indicator based on actual navigation security
    state.
-   Copy URL and paste-and-go.
-   Find in page (`Ctrl+F`).
-   Page zoom controls.
-   Fullscreen support.
-   Keyboard shortcuts.
-   URL normalization and safe scheme handling.
-   Clear error handling for invalid URLs and failed navigation.

### Search engines --- LOCKED

-   Default: Google.
-   User can choose DuckDuckGo, Bing or Brave Search.
-   Keep search URL templates configurable and tested.
-   Do not hardcode search URLs throughout the UI.

## Tabs and windows

Implement:

-   Multiple tabs and browser windows.
-   Create, close, duplicate and reorder tabs.
-   Pin/unpin tabs.
-   Mute/unmute tabs.
-   Tab title, favicon and loading state.
-   Tab groups.
-   Search tabs.
-   Restore sessions.
-   Recently closed tabs.
-   Popup and new-window handling with safe rules.
-   No fixed tab count.
-   User must not lose tabs because the app tries to save memory.

### Startup/session restore --- LOCKED

User-selectable startup behavior:

1.  Restore previous session.
2.  Open New Tab homepage --- default.
3.  Open specific user-selected websites.

Restore gradually: - Load the active tab first. - Restore other tabs in
a controlled/background manner. - Avoid loading all restored tabs
simultaneously. - Do not restore private sessions.

## New Tab homepage

Include:

-   Google search field.
-   Date and time.
-   Frequently visited websites.
-   User-managed shortcuts (add, edit, delete, reorder).
-   Custom wallpaper/background.
-   Gradient/background options.
-   Bookmark shortcuts.
-   Recently visited pages.
-   Customizable widgets.
-   Clean, fast initial render.

Make heavy or optional widgets lazy-loadable. Do not let the New Tab
page delay browser startup.

------------------------------------------------------------------------

# 8. Bookmarks, history and downloads

## Bookmarks

-   Add/remove bookmark.
-   Edit title and URL.
-   Folders and nested folders.
-   Move and reorder.
-   Search.
-   Bookmarks toolbar.
-   Import/export using supported browser formats.
-   Handle duplicates and malformed imports safely.

## History

-   Store normal-profile browsing history.
-   Group by date.
-   Search history.
-   Delete individual entries.
-   Delete selected date ranges.
-   Open a previous page.
-   Recently closed tabs.
-   Private browsing must never be written to normal history.
-   Provide clear behavior for redirects, duplicate visits and failed
    navigations.

## Downloads

-   Show progress.
-   Pause/resume where Chromium and the download source support it.
-   Cancel.
-   Retry where supported.
-   Open file.
-   Reveal file in its folder.
-   Remove record.
-   Choose download location.
-   Ask where to save setting.
-   Handle duplicate filenames safely.
-   Show source URL and file information.
-   Never auto-execute downloaded files.
-   Do not assume every `.exe` is malware; use risk-based warnings.

------------------------------------------------------------------------

# 9. Profiles and storage --- LOCKED

Support multiple profiles such as Personal, Work and Study.

Each profile has: - Its own SQLite database. - Its own Chromium
persistent user-data/session storage. - Its own bookmarks, history,
settings, downloads metadata and session metadata. - Its own backup
area.

Example conceptual structure:

``` text
SIDB/
  profiles/
    Personal/
      browser-data/
      sidb.db
      backups/
    Work/
      browser-data/
      sidb.db
      backups/
    Study/
      browser-data/
      sidb.db
      backups/
```

Actual filesystem paths must follow the OS's correct application-data
conventions. Do not assume the conceptual tree is the literal path on
every OS.

### Data ownership

SQLite stores SIDB application metadata: - Bookmarks - History -
Settings - Download metadata - Tab/session metadata - Recently closed
tab metadata - Profile metadata where appropriate

Chromium owns: - Cookies - Cache - Website local storage - Website
session storage - Other Chromium-managed site data

Do not duplicate cookies/cache/site storage in SQLite.

### Profile lock --- LOCKED: NOT INCLUDED

-   No app PIN.
-   No per-profile PIN.
-   Rely on Windows/Linux account security and OS file permissions.
-   Still protect sensitive API key material using OS-backed secure
    storage.

------------------------------------------------------------------------

# 10. Backup and restore --- LOCKED

Support both automatic local backups and manual export/import.

## Automatic local backup

-   Profile-wise backups.
-   Limited number of retained copies.
-   Avoid running heavy backups during active browsing.
-   Use SQLite's supported backup mechanism or another safe consistent
    snapshot method.
-   Ensure a failed backup never overwrites the last known good backup.
-   Verify backup integrity where practical.
-   Make backup cadence and retention sensible and configurable if
    needed.

## Manual backup

-   Export profile data.
-   Import a supported backup.
-   Restore bookmarks, history, settings and supported application
    metadata.
-   Validate backup format/version before importing.
-   Warn before overwriting existing profile data.
-   Do not include cookies/active website sessions by default.
-   Downloaded files themselves are not part of browser metadata backup.

------------------------------------------------------------------------

# 11. SIDB Shield --- ad blocking, tracker blocking and privacy

SIDB Shield is a major product feature and performance priority.

## Ad/tracker blocking goals

-   Block common display/banner ads.
-   Block advertising and tracking requests.
-   Block popups and malicious redirects where feasible.
-   Block third-party trackers.
-   Focus especially on YouTube ad protection.
-   Support filter lists and custom rules.
-   Provide per-site exceptions.
-   Provide a Shield status and understandable statistics.

### Important honesty constraint

YouTube changes ad delivery and detection frequently. Do not promise
100% blocking. Build a maintainable filter-based system, test it against
current behavior, and expect filter updates and occasional breakage. Do
not use brittle hacks that break video playback or violate platform
protections.

## Filter lists

Potential sources to evaluate: - EasyList - EasyPrivacy - Appropriate
regional/Indian filter lists - Compatible, legally usable lists from
established blocker ecosystems

Before shipping: - Review source license/terms. - Check compatibility
with the chosen request-filtering engine. - Check update URL and
integrity. - Do not blindly copy a third-party browser extension or its
proprietary assets. - Avoid duplicative lists that increase CPU/memory
cost without meaningful benefit.

### Filter updates --- LOCKED

-   Daily automatic filter update check/download.
-   Updates run in background, not on every page load.
-   Verify downloaded list integrity and parse successfully before
    activation.
-   Keep last known good lists and roll back if update fails.
-   Provide manual update action.
-   Avoid expensive re-parsing on every navigation.

## SIDB Shield interface

Include: - Protection mode/status. - Ads and trackers blocked
statistics. - YouTube protection status (clearly indicate it is
best-effort). - Filter list manager. - Custom rules. - Website
exceptions. - Privacy controls. - DNS settings.

## Privacy/security defaults --- LOCKED

  -----------------------------------------------------------------------
  Feature                             Approved behavior
  ----------------------------------- -----------------------------------
  General privacy mode                Balanced

  Ad blocking                         Advanced

  Tracker blocking                    Advanced

  YouTube protection                  High priority, best effort

  DoH                                 Off by default; optional setting

  DNS default                         OS/system DNS

  Third-party cookies                 Intelligent blocking with
                                      compatibility exceptions

  Fingerprinting protection           Basic

  Website permissions                 Ask by default

  Dangerous website action            Warn

  Safe Browsing provider              Google, subject to API
                                      terms/eligibility/cost

  Password manager                    Not included

  Analytics                           Off

  Automatic crash reports             Off
  -----------------------------------------------------------------------

### Website permissions

Ask before granting permissions such as: - Camera - Microphone -
Location - Notifications - Clipboard - Popups - Automatic downloads

Provide: - Allow once, where supported. - Allow on this website. -
Block. - Change later in settings/site permissions.

Do not grant permissions globally by default.

### DNS over HTTPS

-   Off by default.
-   Use OS DNS by default.
-   Optional user setting and provider selection can be added after
    compatibility review.
-   Fall back safely to system DNS if configured DoH fails.
-   Explain privacy and compatibility tradeoffs.

### Third-party cookies

Use an intelligent policy: - Block known tracking cookies. - Preserve
site/login/payment compatibility where required. - Allow site-specific
exceptions. - Test major login and payment flows.

### Fingerprinting protection

Basic protection only in v1. Do not claim anonymity or make aggressive
changes that break websites.

### Google Safe Browsing

The owner selected Google Safe Browsing. Before implementation, verify
current API version, personal/non-commercial eligibility, terms, quotas
and pricing. Distinguish consumer/non-commercial Safe Browsing API
eligibility from commercial Web Risk terms. Do not assume a free public
production endpoint. Minimize URL disclosure and do not log sensitive
URLs unnecessarily.

### Dangerous site warning

-   Show a clear warning page.
-   State the detected threat category when available.
-   Show the URL.
-   Offer a prominent go-back action.
-   Require an explicit user action to continue anyway.
-   Do not make bypass effortless.

------------------------------------------------------------------------

# 12. Private browsing --- LOCKED

Private browsing uses a separate temporary Chromium session.

When the private window/session closes: - Clear private cookies. - Clear
private cache. - Clear private history (never write it to normal
history). - Clear temporary site data. - Clear session storage. - Close
private tabs and their session. - Clear private download history
metadata.

**Downloaded files remain on disk** because they are user files;
deleting private session data must not silently delete downloaded files.

Other rules: - No private session restore. - No private browsing records
in normal profile history. - Do not share normal profile cookies with
private session. - Clearly label private windows.

------------------------------------------------------------------------

# 13. Downloads security --- LOCKED

Balanced download protection: - Warn about suspicious sources and risky
file types. - Show source information. - Use available platform/security
signals where practical. - Never automatically execute downloaded
files. - Let user cancel, retry or remove. - Do not equate file
extension alone with confirmed malware. - Avoid unsupported claims that
SIDB scans every downloaded file.

------------------------------------------------------------------------

# 14. Performance and resource management --- LOCKED

Performance and speed are core priorities.

## Startup

-   Lightweight app initialization.
-   Render browser chrome/New Tab quickly.
-   Lazy-load heavy features and services.
-   Do not initialize AI unnecessarily at startup.
-   Restore sessions gradually.
-   Avoid synchronous disk/database work on the UI-critical path.

## Tabs and memory

-   No fixed tab limit.
-   Smart automatic resource management.
-   Use Chromium's native background throttling and safe lifecycle
    behavior where appropriate.
-   Reduce unnecessary work in inactive tabs.
-   Protect active audio/video, video calls and downloads.
-   Pinned tabs receive higher priority.
-   Provide a "Keep active" concept if practical.
-   Never force-close tabs without user consent.
-   Avoid destroying/recreating WebContents casually; preserve
    session/navigation state.

## Low RAM --- LOCKED

-   First automatically optimize background work.
-   If pressure remains high, show a warning.
-   Do not silently close tabs.

## Battery --- LOCKED

On battery: - Reduce unnecessary animations. - Optimize background
activity. - Keep active browsing smooth. - Protect important active
media/calls/downloads. - Restore normal behavior when plugged in.

## Performance mode and hardware acceleration --- LOCKED

-   Performance mode: Automatic.
-   Hardware acceleration: Automatic, with safe fallback when GPU/driver
    problems occur.
-   Manual override may be considered later if needed, but do not add
    unnecessary settings in v1.

## Performance engineering

-   Avoid excessive React rerenders.
-   Virtualize long lists where useful.
-   Use database indexes for common queries.
-   Keep IPC payloads small.
-   Avoid expensive synchronous filters.
-   Profile memory and CPU under realistic multi-tab use.
-   Check for leaked WebContents, listeners, timers and subscriptions.
-   Avoid excessive blur/shadow/animation.
-   Measure before optimizing; do not claim arbitrary speed scores.

------------------------------------------------------------------------

# 15. AI assistant --- LOCKED PERSONAL V1 DIRECTION

The original plan used Gemini. The owner later explicitly changed this:
**use one NVIDIA-hosted AI model instead of Gemini**.

## User experience

-   Built into SIDB.
-   One model only for v1.
-   Same model powers side panel and full-screen AI workspace.
-   User does not need a separate AI account.
-   The owner supplies their own NVIDIA API key for personal use.
-   No separate backend/server for the personal v1.
-   Core browser works without AI.

## Planned AI features

-   Summarize current webpage.
-   Explain selected text.
-   Translate selected text or page content.
-   Rewrite text.
-   Ask questions about current webpage.
-   Explain code or technical content where appropriate.
-   Long-form conversation in full-screen workspace.

## API key security

-   Store key using OS-backed secure storage where supported (for
    example Electron `safeStorage`).
-   Do not store in source code, renderer localStorage, plain-text
    settings, logs or Git.
-   Keep API calls in the trusted main process or a narrowly scoped
    trusted service; never expose the raw key to website content.
-   Do not send page content automatically. Only send content after an
    explicit user action.
-   Limit context size and provide clear handling for long pages.
-   Handle quota/rate limit/network/API errors gracefully.
-   Do not block browsing if NVIDIA service is down.

## Model selection

The exact NVIDIA model is **TO VERIFY**. Evaluate models available
through NVIDIA's official catalog for: - Coding/reasoning quality. -
Long-context capability. - Latency. - Free-tier or developer access
availability. - Rate limits. - API compatibility. - Data
handling/privacy terms. - Whether personal use is permitted under
current terms.

Official model catalogue: https://build.nvidia.com/explore/discover

Do not hardcode assumptions about a model's context length, free quota,
pricing or availability. Verify at implementation time.

## Scope boundary

Do not add ChatGPT/Gemini/Claude multi-provider support, OAuth account
integrations, BYOK provider menus, a public AI proxy, or a multi-tenant
backend in personal v1. The owner explicitly asked to keep AI simple.

------------------------------------------------------------------------

# 16. Productivity and extra features

Approved/planned: - Web capture/screenshot. - Command palette. - QR code
generator. - Tab search and groups. - Custom New Tab shortcuts and
wallpaper.

Previously proposed but not explicitly approved: - Picture-in-Picture. -
Reader mode.

Treat PiP and Reader Mode as optional candidates, not guaranteed v1
requirements. Add only if they can be implemented reliably without
hurting core browser stability or schedule.

------------------------------------------------------------------------

# 17. Settings and customization

Provide organized settings for: - Appearance: dark/light theme, accent
color, wallpaper. - Toolbar/sidebar customization. - Tab layout:
horizontal/vertical. - Startup behavior. - Search engine. - Homepage/New
Tab. - Downloads and save location. - Privacy and Shield. - Site
permissions. - DNS/DoH. - Performance behavior. - Zoom/font size. -
Keyboard shortcuts. - AI configuration and API key setup. - Profile and
backup management.

Do not overload the settings UI. Use clear sections, search if useful,
and explain high-impact security settings.

------------------------------------------------------------------------

# 18. Website, packaging and updates

## Website

-   Cloudflare Pages for a simple project/landing page.
-   A free Pages subdomain may be used initially.
-   Browser itself does not need a hosted website to function.
-   Do not add unnecessary web hosting dependencies to the desktop
    application.

## Distribution

-   GitHub repository for source.
-   GitHub Releases for installers/build artifacts initially.
-   Windows and Linux builds.
-   Verify Electron Forge makers and platform-specific dependencies at
    implementation time.
-   Do not claim one package format works on every Linux distribution.

## Updates --- approved direction, implementation TO VERIFY

The owner wants: - Automatic update check. - Background download. - User
chooses when to restart/install; no forced restart. - Verify release
authenticity/integrity. - Preserve a working previous version or provide
a safe recovery path if update fails.

Important: - Electron Forge alone does not implement the complete secure
updater. - Research current supported updater mechanisms for Windows and
Linux. - Code signing, update metadata, hosting and release channels may
be required. - Start with a reliable manual GitHub Releases update path
if fully automatic secure updates are not ready. - Do not download and
execute arbitrary binaries without signature/integrity verification.

------------------------------------------------------------------------

# 19. Suggested repository structure

This is the approved starting structure, but adapt it when actual code
boundaries require it. Avoid unnecessary abstraction.

``` text
SIDB/
├── electron/
│   ├── main/
│   │   ├── app/
│   │   ├── windows/
│   │   ├── browser/
│   │   ├── tabs/
│   │   ├── navigation/
│   │   ├── downloads/
│   │   ├── permissions/
│   │   ├── profiles/
│   │   ├── shield/
│   │   ├── updates/
│   │   ├── ipc/
│   │   └── services/
│   └── preload/
├── src/
│   ├── components/
│   ├── features/
│   │   ├── browser/
│   │   ├── bookmarks/
│   │   ├── history/
│   │   ├── downloads/
│   │   ├── profiles/
│   │   ├── settings/
│   │   ├── customization/
│   │   ├── shield/
│   │   ├── ai/
│   │   └── productivity/
│   ├── pages/
│   ├── hooks/
│   ├── store/
│   ├── services/
│   └── styles/
├── shared/
│   ├── types/
│   ├── constants/
│   ├── ipc/
│   └── schemas/
├── database/
│   ├── schema/
│   └── migrations/
├── resources/
│   ├── icons/
│   ├── fonts/
│   └── images/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
├── package.json
├── package-lock.json
└── README.md
```

------------------------------------------------------------------------

# 20. Database design guidance

Use Drizzle ORM with SQLite migrations. Design schemas per profile
database. A starting set of entities:

-   `bookmarks`
-   `bookmark_folders`
-   `history_entries`
-   `download_records`
-   `browser_settings`
-   `session_metadata`
-   `recently_closed_tabs`
-   `custom_shortcuts`
-   `site_permission_settings`
-   `shield_settings`
-   `filter_list_metadata`
-   `backup_metadata`

Exact schema and relationships should be designed before implementation.
Use stable IDs, timestamps, indexes and migrations. Avoid storing
Chromium-owned cookie/cache/site data in these tables.

Consider retention and deletion behavior: - History deletion must remove
associated records as specified. - Private session records must not
enter normal DB. - Download metadata deletion must not delete the actual
file unless the user explicitly chooses file deletion. - Profile
deletion must clearly explain that its profile data and Chromium storage
will be removed.

------------------------------------------------------------------------

# 21. Testing and acceptance criteria

Every module must have testable acceptance criteria.

## Foundation

-   App launches on supported Windows/Linux development environments.
-   Main window and renderer communicate only through typed, validated
    preload APIs.
-   No Node integration in webpage renderer.
-   No critical security warnings from basic Electron configuration
    review.

## Browser

-   URL navigation and search work.
-   Back/forward/reload/stop work.
-   Multiple tabs can be created, reordered, pinned, muted and closed.
-   Horizontal and vertical tab layouts preserve state.
-   Popups are handled safely.
-   Session restoration follows selected startup setting.

## Data

-   Bookmarks survive restart.
-   History search and deletion work.
-   Downloads show correct state and file location.
-   Profiles do not share cookies or site storage.
-   Private data is removed when private session closes.
-   Backup can be restored and verified.

## Shield

-   Filter rules block known test ad/tracker requests.
-   Exceptions work.
-   Filter updates do not replace last known good data on failure.
-   YouTube protection is tested and described as best effort.
-   Shield does not create unacceptable navigation delays.

## AI

-   API key is never exposed to website renderer.
-   No API key in source code or logs.
-   User explicitly triggers page-content submission.
-   Errors and quotas do not crash browser.
-   AI-disabled browsing works normally.

## Performance

-   Test with realistic multiple tabs.
-   Monitor startup, tab switching, CPU, RAM and idle behavior.
-   Check background media/download preservation.
-   Check for WebContents/listener/memory leaks.
-   Avoid invented numeric performance promises.

## Packaging

-   Produce and install a Windows build.
-   Produce and install at least one selected Linux package format.
-   Verify app data paths and permissions on both platforms.
-   Test update/recovery behavior before enabling automatic updates.

------------------------------------------------------------------------

# 22. Phased implementation roadmap

Implement in this order. Do not build all features at once.

## Phase 0 --- Repository and compatibility verification

-   Inspect current environment and create repo.
-   Verify current Electron, Vite, React, TypeScript and Forge
    compatibility.
-   Create minimal secure Electron window.
-   Establish lint, type-check, build and test commands.
-   Commit working foundation.

## Phase 1 --- UI shell

-   Implement approved design reference.
-   Main window, titlebar, tabs, toolbar, address bar, sidebar.
-   New Tab screen.
-   Horizontal/vertical tabs.
-   Theme tokens and responsive desktop sizing.
-   Use mock browser data only temporarily and clearly separate it from
    real browser integration.

## Phase 2 --- Chromium integration

-   Integrate `WebContentsView`.
-   Implement navigation and tab lifecycle.
-   Correctly size/position views around UI.
-   Handle window resize, maximize, fullscreen, zoom, navigation events.
-   Handle popup and permission requests.
-   Test stability before adding more features.

## Phase 3 --- Profiles and persistence

-   Separate profile storage.
-   SQLite/Drizzle migrations.
-   Bookmarks, history, settings and session metadata.
-   Download management.
-   Startup/session restoration.
-   Backups and import/export.

## Phase 4 --- Shield and privacy

-   Evaluate and select request-filtering implementation.
-   Build filter parser/engine integration.
-   Add list updates, integrity checks and rollback.
-   Add exceptions and Shield UI.
-   Add permissions, DoH setting and Safe Browsing only after API
    terms/eligibility checks.
-   Test performance and site compatibility.

## Phase 5 --- AI

-   Verify NVIDIA model and API terms.
-   Secure local key setup.
-   Main-process API service.
-   Side panel and full-screen workspace.
-   User-triggered page context.
-   Quota/error handling.

## Phase 6 --- Customization and productivity

-   Theme and accent settings.
-   Wallpaper/shortcuts/widgets.
-   Command palette.
-   QR generator.
-   Screenshot/capture.
-   Consider PiP/Reader Mode only if stable and approved.

## Phase 7 --- Performance, security and regression

-   Profile startup, memory, CPU and tab lifecycle.
-   Test privacy boundaries.
-   Review dependencies.
-   Review IPC and navigation attack surface.
-   Run regression tests across Windows/Linux.

## Phase 8 --- Packaging and release

-   Windows installer.
-   Linux package(s).
-   App icons and metadata.
-   GitHub Releases.
-   Manual update path first; automatic updates only after secure
    infrastructure is verified.
-   README and user guide.

------------------------------------------------------------------------

# 23. Explicit exclusions for personal v1

Do not add these unless the owner later requests them:

-   Public multi-user account system.
-   Cloud synchronization.
-   Hosted multi-tenant AI backend.
-   Public AI proxy.
-   ChatGPT/Gemini/Claude multi-provider login.
-   Built-in password manager.
-   App PIN/profile lock.
-   Mobile browser app in v1.
-   Chrome extension parity in v1 (deferred).
-   MongoDB/Firebase/Redis.
-   Separate Python backend.
-   Docker.
-   Unnecessary analytics or telemetry.
-   Forced update restart.
-   Features that materially slow browsing without clear value.

------------------------------------------------------------------------

# 24. Important future decisions / items to verify

These are not reasons to block all planning, but must be checked before
the relevant implementation:

1.  Exact NVIDIA model and current API access/quotas/terms.
2.  Filter engine choice and Electron/Chromium compatibility.
3.  Current YouTube ad-filter reliability.
4.  Filter list licenses and update integrity.
5.  Google Safe Browsing API eligibility, version, quotas and pricing.
6.  Secure update framework for Windows and Linux.
7.  Linux package formats to support first.
8.  Exact profile deletion and backup restore UX.
9.  Whether PiP and Reader Mode are included after core v1.
10. Final approved UI screenshots and assets.

When researching these, use official current documentation and cite it.
Do not assume a free endpoint or API is permanently available.

------------------------------------------------------------------------

# 25. Kiro prompt-writing standard

When preparing a Kiro task prompt:

1.  State the exact goal.
2.  State the current architecture and relevant existing files.
3.  State what is in scope.
4.  State what must not be changed.
5.  State security/performance constraints.
6.  Require Kiro to inspect existing code before editing.
7.  Require a short implementation plan for broad changes.
8.  Require typed code and error handling.
9.  Require tests and exact commands to run.
10. Require a summary of files changed, decisions made and known
    limitations.
11. Do not ask it to fabricate successful test results.
12. Keep each prompt small enough to review and debug.

Suggested prompt structure:

``` text
You are implementing one scoped feature in SIDB.

First inspect the existing repository and relevant files. Do not assume files or APIs exist.
Do not rewrite unrelated modules.

Goal:
[One precise feature]

Current architecture:
[Relevant Electron/React/TypeScript/SQLite details]

Scope:
[Exact files/modules and behavior]

Constraints:
- Preserve Electron security settings.
- Keep privileged APIs in main process.
- Use typed, validated IPC and narrow preload methods.
- Do not expose secrets to renderer or webpages.
- Preserve performance and existing behavior.
- Do not add dependencies unless justified.

Acceptance criteria:
[Observable behavior and edge cases]

Tests:
[Unit/integration/manual checks]

Before finishing:
- Run the relevant checks.
- Report exact commands and actual results.
- List changed files.
- Explain any limitations or follow-up work.
- Do not claim tests passed if they were not run.
```

------------------------------------------------------------------------

# 26. Current project status and next action

**Current status:** Planning / pre-implementation. No coding should be
assumed to have started.

Completed planning areas: - Core browser feature direction. - Security
and privacy defaults. - Performance/resource management decisions. - UI
visual direction and layout. - AI direction changed from Gemini to one
NVIDIA model for personal use. - Per-profile database and Chromium
storage. - Backup approach. - No app/profile PIN. - Initial
Windows/Linux and GitHub distribution direction.

Next recommended steps: 1. Owner reviews this master blueprint. 2. Owner
re-uploads final SIDB UI screenshots if not available in the new
conversation. 3. Resolve only major gaps or contradictions. 4. Produce a
concise final PRD and implementation checklist. 5. Prepare Kiro prompts
phase by phase. 6. Start coding only after explicit owner approval.

**Most important instruction for any future assistant:** Preserve the
decisions in this file, avoid repetitive micro-questions, keep SIDB
personal-use and simple for v1, and do not start coding until explicitly
instructed.
