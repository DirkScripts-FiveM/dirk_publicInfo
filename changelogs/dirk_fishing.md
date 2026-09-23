# UPDATE 2.1.6 | 15/09/2026

## Fixes

- **The self-tests now ship with the download.** Run dirktest dirk_fishing from the server console while logged in on a character.
---

# UPDATE 2.1.5 | 12/09/2026

## Requires dirk_lib 1.3.6

- **Update dirk_lib first.** Weight and distance units now come from dirk_lib's shared settings, and this build reads them from there.

## Changes

- **Units moved to dirk_lib.** Weight and distance units now live in dirk_lib → Basic and apply to every dirk script. Your existing choice carries across automatically.
- **More self-tests in dirktest dirk_fishing.** They check units, that level changes reach the screen, and that removing list rows survives a restart.

## Fixes

- **Your fishing level on screen stays up to date.** Level and progress now read straight from your live skill, with no reconnect needed.
- **Currency and units now show correctly on fishing's screens.** A server set to EUR no longer shows $ in the book.
---

# UPDATE 2.1.4 | 10/09/2026

## Fixes

- **The fish, gear and Players screens now follow your language.** Species search, filters, Add fish, rarity and water chips and the Players labels now translate in all thirteen languages.
- **Every field inside a list row now translates.** Fish, zone, store and gear editors, including Base Price Per Unit and the editor tabs, now show in your language.
---

# UPDATE 2.1.3 | 10/09/2026

## Fixes

- **The Controls section and Players screen now translate.** Both are now translated in all thirteen languages.
---

# UPDATE 2.1.2 | 10/09/2026

## New

- **Fishing is now fully translated into Japanese.** This covers the in-game UI and the whole settings panel. Set it in Script Studio → dirk_lib → Basic (needs dirk_lib 1.3.2).
---

# UPDATE 2.1.1 | 09/09/2026

## New

- **Fishing is fully translated into twelve languages.** Every fish, item, setting and message. Set the language once in dirk_lib and it applies here too.
- **Dutch, Polish and Simplified Chinese are new.** German, Spanish, French, Italian, Lithuanian, Norwegian, Portuguese and Traditional Chinese are now complete.
- **Item names and descriptions still come from your inventory.** To show them in your language, translate them in your inventory's items list.

## Fixes

- **Security update.** A bundled web library was updated, clearing a set of published advisories in the version shipped with 2.1.0.
---

# UPDATE 2.1.0 | 08/09/2026

## Before you update

- **This needs dirk_lib 1.3.0 or newer.** Update dirk_lib first, as fishing's settings now live in its panel.

## New

- **Search every setting and revert any saved change.** Type what you are looking for, and put old values back from the change history for review.
- **Read fishing's logs in-game.** Events are kept on your server under Logs. Filter by event, player or time and open a line for the full details.
- **A view-only access level.** Staff can see settings and logs without saving, and server-only values like webhook URLs are never sent to them.
- **Per-fish zone modifiers get their own tab.** They now use sliders instead of a bare number input in the zone editor.
- **Pick your levelling style.** Under Progression choose Long haul (the default), Steady, Classic RPG or Reachable, with a live curve preview. Nobody loses XP when you switch.

## Changes

- **Fishing's settings now live in Script Studio.** /dirk_fishing still opens straight to fishing, and everything from the old panel came across.
- **Logging and access are shared.** Set where logs go once in Script Studio under Logs, and who can edit on the Admins page. Your webhook and grants carry over automatically.
- **Fish difficulty bands follow your own fish list.** Fish are split into three even groups by Info Unlock Level, so no band is ever empty whatever your max level.
- **Clearer settings.** Daily challenge options use plain names, and Strict catch level now sits at the top of Progression.

## Fixes

- **You can end a cast at any time.** Only an active fight stops you putting the rod away.
- **Players always run on the settings the panel shows.** Shop hours, zones and language stay in sync for the whole session (the fix is in dirk_lib 1.3.0).
- **Your fishing level is consistent and instant.** Other scripts get the same level players see, and bait digging and daily challenges update it without a relog.
---

# UPDATE 2.0.66 | 07/08/2026

## New

- **Testing system.** Type dirktest in your server console to check your inventory bridge and fishing's XP, levels and earnings against your live setup. Needs dirk_lib 1.2.79+.

## Fixes

- **Players panel icons display at the right size.** This covers the money and activity stat tiles.
---

# UPDATE 2.0.65 | 21/07/2026

## New

