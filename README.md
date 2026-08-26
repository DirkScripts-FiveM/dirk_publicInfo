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

A copy of each resource's own `CHANGELOG.md`. The copy in the resource stays
the source of truth; this one is what a server reads so it can see entries
newer than the build it is running.

Copied at release rather than maintained by hand — two copies kept in sync by
somebody remembering is two copies that drift, and the one that goes stale is
the customer-facing one.

## Adding a script

Add it to `versions`, drop its changelog in `changelogs/`. Nothing else. A
script with no entry here simply has no remote data, and its panel falls back
to the file it shipped with.
