/**
 * fetch-commits.js
 * Runs inside GitHub Actions with a PAT that has access to private repos.
 * Outputs commits.json at the repo root — read by the portfolio frontend.
 *
 * To add/remove repos, edit the REPOS array below.
 */

const https = require('https');
const fs    = require('fs');
const path  = require('path');

// ── CONFIG ─────────────────────────────────────────────────────────────────
const REPOS = [
  'JeffreyCq/phishguard',
  'JeffreyCq/portfolio',
  // Add private repos here, e.g.:
  // 'JeffreyCq/learn-wazuh',
  // 'JeffreyCq/my-private-project',
];

const COMMITS_PER_REPO = 5;
const OUTPUT_FILE = path.join(__dirname, '../../commits.json');
// ───────────────────────────────────────────────────────────────────────────

const TOKEN = process.env.GH_TOKEN;
if (!TOKEN) {
  console.error('GH_TOKEN env variable is required.');
  process.exit(1);
}

function ghFetch(apiPath) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: apiPath,
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'User-Agent':    'portfolio-commit-feed',
        'Accept':        'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    };
    https.get(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 404) { resolve(null); return; }
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`JSON parse error for ${apiPath}: ${e.message}`)); }
      });
    }).on('error', reject);
  });
}

async function fetchRepo(repo) {
  const [commits, prs, info] = await Promise.all([
    ghFetch(`/repos/${repo}/commits?per_page=${COMMITS_PER_REPO}`),
    ghFetch(`/repos/${repo}/pulls?state=open&per_page=20`),
    ghFetch(`/repos/${repo}`),
  ]);

  if (!info) throw new Error('Repo not found or no access');

  return {
    name:       info.name,
    private:    info.private,
    stars:      info.stargazers_count || 0,
    forks:      info.forks_count      || 0,
    pushed_at:  info.pushed_at        || null,
    open_prs:   Array.isArray(prs) ? prs.length : 0,
    commits:    Array.isArray(commits)
      ? commits.map(c => ({
          sha:     c.sha,
          message: c.commit.message.split('\n')[0].slice(0, 100),
          author:  c.commit.author.name,
          date:    c.commit.author.date,
          url:     c.html_url,
        }))
      : [],
  };
}

async function main() {
  const result = {
    generated_at: new Date().toISOString(),
    repos: {},
  };

  for (const repo of REPOS) {
    try {
      result.repos[repo] = await fetchRepo(repo);
      const r = result.repos[repo];
      const privacy = r.private ? '🔒' : '🌐';
      console.log(`${privacy} ${repo} — ${r.commits.length} commit(s), ${r.open_prs} open PR(s)`);
    } catch (e) {
      console.error(`✗ ${repo} — ${e.message}`);
      // Keep empty entry so the frontend can still render the card
      result.repos[repo] = { error: e.message, commits: [], open_prs: 0 };
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));
  console.log(`\nWrote ${OUTPUT_FILE}`);
  console.log(`generated_at: ${result.generated_at}`);
}

main().catch(e => { console.error(e); process.exit(1); });
