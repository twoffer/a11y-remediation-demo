# Shell test record

The completed checklist behind the results table in [README.md](README.md). Each row is one check that was run against the shell; the "Coverage" section of that README summarises them.

Checked on 9/15/2026: Firefox 155.0.1, axe DevTools 4.10.3, NVDA 2026.2, Windows 10.

## Setup
| #   | Item                                                                                 | Result |
| --- | ------------------------------------------------------------------------------------ | ------ |
| S1  | Date, Firefox, axe DevTools, NVDA, and Windows versions noted for `shared/README.md` | [x]    |

## Pages and states (localhost)
| #   | URL                          | Confirm                                            | Result |
| --- | ---------------------------- | -------------------------------------------------- | ------ |
| P1  | `index.html`                 | catalog table lists every class in the manifest    | [x]    |
| P2  | `compare.html?f=form-labels` | both frames load; empty diff shows "No diff yet."  | [x]    |
| P3  | `compare.html?f=contrast`    | same shell, contrast entry                         | [x]    |
| P4  | `compare.html?f=image-alt`   | same shell, image-alt entry                        | [x]    |
| P5  | `compare.html`               | missing-key notice with a link back to the catalog | [x]    |
| P6  | `compare.html?f=nope`        | unknown-key notice with a link back to the catalog | [x]    |

## axe DevTools (ten scans)
| #   | Page / state                               | Light | Dark |
| --- | ------------------------------------------ | ----- | ---- |
| A1  | `index.html`                               | [x]   | [x]  |
| A2  | `compare.html?f=form-labels`, side by side | [x]   | [x]  |
| A3  | `compare.html?f=form-labels`, serial       | [x]   | [x]  |
| A4  | compare page with a diff loaded            | [x]   | [x]  |
| A5  | `compare.html?f=nope`                      | [x]   | [x]  |

## Keyboard only
| #   | Page / state                    | Confirm                                                                                                                            | Light | Dark |
| --- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----- | ---- |
| K1  | `index.html`                    | first Tab shows the skip link top left; Enter moves focus into main; next Tab lands on the first catalog link                      | [x]   | [x]  |
| K2  | `index.html`                    | without the skip link: site name, Catalog, Repository, then catalog links in row order                                             | [x]   | [x]  |
| K3  | `index.html`                    | ring visible at every stop; Shift+Tab walks back in reverse; no stop on plain text or a heading; no trap                           | [x]   | [x]  |
| K4  | `compare.html?f=form-labels`    | order: skip link, site name, Catalog, Repository, README link, toggle, "Open before.html on its own", "Open after.html on its own" | [x]   | [x]  |
| K5  | `compare.html?f=form-labels`    | Enter on the skip link moves focus into main; focus not lost                                                                       | [x]   | [x]  |
| K6  | `compare.html?f=form-labels`    | Space toggles the button; pressed look changes; focus stays on the button                                                          | [x]   | [x]  |
| K7  | `compare.html?f=form-labels`    | Enter toggles the button; pressed look changes; focus stays on the button                                                          | [x]   | [x]  |
| K8  | `compare.html?f=form-labels`    | ring visible at every stop with the toggle not pressed and pressed; Shift+Tab walks back in reverse; no trap                       | [x]   | [x]  |
| K9  | compare page with a diff loaded | diff box is one more stop with a visible ring; Up and Down scroll it; Tab leaves it                                                | [x]   | [x]  |

