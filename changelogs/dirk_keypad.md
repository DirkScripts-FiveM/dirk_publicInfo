# UPDATE 1.0.0 | 30/09/2026

## New

- **The keypad.** A wall keypad with 12 keys that press in and spring back, a live screen, a key backlight and red and green status LEDs.
- **Checked on the server.** Keypads are registered on the server with their code, attempt limit and lockout. The client only draws the keypad and sends what was typed.
- **Attempt limits and lockouts.** A lockout locks the keypad for everyone (or per player, with lockScope), with a countdown on the screen and a red padlock on the wall keypad for everyone nearby.
- **Light you control:** backlight colour (8 named colours or any RGB) and brightness, LEDs on, off or blinking, and screen brightness, set per keypad when you register it or live from the client.
- **Native sounds** for key presses, the right code and the wrong one, heard by everyone nearby.
- **13 languages**, following dirk_lib's language when it's running, or the dirk_keypad:language convar.
- **No dependencies.** dirk_lib is optional.
- **A cheap model on the wall** that swaps to the detailed keypad only while someone uses it.
- **A models-only version**, dirk_keypadModel, for servers that drive the keypad themselves.
- **The /lockpad test command.**