- **Fishing economy stats in the admin panel.** Under /dirk_config → Players, see the money fishing puts into your economy, split into Fish, Fillets and Bait.
- **Server-wide and per-player totals.** The top of the list shows earnings, catches, weight and the biggest catch. Expand a player for their own figures and personal best.
- **Earnings count from this update onwards.** Past sales were not tracked, so figures build from a clean baseline. Trap catches sold at the market are included.
---

# UPDATE 2.0.64 | 19/07/2026

## Performance

- **Crab-pot filling no longer hitches on busy servers.** Each player is now looked up once per session instead of every tick, so the hitch no longer grows with player count.
---

# UPDATE 2.0.63 | 15/07/2026

## New

- **Disable Permit System master switch.** One toggle in Basic → Permits turns off every licence and permit check, the store peds' Manage Permit option and permit purchases.
- **Lithuanian added.** Set the language to lt in /dirk_lib.

## Fixes

- **Destroyed crab pots can now be pulled in.** You keep whatever the trap caught; the pot and bait are used up.
- **The fish finder no longer gets stuck in your inventory.** If you run ElectronAC or a similar anticheat, also whitelist events starting with __dirk_cb_.
- **Server hardening.** The fish finder no longer errors when a client sends an invalid request.
---

# UPDATE 2.0.62 | 10/07/2026

## New

- **Server exports for fishing XP and levels.** Other resources can read a player's level and read, add, remove or set their XP. The player's UI updates live and matches the guidebook.
---

# UPDATE 2.0.61 | 09/07/2026

## New

- **Norwegian added.** Set the language to no in /dirk_lib to run fishing in Norwegian.
---

# UPDATE 2.0.60 | 09/07/2026

## New

- **Choose each fish's meat item in the fish editor.** Under /dirk_config → Fish → Gutting, pick a meat item such as oyster_meat, or leave it empty to use the global one.
---

# UPDATE 2.0.59 | 09/07/2026

## Fixes

- **Your currency symbol now shows everywhere.** Stores, markets, tournaments, challenges, permits, the guidebook and admin panel follow the currency set in /dirk_lib (Basic → Currency).
---

# UPDATE 2.0.58 | 08/07/2026

## Fixes

- **Buying with a full inventory no longer charges you.** You only pay for the items that fit; if nothing fits, you pay nothing.
---

# UPDATE 2.0.57 | 08/07/2026

## Changes

- **Traditional Chinese (zh-TW) refreshed.** A community-finalised translation brings more accurate wording across the interface.
---

# UPDATE 2.0.56 | 06/07/2026

## Fixes

- **Your fishing level now updates live.** The guidebook, loadout gates and catch difficulty reflect new XP straight away on every framework, including QBX. No relog needed.
- **Tournament start and end pickers use your local time.** They now show and save consistently in your timezone.
---

# UPDATE 2.0.55 | 05/07/2026

## Fixes

- **Fish without a description can be saved and edited.** The description field is now optional, matching equipment, bait and tools.
---

# UPDATE 2.0.54 | 05/07/2026

## Before you update

- **Requires dirk_lib 1.2.68 or newer.** It includes the matching inventory image fixes for devix and older tgiann.

## Fixes

- **Rods, traps and dig tools now work on devix and older tgiann.** They work whether or not your inventory passes the item slot on use. No change on ox_inventory.
---

# UPDATE 2.0.53 | 05/07/2026

## Before you update

- **Requires dirk_lib 1.2.67 or newer.**

## New

- **Item names and descriptions now come from your inventory.** Rename or translate an item once in your inventory (ox_inventory and others) and it updates everywhere in fishing.
- **Type your own item name in the picker.** When adding a fish, equipment or tool, type a brand-new item name; Label and Description appear so you can seed it.

## Changes

- **Label and Description fields are now a seed.** They are editable until the item exists in your inventory, then locked with a hint showing where the live value comes from.
- **Set your own descriptions on your inventory items.** Items with no description fall back to fishing's built-in text, so nothing breaks.

## Fixes

- **Dig-tool edits now save.** Renaming or changing a dig tool's item now sticks, and the equipment editors were hardened the same way.
---

# UPDATE 2.0.50 | 04/07/2026

## Fixes

- **The settings panel sidebar now translates.** Section names like Basic, Theme, Players and Fish update live when you switch language, as do the water-type toggle and zone editor tabs.
---

# UPDATE 2.0.49 | 03/07/2026

## Fixes

- **Every language is now fully translated.** Admin panel labels and the Big Fish, gutting and trap options are complete in Spanish, Portuguese, Italian, French, German and Traditional Chinese.
- **Access, Theme and Depth Limit labels now translate.**
---

# UPDATE 2.0.48 | 03/07/2026

## Before you update

