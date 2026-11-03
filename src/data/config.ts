/**
 * SIDB Official Website - Central Configuration
 * All URLs, version tags, file sizes, and release assets are verified against the official GitHub repository.
 */

export interface DownloadAsset {
  os: 'windows' | 'linux';
  platformName: string;
  badge: string;
  fileName: string;
  fileFormat: string;
  fileSize: string;
  downloadUrl: string;
  description: string;
  primary?: boolean;
  installGuide?: string;
}

export const siteConfig = {
  name: 'SIDB Browser',
  shortName: 'SIDB',
  tagline: 'A Browser Built Around You.',
  description:
    'Meet SIDB — a modern desktop browser designed around speed, control, and a cleaner browsing experience. Powered by Chromium with native ad and tracker blocking, local data ownership, and adaptive productivity workflows.',
  version: 'v0.1.0',
  releaseDate: 'November 2026',
  engine: 'Chromium 156 / Electron 45',
  
  // Domains and canonical URLs
  canonicalDomain: 'https://sidb.netlify.app',
  websiteRepo: 'https://github.com/siddhantsaurabhjha/SIDB-WEBSITE',

  // GitHub & Documentation Links
  links: {
    github: 'https://github.com/siddhantsaurabhjha/SIDB',
    websiteRepo: 'https://github.com/siddhantsaurabhjha/SIDB-WEBSITE',
    releases: 'https://github.com/siddhantsaurabhjha/SIDB/releases',
    latestRelease: 'https://github.com/siddhantsaurabhjha/SIDB/releases/tag/v0.1.0',
    userGuide: 'https://github.com/siddhantsaurabhjha/SIDB/blob/main/docs/USER_GUIDE.md',
    progressReport: 'https://github.com/siddhantsaurabhjha/SIDB/blob/main/progress.md',
    license: 'https://github.com/siddhantsaurabhjha/SIDB/blob/main/LICENSE',
    issues: 'https://github.com/siddhantsaurabhjha/SIDB/issues',
    checksums: 'https://github.com/siddhantsaurabhjha/SIDB/releases/download/v0.1.0/SHA256SUMS.txt',
  },

  // Verified Downloads from GitHub Release v0.1.0
  downloads: {
    windows: {
      os: 'windows',
      platformName: 'Windows',
      badge: 'Windows 10 / 11 (64-bit)',
      fileName: 'SIDB-0.1.0-win-x64.zip',
      fileFormat: 'Portable ZIP Archive',
      fileSize: '152.2 MB',
      downloadUrl: 'https://github.com/siddhantsaurabhjha/SIDB/releases/download/v0.1.0/SIDB-0.1.0-win-x64.zip',
      description: 'Portable archive. Extract and run SIDB.exe directly without system installation.',
      primary: true,
      sha256Verification: 'Get-FileHash .\\SIDB-0.1.0-win-x64.zip -Algorithm SHA256',
    } as DownloadAsset,
    linuxDeb: {
      os: 'linux',
      platformName: 'Debian / Ubuntu',
      badge: 'Debian, Ubuntu & Mint',
      fileName: 'sidb_0.1.0_amd64.deb',
      fileFormat: 'Debian Package (.deb)',
      fileSize: '94.5 MB',
      downloadUrl: 'https://github.com/siddhantsaurabhjha/SIDB/releases/download/v0.1.0/sidb_0.1.0_amd64.deb',
      description: 'Tested on Ubuntu 24.04 LTS. Native installation with package manager integration.',
      primary: false,
      installGuide: 'sudo dpkg -i sidb_0.1.0_amd64.deb',
    } as DownloadAsset,
    linuxRpm: {
      os: 'linux',
      platformName: 'Fedora / Red Hat',
      badge: 'Fedora, RHEL & openSUSE',
      fileName: 'sidb-0.1.0-1.x86_64.rpm',
      fileFormat: 'RPM Package (.rpm)',
      fileSize: '98.2 MB',
      downloadUrl: 'https://github.com/siddhantsaurabhjha/SIDB/releases/download/v0.1.0/sidb-0.1.0-1.x86_64.rpm',
      description: 'Standard RPM package for modern Red Hat, Fedora, and openSUSE systems.',
      primary: false,
      installGuide: 'sudo rpm -i sidb-0.1.0-1.x86_64.rpm',
    } as DownloadAsset,
    linuxZip: {
      os: 'linux',
      platformName: 'Generic Linux x64',
      badge: 'Arch, Alpine & others',
      fileName: 'SIDB-0.1.0-linux-x64.zip',
      fileFormat: 'Portable Linux ZIP',
      fileSize: '119.3 MB',
      downloadUrl: 'https://github.com/siddhantsaurabhjha/SIDB/releases/download/v0.1.0/SIDB-0.1.0-linux-x64.zip',
      description: 'Standalone portable archive for distributions without deb/rpm support.',
      primary: false,
      installGuide: 'unzip SIDB-0.1.0-linux-x64.zip && ./sidb',
    } as DownloadAsset,
  },

  // System requirements - honest & verified
  requirements: {
    windows: {
      os: 'Windows 10 / 11 (64-bit)',
      cpu: 'Not officially specified (Standard 64-bit x86-64)',
      ram: 'Not officially specified (Standard 64-bit desktop)',
      storage: '~400 MB disk space (Extracted binary & user profile data)',
      notes: 'No administrator rights required. SmartScreen notice details provided below.',
    },
    linux: {
      os: 'Ubuntu 24.04+ / Debian 12+, Fedora 39+, or glibc 2.35+ 64-bit desktop',
      cpu: 'Not officially specified (Standard 64-bit x86-64)',
      ram: 'Not officially specified (Standard 64-bit desktop)',
      storage: '~400 MB disk space (Installation & user profile database)',
      notes: 'X11 or Wayland with standard desktop graphics acceleration.',
    },
  },

  // Transparent release limitations
  limitations: [
    {
      title: 'Portable Windows Release',
      description:
        'Release v0.1.0 is distributed as a portable ZIP archive. Extract to your preferred location (e.g. C:\\Apps\\SIDB) and launch SIDB.exe. A full installer is scheduled for v0.1.1.',
    },
    {
      title: 'Windows SmartScreen Notice',
      description:
        'The application binary is not currently code-signed with a commercial certificate. Windows SmartScreen may display an "Unknown publisher" dialogue on first run. Click "More info" → "Run anyway" after verifying SHA256 checksums.',
    },
    {
      title: 'Google Account Sign-In Boundary',
      description:
        'Google intentionally restricts direct account sign-in inside embedded browser frameworks. SIDB detects Google login workflows and guides you to authenticate in your system default browser when needed.',
    },
    {
      title: 'Manual Updates in v0.1.0',
      description:
        'SIDB includes a background update notifier that checks GitHub Releases daily. Updates are downloaded by the user directly to ensure zero unexpected restarts. Your profile data in %APPDATA%\\SIDB is always safely preserved.',
    },
  ],
};

