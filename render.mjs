// Turn a changelog JSON file into the CHANGELOG.md that ships inside a release.
//
// This file is fetched and run by every resource's release workflow, and it is
// imported by dirk-changelog-mcp. ONE renderer, so the markdown a customer
// reads in the zip and the markdown the panel shows are produced by the same
// code and cannot disagree.
//
//   node render.mjs <changelog.json> [version]
//
// With a version, it is also the RELEASE GATE: exit 1 if that version has no
// entry. A release whose changelog nobody wrote is a release that ships the
// previous version's notes, silently, and the first person to notice is a
// customer.

import { readFileSync } from 'node:fs';

function renderItem(it) {
  return it.parts.map((p) => {
    if (p.t === 'text') return it.loose ? p.v : `- ${p.v}`;
    if (p.t === 'child') return `${' '.repeat(p.indent ?? 2)}- ${p.v}`;
    return p.v;
  });
}

export function renderEntry(e) {
  const out = [];
  if (e.version === 'UNRELEASED') out.push('# UNRELEASED');
  else if (e.headingStyle === 'raw') out.push(`# ${e.version}`);
  else if (e.headingStyle === 'space') out.push(`# ${e.word ?? 'UPDATE'} ${e.version} ${e.date}`);
  else if (e.headingStyle === 'bare' || !e.date) out.push(`# ${e.word ?? 'UPDATE'} ${e.version}`);
  else out.push(`# ${e.word ?? 'UPDATE'} ${e.version} | ${e.date}`);

  for (const s of e.sections) {
    if (s.title) { out.push(''); out.push(`## ${s.title}`); out.push(''); }
    for (const it of s.items) out.push(...renderItem(it));
  }
  return out.join('\n');
}

export function renderDoc(doc) {
  // a hidden version stays out of the in-game menu (the site skips it too)
  const chunks = doc.entries.filter((e) => !e.hidden).map((e, i) =>
    (i === 0 ? '' : e.separatorBefore ? '\n---\n\n' : '\n\n') + renderEntry(e));
  return chunks.join('') + (doc.trailingNewline === false ? '' : '\n');
}

/** Section titles and their bullets — the shape a Discord embed field wants. */
export function toEmbedFields(e) {
  return e.sections
    .filter((s) => s.items.length > 0)
    .map((s) => ({
      name: s.title ?? '​',
      value: s.items.map((it) => renderItem(it).join('\n')).join('\n'),
    }));
}

// ── CLI ─────────────────────────────────────────────────────────────────────

const isMain = process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/').split('/').pop());
if (isMain && process.argv[2]) {
  const doc = JSON.parse(readFileSync(process.argv[2], 'utf8'));
  const version = process.argv[3];

  if (version) {
    const found = doc.entries.some((e) => e.version === version);
    if (!found) {
      const have = doc.entries.slice(0, 5).map((e) => e.version).join(', ');
      process.stderr.write(
        `\nNo changelog entry for ${doc.resource} ${version}.\n\n` +
        `The release is stopping rather than shipping the previous version's notes.\n` +
        `Newest entries in publicInfo: ${have || 'none'}\n\n` +
        `Write it with the dirk-changelog MCP, promote it, push dirk_publicInfo, then re-run:\n` +
        `  changelog_add     resource:${doc.resource} version:${version} section:... items:[...]\n` +
        `  changelog_promote resource:${doc.resource} version:${version}\n` +
        `  changelog_publish message:"changelog: ${doc.resource} ${version}"\n\n`,
      );
      process.exit(1);
    }
  }

  process.stdout.write(renderDoc(doc));
}