- **Requires dirk_lib 1.2.64 or newer.**

## New

- **Optional Big Fish Difficulty.** A toggle in Basic → Fishing makes heavier fish harder to land, with three sliders to tune it. Off by default.
- **Gutting has its own settings tab.** General and Rewards sub-tabs, a Cut Forgiveness slider for how strict the cut line is, and an editor for the shared gut-reward pool.
- **Traditional Chinese (zh-TW).** Now selectable in the language dropdown.

## Fixes

- **Reeling reworked.** The scroll wheel only reels in, with no accidental recast, and reel speed now scales with water depth.
- **Casting from docks into shallow water works properly.** A spot either shows a clear too-shallow marker or actually fishes.
- **The catch camera no longer snaps.** The reward zoom plays its full blend and waits for the fish to be visible.
- **Crab traps no longer vanish.** Break chance is lower and set in Basic → Traps → Chance of Break (0 disables). Broken traps show a red marker, then clear over time.
- **Trap contents no longer flicker.** Keeping or releasing one fish only removes that fish, and the rest slide up.
- **Gutting rewards track your cut.** An unfinished cut pays nothing, and the reward scales with how accurate the cut was.
- **Secondary reel key and ultrawide rod prompt fixed.** The alternate reel key now works, and the Modify Rod prompt no longer stretches on 21:9 and 32:9 screens.
- **Settings panel fixes.** Sections with an empty list, including Stores, no longer crash, and gut rewards with a blank row now save.

## Performance

- **Fish and trap props are far smaller.** The prop pack dropped about 68%, from 330 MB to 105 MB, easing streaming memory with no visible loss in quality.
---

# UPDATE 2.0.47 | 26/06/2026

## Before you update

- **Requires dirk_lib 1.2.62 or newer.** It includes the logging backends, the access controls and the join-crash fix below.

## New

- **Sell fish fillets.** Gut a fish for a fillet and sell it at any market that stocks that species, with a configurable filleting bonus.
- **Logging beyond Discord.** Send logs to Grafana (Loki), Datadog or Fivemanage as well as Discord, and check your setup with the new Test webhook button.
- **New Access and Theme tabs.** Give trusted staff fishing config access without full admin, and give fishing's panels their own palette.

## Changes

- **Reels enforce their depth rating.** Cheap reels fish shallow and deep-sea reels reach the deep marks, and the depth indicator shows your reel's limit.
- **Traps place where you look and stay put.** The placement ghost follows your camera, and placed pots hold their spot while still bobbing naturally.
- **Bait digging and bites reworked.** Each dig seeds 5–10 of 25 reward tiles by default, set as a tile count, and bigger fish now show a bolder bite on the nibble strip.

## Fixes

- **A good click in the catch minigame lands the strike.** The bite marker now matches the window you can actually hit.
- **Joining no longer crashes before character creation.** Players on custom peds or multi-character menus load in cleanly. Update dirk_lib as well.
- **Permit and voice fixes.** The permit animation only plays for its owner, unaffordable permits now say so, and push-to-talk always works while fishing.
- **Inventory fixes.** Item icons and rod parts now work on core_inventory, and selling fish on ox_inventory now removes the fish and pays correctly.
- **Depth and digging fixes.** Pools and rooftop water stop the line at the real surface, and your own dig spots no longer block you.
- **Panels open reliably after a live restart.** More labels, including the gutting prompts, are translated too.

## Performance

- **Traps and catch saving are far lighter.** Passive trap server cost is cut around 5× on busy servers, and catch history saves in bulk while stats stay live.
---

# UPDATE 2.0.43 | 20/06/2026

## Before you update

- **Requires dirk_lib 1.2.59 or newer.** It includes the webhook helper plus the inventory fixes this release relies on.

## New

- **Discord webhook logging.** A Logging tab sends sales, purchases, catches, crab pots, challenges and payouts to Discord, and flags big sales red. Off by default.
- **Tournament upgrades.** Most Combined Weight scoring, Allow Late Join for running events, and live tournaments now survive a server restart.
- **Per-zone fish modifiers.** A Species tab in the zone editor overrides abundance, weight and bite chance per fish, replacing the zone-wide value rather than stacking.
- **New shop and control options.** Hide the built-in shop options on the store peds if you run your own shop, and keep push-to-talk working while fishing.

## Security

- **Admin panel hardened.** Player management and the trap and permit admin actions now all need the same configurator permission. Updating is recommended.

## Fixes

