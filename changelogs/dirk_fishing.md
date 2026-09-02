# UPDATE 2.1.0 | 02/09/2026

## Before you update

- **This needs dirk_lib 1.3.0 or newer.** Update dirk_lib first — fishing's settings now live in its panel.

## The move

- **Fishing's settings now live in Script Studio**, the one panel every dirk script shares. /dirk_fishing still works and opens straight to fishing. Everything from the old panel came across — the fish and equipment editors, the zones map, the Players page, theme, all of it — this is a move, not a rebuild from scratch.

## New

- **Search across every setting.** Type what you are looking for instead of knowing which tab it lives in.
- **Any saved change can be reverted.** The change history now puts values back, staged for you to review like any other edit.
- **Read fishing's logs in-game.** Every event fishing reports is kept on your server and readable under Logs — filter by event, player or time, and open a line for the full payload.
- **A view access level.** Staff can be given read-only access — settings and logs, no saving, and server-only values like webhook URLs are never sent to them.
- **Per-fish zone modifiers get their own tab** with sliders, instead of a bare number input squeezed into the zone editor.

## Changes

- **Logging is simpler.** Fishing now just reports its events; where they go — kept on your server, forwarded to a Discord channel or webhook, filtered by event — is set once in Script Studio under **Logs** and applies to every dirk script. Your existing webhook is carried over the first time it loads, and the Logging section links straight through. The per-event toggles are now redirect filters, in one place, rather than a second set only fishing had.
- **The Access tab is gone.** Who can edit fishing's settings is managed on the shared **Admins** page, and any grants you had are folded in automatically.
- **Fish difficulty bands are worked out from your own fish list.** They were fixed level ranges (1-15, 16-40, 41+), which only made sense at the default max level — a server capped at 30 could never have an Advanced fish, and one running to 300 had almost every fish there. Your fish are now sorted by Info Unlock Level and split into three even groups, so no band is ever empty. On a default setup this moves five fish; daily challenges drawing from a band will pick slightly differently.
- **Daily challenge options say what they mean** — "Catch N of one species" and "Beginner / Intermediate / Advanced" rather than catch_species and tier2.

## Fixes

- **A rod could not be stowed when nothing was biting.** Abandoning was blocked any time a line was in the water, so with no bite there was no way out — the rod was stuck until you reconnected. It is now blocked only during an actual fish fight, and abandoning cleans up any leftover bite state. (Reported by adragonhunter.)
- **Players could be left running on the wrong settings for a whole session** — different shop hours, zones and language than the panel showed. The cause and fix are in dirk_lib 1.3.0; fishing ships a test suite entry so it can never come back quietly.

---

# UPDATE 2.0.66 | 07/08/2026

