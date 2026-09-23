# UPDATE 1.3.7 | 15/09/2026

## New

- **Warning when an anti-cheat may block settings.** If a known anti-cheat is running, the console names what to whitelist (events starting __dirk_cb); guide at docs.dirkscripts.com/resources/dirk-lib/anticheats.
- **A self-test for blocked events.** Shortly after a character loads, the client checks it gets a reply; if not within ten seconds, F8 says so, names the anti-cheat if found and links the fix.

## Fixes

- **The screen no longer stays blurred after using a map picker.** The blur now clears when the panel closes instead of lasting until a relog.
- **Progress-bar props no longer doubled on servers running ox_lib.** Only one prop now spawns when both libraries are installed.

## Performance

- **Lighter on ESX and framework calls.** dirk_lib now only reacts to the ESX player data it actually uses, and fetches the framework object once instead of on every access.
---

# UPDATE 1.3.6 | 12/09/2026

## New

- **A first-open setup for Script Studio.** The first time an admin opens it, it asks for language, currency symbol and units (suggested from the language) and offers a theme.
- **One weight and one distance unit for every dirk script.** Set them once in dirk_lib's Basic settings; fishing's own unit settings are carried over automatically.

## Fixes

- **Emptying a list in Script Studio now sticks.** Deleting every entry in a list and saving no longer brings the shipped defaults back on the next refresh.
- **Saving now confirms it worked.** A successful save shows a green Saved, and the prompt to save only appears while there are staged changes.
- **More of the panel is translated.** The unsaved-changes and problem counts, the Add button under every list and the delete confirmation are now in all thirteen languages.
- **Shared settings now reach every script.** Currency, units, language, server name and logo set in dirk_lib now apply everywhere, so a EUR server no longer shows $.
- **Safer config upgrades.** Moving a stored config to the new format can no longer leave a script running on half its settings, and the console says so if it fails.
- **Clearer console message when settings never arrive.** The client keeps retrying, and the console explains that silence usually means an anti-cheat or event filter is dropping it.
---

# UPDATE 1.3.5 | 10/09/2026

## Fixes

- **The Admins page is now fully translated.** Its explanations, the Can edit / View only badges, the scope pill and the added-by line are now in all thirteen languages.
---

# UPDATE 1.3.4 | 10/09/2026

## Fixes

- **The row editor now translates its own tabs.** Tab names and the from-inventory hint follow your language instead of showing GENERAL / STATS in English.
---

# UPDATE 1.3.3 | 10/09/2026

## Fixes

- **More of Script Studio is translated.** The search box, Save changes button, list filter box and day/hour/minute/second pickers are now in all thirteen languages.
---

# UPDATE 1.3.2 | 10/09/2026

## New

- **Japanese.** 日本語 joins the standard set, bringing it to thirteen languages; pick it under Script Studio → dirk_lib → Basic → Language.
---

# UPDATE 1.3.1 | 09/09/2026

## New

- **Script Studio speaks twelve languages.** Every string in the panel is now translated, including 150 that were stuck in English; set it once in Basic → Language for every dirk script.
- **Dutch, Polish and Simplified Chinese are new.** Picking Dutch or Simplified Chinese in the language dropdown now actually translates, and Polish joins them.

## Fixes

- **A script's own command always opens Script Studio.** Typing a script's name as a command, such as /dirk_fishing, now opens Script Studio on that script rather than the old panel.
- **The input dialog's Cancel and Submit buttons are translated.** They now follow your language instead of staying in English.
- **Security update for a bundled library.** axios is updated to 1.20.0, clearing published advisories in the version that shipped with 1.3.0.
---

# UPDATE 1.3.0 | 08/09/2026

## New — Script Studio

