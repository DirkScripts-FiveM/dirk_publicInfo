# UNRELEASED

Everything moves in-game: the entire `settings/` folder is **gone**, replaced by a live **dirk_lib config panel** — edit every setting from inside the game with undo/redo, history and an audit log, no file editing or restarts. Behaviour functions (minigames, part remove/apply logic, store `canOpen`, tool actions, text-UI) now live in an editable `overrides/` folder; static engine data (vehicle colours, wheel indexes) moved to `data/`.

> **Upgrading a customised server?** Config now comes from the panel, not `settings/*.lua`. Stock installs match the old defaults exactly, but if you'd hand-edited `settings/`, re-apply those tweaks once in `/dirk_config` (they won't carry over automatically).

## New features
- **In-game config panel.** Basic settings, blueprints, scrap search, stores, tools, vehicle parts and restrictions are all editable live in-game, replacing `settings/*.lua`.
- **Visual map zone editor.** Restriction zones are drawn straight onto the map — draw a polygon, and see / select / delete existing zones — instead of typing coordinates by hand.
- **Job / gang creation restrictions.** Limit who can build cars to specific jobs or gangs at or above a chosen grade, via a proper group picker.
- **Per-zone group restrictions.** Each creation zone can additionally be locked to specific jobs/gangs (empty = open to anyone).
- **Blueprint categories (QB/QBX).** Pick whole vehicle categories and every car in them gets a working blueprint automatically, alongside your manual list. Blueprints now split into Settings + List tabs, with the List showing every blueprint — manual and auto-generated — in one place. (ESX shows a clear "manual only" note, since categories need a shared vehicles list.)
- **Searchable model + control pickers.** Prop/model fields (parts, tools, scrap wrecks, blueprints) use a searchable model picker, and the place/cancel-part keys use a searchable GTA control picker — both instead of raw text/numbers.
- **Translatable engine-class names.** The vehicle-class display names (Compacts, Sedans…) now come from locale keys — translate them once in your language file instead of editing a config list.
- **Grant-yourself buttons on blueprints.** Every blueprint in the List (manual *and* auto-generated) has a gift button to grant yourself that blueprint item — gated behind the same admin permission as the config panel.
- **Item labels + descriptions now come from your inventory.** Tool and part labels/descriptions resolve from the actual inventory item — translate or rename it once in your inventory (ox_inventory items.lua etc.) and it updates everywhere. The panel fields are just a seed for the generated install snippet and go read-only once the item exists.
- **Part behaviour picker + separate item name.** A part's behaviour (remove/apply logic) is now a dropdown of the built-in behaviours (auto-populated from `overrides/vehicleParts.lua` — add one there and it appears), and the inventory item name is a separate field, so you can name the part item anything without breaking its behaviour.

## Fixes
- **Empty restriction now means "anyone".** An empty job or zone restriction correctly allows everyone/everywhere again — a latent case where an empty list could block all players is fixed.
- **Part "missing" prompts name the right part.** The can't-start message for a missing part used to always read "Missing wheel…"; it now names the actual part.
- **Completed cars now save to any garage system.** Finishing a build used to hard-code a `garage` column in the vehicle insert, which errored `Unknown column 'garage'` on setups whose table doesn't have one (e.g. **ESX + jg-advancedgarages**). Vehicles are now stored through dirk_lib's garage bridge (`lib.garage.addVehicle`), which adapts to your framework + garage automatically. Requires **dirk_lib 1.2.69+**.

---

# UPDATE 1.1.4
- Filled in all missing locale strings in `locales/en.json` — keys like `CheckProject`, `FinishProject`, `ToolsRequired`, `ConsumablesRequired`, `MinigameFailed`, `CarFinalised`, `CarAlreadyComplete`, `ItemFound`, wheel labels etc. were defaulting to the raw key name on screen. Now read properly in English.
- Fixed `YouDontHaveItem` showing "This part is already installed." (a copy-paste from `PartAlreadyInstalled`). Now correctly reads "You don't have the required item" when the player triggers a part install without the item in their inventory.
- **New `basic.despawnOnFinish` config option (default `false`).** When set to `true`, finishing a build sends the car straight to the player's garage instead of also spawning it next to the workshop. Previously claimed in the changelog for 1.0.5 but never actually wired up — now it's a real flag.

# UPDATE 1.1.2
- Fixed `unsupported operation on a vector value (field 'xyz')` error that fired on every part/tool use when a server was upgraded with an existing `projectCars.json` file.
- Fixed `projectCars.json` migration not actually persisting the converted cars into the database. Migrated cars are now written to the `projectcars` table and the JSON file is cleared after a successful migration so it stops re-running on every restart.

# UPDATE 1.1.1
- refactored the way vehicles are complete for a more streamlined process, you now will target it and complete if you are the owner.
- fixed some missing locales

# UPDATE 1.1.0
- qb-core/ox_inventory fixed issue with useable items.
- qbx_core/ox_inventory fixed issue with useable items.
- Change to dirk_stores for stores instead of lib.
- Added custom car parts as standard from slk
- State issues with searching scrap vehicles.

# UPDATE 1.0.5
- NO SETTING FILE CHANGES 
:hammer: Fixed the restrictive zone issue, these should operate normally now. 
:hammer: Toned default config tool break chance for wrench. 
:hammer: Fixed for car saving for qbx_core 
:hammer: wasabi_carlock support added. 
:hammer: tool item check fix for ox_inventory
:hammer: fixed es_extended issue within lib that was causing game breaking problems. 
:hammer: fixed es_extended vehicle saving issues 
:hammer: issue with usable item esx (ox_inventory) resolved 
:hammer: fixed issue with engine metadata check (each class of car in basic.lua will need an engine with the same class)

# UPDATE 1.0.4
:new: Ability to manually configure vehicles to generate blueprints for  || DONE 
:new: Ability to job lock who can place blueprints/work on them || DONE
:new: Ability to zone lock where people can place blueprints/work on them  || DONE
:hammer: All strings have been added to labels and we have added all majority languages (ENG, FRA, ESP, DEU, ITA, POR, RUS, NLD, DAN, SWE, ARA, HIN) || DONE
:hammer: Fixed certain target systems not working for searching cars || DONE
:hammer: Fixed issue with qs-inventory v2 not working for blueprints  || DONE || Tested ESX/QSV2
:hammer: Fixed issue with car remaining on stands after server restart upon completion || DONE
:hammer: Fuelling Issues fixed as well as adding a bunch of fuel systems natively supported via dirk-core

# UPDATE 1.0.5 
:hammer: Fixed silly issue with plate not matching the DB, which was causing other key issues etc. 
:new: Config option for default garage.
:new: Option to have car despawn on finish instead of being ready to drive away.