## New
- **Built-in test suite.** A console-only `dirktest` command (powered by dirk_lib's new `lib.test`) validates the inventory bridge — add/remove, metadata, can-carry and usable items — plus core fishing logic (XP/level, earnings) against your live setup. Handy for confirming a new inventory is compatible before going live. Run it from the server console; see the docs. (Requires **dirk_lib 1.2.79+**.)

## Fixes
- **Admin Players panel:** the money/activity stat-tile icons were rendering too small — they now scale properly.

---

# UPDATE 2.0.65 | 21/07/2026

## New
- **Fishing economy stats in the admin panel** (`/dirk_config` → Players). Staff can now see the money fishing is putting into your economy, so you can spot runaway earners and tune the numbers before it goes ham:
  - **Server-wide (top of the Players list):** total earned from selling — split into **Fish / Fillets / Bait** — plus total catches, total weight and the biggest catch on the server.
  - **Per player (expand any row):** that angler's earnings with the same **Fish / Fillets / Bait** split, alongside their catch count, weight, species discovered and personal best.

  Earnings are recorded per sale and read back from a summary table (server-side cached, one indexed lookup — never a scan of the catch log), so opening the panel doesn't hitch even on a busy server. Money counts **forward from this update**: past sales weren't tracked, so the figures build from a clean baseline. Anything sold at the market feeds the totals, trap catches included. (Requested by mnimize.)

---

# UPDATE 2.0.64 | 19/07/2026

## Performance
- **Crab-pot fill tick no longer re-resolves every player each tick.** The periodic trap-fill loop looked up each online player's identifier through the framework *every* tick — an O(players) burst of cross-resource calls that, on a high-population server, could stall a single frame (profiled at ~223ms at scale). Each player's identifier is now resolved **once per session and cached**, so the tick does effectively no cross-resource work in steady state. Removes a periodic hitch that grew with player count. (Profiled by reyesmtv.)

---

# UPDATE 2.0.63 | 15/07/2026

## New
- **`Disable Permit System` master switch** (Basic → Permits). One toggle turns off the ENTIRE licence system — the global market licence, per-zone and per-fish permits, the store peds' Manage Permit option and permit purchases. Previously the market's global licence check had no off-switch at all, so servers running their own licensing couldn't fully disable ours even with every `permitRequired` flag off. (Reported by groovies.)
- **Lithuanian (`lt`) locale added** — translation contributed by snaiperiukas, ačiū! Set the language to `lt` in `/dirk_lib`.

## Fixes
- **Destroyed crab pots can now be pulled in.** The "Trap Broken" interaction was informational-only, leaving broken pots stuck in the world forever. It now opens the trap so you can pull it in — you keep whatever it caught, the pot and bait are consumed. (Reported by mnimize.)
- **Fish finder can no longer lock itself in your inventory.** The use-item flow waited on a server↔client round-trip; if that round-trip died (client error, or an anticheat blocking dynamic callback events), the inventory kept the item flagged in-use until a restart. The water check now runs entirely client-side and the item is released instantly. If you run ElectronAC or similar, also whitelist events starting with `__dirk_cb_`. (Reported by snaiperiukas.)
- **Server hardening:** the fish-finder grid lookup no longer errors ("table index is nil") when a client sends an invalid cell key.

---

# UPDATE 2.0.62 | 10/07/2026

## New
- **Server exports for the fishing XP / level system.** Other resources can now read and award fishing progression:
  - `exports.dirk_fishing:getXp(src)` → current fishing XP
  - `exports.dirk_fishing:getLevel(src)` → current fishing level
  - `exports.dirk_fishing:addXp(src, amount)` → grant XP (returns new total)
  - `exports.dirk_fishing:removeXp(src, amount)` → take XP, clamps at 0 (returns new total)
  - `exports.dirk_fishing:setXp(src, amount)` → overwrite XP (returns new total)

  All take a server id and update the player's level-derived UI live. Levels use the same curve as the guidebook, so exported values always match what the player sees. (Requested by emmanx.)

---

# UPDATE 2.0.61 | 09/07/2026

## New
- **Norwegian (`no`) locale added.** Set the language to `no` in `/dirk_lib` to run the fishing UI in Norwegian. (Translation contributed by mnimize — thank you!)

---

# UPDATE 2.0.60 | 09/07/2026

## New
- **Per-fish meat item is now editable in the fish editor.** Each fish already supported a per-species meat override (gutting that fish grants a specific item instead of the global meat) — it's now a proper item dropdown in `/dirk_config` → **Fish → Gutting**, so you can set e.g. oyster → `oyster_meat` without hand-editing JSON. Leave it empty to use the global meat item. (Requested by mnimize.)

---

# UPDATE 2.0.59 | 09/07/2026

## Fixes
- **The UI now uses your configured currency symbol everywhere.** Money values across the fishing UI — stores, fish market, bait market, tournaments, daily challenges, permit prices, the guidebook and the admin panel — were hardcoded to `$`. They now all read the currency you set in `/dirk_lib` (Basic → Currency), so changing it updates the entire UI in one place. (Reported by mnimize.)

---

# UPDATE 2.0.58 | 08/07/2026

## Fixes
- **Buying from a store with a full inventory no longer charges you.** The shop now adds your items first and only takes payment for what actually fits — so a full (or partially-full) inventory can never leave you "charged but no items". If nothing fits you pay nothing; if only some fit, you're only charged for those. (Reported by mnimize.)

---

# UPDATE 2.0.57 | 08/07/2026

## Improvements
- **Traditional Chinese (zh-TW) refreshed** with a community-finalised translation — more accurate terminology across the interface. (Thanks to kaijun for the corrections.)

---

# UPDATE 2.0.56 | 06/07/2026

## Fixes
- **Fishing level now updates live — no relog needed.** The guidebook level (and the rod loadout's equipment gates + catch difficulty) read the player's level from the framework's client-side data, which on some frameworks (e.g. QBX) didn't refresh when XP was gained — so the level only caught up after a relog. The server now pushes the new XP to the client on every gain, so it reflects immediately.
- **Tournament start/end pickers use your local time.** The one-off tournament date/time fields *displayed* in UTC while *saving* in local time — a mismatch that showed the wrong time and made it easy to set the wrong start/end. They now show and save consistently in your local timezone.

---

# UPDATE 2.0.55 | 05/07/2026

## Fixes
- **Fish with no description can be saved/edited again.** Since 2.0.53 item descriptions come from your inventory item (with the config value only a fallback), but the fish editor still *required* one — so any fish without a description couldn't be saved, which blocked editing them at all. The description field is now genuinely optional, matching equipment, bait and tools.

---

# UPDATE 2.0.54 | 05/07/2026

Rods, traps and dig tools now work on inventories that don't hand the script a slot when an item is used (devix, older tgiann).

## Fixes
- **Using a rod / trap / dig tool now works on non-ox inventories.** On some inventories (devix, and older tgiann via the ESX use path) using the item didn't pass its inventory slot through — which errored the rod/trap out entirely (it'd come out sometimes and not others) and stopped bait digging. The script now recovers the slot by looking the item up in your inventory, so it works whether or not the slot came through on use. No change on ox_inventory.

> Requires **dirk_lib 1.2.68** or newer — it ships the matching inventory image-path fixes (cold-boot icons, devix, and older tgiann).

---

# UPDATE 2.0.53 | 05/07/2026

Item names & descriptions now follow your inventory — translate once, everywhere.

## New
- **Fish, equipment, bait, dig tools and store items now display the name + description straight from your inventory item** (ox_inventory, etc.). Translate/rename an item once in your inventory and it updates everywhere in fishing — the book, fish/bait markets, catch popup, traps, gutting, notifications, loadout and the admin panel. No more keeping a second set of labels in the fishing config in sync.
- **Type-your-own item picker.** When adding a new fish/piece of equipment/tool you can now type a brand-new item name in the picker (not just pick an existing one) — the Label/Description fields then appear so you can seed it, and it's written into the generated install snippet.

## Improvements
- The config **Label/Description fields are now the "seed"** for an item: editable while the item isn't in your inventory yet, then locked (with an ℹ️ "from your inventory item" hint) once it is — so it's always clear where the live value comes from. The admin lists and editors show the resolved inventory name too.

## Fixes
- **Dig-tool edits now save.** Renaming/changing a dig tool's item silently dropped the edit — fixed (the save matched the new name instead of the original). The same class of save bug was hardened across the equipment editors.

> **Heads-up:** names + descriptions now come from your **inventory item**. Nothing breaks if an item has no description — fishing falls back to its own built-in text. But to show *your own / translated* descriptions, set them on the items in your inventory (e.g. `ox_inventory/data/items.lua`).
>
> Requires **dirk_lib 1.2.67** or newer (item descriptions are surfaced by the shared item list).

---

# UPDATE 2.0.50 | 04/07/2026

Follow-up to the localisation pass.

## Fixes
- **Config-panel sidebar now translates.** The left-hand section names (Basic, Theme, Players, Fish, …) stayed English even after switching language, because they were resolved once when the panel first loaded rather than in the active language. They now translate and update live on a language change — matching the tabs and field labels. Same fix applied to the fish water-type toggle and the zone editor's tabs.

---

# UPDATE 2.0.49 | 03/07/2026

Localisation completeness pass — every language is now fully translated, so no more half-translated menus.

## Fixes
- **Every language is now fully translated.** A batch of newer strings — mostly the admin config-panel labels, plus the Big Fish / gutting / trap options added in 2.0.48 — hadn't been translated yet, so those specific lines fell back to English and the menus looked half-and-half. Spanish, Portuguese, Italian, French, German and Traditional Chinese are now complete against English.
- **Three labels that showed in English in every language** — Access, Theme and Depth Limit — had no translation entries at all; they're now defined and translate properly.

---

# UPDATE 2.0.48 | 03/07/2026

A big round of feel and quality fixes from live server feedback — the reel, the catch camera, and crab traps all got attention — plus an optional "big fish are harder" mode, a reorganised gutting config tab, and a stack of config-panel fixes. Traditional Chinese (zh-TW) is now available.

> Requires **dirk_lib 1.2.64** or newer.

## New features
- **Optional "Big Fish Difficulty".** A new toggle (Basic → Fishing) makes heavier individual fish genuinely harder to land — a tighter catch zone, faster movement, and a harsher drain the bigger the fish. Three sliders tune each axis. **Off by default**, so nothing changes unless you turn it on.
- **Gutting has its own config tab.** Moved out of the crowded Basic tab into a dedicated Gutting tab with General / Rewards sub-tabs, a "Cut Forgiveness" slider to set how strict the cut line is, and a gut-reward list that scrolls under a pinned header instead of getting cut off.
- **Global gut-reward pool editor.** Manage the shared gut-reward drops (items + chances) right in the panel (Gutting → Rewards) instead of editing the config by hand.
- **Traditional Chinese (zh-TW).** Now selectable in the language dropdown — thanks to a community translation.

## Fixes
- **Reeling reworked.** The scroll wheel now only reels in — no more accidental "recast" when you scroll the other way — it's a touch gentler, and reel speed now scales with water depth, so shallow water isn't frantic and deep water isn't a slog.
- **Casting from docks / banks into shallow water.** Casting from an elevated spot over shallow water no longer casts and then instantly ends — the cast-time and landing depth checks now agree, so a spot either shows a clear "too shallow" marker or actually fishes.
- **Catch camera no longer snaps.** The reward zoom now plays its full blend and waits for the fish to be visible, instead of occasionally cutting straight to it.
- **Crab traps no longer silently vanish.** Traps that seemed to "disappear" were actually breaking. Break chance is much lower by default and fully editable (Basic → Traps → Chance of Break — set 0 to disable). A broken trap now stays put with a red marker and reads "Trap Broken" when you look at it, then clears itself over time — no more mystery disappearances.
- **Trap contents no longer flicker.** Keeping or releasing one fish from a pulled trap no longer re-animates the whole list — only the one you picked leaves and the rest slide up.
- **Gutting rewards track your cut.** A cut you don't actually complete now pays nothing (no more clicking a single point twice for a free reward), and the reward scales with how accurate the cut was.
- **Secondary reel keybind works.** The alternate reel-in / reel-out key genuinely wasn't firing — fixed.
- **Ultrawide rod prompt.** The in-world "Modify Rod / Cancel" prompt no longer stretches sideways on 21:9 / 32:9 monitors.
- **Config-panel crash hardening.** Opening a config section (stores, zones, fish, equipment, bait, tournaments…) with an empty list no longer crashes — including the Stores section, which could throw on a store with no locations, stock, or categories.
- **Gut-reward editor now saves.** A reward row left without an item was silently blocking the whole fish from saving; blank rows are dropped on save so your rewards stick.

## Optimisation
- **Fish and trap props are far smaller.** Every streamed fish/trap model was re-optimised — the prop pack dropped ~68% (from ~330 MB to ~105 MB), with textures normalised to compressed DXT1 + proper mipmaps. That's a big cut to streaming VRAM / cache pressure with no visible quality loss (a few smooth metallic fish keep uncompressed normal maps to stay sharp).

---

# UPDATE 2.0.47 | 26/06/2026

Fish-fillet selling and logging that can flow to Grafana / Loki / Fivemanage (not just Discord), on top of a round of feel + crash fixes from live server feedback: the catch minigame now lands fair clicks, reels actually respect their depth rating, traps stay put and place where you look, and a join-time crash that could block character creation is gone — plus a big cut to crab-pot server cost.

> Requires **dirk_lib 1.2.62** or newer — it ships the logging backends, the per-resource access model, and the framework-bridge fix the join-crash fix below depends on.

## New features
- **Sell fish fillets.** Gut a fish for a fillet, then sell it at any market that stocks that species — priced off the live market rate with a configurable filleting bonus on top. (Selling sliced / filleted fish was a community request.)
- **Logging now reaches beyond Discord.** Route your logs to Grafana (Loki), Datadog or Fivemanage as well as — or instead of — a Discord webhook, set up centrally in dirk_lib. Every sale and purchase log now itemises exactly what changed hands and for how much, and catch logs include the exact weight.
- **"Test webhook" button.** Sends a sample of every event you've enabled so you can confirm your logging setup at a glance — with the long event list split into its own tab.
- **Delegate configurator access.** A new Access tab lets you give trusted staff access to the fishing config without making them a full server admin.
- **Per-resource Theme tab.** Override the global dirk_lib theme just for fishing's panels — pick a palette + shade or set a full custom 10-stop palette — so fishing can match your server's look without touching every other dirk script.

## Fixes
- **Catch minigame — a good click no longer reads as a miss.** The visible bite "bell" is now locked to the exact window you can actually hit, and synced to the server clock, so clicking on the bite lands the strike (the old mismatch drifted worse the busier the server got). Added a small strike rate-limit on the server as anti-cheat.
- **Join crash that blocked character creation.** A "Player does not exist" error during early player load could stall op-multicharacter so new players couldn't make a character (and could crash the admin Players tab). The framework bridge now fails safe instead of throwing, and the client now waits for a valid player ped before it starts up — so players whose character uses a custom ped (animals / custom models) or who load through a multi-character menu no longer crash during that same early-load window. **Updating dirk_lib is required.**
- **Permit animation no longer plays on everyone nearby.** Pulling out your fishing permit played the pull-out animation on every player standing within a few metres — now only the person presenting it animates; others still see the card.
- **Crab pots stay on-spot.** Retuned the buoy physics so a placed trap holds its position instead of drifting or sinking off where you dropped it, while still bobbing naturally on the water.
- **UI errors / panels failing to open after a live restart fixed.** Restarting the resource while players were connected could spam a `no UI frame` error and leave the guidebook (and other panels) unable to open, because the interface's ready-gate didn't re-initialise. The gate now keys off the script's own UI readiness — so it re-opens correctly on every restart — and covers a couple of send paths that previously slipped past it.
- **core_inventory: blank item icons + rod equipment fixed.** On core_inventory the shop and loadout icons showed blank and rod parts (reel / line / hook) wouldn't fit onto the rod — both resolved. Requires the latest **dirk_lib** update.
- **Selling fish no longer silently fails on ox_inventory.** A strict item-matching quirk meant a sale carrying weight data could "complete" without removing the fish or paying out — the item is now removed and you're paid correctly (this affected fillets and weighted catches).
- **Permit purchase now tells you when you're short.** Buying a permit you can't afford previously showed nothing at all; you now get a clear "not enough money" message instead of a dead button.
- **Voice now always works while fishing.** Push-to-talk stays enabled whenever you're holding the rod or placing a trap, regardless of your keys-while-fishing setting — so you can still talk mid-cast even on an older config.
- **Depth no longer reads wild values on pools / rooftop water.** On non-natural water (MLO pools, rooftops) the line now stops at the real surface using collision, capped by a new max-artificial-depth setting, instead of plunging to a strange number — real ocean / river / lake water is detected and unaffected.
- **Bait digging: no more false "already dug here" when you're alone.** Your own finished or interrupted dig spots no longer block you (only other players' active spots do), and a completed spot now locks for a short regen window so you naturally move on. Stale spots are cleared on disconnect / idle.
- **More strings localised.** A batch of labels that were showing their raw key — plus the gutting prompts — now read properly, in both English and Spanish.