- **Inventory fixes.** On qs-inventory, rod parts and bait now save and it is no longer mistaken for qb-inventory. Rod-indicator images handle more image paths.
- **Casting no longer crashes newer game builds.** This covers build 3751 and newer.
- **Trap fixes.** Trap fish now count in the book and leaderboards and keep their real weight, and the buoy no longer flickers on inspect.
- **Hooked fish are released when you disconnect.** Other players can catch that fish straight away.
- **Permits with no price or duration are handled.** The zone editor now requires both when a permit is enabled.
- **Spanish is now complete.** A server set to Spanish no longer falls back to English.

## Performance

- **Catching a fish is roughly 13× faster.** Catch handling dropped from about 85 ms to 6 ms, with no database reads or waits left on a catch.
- **Leaderboards and stats stay fast at any size.** Opening them no longer freezes a busy server, and the guidebook, stores, traps and player joins all do less work.
---

# UPDATE 2.0.28 | 14/05/2026

## New

- **Strict catch level option, on by default.** Players only catch fish at or below their fishing level, matching what markets let them sell. Turn it off for the old behaviour.

## Changes

- **Prices follow your weight unit.** The fish base price field and the guidebook price row show $/lb or $/kg to match your setting.

## Fixes

- **Store editor no longer crashes on equipment stores.** Misc stock items now show their proper name and image, and can be searched.
- **The book map no longer crashes when opening a trap.**
- **Online players sort to the top of the admin Players tab.** This now works across every page.
- **Trap catches show their real rarity.** Lobsters read as Rare and crabs as Uncommon, instead of everything showing Legendary.
- **Crab traps respect the catch-level gate.** A low-level player's trap can no longer pull a high-level King Crab.
---

# UPDATE 2.0.26 | 11/05/2026

## Before you update

- **Requires dirk_lib 1.2.43 or newer.**

## New

- **Fish gutting fully redesigned.** Drag along the line to cut fish or click the circles to crush shellfish, with a cinematic camera and a reward screen you close yourself.
- **One meat item for every species.** Each stack carries its species and weight, shown in the tooltip (and as King Crab Meat on ox_inventory). Meat now weighs 100g.
- **Fairer gutting scores.** Drifting off the line costs accuracy, a botched cut pays no meat, and fast clean cuts earn up to a 30% bonus.
- **Crushing needs the new meat_mallet.** It is sold in both equipment stores for $120. Copy its image from the included item images into your inventory.
- **Optional tool durability, off by default.** Knives and mallets lose a use per cut (50 and 40 by default), with Uses Left shown in the tooltip.
- **Gutting settings in one place.** Tools, durability and the meat item live under Basic → Gutting, with a per-fish Cut or Crush choice and a toggle to skip the minigame.

## Changes

- **Store stock improvements.** Stock follows your configured item names, variance ranges show a live $/kg preview, and the boat anchor now sells for $200.
- **Install files and missing-item warnings are automatic.** Item lists for ox, qb and ESX are regenerated for you, and missing items are flagged in the console and the panel.
- **Admin tidy-ups.** Online players sort to the top of the Players tab, and the old /fishingGear and /allFish debug commands are gone.

## Fixes

- **No more Unknown command notifications on key release.**
- **ESX permit purchases no longer crash.** Inventory lookups are also faster and more reliable across many inventories (needs dirk_lib 1.2.43).
---

# UPDATE 2.0.24 | 08/05/2026

## Before you update

- **Requires dirk_lib 1.2.42 or newer.** The save-permission and store-location fixes below depend on it.

## New

- **Easier store locations.** Each location has Goto, Set and Delete buttons. Set lets you walk to a spot in-game and press E to confirm or Backspace to cancel.
- **Tidier fish editor.** Base XP and Base Price are on the General tab, and the rarity display sits next to Abundance, which now sets rarity.

## Changes

- **Saves now confirm.** A successful save shows a green message, and a failed one explains what went wrong.
- **The master admin permission accepts a list.** It defaults to group.admin,admin,command. Override it with setr dirk_lib_master_group in your server.cfg.
- **Older price setups still convert automatically.** Upgrading straight to 2.0.24 moves them to the 2.0.23 pricing model on first boot.

## Fixes

- **Saving settings works for every admin.** Opening and saving the settings panel now use the same permission check.
- **Deleted store locations stay deleted.** They no longer come back on the next load.
- **Water-type buttons no longer flash white.** This happened the first time you opened the Ecology tab.
---

# UPDATE 2.0.23 | 08/05/2026

## Before you update

- **Your prices convert automatically.** On first start, price ranges collapse to their midpoint and store multipliers become percentages. No manual edits needed.

## Changes

