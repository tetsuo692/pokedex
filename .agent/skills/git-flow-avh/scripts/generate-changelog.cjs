const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const version = process.argv[2];
if (!version) {
    console.error('Usage: node generate-changelog.js <version>');
    process.exit(1);
}

// 1. Get Repository URL
let repoUrl = '';
try {
    const remoteUrl = execSync('git config --get remote.origin.url', { encoding: 'utf8' }).trim();
    // Convert git@github.com:user/repo.git to https://github.com/user/repo
    repoUrl = remoteUrl
        .replace(/^git@([^:]+):/, 'https://$1/')
        .replace(/\.git$/, '');
} catch (e) {
    console.warn('Could not determine remote repository URL.');
}

// 2. Determine previous tag
let prevTag = '';
try {
    prevTag = execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim();
} catch (e) {
    // If no tags, use empty string to get all commits
    // Or ideally, get the first commit hash
    try {
        prevTag = execSync('git rev-list --max-parents=0 HEAD', { encoding: 'utf8' }).trim();
    } catch (err) {
        prevTag = '';
    }
}

// 3. Get Commits
const logRange = prevTag ? `${prevTag}..HEAD` : 'HEAD';
// Format: hash|subject|body
// Use a unique separator that is unlikely to be in commit messages.
const SEPARATOR = '|||APP_cLOG_SEP|||';
// Use --format options with custom separator
const cmd = `git log ${logRange} --format="%H${SEPARATOR}%s${SEPARATOR}%b${SEPARATOR}--END--"`;

let logs = [];
try {
    // Execute git log command
    const output = execSync(cmd, { encoding: 'utf8' });
    // Split by END marker
    logs = output.split('--END--\n').filter(Boolean);
} catch (e) {
    console.error("Failed to read git log: " + e.message);
    process.exit(1);
}

const commits = {
    feat: [],
    fix: [],
    perf: [],
    refactor: [],
    docs: [],
    test: [],
    chore: [],
    other: [],
    breaking: []
};

// 4. Parse Commits
logs.forEach(log => {
    // Use the same separator for splitting
    const parts = log.split(SEPARATOR);
    if (parts.length < 3) return;

    const hash = parts[0].trim();
    const subject = parts[1].trim();
    const body = parts[2].trim();
    const fullMessage = `${subject}\n${body}`;

    const commitObj = { hash, subject, body };

    // Detect Breaking Change
    if (fullMessage.includes('BREAKING CHANGE:') || subject.includes('!')) {
        commits.breaking.push(commitObj);
    }

    // Classify
    const match = subject.match(/^(\w+)(?:\(.*\))?!?: (.+)$/);
    if (match) {
        const type = match[1].toLowerCase();
        if (commits[type]) {
            commits[type].push(commitObj);
        } else {
            commits.other.push(commitObj);
        }
    } else {
        commits.other.push(commitObj);
    }
});

// 5. Format Markdown
const date = new Date().toISOString().split('T')[0];
let md = `\n## [${version}] - ${date}\n\n`;

// Breaking Changes
if (commits.breaking.length > 0) {
    md += `### ⚠ BREAKING CHANGES\n`;
    commits.breaking.forEach(c => {
        md += `- ${c.subject}\n`;
    });
    md += `\n`;
}

// Helper for formatting line
const fmt = (c) => {
    // Basic link formatting, assuming GitHub-like URL structure
    const link = repoUrl ? ` ([${c.hash.substring(0, 7)}](${repoUrl}/commit/${c.hash}))` : ` (${c.hash.substring(0, 7)})`;
    return `- ${c.subject}${link}`;
}

// Features
if (commits.feat.length > 0) {
    md += `### Features\n`;
    commits.feat.forEach(c => md += `${fmt(c)}\n`);
    md += `\n`;
}

// Fixes
if (commits.fix.length > 0) {
    md += `### Bug Fixes\n`;
    commits.fix.forEach(c => md += `${fmt(c)}\n`);
    md += `\n`;
}

// Performance
if (commits.perf.length > 0) {
    md += `### Performance Improvements\n`;
    commits.perf.forEach(c => md += `${fmt(c)}\n`);
    md += `\n`;
}

// Refactor
if (commits.refactor.length > 0) {
    md += `### Refactoring\n`;
    commits.refactor.forEach(c => md += `${fmt(c)}\n`);
    md += `\n`;
}

// Docs
if (commits.docs.length > 0) {
    md += `### Documentation\n`;
    commits.docs.forEach(c => md += `${fmt(c)}\n`);
    md += `\n`;
}

// 6. Prepend to CHANGELOG.md
const changelogPath = path.resolve(process.cwd(), 'CHANGELOG.md');
let currentContent = '';
if (fs.existsSync(changelogPath)) {
    currentContent = fs.readFileSync(changelogPath, 'utf8');
}

fs.writeFileSync(changelogPath, md + currentContent);
console.log(`Updated CHANGELOG.md for version ${version}`);
