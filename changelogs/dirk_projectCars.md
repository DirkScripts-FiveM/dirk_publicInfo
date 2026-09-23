# UNRELEASED

## New

- **In-game config panel.** Basic settings, blueprints, scrap search, stores, tools, parts and restrictions are all edited live in /dirk_config, with undo/redo, history and an audit log.
- **Visual map zone editor.** Draw restriction zones straight onto the map and see, select or delete existing ones, instead of typing coordinates.
- **Job and gang creation restrictions.** Limit who can build cars to chosen jobs or gangs at or above a set grade, using a group picker.
- **Per-zone group restrictions.** Each creation zone can also be locked to specific jobs or gangs; leave it empty to open it to anyone.
- **Blueprint categories (QB/QBX).** Pick whole vehicle categories and every car in them gets a blueprint automatically, listed alongside your manual ones (ESX stays manual-only).
- **Searchable model and control pickers.** Prop and model fields use a searchable model picker, and the place and cancel keys use a searchable control picker.
- **Translatable vehicle-class names.** Names like Compacts and Sedans now come from your language file instead of a config list.
- **Grant yourself any blueprint.** Every blueprint in the List tab has a gift button that gives you the item, for admins with config access.
- **Item names come from your inventory.** Tool and part labels and descriptions use your inventory item, so renaming or translating it there updates everywhere.
- **Part behaviour picker.** Choose a part's behaviour from a dropdown and set its item name separately, so you can name the item anything without breaking it.

## Changes

- **Customised servers: re-apply your tweaks once.** Stock installs match the old defaults, but hand-edited settings files won't carry over, so set them again in /dirk_config.
- **Custom logic has its own folder.** Minigames, part logic, store access, tool actions and text UI now live in an editable overrides folder.

## Fixes

- **Empty restrictions allow everyone.** An empty job or zone restriction now correctly lets anyone build anywhere.
- **Missing-part prompts name the right part.** The can't-start message used to always say "Missing wheel"; it now names the actual part.
- **Finished cars save with any garage system.** Completing a build no longer errors on setups like ESX with jg-advancedgarages; requires dirk_lib 1.2.69 or newer.
---

# UPDATE 1.1.4 | 12/05/2026

## New

- **New Despawn on finish setting.** Off by default; when on, a finished car goes straight to the player's garage instead of also spawning at the workshop.

## Fixes

- **Missing English text filled in.** Prompts such as check project, finish project and tools required no longer show raw key names on screen.
- **Correct message when you lack a part.** Installing a part without the item now says you don't have it, instead of saying it's already installed.

# UPDATE 1.1.2 | 05/05/2026

## Fixes

- **No more vector error after upgrading.** Servers with an existing saved-cars file no longer hit an error on every part or tool use.
- **Old saved cars now migrate properly.** Cars from the old save file are written to the database, and the migration no longer re-runs on every restart.
- **Plate mismatch fixed.** A car's plate now always matches the database, so its keys work properly.

# UPDATE 1.1.1 | 01/09/2025

## Changes

- **Simpler car completion.** Target a finished car and choose complete; only the owner can do it.

## Fixes

- **Fixed some missing text.**

# UPDATE 1.1.0 | 26/08/2025

## New

- **Custom car parts included.** A custom car parts pack now ships as standard.

## Changes

- **Stores now use dirk_stores.** Project Cars shops run on dirk_stores instead of dirk_lib.

## Fixes

- **Usable items fixed with ox_inventory.** This applies to both qb-core and qbx_core.
- **Fixed state issues when searching scrap vehicles.**

# UPDATE 1.0.5

## New

- **wasabi_carlock support.**

## Changes

- **No settings file changes.** You can update without touching your config.
- **Lower default wrench break chance.**

## Fixes

- **Restriction zones work normally again.**
- **Car saving fixed on qbx_core.**
- **Vehicle saving fixed on ESX.**
- **Fixed a game-breaking ESX issue.**
- **Tool item checks fixed for ox_inventory.**
- **Usable items fixed on ESX with ox_inventory.**
- **Engine class check fixed.** Each car class in your basic settings needs an engine of the same class.

# UPDATE 1.0.4

## New

- **Choose which vehicles get blueprints.** Set the list of vehicles that generate blueprints manually.
- **Job-lock blueprint work.** Limit who can place and work on blueprints by job.
- **Zone-lock blueprint work.** Limit where blueprints can be placed and worked on.
- **12 languages.** Every string is translatable, with English, French, Spanish, German, Italian, Portuguese, Russian, Dutch, Danish, Swedish, Arabic and Hindi included.
- **More fuel systems supported.** A range of fuel scripts now work out of the box.

## Fixes

- **Car searching fixed for some target systems.**
- **Blueprints work with qs-inventory v2.**
- **Finished cars no longer stay on stands after a restart.**
- **Fuelling issues fixed.**