- **Every dirk script is configured in one panel.** /dirk_config opens it, or a script's own command such as /dirk_fishing, with one search, one save bar and one change history.
- **Logs and redirects.** Every dirk script's logs are kept on your server and filtered in the panel, and matching lines can be sent on to a Discord webhook or bot channel.
- **Any saved change can be reverted.** The change history shows who changed what, before and after, and any line can be put back for you to review.
- **Admins.** One place for who can open the panel, by person or ACE group, with a new view-only level that can never save; existing per-script grants carry over.
- **Bridges and changelogs pages.** See what dirk_lib detected on your server next to your overrides, and read what changed without leaving the game.
- **Better controls throughout.** Durations, hour pickers, range sliders, areas drawn on a real map, coordinates set by walking to the spot, and one shared Players page.
- **The panel opens fast.** Your game already holds the settings, so only a little admin data travels and every script loads at once.
- **Testing System.** Type dirktest in the server console, or dirktest dirk_fishing for one script, to check it works with your framework and inventory; scripts with tests get a Tests tab.

## New — levels and XP

- **One levelling system for every dirk script.** Levels per player or per place, on a Long haul, Steady, Classic RPG or Reachable curve drawn live in the panel; switching never takes anyone's XP.

## Fixes

- **Players no longer get stuck on default settings.** A player who joins while the server is still loading its settings now retries until the right ones arrive.
- **Change history only lists real edits.** Saving a list row no longer logs unchanged values, and stored settings a script does not list are kept rather than deleted.

## Fixes — the settings map

- **Map pins behave.** Dragging is off until you turn it on, walked-to positions are edited in the row, and nearby pins group into one until you zoom in.
- **Area checks work at real world height.** Areas drawn on the map are flat unless a height is asked for, and the map's place editor now matches the list editor.

## Fixes — map blips

- **Map blips behave.** Changing one replaces it instead of duplicating it, owner-only and on-duty blips stay hidden from everyone else, long-range works, and hidden blips no longer leak.

## Fixes — settings panel

- **Sliders name their own steps.** A blip's size reads Tiny to Huge instead of fishing's difficulty words, and slider and dropdown labels translate.
- **Jumping to a section always lands.** Rail clicks and search results now reach a script's last sections.
---

# UPDATE 1.2.78 | 17/07/2026

## Fixes — devix-inventory bridge

- **Usable items work on devix-inventory.** Fishing rods and other usable items no longer fail with "cannot find slot on use", as the exact slot and metadata now reach the script.
- **Item metadata now saves on devix-inventory.** Metadata such as a fishing rod's loadout now persists for every item, not just weapons.
---

# UPDATE 1.2.77 | 17/07/2026

## Fixes

- **Callback timers no longer linger.** lib.callback requests now clean up the moment they are answered, so a busy server no longer builds a backlog of dead timers.
- **SQL diagnostics fully stop when debug is turned off.** Turning off Basic → Debug now stops the hitch monitor straight away instead of at the next restart.
---

# UPDATE 1.2.76 | 15/07/2026

## Fixes

- **Big join-time hitch removed.** The groups check that ran on every character load, up to 700ms per join on a busy server, now exits instantly when no groups are active.

## Improvements

- **Lithuanian translation polished by a native speaker.** 106 strings improved.
- **Italian added to the language picker.** The Italian translation already shipped and can now be selected under /dirk_lib → Basic → Language.
---

# UPDATE 1.2.75 | 10/07/2026

## New

- **Lithuanian added.** Lietuvių (lt) is now listed under /dirk_lib → Basic → Language; it is a solid first pass, and corrections are very welcome.
---

# UPDATE 1.2.74 | 09/07/2026

## Fixes

- **Fresh installs no longer break every dirk script's config.** When all dirk scripts start together on a new database, the shared settings table is now created safely, so nothing times out.
- **A clear error if the settings table cannot be created.** If your database user lacks CREATE permission, the console now says exactly that and how to fix it.
---

# UPDATE 1.2.73 | 09/07/2026

## New

- **Norwegian added to the language picker.** Norsk (no) is now listed under /dirk_lib → Basic → Language, so scripts with a Norwegian translation, like dirk_fishing, show in Norwegian.
---

# UPDATE 1.2.72 | 09/07/2026

## Fixes