## NVDA + Firefox (either scheme)
| #   | Page / state                    | Confirm                                                                                                                                                                                                                                                          | Result |
| --- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| N1  | `index.html`                    | on load and with Insert+T, reads the title "Catalog – Accessibility remediation demo"                                                                                                                                                                            | [x]    |
| N2  | `index.html`                    | Insert+F7 → Landmarks: banner, "Site" navigation, main                                                                                                                                                                                                           | [x]    |
| N3  | `index.html`                    | Insert+F7 → Headings: one H1, "Finding classes"                                                                                                                                                                                                                  | [x]    |
| N4  | `index.html`                    | Insert+F7 → Links: every name unique, e.g. "Compare – Form labels"                                                                                                                                                                                               | [x]    |
| N5  | `index.html`                    | skip link reads "Skip to main content, link"; Enter announces the main landmark and reads on from the H1; Insert+Up confirms the browse caret is on the H1, so Down arrow moves to the next line                                                                 | [x]    |
| N6  | `index.html`                    | T reaches the table; Ctrl+Alt+Right along a row announces the column header and column number, e.g. "Compare, column 4, Compare – Form labels, link"; Ctrl+Alt+Down announces the row header and row number, e.g. "Form labels, row 3", confirming `scope="row"` | [x]    |
| N7  | `compare.html?f=form-labels`    | on load and with Insert+T, the title names the class and the site                                                                                                                                                                                                | [x]    |
| N8  | `compare.html?f=form-labels`    | Insert+F7 → Landmarks: banner, "Site" navigation, main, and the Before, After, and Client note regions                                                                                                                                                           | [x]    |
| N9  | `compare.html?f=form-labels`    | Insert+F7 → Headings: one H1, then H2s Before, After, Diff, Client note in order                                                                                                                                                                                 | [x]    |
| N10 | `compare.html?f=form-labels`    | Insert+F7 → Links and Buttons: every name unique                                                                                                                                                                                                                 | [x]    |
| N11 | `compare.html?f=form-labels`    | skip link reads "Skip to main content, link"; Enter announces the main landmark and reads on from the H1; Insert+Up confirms the browse caret is on the H1, so Down arrow moves to the next line                                                                 | [x]    |
| N12 | `compare.html?f=form-labels`    | toggle reads "Serial view (one column), toggle button, not pressed"; Space → "pressed"; Space again → "not pressed"                                                                                                                                              | [x]    |
| N13 | `compare.html?f=form-labels`    | each iframe announces its title, e.g. "Before: Form labels sample page, frame"; Down arrow reads into the sample page                                                                                                                                            | [x]    |
| N14 | `compare.html?f=form-labels`    | empty diff reads "No diff yet."                                                                                                                                                                                                                                  | [x]    |
| N15 | compare page with a diff loaded | Landmarks adds a "Diff" region; it announces "Diff, region"; Down arrow reads it one line at a time                                                                                                                                                              | [x]    |
| N16 | both pages                      | Speech Viewer lines copied: a catalog link on the index; the toggle before and after pressing                                                                                                                                                                    | [x]    |

## Reflow and zoom (either scheme)
| #   | Page / state                                                | Confirm                                                           | Result |
| --- | ----------------------------------------------------------- | ----------------------------------------------------------------- | ------ |
| R1  | `index.html` at 320px                                       | no clipped text; no sideways scroll except inside the table's box | [x]    |
| R2  | `compare.html?f=form-labels`, window wider than about 900px | panes side by side; no clipped text; no sideways scroll           | [x]    |
| R3  | `compare.html?f=form-labels`, serial                        | button shows pressed; panes stack; no sideways scroll             | [x]    |
| R4  | `compare.html?f=form-labels` at 600px                       | panes stack with the toggle not pressed and pressed               | [x]    |
| R5  | `compare.html?f=form-labels` at 320px                       | no clipped text; no sideways scroll except inside the diff box    | [x]    |
| R6  | `index.html` at 200% zoom                                   | no clipped text; table scrolls sideways only inside its own box   | [x]    |
| R7  | `compare.html?f=form-labels` at 200% zoom                   | no clipped text                                                   | [x]    |

## Colour pairs
Accessibility panel → Check for issues → Contrast reports nothing.

| #   | Page                         | Light | Dark |
| --- | ---------------------------- | ----- | ---- |
| C1  | `index.html`                 | [x]   | [x]  |
| C2  | `compare.html?f=form-labels` | [x]   | [x]  |

## Forced colours (Windows contrast theme, Firefox override at its default)
| #   | Confirm                                                                                                      | index.html | compare.html?f=form-labels |
| --- | ------------------------------------------------------------------------------------------------------------ | ---------- | -------------------------- |
| F1  | every focus ring visible                                                                                     | [x]        | [x]                        |
| F2  | skip link visible and outlined when focused                                                                  | [x]        | [x]                        |
| F3  | toggle's pressed and not-pressed states look different                                                       | n/a        | [x]                        |
| F4  | edges visible: table cell borders on the index; pane frames and, with a diff loaded, the diff box on compare | [x]        | [x]                        |
| F5  | text inside the sample-page iframes readable                                                                 | n/a        | [x]                        |

## GitHub Pages (after committing)
| #   | URL                                                   | Confirm                                                            | Result |
| --- | ----------------------------------------------------- | ------------------------------------------------------------------ | ------ |
| G1  | `index.html`                                          | loads styled; every catalog link (compare, before, after) resolves | [ ]    |
| G2  | `compare.html?f=form-labels`                          | frames, README link, and diff load                                 | [ ]    |
| G3  | `compare.html?f=contrast`, `compare.html?f=image-alt` | frames load                                                        | [ ]    |
| G4  | `compare.html`, `compare.html?f=nope`                 | notices show; the catalog link resolves                            | [ ]    |
