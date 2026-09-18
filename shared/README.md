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
| Keyboard only   | stops: 16; ring: visible; trap: none                                                                                      | stops: 11 (9 controls plus the two iframes); ring: visible; trap: none                                                  |
| NVDA + Firefox  | catalog link: "Compare  column 4  Compare  – Form labels  visited  link"                                                  | toggle: "toggle button  not pressed  Serial view (one column)" → "pressed"                                              |
| Reflow and zoom | 320px: no sideways scroll outside the table box, no clipping; 200%: no sideways scroll outside the table box, no clipping | 320px: no sideways scroll outside the diff box, no clipping; 200%: no sideways scroll outside the diff box, no clipping |
| Forced colours  | rings, skip link, table edges visible                                                                                     | rings, skip link, toggle states, pane edges, diff edges, iframe text visible                                            |

## Colour pairs
Every text and non-text colour pair and its contrast ratio is listed in the comment at the top of `shell.css`, for both schemes. Firefox's Accessibility Inspector (Check for issues → Contrast) confirms them in-page.

## Client note (compare page)
The client note exists twice, on purpose. The class README's `## Client note` is the canonical record and may run to three sentences plus rougher notes on mechanism alternatives. The `clientNote` field in `findings.js` is a separate, shorter version written for the compare page, where the note is the last section and is read by someone scanning a demo rather than reading a write-up.

Two texts rather than one extracted from the other, because the README's note cannot be cut to length mechanically: its first paragraph is already several sentences, and where the boundary should fall differs by class.

Conventions for the manifest field:

- One sentence. If it needs two, the second belongs in the README instead.
- A shorter version of the README note, never a claim the README does not make. The mechanism is settled in the README's *Root cause* and *Fix*; this line says the same thing in less space.
- Plain text. `shell.js` inserts it with `textContent`, so backticks, links, and any other markdown render as literal characters. Name an attribute in prose (`the id attribute`) rather than marking it up.
- Written after the README note, for the same reason the README's note is filled last: it depends on which mechanism the fix settled on.
- Leave it `""` until the README note exists. The compare page shows a muted "Not written yet." in its place, and its link to the README still resolves.

The README's note is reachable from the compare page by the link after the note section, which points at the same README as the link above the panes and differs from it in link text.

## Sample page styles
Sample pages under `findings/` never load `shell.css`. Each `before.html` and `after.html` carries its own CSS in a single `<style>` block in `<head>`; a pair shares no stylesheet with each other, with another class, or with the shell.

Why the styles are embedded rather than shared:

- `diff.txt` is `git diff --no-index before.html after.html` and contains nothing else. A fix that lived in an external stylesheet would not appear in the diff at all, and for the contrast, focus, and structure classes the CSS *is* the remediation.
- One stylesheet cannot hold both the failure and the fix for the same selector. Splitting them into two class names would turn the demonstrated fix into a class swap rather than the change an audit asks for.
- Each sample has to fail or pass axe on its own. A stylesheet shared across classes means an edit made for one class can change another class's result and force re-verification of pages nobody touched.

Conventions for the block:

- A `<style>` block, not `style` attributes, unless an inline style is itself the reproduced failure. Inline styles cannot express `:focus-visible`, media queries, or `forced-colors`.
- Keep the same selectors in the same order in both files, so the diff is a tight hunk on the declarations that changed.
- Set `background-color` and `color` explicitly on `body` and do not add a `prefers-color-scheme` block. A class that states a contrast ratio has to be measured against one stated pair; the shell imposes nothing on iframe content, so the scheme is the sample page's own choice.
- Keep it to what the class needs: presentation only, where CSS is not part of the mechanism under test.
