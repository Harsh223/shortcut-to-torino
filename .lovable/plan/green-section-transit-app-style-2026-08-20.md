# Green section, Transit-app style

Rebuild the second section of the home page (the deep green "Quattro cose, fatte bene" block) as an interactive tabbed showcase, matching the reference screenshots: chip tabs at the top, one huge headline, one paragraph, a "Next" arrow, and a single phone on the right with vehicles peeking out from behind it.

## What changes

**Layout inside the green rounded panel**

```text
+-------------------------------------------------------------+
|  [Parcheggio] [Mezzi] [Guida] [Voce]            🚌           |
|                                              +---------+     |
|  Smetti di girare                            |  phone  |     |
|  in tondo                                    |  mock   |     |
|                                              |         |     |
|  Mentre ti avvicini, Shortcut cerca...       |         |  🚲 |
|                                        🚋    +---------+     |
|  (→) Avanti                                                  |
+-------------------------------------------------------------+
```

- **Chip tabs** — four pills across the top: Parcheggio, Mezzi, Guida, Voce. Active chip is white with dark green text; inactive chips are a lighter green on the panel. Clickable, and horizontally scrollable on phones.
- **One story at a time** — headline, paragraph and phone all swap with the active tab, using the existing per-mode copy (parking / transit / drive / voice) rather than four small cards.
- **"Avanti" / "Next" control** — circled arrow button under the paragraph that advances to the next tab, exactly like the reference.
- **Phone + peeking vehicles** — a single phone mock on the right (parking, transit and drive already exist; voice reuses the drive mock). Small vehicle/props illustrations tuck behind the phone's left and right edges and stay clipped inside the panel.
- **Transitions** — content cross-fades and slides slightly on tab change; the phone swaps with a soft scale/fade. Respects reduced-motion.
- **Mobile** — headline size steps down, chips scroll in a single row, the phone sits centred under the text with the props cropped to the panel edge so nothing overflows.

## Notes

- Copy is already in place (`parking`, `transit`, `drive`, `voice` blocks in both Italian and English); only two short labels are added: the tab names and "Avanti / Next".
- The rest of the home page (hero, parking, transit, city sections) is untouched.
- No auto-rotation: tabs change only when clicked, so the section never moves under the reader.

## Technical details

- New component `src/components/site/ModeShowcase.tsx` holding the tab state, chip row, animated copy panel and the phone/props stage; `src/routes/index.tsx` act 2 renders it inside the existing `forest-wash block-round` panel.
- Tabs derive from a small array mapping `key → copy block + mock component`, keyed off the existing `c.pillars.items` order so both languages stay in sync.
- Tab buttons use real `<button>` elements with `aria-selected` / `role="tab"` and a `role="tabpanel"` region for keyboard and screen-reader support.
- Vehicle props: reuse existing vector art crops (hero band / feature art) as absolutely-positioned, `pointer-events-none`, `aria-hidden` images inside an `overflow-hidden` stage; no new image generation.
- Transitions via CSS classes on the panel keyed by active tab (opacity + translate), consistent with the existing `Reveal` motion language.
