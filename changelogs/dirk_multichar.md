# Update 1.5.0 12/05/2026
- Full Live Configurator overhaul. `/dirk_multichar` (or the new cog button on the character-list title) opens a 6-tab admin panel: Basic, Scene, Backstories, Spawn Locations, States, VIP Roles.
- Configurator can now be opened from inside the Multichar UI itself (gated by `dirk_lib`'s scriptConfig edit permission). Back / Esc / close button all drop you straight back into the character list instead of bouncing through the script chooser.
- New `cameraViews`, `defaultItems`, and `characterStates` fields now live in scriptConfig — every value the resource cares about is admin-editable in-game.
- Backstory editor: tabbed modal (General / Access / Items / Scenes) with fixed height so switching tabs doesn't shift the panel. Items use a compact `SelectItem` list with inline expand. Discord-role access is gated behind the Locked toggle.
- Scene tab: drag-reorder character display positions, modal editor with `Scenario`/`Dict`/`Anim`/`Flag` rows, walk-and-set position picker (E confirms, ⌫ cancels), and the customisation-position consolidated here. Weather and time are intentionally left untouched — the character scene simply shows whatever your server's own weather/time sync is running.
- Spawn Locations: modal editor with FontAwesome icon picker, in-game group/rank pickers backed by `lib.framework`, randomised internal IDs (no more hand-typed `spawn_1`).
- States tab: edit visual character states (icon + colour + message + Disabled toggle) and an Online Players sub-panel that lets admins search any online character and apply a state from the same tab.
- VIP Roles tab gets the `Use ESX Character Slots Table` toggle. Spawn Selector toggle moved into the Spawn Locations tab.
- Backstory System fully overhauled — new UI for creating / managing backstories, scenes with their own walk-set positions, items use SelectItem, locked / discord-gated access in its own tab.
- Restyle pass on every consumer NUI to use `dirk-cfx-react` for consistency with the rest of the dirk_* lineup.
- Full locale sweep — every label, tooltip, placeholder, and confirm message reads from `locales/en.json`. `%s` placeholders used for dynamic values instead of hand-rolled `{name}` substitutions.

### scriptConfig migration
- `settings/` folder removed. Every value that was a Lua table — `basic`, `lifestyles`, `spawnLocations`, `vipRoles`, `characterPositions`, `cameraViews`, `defaultItems`, `characterStates` — now lives in `schema.json` and persists through dirk_lib's scriptConfig.
- Every Lua consumer reads via `lib.scriptConfig.get('section')` + reacts to admin saves through `lib.scriptConfig.on('section', ...)`. Edits in the configurator apply live, no resource restart required.
- `characterMetadata` is the only Lua holdout (its entries carry `get(charId)` callback functions that query the DB — can't be JSON). Moved to `extras/`.
- `profanity.json` and `nationalities.json` moved to the resource root (no longer Lua tables).
- Schema `x-arrayKey` used on lifestyles + spawnLocations + characterPositions + characterStates so smartMerge identifies entries cleanly across saves.
- `lifestyles/` folder removed — all the per-lifestyle `init.lua` template stubs were entirely commented out and the new scriptConfig flow obsoletes them. Custom Lua-side lifestyles can still be registered from other resources via `exports.dirk_multichar:registerLifestyle(id, data)`.
- React-side `getStateInfo()` now derives from `useScriptConfig.characterStates` instead of a parallel hardcoded Zustand store, so the React copy can no longer drift from the Lua copy.
- `web/src/stores/basic.ts` removed too — every consumer now reads from `useScriptConfig` directly so admin saves propagate everywhere live.

### Bug fixes
- Fixed missing `VIPSlot` locale key — locked VIP slots in the character list rendered a blank label instead of "VIP Slot".
- Fixed character customisation handoff to `illenium-appearance` (QBX) — appearance UI now opens reliably on character creation by routing through `qb-clothes:client:CreateFirstCharacter` and matching illenium's exact default camera offsets so the cut between our hold-cam and illenium's cam is invisible.
- Fixed `NUI_READY` callback collision that left `/dirk_multichar` permanently showing "Settings UI is still loading" — now listens for dirk_lib's `nuiReady` event instead of overwriting its handler.
- Fixed `basic.totalSlots` (legacy field name) referenced in `server/main.lua` — now correctly reads `basic.maxSlots`.
- Fixed lockup where saving the configurator with an empty `vipRoles` default + `x-arrayKey` caused smartMerge to silently drop every entry on load.
- Fixed `useFormField` calls that silently degraded to `any` because the generic was given the field value type instead of the parent form shape.
- Fixed module-load deadlock where `lib.scriptConfig.get('basic')` at client file top awaited a server callback before the rest of `nui.lua` could execute, leaving `openMultichar` undefined. Client files now use `.on` for module-scope snapshots and only call `.get` inside function bodies.
- Walk-and-set position picker now properly hides every body child (including Mantine portal modals) while picking, via a `data-dirk-picking` body attribute + injected CSS rule.
- Multichar slot count + admin-editable basics update live in the UI as soon as the admin saves them — no more "saved 6 slots, still shows 5 until reopen".

### dirk_lib + dirk-cfx-react improvements
- `lib.scriptConfig.setBackHandler(fn)` added — one-shot hook for consumers that open the configurator from their own UI and want Back / Esc / close to return to that UI instead of dirk_lib's chooser list. Drained on every exit path so focus stays claimed by the consumer.
- Client-side `lib.scriptConfig.get(path)` now supports dot-paths like the server side already did (e.g. `lib.scriptConfig.get('basic.maxSlots')`).
- `<ConfigPanel>` title shrunk to `size="md"` + `flex: 1` + `overflow: hidden` on the title container so longer resource names don't truncate to ellipsis.
- `Vector2/3/4Schema` Zod types added to `dirk-cfx-react` so consumers stop redefining them.

# Update 1.1.2 09/09/2025
- Changed some of the buttons/backgrounds to darker theming to match other resources better.
- Altered Button.tsx to fit better with theming
- Completely revampled the lifestyles system
  - Revamped UI with cleaner look.
  - Added easier ability to create/manage lifestyles from settings/lifestyles.lua
- Added support for vms housing to display housing


# Update 1.1.1 11/07/2025
- Fixed issue with qbx_core not picking up license2 natively, resulting in no characters being shown.
- Consolidated and reworked all logic for clothing/appearance menus to dirk_lib for simpler adding of more.
- With illenium and all major clothing including rcore_clothing the characters will now properly display.
- Added ability to use existing character_slots table from es_extended for vipSlots
- Added better support for finding player cars/houses including for qs-housing.
- Added ability to disable deleting of characters.
- Fixed loadEvent stuff from preventing peoples HUDs showing up.