- **Custom item images now display.** ox_inventory item images set as a URL, nui:// path, data URI or absolute path are now used as-is, so custom art shows in every dirk UI.
---

# UPDATE 1.2.71 | 09/07/2026

## Fixes

- **Client-side inventory checks now work on devix-inventory.** Rod loadouts, bait counts and has-item checks now read the player's items correctly on devix.
---

# UPDATE 1.2.70 | 08/07/2026

## Fixes

- **Full inventories now block purchases on ox_inventory and qs-inventory.** The carry check now runs, so a player with no room is no longer charged without receiving the item.
---

# UPDATE 1.2.69 | 06/07/2026

## New

- **Store a vehicle in any garage system with one call.** lib.garage.addVehicle only writes the columns your vehicle table has, fixing Unknown column 'garage' errors on setups like ESX + jg-advancedgarages.
- **More garages auto-detected.** jg-advancedgarages, cd_garage, okokGarage, esx_garage and loaf_garage are now recognised alongside qb-garages, wasabi and renewed.
---

# UPDATE 1.2.68 | 05/07/2026

## Fixes

- **Item icons no longer need a restart to appear.** If your inventory starts after dirk_lib, the image path is now corrected live; a path you set in /dirk_config is never overwritten.
- **devix_inventory icons load.** The image path now points at the folder where devix keeps its icons.

## Improvements

- **Older tgiann-inventory icons work out of the box.** dirk_lib detects a separate inventory_images resource and uses it automatically; newer tgiann is unaffected.
---

# UPDATE 1.2.67 | 05/07/2026

## Improvements

- **Item descriptions come from your inventory.** The shared item list now includes each item's ox_inventory description, so scripts can use it instead of storing their own.
---

# UPDATE 1.2.66 | 03/07/2026

## Fixes

- **Locale files are no longer changed at runtime.** A missing translation now simply falls back to English, and locale files stay exactly as shipped.
---

# UPDATE 1.2.65 | 03/07/2026

## Fixes

- **Usable items now work on tgiann-inventory with ESX.** Using an item such as a fishing rod no longer silently does nothing.

## New

- **devix_inventory support.** A first compatibility pass covering add, remove, read and item metadata; a couple of details still need confirming on a live install.
- **Traditional Chinese (zh-TW) translation.**
---

# UPDATE 1.2.63 | 26/06/2026

## New

- **Send logs to Grafana, Datadog or Fivemanage.** A new Logger tab in /dirk_config routes every dirk script's logs to your chosen service, alongside Discord webhooks.
- **Per-resource access control.** Each script has an Access tab granting config access by job, gang, ACE group or player; the dirk_lib_master_group convar always has access.

## Improvements

- **The Appearance tab is now called Theme.** Same settings, clearer name.
- **Lighter config-panel load.** The panel loads from one cached fetch, and server-only fields are only sent to admins when they open it.
- **English fallback for untranslated strings.** A label with no translation in your language now shows in English instead of the raw key.
---

# UPDATE 1.2.62 | 25/06/2026

## Fixes

- **No more errors from reusing a removed ped.** Cached peds are now checked before reuse, preventing nil-ped errors after respawns or model swaps.
---

# UPDATE 1.2.61 | 24/06/2026

## Fixes

- **core_inventory: item images and fitted rod parts fixed.** Shop and loadout icons now show, and fitted reels, lines and hooks save properly on core_inventory.
---

# UPDATE 1.2.60 | 23/06/2026

## Fixes

- **No more join-time errors from player lookups.** On qb-core, qbx_core and ESX, player lookups now fail safely for connecting players, which could block op-multicharacter character creation.
- **ESX + tgiann-inventory: using an item no longer throws an error.** Using a fishing rod or any usable item now fails gracefully with a warning.
- **qb-inventory: item metadata now saves per slot.** Fitted rod parts and other item metadata now save correctly on qb-inventory.
- **Item lists load even with a nameless item.** An item with no name no longer stops the item list from loading.
---

# UPDATE 1.2.59 | 21/06/2026

## New

