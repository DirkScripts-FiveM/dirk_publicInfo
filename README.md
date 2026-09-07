# dirk_publicInfo

What every dirk script's admin panel reads to find out what is going on outside
the server it is running on.

A script ships with its own `CHANGELOG.md`, and that file can only ever
describe the build it shipped in — it cannot know about a release that came
after it. This repo is the part that can.

Fetched unauthenticated from `raw.githubusercontent.com` by dirk_lib, once per
server start, cached in memory. If GitHub is unreachable the panel falls back
to what shipped inside the resource, so an outage is never visible.

## What is here

```
announcements.json     the Overview feed, and the current version of each script
changelogs/*.md        one per resource, fetched on demand
```

### announcements.json

```jsonc
{
  "schema": 1,

  // What the panel compares against a server's installed version to say
  // "you are behind". Keep these exact — a wrong number here tells every
  // server on the internet to update to something that does not exist.
  "versions": { "dirk_fishing": "2.0.65" },

  "announcements": [
    {
      "id": "unique-and-permanent",   // dismissals are remembered by id
      "kind": "update",               // update | promo | action | tip | notice
      "title": "Plain text only",
      "body": "Plain text only.",

      // One thing to do about it. `changelog` opens that script's changelog
      // in the panel; `url` leaves for a browser.
      "action": { "label": "Read the changelog", "changelog": "dirk_fishing" },

      "stamp": "26 Aug",
      "chip": "20% off",              // overrides the kind's own word

      "resource": "dirk_fishing",     // only shown to servers running it
      "minVersion": "2.0.60",         // only shown to servers on or above this
      "pin": true,                    // above everything else
      "featured": false               // cannot be dismissed — use sparingly
    }
  ]
}
```

**`id` is permanent.** Dismissals are stored against it, so reusing an id
re-hides a new announcement for everyone who dismissed the old one, and
changing an id un-hides something people already cleared.

**Everything is plain text.** The panel renders titles and bodies into a card
it designed and never interprets markup from this file. This is remote content
being displayed inside somebody else's admin panel, and it is treated that way.

**`featured` means nobody can dismiss it.** One launch or one sale at a time.
An announcement that cannot be cleared is a banner, and a panel full of banners
is a panel people stop reading.

### changelogs/

**This is where a dirk changelog is written.** Not the `CHANGELOG.md` in a
resource — that file is now GENERATED, by the release workflow, from the JSON
here. Never edit one by hand.

```
changelogs/<resource>.json          released entries — the source of truth
changelogs/<resource>.md            rendered from the JSON, what the panel fetches
changelogs/pending/<resource>.json  drafts, built up as work happens
render.mjs                          the one renderer, used by CI and the MCP
```

Write entries with the **`dirk-changelog` MCP**, never by editing these files:

    changelog_add      add bullets to a draft, as the work lands
    changelog_promote  move a draft into the released file, on the day it ships
    changelog_publish  commit and push

#### Why it works this way

The same changelog used to be kept by hand in three places — the resource, this
repo, and dirk_docs. On 07/09/2026 all three disagreed: fishing's whole
levelling feature was in one and neither of the others. Three copies kept in
step by somebody remembering is three copies that drift, and the stale one is
always the customer-facing one.

So there is one copy, as data, and everything else renders from it: this repo's
`.md`, the `CHANGELOG.md` inside each release zip, the Discord embed, and the
docs.

#### Drafts are a separate file, not a flag

`pending/` holds versions that are written but not shipped. Nothing
customer-facing reads that directory, so a draft cannot reach a customer
through a filter somebody forgot to apply — there is no filter to forget.

Several chats add to the same draft while they work; `changelog_add` is
additive per section and skips a bullet whose opening text already exists.

Note this repo is public, so a draft is readable by anyone who goes looking for
it. It is not surfaced anywhere, but it is not secret either.

#### The release gate

Each resource's workflow fetches `render.mjs` and its own JSON, and renders
`CHANGELOG.md` into the zip. If there is **no entry for the version being
built, the release stops.** Shipping the previous version's notes is the kind
of mistake nobody notices until a customer does.

## Adding a script

Add it to `versions`, drop its changelog in `changelogs/`. Nothing else. A
script with no entry here simply has no remote data, and its panel falls back
to the file it shipped with.