## Gameplay
- **Reels now enforce their depth rating.** Your line stops sinking at the equipped reel's max depth instead of always reaching the bottom — a cheap reel fishes shallow, deep-sea reels reach the deep marks. The depth indicator shows a marker at your reel's limit and a "Reel Limit" cue when you bottom out, so you know when it's time to upgrade.
- **Trap placement follows your camera.** The placement ghost now sits where you're *looking* rather than where your character is facing, so dropping a pot feels natural.
- **Bites now reflect fish size.** A bigger catch pushes a taller, bolder bite on the nibble strip while small fish stay subtle humps — a visual tell only; the strike window itself is unchanged.
- **Bait-dig fields reworked.** A dig field now seeds a set number of reward tiles (default 5–10 of the 25) in random spots each dig, rather than a flat per-cell density — tidier and easier to balance. (The admin control is now a tile count, not a %.)

## Performance
- **Crab/lobster pots are far cheaper to run at scale.** Each pot now precomputes its catchable-species list and only ticks while baited and not full, and the stale-pot sweep is amortised — cutting passive trap server cost ~5× on busy servers (a 3,000-pot server's tick dropped from ~20ms to ~4ms), with no change to catch rates.
- **Fish-caught history writes in bulk.** Catch records are now batched into periodic bulk inserts instead of one insert per catch, cutting database round-trips on busy servers. Collection stats, the book and leaderboards stay live — they reflect a just-caught fish immediately.

---

# UPDATE 2.0.43 | 20/06/2026

The big one — Discord logging, a stack of community-requested features, completed Spanish, and a round of performance + crash fixes. Everything since 2.0.28 in a single release (the versions in between were incremental/testing).

> Requires **dirk_lib 1.2.59** or newer — it ships the webhook helper plus the inventory-detection and metadata fixes this release relies on.

## New features

### Discord webhook logging
- **New Logging tab in the configurator.** Point it at a Discord channel webhook and choose exactly which events to log. Everything is **off by default** — nothing is sent unless you set a webhook URL *and* turn logging on *and* enable the specific event.
- **Loggable events:** fish sold, bait sold, equipment bought, permit bought, fish caught, crab pot placed, crab pot collected, daily challenge claimed, and tournament payouts — each an independent toggle.
- **Exploit flagging.** Set a "suspicious sale" amount and any sale paying out over it is flagged red with a warning, so you can spot someone abusing the job at a glance.
- **The webhook URL is server-only** — stripped from everything sent to clients; only an admin in the panel can set it. Customisable embed name, avatar and colour.

### Tournaments
- **"Most Combined Weight" scoring mode** — rank players by the total weight of all their catches, not just their single heaviest fish.
- **Late join** — a per-tournament *Allow Late Join* option lets players enter an in-progress tournament any time before it ends (ideal for long, all-day events).
- **Survive a server restart** — status, timing, participants and scores now persist, so a restart mid-event no longer wipes (and silently cancels) a live tournament.

### Configurator & zones
- **Per-zone fish modifiers, now editable** — a Species tab on the zone editor lets you give a zone custom abundance / weight / bite-chance overrides per fish (e.g. a secret spot where a rare species runs more common or bigger).
- **Per-species overrides replace, not stack** — a per-fish modifier cleanly replaces the zone-wide one for that species (empty fields inherit), so no more multiplicative math. Tidier rows with +/-% summaries.
- **Base price** is now shown on fish rows in the admin list, respecting your kg/lb setting.

### Stores & controls
- **Disable the built-in shop** — new *disableBuiltInShop* option hides the Open Store / Buy Equipment / Sell Bait ped interactions (keeping Manage Permit + Get Guidebook) for servers running their own shop system.
- **Talk while fishing** — new *keysWhileFishing* option keeps chosen controls (push-to-talk by default) enabled while holding the rod or placing traps. Add more (phone, etc.) via config.

## Security
- **Admin panel hardened.** The player-management actions (view roster, set fishing level) now require the same configurator permission as the rest of the admin panel, and the trap & permit admin actions were brought onto that same permission — so admin-panel access is governed by one consistent setting. **Updating is recommended.**

## Fixes
- **qs-inventory: rod parts and bait now save.** On qs-inventory the reel/line/hook fitted to a rod — and its bait count — silently failed to persist (parts vanished on re-read, bait never went down). The fix lives in dirk_lib: qs stores item metadata under its own `info` field while the lib read it back as `metadata`, so nothing round-tripped. The bridge now mirrors the two on every read, so any dirk resource on qs-inventory benefits. (Also fixes qs-inventory being misdetected as qb-inventory — part of the same root cause.)
- **Cast crash on newer game builds (b3751+)** — a physics call on the fishing line could intermittently crash the game when a cast landed. Removed; the engine simulates the rope itself.
- **Trap-caught fish now unlock in the fish book** — crabs, lobster etc. pulled from traps were added to inventory but never recorded to your collection.
- **Trap inspect/place error** — a bug that made the buoy flicker and the inspect occasionally fail.
- **Rod-indicator item images** no longer break on inventories whose image path ends in a slash, and respect names that already include an extension.
- **Trap pickup keeps the real fish weight.** Fish still inside a trap when you picked it up reverted to a default weight (so they sold for the wrong price) and could bloat your carry weight. They now keep their true weight, like every other catch.
- **A hooked fish is released the instant you disconnect.** Previously, if you hooked a fish then disconnected, it stayed locked to you until the area refreshed (~5 minutes), blocking other players from it. It's now freed immediately.
- **Fish taken one at a time from a trap now count.** Taking individual fish from the trap-inspect menu gave you the fish but never recorded it to your collection book or the leaderboards (collecting the whole trap at once did). Every trap fish now counts.
- **Permits with no price or duration no longer fail silently.** A fish/zone permit configured without a price or interval couldn't be bought (the purchase just did nothing). It's now handled gracefully, and the zone editor requires both fields when a permit is enabled — matching how fish permits already worked.

## Performance & stability
- **Leaderboards & stats now scale to millions of catches.** The global leaderboard and overview used to add up your server's *entire* catch history on the spot every time someone opened them — fine early on, but progressively slower as the log grows. They now read a compact per-player summary that's kept current as fish are caught, so they stay fast no matter how large the catch log gets. Your full history is untouched: a one-time automatic build creates the summary on first start (in the background, chunked so it never stalls the server), and a nightly self-check keeps it perfectly accurate. The "today's top" panel also stopped scanning all history to find today's catches.
- **Fish-catch handler rebuilt — roughly 13× faster.** The catch event (the heaviest item in a customer's profiler) dropped from ~85 ms to ~6 ms per catch: framework and inventory lookups are now cached, three database queries were collapsed into one, and the catch record writes in the background. Even faster on ox-based stacks.
- **No database write holds up a catch anymore.** Saving your daily-challenge progress was the last write that made a catch wait on the database before it finished — it now saves in the background like the catch log and leaderboards already did. That's one fewer database round-trip on *every single catch*, trimming the per-catch time again on top of the rebuild above (on an ox test stack the catch now runs in the low single-digit milliseconds, with no database wait left on the path).
- **Catches no longer read the database either.** The per-catch lookup that fetched your collection stats (first catch of a species, personal best, times caught) is now served from an in-memory cache that loads once when you connect and updates as you fish. So a catch does **zero** database reads — and that lookup can no longer slow down as your catch history grows into the thousands, which keeps the catch fast on long-running servers with huge logs.
- **Overview tab is lighter to open.** It now loads everything in a single request (was three), runs fewer database queries, and caches the result — so re-opening the guidebook Overview doesn't re-query every time.
- **Lower idle CPU on the client** — the strike-input loop no longer runs every frame when you aren't actively fishing.
- **Leaderboard freeze fixed.** Opening the guidebook's global leaderboard could hang the entire server up to ~19s when many players were online — it resolved each ranked player's online status one row at a time, each walking the whole player list. It now resolves every online player once up front. (Only ever appeared under load.)
- **Passive trap fill-tick hitch fixed** — the ~90s trap fill did the same per-player scan for every placed trap, on autopilot. Now resolves online players once per tick.
- **Store-open hitch halved** — stores/markets fetched the player's level twice per open; now once. The buy-shop menu is also precomputed once instead of rebuilt per open (which, under many simultaneous opens, could crash a busy server).
- **Lighter startup** — removed a redundant per-player tournament sync that rebuilt full state on every join; the book pulls state on its own when opened.
- **Cleaner long-uptime memory** — trap and fish-population state is now released properly on disconnect (it was bound to an event that never fired).

## Localisation
- **Spanish (es) is now complete** — ~300+ missing strings filled across the script and the new logging panel, so a server set to Spanish no longer falls back to English.

---

# UPDATE 2.0.28 | 14/05/2026

Hotfix round — store editor + book map crashes, lbs/kg display alignment, optional strict catch-level gate.

### Bug fixes
- **Store editor stock tab crashed on equipment stores with Misc items.** Default Misc entries use `ref` (e.g. `basic.fishGuttingItem`) instead of a literal item name, and the stock filter assumed every entry had a `name` field — `undefined.toLowerCase()` blew up the whole modal. Defensive coalesce + `ref` is now searchable too.
- **Stock rows with `ref` entries now display properly.** Was showing "Unknown" because the row tried to look up an undefined item name. The row now resolves the ref against the live scriptConfig and pulls the underlying item's label + image. Switching a ref entry to a hardcoded item via the Item dropdown clears the ref automatically.
- **Book map crashed when opening a trap.** React error #310 — a `useCallback` declared after the `if (!trap) return null` early return caused the hooks count to differ between renders. Hooks reordered above the early return.
- **Admin Players tab wasn't sorting online players to the top.** Typo bug introduced with the 2.0.26 sort feature — `lib.inventory.identifier` instead of `lib.player.identifier` in the online-IDs collection. The pcall wrapping it swallowed the error silently so the online list was always empty and the SQL had no IDs to bubble up. Online players now actually sort first across all pages. Removed the unnecessary pcall too, so future typos don't hide themselves.
- **Every trap catch displayed as "Legendary" in the inspect UI.** Server was sending the species' `abundance` value with the trap contents, but the client's content-positions builder dropped that field on its way to the NUI. With `abundance` arriving as undefined, the rarity ramp collapsed to its `< 0.05` legendary bucket for every fish. Field is now forwarded properly — lobsters read as Rare, crabs as Uncommon, etc.
- **Crab traps ignored the catch-level gate.** Rod fishing's `pickCandidateFish` got the strict-catch-level logic but `rollTrapFish` had no level check at all, so a level-1 player's trap could pull a level-72 King Crab. Trap rolls now respect `basic.skillSettings.strictCatchLevel` using the owner's live fishing level (cached at inspect time so offline rolls still gate sensibly).

### lbs/kg display alignment
- **Fish base price field now respects `basic.weightUnit`.** Admin in `lb` mode sees the BasePrice input labelled "$/lb" and the number they type maps to $/lb. Server still stores internally as $/kg (single source of truth) — the input converts on save and on load.
- **Guidebook Fish tab price row** swapped from hardcoded `$X/kg` to `fmtPricePerWeight()` so it follows the server's weight unit setting.

### Catch level gate
- **New `basic.skillSettings.strictCatchLevel` toggle (default `true`).** When on, a player can only catch fish at or below their fishing level — matches what the fish markets already require for selling. Stops the "I caught it but can't sell it" experience. Set to `false` to restore the previous behaviour where fish up to 10 levels above are catchable at a reduced rate.

---

# UPDATE 2.0.26 | 11/05/2026

> Requires **dirk_lib 1.2.43** or newer.

**Headline:** fish gutting has been fully redesigned. Two minigames now — a drag-along-the-line **cut** for fish, and a click-the-circles-before-they-vanish **crush** for crustaceans and shelled species — plus a top-down cinematic camera, a no-auto-close reward overlay with rarity-coloured tiles, optional tool durability, and one universal meat item that carries species metadata so the inventory tooltip reads `Species: King Crab / Weight: 1.2kg`.

This release also wraps up a batch of customer-driven fixes from tickets against 2.0.24/2.0.25, a new schema-driven install + missing-items pipeline that replaces the old hand-rolled install file, and a pile of admin/configurator polish.

### Fish gutting — full redesign
The old per-species meat-name loop and pulse-timing minigame are gone. Replaced with a single universal meat item, a fresh drag-to-cut minigame, a cinematic top-down camera, weight-scaled fish props, and a reward overlay you close in your own time.

**Meat item + tooltips**
- One global fish meat item now covers every species. The species name, weight and label are stored on the meat itself, so on ox_inventory each stack reads as "Longnose Gar Meat", "King Crab Meat" etc. — not all "Fish Meat". Other inventories silently ignore the per-instance label.
- Meat tooltip now shows `Species: …` and `Weight: …kg` lines, the same way caught fish tooltips do. Tool tooltips gain a `Uses Left: N` line when durability is on.
- Fish meat now weighs 100g per unit (was 0g), so it actually counts against your inventory carry. Existing test servers may need a one-time manual item-table sync.
- The meat item name is now editable from the configurator under Basic → Gutting.

**Scoring**
- Accuracy is now monotonically decreasing — drifting off the line drops your score and getting back on stops the bleed, but doesn't recover. The old running-average let you cheese a bad opening with a clean ending.
- 0% accuracy now grants 0 meat. Botching the minigame used to still pay out half a meat; it doesn't any more. Bonus drops (worms, etc.) still roll on their own chances.
- Final score combines accuracy × speed × progress. Speed bonus tops out at +30% for sub-2s cuts and decays to baseline by 6s — slow-and-clean still pays, sloppy-and-fast can't beat clean-and-slow.
- The "Accuracy" number on screen during the minigame is now the same number the server actually scores you on. No more mid-cut display drift.
- Line tolerance is tighter and the cursor-trail dot thresholds are stricter — you have to actually be on the line for green dots, not just near it.

**Camera + scene**
- Cinematic top-down camera 1.8m above the fish, rotated to match your heading so the cut reads left-to-right from your point of view. 600ms blend in, 500ms blend out.
- Fish prop spawns 0.8m in front of you, on its side, belly facing you.
- Prop is now scaled to the caught weight — a 5kg gar looks 5kg on the cutting board, same as it does in the reward UI and held in your hands.
- Player kneels during the cut.

**Cut minigame**
- Every open generates a fresh randomised S-curve — the line is never the same twice.
- Click-drag from the start dot and trace the line. Progress only advances while you're actually on it — "drag near it = win" is gone.
- Knife cursor with a tolerance halo, both flip red when you go off-line. OS cursor hides during the cut.
- Trail dots drop at the cursor's actual position, colour-coded per tick (green clean / accent ok / red off) — you can see exactly where your knife went.
- Cancel rules: pre-cut Esc cancels cleanly and your fish stays in your inventory. Mid-cut mouse-release commits with reduced progress (no bailing). Reaching the end gives full progress.

**Crush minigame** (new — for crustaceans and shelled species)
- Click the spawning circles before they vanish. Each circle shrinks and changes colour as its timer runs out. Hit = green marker, miss = red marker.
- Circle lifetime scales with species rarity — common species are forgiving, rare ones (Lobster, King Crab) demand quicker reactions.
- Default seed sets crush on Blue Crab, Freshwater Prawns, Stonecrab, Dungeness Crab, Lobster, King Crab, Snapping Turtle and Turtle. Every other species stays cut.
- New `meat_mallet` tool item required for crush species — seeded into both equipment store stocks at $120. Image needs adding manually to `INSTALLATION/itemImages/meat_mallet.png` (and copied to your inventory's image folder).
- Reward overlay, camera, prop spawn, durability and timeout all shared with the cut flow.

**Reward overlay**
- No auto-dismiss — you close it when you're ready.
- Big colour-tiered verdict line (Clean / Good / OK / Sloppy for cuts; Clean Harvest / Good Harvest / OK Harvest / Botched for crushes) above an accuracy %.
- Square reward tiles in a row: meat tile first, then any bonus drops. Quantity overlays the top-right of each tile (the meat tile shows weight in kg). Rarity overlays the bottom-centre, coloured by drop chance (common → legendary).
- Tiles cascade in. Dismiss by clicking the backdrop or pressing Esc.

**Other**
- `basic.gutting.useMinigame` toggle (default on) — silent skill-only flow if you'd rather not have a minigame at all.
- Every species now has its own reward pool + worm chance configured in the schema.

### Tool durability (optional)
- New `basic.gutting.toolsBreak` toggle (default **off**). When on, the fish knife and meat mallet lose one use per cut/crush. Tool is removed at 0 uses with a notify.
- Max uses tunable: 50 by default for the knife, 40 for the mallet.
- Inventory tooltip shows `Uses Left: N` under the tool. Fresh tools show nothing until first use.
- Defaulted off so existing servers don't suddenly start eating tools on upgrade.

### Admin UI
- New "Gutting" subsection in BasicSection. Holds both tool items, the durability toggle, the max-uses inputs and the meat item name — everything gutting-related in one place.
- Per-fish minigame type toggle in FishSection's Gutting tab — pill-style Scissors / Hammer segmented control. Min/max circle-count inputs appear only when Crush is selected.
- Equipment section's "New" button no longer collapses the header row when you switch to the Misc tab (the layout shift was distracting).
- Players tab now sorts online players to the top of every page (instead of scattering them across pagination) — you can find who you need in one click.

### Store stocks — admin-configurable
- Store stock entries can now reference admin items by key (e.g. `basic.fishGuttingItem`) instead of hardcoded names. Change an item's name in the configurator and the equipment store automatically starts selling the new name — no stock-list edit needed.
- The four misc entries in both equipment stores (fish finder, gutting tool, crushing tool, boat anchor) all use refs now. The anchor item was previously unsold and is now $200 in Misc.
- The Misc tab in the equipment admin is now driven by the schema, so adding a new tool in future is a one-line config edit instead of a frontend change.

### Variance UX
- Help-icon tooltips on the variance min/max inputs in StoreSection explain the signed-% semantics (-100 = free, 0 = base, +100 = double, rolled per server restart).
- Live `$/kg` preview row under each fish stock entry — no more guessing what `[-5, +5]` means in dollars for that fish.
- The Base Price input defensively handles old array-shape data so a stale NUI session can't crash the Ecology tab during a migration.

### Schema-driven install + missing-items audit
- New `x-installItem` schema annotations describe every item the resource needs registered (rods, reels, lines, hooks, bait, weights, traps, dig tools, fish, plus all the basic-section items). One annotation drives both the install-file generator and a missing-items audit.
- dirk_lib now rewrites `INSTALLATION/itemsToAdd/{ox.lua, qb.lua, esx.sql}` automatically after every config load + change. Old `src/server/install.lua` is gone.
- ESX SQL output now matches the actual ESX legacy `items` table schema (`name, label, weight`) — the previous hand-rolled SQL declared a non-existent `description` column and would fail to import on some servers.
- Server console warning fires once on resource start listing missing items, with a pointer to `INSTALLATION/itemsToAdd/`. Capped at 5 names + "and N more". Silent when nothing's missing.
- A missing-items banner now auto-appears above the configurator tabs when items are missing, with a refresh button. No code change needed in the resource — it's driven entirely by the schema annotations.
- Item-name dropdowns across the admin now show a raw value + amber ⚠ when a configured value isn't registered in your inventory's items table. No more silently-blank dropdowns hiding misconfigured fish/bait/tool refs.

### Plumbing / robustness
- "Unknown command" notification spam on key-release fixed. Several keybind-bound commands didn't have a matching release handler, which on some chat resources surfaced as a notification on every key-up. Silenced.
- Every user-facing string in the new gutting UI goes through the localisation system — fully translatable.
- Fixed the live "Accuracy: %%" display rendering as a literal double-percent (locale only escapes `%s`, not `%%`).
- NUI messages now no-op cleanly before NUI is ready and after the resource stops — removes a thin source of console spam during boot/stop.
- Removed the old `/fishingGear` and `/allFish` debug commands and their startup print spam. Remaining debug commands still gate on `basic.debug`.

### Lib-side fixes shipping alongside this release
- **Release zip now ships `schema.json`** — fixes the FiveM warning some servers saw on first boot.
- **ESX bridge permit-purchase crash fixed** — `getMoney` against a missing account no longer hard-errors, and the bridge now resolves `cash` ↔ `money` automatically so consumers don't have to special-case ESX legacy's account naming.
- **Inventory lookups overhauled** — direct native fast-paths added for `ox_inventory`, `tgiann-inventory`, `ak47_inventory`, `dirk_inventory`, `qb-core`, `qbx_core` and `es_extended`. `qs-inventory` and `codem-inventory` use a cached fallback. Edge case fixed where an inventory's own items table (e.g. qs-inventory) was being shadowed by the framework's — no more "item exists in the inventory but the lookup says it doesn't".

---

# UPDATE 2.0.24 | 08/05/2026

> Requires **dirk_lib 1.2.42** or newer — the save-permission and smartMerge fixes below live in the lib.

### Live Configurator — store edit modal
- **Locations editor reworked.** Each location row now shows the actual `vector4(x, y, z, w)` underneath three actions: **Goto** (teleport you there), **Set** (walk to a spot in-game and stamp it as the location), **Delete** (with a confirmation modal so accidental clicks don't wipe a setup).
- **Walk-and-set picking** — pressing Set hides the editor, releases your cursor, and shows a small bottom-right card matching the trap-placement UI: walk to the spot, **press E to confirm** or **Backspace to cancel**. Editor reappears with the new coords pre-filled and your draft state intact. Screen blur drops while you're picking so the world isn't fuzzy.
- Fish edit modal: **Base XP** and **Base Price** moved from Stats/Ecology to **General** where they belong. Bite Chance is now a clean 0–1 control; the rarity pill (`Common`/`Legendary`/etc.) and rarity spectrum bar moved to sit next to **Abundance** because that's what determines rarity now.
- Fixed Fresh/Salt water-type pills flashing white the first time you open the Ecology tab (framer-motion `initial={false}` so the buttons render in their resolved active state, not the default).

### Save flow
- **Save now actually saves for masters.** The chooser-open path was using one permission rule, the save callback was using another — opens worked, saves silently denied with `NoPermission` even for full admins. Both now go through the same authoritative check.
- **Master-group convar takes a comma-separated list** with a more forgiving default of `group.admin,admin,command`. Whichever your server.cfg actually grants, you'll be in. Override with `setr dirk_lib_master_group <your-perm>` if you want to lock it down.
- **Save success/failure now toasts.** Successful save shows a green confirmation; failures show red with copy mapped per error code (`NoPermission`, `VersionConflict`, `NotReady`, etc.). No more silent F8 errors and assuming it saved.

### Bug fixes
- **Store locations weren't persisting deletions.** Caused by `lib.table.merge`'s third argument being `addDuplicateNumbers`, not `overwrite` like the calling code assumed — combined with index-based recursion through nested arrays, every "deleted" location came back from defaults on the next load. The smartMerge in dirk_lib now uses a recursive call that respects the "DB is source of truth" rule for nested arrays.
- Picker overlay no longer uses `backdrop-filter` (poor support inside FiveM's CEF).
- Pricing model from 2.0.23 carries forward — fixed `basePricePerUnit` per fish + per-store signed-% variance range with live `$/kg` preview in the editor. Migrations from older shapes still apply on first 2.0.24 boot for anyone upgrading directly.

---

# UPDATE 2.0.23 | 08/05/2026

### Pricing model — simplified
- **Fish base price is now a single fixed `$/kg` per fish** instead of a `[min, max]` range. This is the source of truth for what the fish is worth — change it in one place and every market follows.
- **Stores set a per-fish variance range as signed percentages**, e.g. `[-5, +5]` for ±5%, `[-20, 0]` for "always at-or-below base", `[+5, +20]` for a premium market that always pays above. Variance is rolled once per server restart inside the configured range and applied on top of the fish's base price.
- **Live preview in the editor** — when editing a fishMarket store, each stock row shows the actual `$/kg` range your variance produces against that fish's base price (e.g. `$11.40 – $12.60/kg` next to `-5%…+5%`). No more guessing what a multiplier means.
- Removes the old runaway-variance bug (e.g. `+1448%` rolls) — variance bounds are explicit and can't roll outside what you set.

### Migration (automatic)
- One-shot migration runs on first start of 2.0.23: existing `basePricePerUnit: [a, b]` collapses to its midpoint, existing store `price: [a, b]` multipliers convert to `variance: [(a-1)*100, (b-1)*100]`. No manual config edits needed.

### Editor robustness
- FishSection's BasePrice input now defensively coerces array-shape data so a stale NUI session (pre-migration shape still in React store) no longer crashes the Ecology tab with `(e || "").match is not a function`.

---

# UPDATE 2.0.22 | 06/05/2026

### Balance
- Catching minigame retuned for new players. Bar width floor doubled (0.10 → 0.20), drain rate softened on starter gear, fill rate base bumped 0.06 → 0.08 — a level-1 player with starter gear can actually win fights now without it feeling impossible.
- Hook strength now level-gated across the full 1-99 range (smallest hooks at L1, biggest at L97). Newbies can't accidentally buy a tuna hook at level 1 and waste casts.
- Sinker weights also level-gated by mass — light shore weights at L1, deepest deep-sea weights at L85.
- Bait depletes when a cast fails. Configurable in admin under `Basic → Fishing → Remove Bait on Fail` (% chance). Strike-on-empty no longer triggers the roll — only line snaps, fish escapes, and server-validated misses do.
- Spook (zone fatigue) per-catch increment lowered 0.15 → 0.025, so a species takes ~34 catches to fully spook a cell instead of ~6. Tunable via `Basic → Fishing → Spook per Catch`.

### Bait & gear access
- Every bait now has a level requirement matched to the lowest fish that wants it (minus 5 levels of "buy ahead" buffer). Beginner baits like bread/corn unlock at L1; nightcrawlers L23, leech/bacon L30, hugecutbait L50, yellowfin tuna chunks L75.
- Tiered store layout: Del Perro & Vespucci serve T1 saltwater (L1-25), Pacific Deepwater & Paleto serve T2 saltwater (L26+). Same split for freshwater between Zancudo and Alamo Lake. Strict no-overlap so advanced shops feel like graduating, not just shopping further.
- Bait digging filters by level too — a level-1 player digging soil no longer accidentally pulls up nightcrawlers they can't use.
- Equipment store sorts unlocked items first; locked items go to the bottom in level order so the next thing to unlock is closest to view.

### Tournaments
- Ten default tournaments seeded across daily/weekly schedules. Times spread across lunch / after-school / prime-evening, levels span beginner-friendly to endgame.
- Mix of free entries, fixed-prize cups, and pot-mode events with entry fees. Mix of any-species and zone-locked.
- New eligibility chip on every tournament card. Green = eligible, amber = some species are above your level, red = locked (zone or all species too high). Hover the chip for a list of what's blocking you. Sign-up button auto-disables on red.
- Tournament cards show proper species and zone labels (e.g. "Atlantic Herring · Vinewood Lake") instead of internal IDs.

### Reward UI
- Rarity badge now reflects how rare the species itself is (based on abundance), not how big the individual you caught was. A 50g minnow no longer gets a "Legendary" badge.
- Weight pill is now coloured by how heavy the catch is for its species: dim grey for runts, blue for big, purple for great, gold for trophy (top 5%). Trophy fish also get a soft glow.

### Multiplayer
- Trap-in-hand prop now visible to other players during placement.
- Server-side lock prevents trap-spam from placing two buoys for one item — was a race in the inventory bridge.
- Buoys can now fully sink under boats while still being anchored to their X/Y position. Boat hulls used to push the buoy partially down before bouncing it back up; now they can submerge it cleanly.
- Catch-fish props (the rod-caught fish reeled in, and held fish) are local-only this version. Cross-client sync was visibly desynced; the network broadcast is commented out and re-enabling it is one flag flip when the underlying sync is fixed.

### Bug fixes
- Permit purchase dialog showed durations like "9.00004 hours" because the basic-permit branch was double-converting hours-to-seconds. Now displays correctly.
- Mackerel-instead-of-herring problem at level 1 fixed. Fish more than 10 levels above the player are now excluded from the bite candidate pool entirely; species 1-10 levels above appear at reduced rate. Newbies catch the fish they're trying to catch.
- Some T2 fish (Common Carp, Dungeness Crab, Longnose Gar, Lobster, King Crab, Turtle) had no T2-bait option, forcing T2 players to use T1 bait. Each now has at least one T2 bait that targets it. Lobster + King Crab no longer accept bread.
- Removed `timeToBite` / `removeBaitOnFail` from admin where the field was unused; `removeBaitOnFail` is now actually wired into gameplay.

### Admin / debug
- Eight debug commands (spawnTestFish, fishScale, spawnBuoy, etc.) are now gated behind `basic.debug` — they no longer respond on production servers unless debug mode is on.
- Blip display field is now a labelled dropdown instead of a number input — no more guessing what "display 4" means.

### Live nibble strip
- Empty/decoy nibbles no longer emit when there are no real fish candidates at the current depth/bait/level. Silence on the strip is now a reliable "wrong spot or wrong bait" signal. When candidates do exist, decoys mix in alongside real fish so the strip still feels alive.
- Strip pacing now re-evaluates per-blip on the current hook depth — as your hook sinks past shallow species and into deeper fish territory, activity changes naturally.

---

# UPDATE 2.0.0 | 05/05/2026
After 5 years, dirk_fishing has been completely rewritten from the ground up. Honestly, almost nothing from v1 survives — this is a brand new resource that happens to share the same name. Below is the full feature list for v2.

### Core Fishing
- Brand new aim → cast → fight loop. Aim your cast with a live on-screen reticle showing whether the spot is valid, land the throw with a timing minigame, then reel in catches with a Stardew Valley–style bar-catch fight.
- Realistic rod, rope and hook — a physical rope trails from the rod tip to a hook in the water and swings naturally as you move.
- 32 fish species across freshwater and saltwater, each with their own bite rate, fight difficulty, weight range and price.
- Custom 3D model per species — every single fish has its own bespoke prop (streamed via dirk_fishProps), no reused models.
- Rarity system — every catch ranked Common → Legendary based on its weight relative to the species' max.
- Realistic fish sizing — caught fish appear in your hands and in the world at a size that matches their actual weight.
- Cinematic catch camera frames every catch before it hits your inventory.

### Gear & Progression
- Full rod loadout system — build rods with reels, lines, hooks, bait and sinker weights; every setup saves to the rod's item metadata.
- 13 rods, 14 reels, 14 lines, 24 hook sizes, 12 sinker weights, 20+ baits — every item editable live in the configurator.
- RuneScape-style XP curve (1–99) with level-locked gear and bonuses.
- Fishing permits — global and zone-specific permits with expiring card art players can inspect in-hand. Cops with the right job/rank can revoke permits face-to-face.

### World & Exploration
- Fishing zones — draw zones on the map and configure their bite times, fish density, abundance, weight modifiers and per-fish overrides.
- Grid-based fish populations — every player sees the same fish pool in the same water cell, so a productive spot stays productive (and gets fished out).
- Fish Finder tablet item — scans the grid for nearby fish populations and tells you what's biting where.

### Interactive Guidebook
A standalone in-game book item players can open at any time. Six tabs:
- **Overview** — live dashboard: current XP and level progress, today's daily challenges, recent personal bests.
- **Fish Collection** — every species in the game, ranked by rarity and unlocked by level. Per-fish: personal best weight, times caught, first-caught date, depth, water type, ideal bait, weight range, base price.
- **Equipment Library** — full reference for every rod, reel, line, hook, bait and sinker weight: stats, level required.
- **Map** — interactive Leaflet map of the city with all fishing zones drawn on, your live position, fish-finder readings and zone permit/level info.
- **Leaderboards** — global and personal top 3 per species, plus a global all-time leaderboard sortable by total caught, total weight, heaviest, unique species and XP.
- **Tournaments** — placeholder tab for the upcoming tournament system (WIP).

### Daily Challenges
- Random daily objectives that reset every 24h: catch X of a species, hit weight goals, dig N bait, etc.
- Progress tracked live as you play; claim rewards from the guidebook Overview tab.
- Templates and reward tables fully editable in the configurator.

### Traps (Crab Pots)
- Place baited pots in deep enough water and come back later — fully passive trap system.
- Surface buoys bob with the waves naturally so they look part of the sea.
- Rope-pull minigame to haul the trap to the surface, with a cinematic camera while you inspect the haul.
- Hover catches to identify them, then keep or release individually; swap bait without pulling up an empty trap.
- Stale traps auto-expire on a configurable timer so abandoned pots don't litter the map forever.

### Bait & Gutting
- Bait digging — dig for worms, maggots and more across 20+ ground material types; tools have limited uses and dig spots regenerate on a timer.
- Fish gutting — clean caught fish into meat or fillets; yield scales with player skill.

### Stores & Markets
- Equipment shops, fish markets and a dedicated bait market — all via dirk_stores integration.
- Stores and individual stock items can be **level-locked** so high-tier gear only unlocks once a player has earned the level.
- Fish market prices shift relative to a global rolling base price; each market applies its own multiplier so saltwater and freshwater markets pay differently for the same fish, and the UI shows trend arrows (-15%, +8%, etc.).
- Markets can stock different fish lists, so a freshwater dock won't buy your tuna.
- Configurable models, blip, opening hours (including hours that wrap midnight), payment methods and full stock per store.

### Convenience
- Boat anchoring via keybind or useable item so you don't drift off your hotspot.
- Clip commands (`/record`, `/clip`, `/saveclip`, `/editor`) to capture your best catches via Rockstar Editor.
- Contextual animations — walking, idling and reeling animations swap automatically while you're fishing.

### Live Script Configurator
- Open in-game with `/dirk_config` — every fish, zone, permit, shop, tool, dig spot and player level can be edited live.
- Full undo / redo history.
- Audit log of who changed what and when.
- Player tab — view, search and adjust XP/levels for any player.
- All of the above persisted to a single `dirk_scriptConfig` table; no manual SQL or Lua config edits required, no resource restart.

### Framework & Inventory Support
- Built on **dirk_lib** — fully framework-agnostic.
- Out-of-the-box bridges for **ox_inventory**, **qb-inventory** and **ESX**.
- Pre-generated item definitions for ox / qb / esx in `INSTALLATION/itemsToAdd/`.
- 111 item images included in `INSTALLATION/itemImages/`.

### Easter Eggs
- Be Jonah. 🐋

# UPDATE 1.5.0 | 27/08/2025
Well guys at nearly 4.5 years old dirk_fishing v1 is coming to an end. This will be the final update for you guys before a bigger better version comes along :eyes:. 

I thought this one needed a good refresh before it's left to mature like a fine wine!

- Updated to dirk_lib instead of dirk-core so should have much better compatibility.
- Removed old ugly store system and converted to be able to use my dirk_stores system for the fishing buy/sell stores.
- Converted controls to dirk_lib style controls.
- Tidied up all the locales into more modern locales/*.json 
- Secured the server side because 4.5 years ago I was a bit of an idiot. 
- Added any missing or wrongly named icons for inventory. 
- Added different rod models. 
- Made UI pull from inventory script you use for easier updating of images etc. 
- Fixed sensitivity issues with smaller depths of water

# 1.0.0 - 21/02/2021