# Shell verification

The shell is `index.html`, `compare.html`, and the files in this folder. It gets the same three checks as every finding class and must pass them before it is deployed, so this page records what was checked and how.

Checked on 9/15/2026: Firefox 155.0.1, axe DevTools 4.10.3, NVDA 2026.2, Windows 10. The completed checklist, one row per check, is in [shell-test-record.md](shell-test-record.md).

## Coverage
- **axe DevTools** (Firefox add-on): full-page scan, which includes the sample-page iframes. `index.html` in light and dark schemes; `compare.html?f=form-labels` in light and dark schemes, side by side and serial; a compare page with a diff loaded, in light and dark schemes; the not-found notice at `compare.html?f=nope`, in light and dark schemes. Ten scans.
- **Keyboard only**: Tab, Shift+Tab, Enter, Space, and arrow keys through every stop on both pages in both schemes, with Firefox's Accessibility Inspector "Show Tabbing Order" to confirm the sequence. Includes the toggle in both states and the diff box with a diff loaded. Checked for a visible focus ring at every stop, focus never lost, never trapped.
- **NVDA + Firefox**: browse-mode pass with the elements list (landmarks, headings, links, buttons) and Speech Viewer transcripts. Colour scheme does not change what NVDA reads, so this pass runs once. The results table quotes one line per page, for the element that shows the most: a catalog link, whose name includes a visually hidden suffix, and the toggle before and after pressing, whose state comes from `aria-pressed`.
- **Reflow and zoom**: `index.html` at 320px; `compare.html` side by side, serial, and in Responsive Design Mode at 600px and 320px; both pages at 200% zoom. Checked for clipped text and for sideways scrolling outside the diff box and the catalog table's box.
- **Forced colours**: a Windows contrast theme on `index.html` and `compare.html?f=form-labels`. Checked that focus rings, the skip link, the toggle's two states, the pane, diff box, and table edges, and iframe text survive the repaint. The toggle's two states were also checked under a resting mouse pointer, and its label in both states in Chrome 152.0.7977.84, the only check run in Chrome.
- **Serving**: every page at `http://localhost:8000/`, then the same pass at the GitHub Pages URL after the first deploy.

`compare.html` has two notices, reached with no `?f=` parameter or with an unknown one. Both use the same markup, a message and a link back to the catalog in place of the comparison, and differ only in the message text.

## Results
| Check           | index.html                                                                                                                | compare.html                                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| axe DevTools    | issues: 0 (2 scans)                                                                                                       | issues: 0 (8 scans)                                                                                                     |
| Keyboard only   | stops: 16; ring: visible; trap: none                                                                                      | stops: 10 (8 controls plus the two iframes); ring: visible; trap: none                                                  |
| NVDA + Firefox  | catalog link: "Compare  column 4  Compare  – Form labels  visited  link"                                                  | toggle: "toggle button  not pressed  Serial view (one column)" → "pressed"                                              |
| Reflow and zoom | 320px: no sideways scroll outside the table box, no clipping; 200%: no sideways scroll outside the table box, no clipping | 320px: no sideways scroll outside the diff box, no clipping; 200%: no sideways scroll outside the diff box, no clipping |
| Forced colours  | rings, skip link, table edges visible                                                                                     | rings, skip link, toggle states, pane edges, diff edges, iframe text visible                                            |

## Colour pairs
Every text and non-text colour pair and its contrast ratio is listed in the comment at the top of `shell.css`, for both schemes. Firefox's Accessibility Inspector (Check for issues → Contrast) confirms them in-page.