- **one_inventory (OneStudios) is now supported.** It is auto-detected, or pick it under Bridging in /dirk_lib, and every dirk script using the inventory bridge runs on it.
- **Item images are detected automatically.** Usable items work through your framework, and you can override the image path under Bridging if you serve images from a CDN.
---

# UPDATE 1.2.58 | 19/06/2026

## Changes

- **New Basic tab in /dirk_lib.** Server name, language, currency and a debug toggle now live in one tab, replacing Branding and Localization; existing values carry over.
- **Advanced and Bridging tidied.** Advanced now holds just the primary-identifier setting, and a custom image path under Bridging now overrides the detected one.
- **Easier Discord settings page.** A bigger show/hide toggle on the bot-token field, and the bot setup guide is shown inline with a clearer developer-portal link.

## Localisation

- **Spanish is now fully translated.** A large batch of strings that fell back to English are now complete.
- **Tab labels switch language instantly.** The config menu's tab labels update the moment you change language, with no restart needed.

## Performance

- **SQL and hitch diagnostics are now opt-in.** They only run when Basic → Debug is on, so there is no overhead otherwise.
- **Lighter startup.** The config system skips a database write on a clean restart and checks the shared table once per boot instead of in every dirk script.
---

# UPDATE 1.2.47 | 12/05/2026

## Fixes

- **Hotfix: broader ox_inventory compatibility.** Reading inventory items no longer passes an option that modern ox_inventory does not support.
---

# UPDATE 1.2.46 | 12/05/2026

## Fixes

- **Hotfix: no more crash on ox-compatible inventories.** Inventories standing in for ox_inventory, such as ak47_inventory, no longer fail with "No such export GetInventoryItems".
---

# UPDATE 1.2.45 | 12/05/2026

## Fixes

- **Hotfix: the configurator opens with a malformed inventory item.** An item without a name no longer crashes the item lookup, and ox_inventory items fall back to their key.
---

# UPDATE 1.2.43 | 11/05/2026

## New

- **Item install files are generated for you.** dirk_lib writes ready-made ox, qb and ESX item install files into each script's INSTALLATION folder after every config change.
- **Missing-items warning.** The console lists configured items missing from your inventory on start, and the configurator shows a banner with ready-to-paste snippets.
- **Spawned items behave like earned ones.** Items an admin spawns from the configurator can now carry real metadata, such as catch details.
- **New lib.inventory.item(name).** Look up a single item's definition on any inventory bridge.

## Performance

- **Faster item lookups.** Single-item lookups now use native fast paths on ox_inventory, tgiann-inventory, ak47_inventory, dirk_inventory, qb-core, qbx_core and ESX.

## Fixes

- **ESX item SQL now imports cleanly.** The generated ESX SQL matches the real ESX items table, so it no longer fails to import on some servers.
- **Items defined by your inventory are found.** An inventory's own item list, such as qs-inventory's, is now used before the framework's, so its items are no longer reported missing.
- **ESX: no crash when an account is missing.** Money checks return 0 instead of crashing, and cash and money are treated as the same account on ESX.
- **No more missing-file warning on first boot.** The GitHub release download now includes every file FiveM expects.
---

# UPDATE 1.2.42 | 08/05/2026

## Changes

- **The master group takes a list.** dirk_lib_master_group now accepts a comma-separated list, defaulting to group.admin,admin,command, so admins match whatever your server.cfg grants.
- **Denied access is logged.** When /dirk_config refuses a player, the server console logs the group it checked and their identifiers, so config mismatches are easy to spot.
- **New export: exports.dirk_lib:canEditScriptConfig(src, resourceName).** Any script can call it to check config permission server-side.
- **No breaking changes.** Existing custom permission checks keep working as a fallback, and can grant extra access but never lock out the master group.

## Fixes

- **Saving works for master admins.** Saving now uses the same permission check as opening the editor, so saves no longer silently fail.
- **Deleted list entries stay deleted.** Entries removed from a nested list, such as stores, no longer come back from the defaults on every load.