- **One fixed base price per fish.** Each fish has a single $/kg base price, so change it in one place and every market follows.
- **Stores set a price range in percent.** For example -5 to +5, rolled once per restart on top of the base price, with a live $/kg preview in the editor.

## Fixes

- **Price rolls stay inside your range.** Variance can no longer roll outside what you set.
- **The Ecology tab no longer crashes after the price change.**
---

# UPDATE 2.0.22 | 06/05/2026

## New

- **Ten default tournaments.** Daily and weekly events across all levels, plus an eligibility chip showing green, amber or red with what is blocking you.

## Changes

- **Catching is fairer for new players.** The catch bar is wider and drains slower on starter gear, so a level 1 player can win fights.
- **Hooks, sinkers and bait are level-gated.** Gear unlocks across levels 1 to 99, and bait digging only turns up bait you can use.
- **Bait loss and spook are tunable.** Set Remove Bait on Fail and Spook per Catch under Basic → Fishing. Spots now take about 34 catches to fish out.
- **Tiered stores.** Beginner and advanced shops are split by level for salt and fresh water, and locked items sort to the bottom.
- **Clearer catch rewards.** Rarity reflects how rare the species is, and the weight pill is coloured from runt to trophy, with a glow on trophy fish.
- **The nibble strip tells you something.** Silence means wrong spot or wrong bait, and activity changes as your hook sinks.
- **Traps behave better in multiplayer.** Others see the trap in your hand, one item cannot place two buoys, and buoys sink cleanly under boats.
- **Debug commands only work in debug mode.** The blip display field is also a labelled dropdown now.

## Fixes

- **Level 1 players catch the fish they are after.** Fish more than 10 levels above you leave the bite pool, and closer ones appear at a reduced rate.
- **Every advanced fish has an advanced bait.** Carp, Dungeness Crab, Longnose Gar, Lobster, King Crab and Turtle gained one, and Lobster and King Crab no longer take bread.
- **Permit durations display correctly.**
---

# UPDATE 2.0.0 | 05/05/2026

## Core Fishing

- **A complete rewrite.** After five years, dirk_fishing has been rebuilt from the ground up as a brand new resource.
- **Aim, cast and fight.** A live aiming reticle, a timed cast and a bar-catch fight, with a physical rope from rod tip to hook.
- **32 fish species, each with its own model.** Every species has its own bite rate, fight, weight range and price, and catches are sized to their weight and framed by a cinematic camera.
- **Rod loadouts and progression.** Build rods from 13 rods, 14 reels, 14 lines, 24 hooks, 12 sinkers and 20+ baits, with a 1–99 XP curve and level-locked gear.
- **Handy extras.** Boat anchoring by key or item, Rockstar Editor clip commands (/record, /clip, /saveclip, /editor) and automatic fishing animations.

## World & Exploration

- **Zones and fish populations.** Draw zones with their own bite times and fish, and every player shares the same fish pool per water cell. The Fish Finder shows what is biting.
- **Fishing permits.** Global and zone permits with card art players can show, and police with the right job can revoke them.
- **Interactive guidebook.** Overview, Fish Collection, Equipment Library, Map, Leaderboards and Tournaments tabs, plus daily challenges that reset every 24 hours.
- **Crab pots.** Place baited pots, come back later, haul them up with a rope-pull minigame, and keep or release each catch.
- **Bait digging and gutting.** Dig for bait across 20+ ground types, and gut fish into meat or fillets, with yield scaling on skill.
- **Stores and markets via dirk_stores.** Level-locked stock, markets that pay differently per fish, and configurable hours, models, blips and payment methods.

## Live Script Configurator

- **Edit everything live.** Open /dirk_config to change every fish, zone, permit, shop and player level, with undo/redo and an audit log. No restart needed.

## Framework & Inventory Support

- **Works on any framework through dirk_lib.** Bridges for ox_inventory, qb-inventory and ESX, with ready-made item definitions and 111 item images included.

# UPDATE 1.5.0 | 27/08/2025

## New

- **Different rod models added.**

## Changes

- **The final update for v1.** After nearly 4.5 years, this refresh sees v1 out before a bigger, better version arrives.
- **Now built on dirk_lib instead of dirk-core.** This gives much better compatibility, and controls now use the dirk_lib style.
- **Stores now use dirk_stores.** It replaces the old store system for the fishing buy and sell stores.
- **Locales tidied into the modern JSON format.**
- **The server side has been secured.**
- **The UI pulls images from your inventory script.** This makes updating item images easier.

## Fixes

- **Missing or wrongly named inventory icons added.**
- **Fixed sensitivity issues in shallower water.**

# UPDATE 1.0.0 | 21/02/2021

## New

- **Initial release.**