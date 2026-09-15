# a11y-remediation-demo

Before/after demonstrations of common web accessibility fixes on synthetic sample pages. Vanilla HTML, CSS, and JavaScript with no framework, no build step, and no dependencies. Each fix is checked with axe DevTools, a keyboard-only pass, and NVDA.

Live site: https://twoffer.github.io/a11y-remediation-demo/

## What this is

Each finding class reproduces one *class* of failure that web accessibility audits commonly flag, on a small sample page written for this demo, and then shows the hand-written fix. The classes and their order follow the categories reported most often in the [WebAIM Million](https://webaim.org/projects/million/), a yearly survey of the top one million home pages.
<!-- Audit source: if the class set is later mapped to a specific audit, name the source here. -->

- The sample pages are synthetic. They were written for this demo and do not quote, copy, or resemble any real site.
- The fixes are hand-written.
- Criteria are cited against WCAG 2.1 AA, the baseline named by most audits and regulation.

## How to read a finding page

Each class lives in one folder under `findings/` — for example, `findings/01-form-labels/`:

1. **before.html** reproduces the failure.
2. **after.html** is the fixed page.
3. **diff.txt** is the plain-text `git diff` between before and after.
4. **README.md** records the finding class, the WCAG criteria, the root cause, the fix, the three verification results (axe DevTools, keyboard only, NVDA + Firefox), a one-line client note, and a reading log.

The catalog at `index.html` lists every class. `compare.html?f=<slug>` shows before and after side by side, with a toggle to a one-column serial view, followed by the diff and the client note.

## Running it locally

The compare page loads `diff.txt` with `fetch`, so the site needs a local web server rather than `file://`. From the repo root:

```
python -m http.server 8000
```

Then open http://localhost:8000/. VS Code's Live Server extension works as well. To regenerate every `diff.txt` after editing sample pages:

```
sh scripts/regen-diffs.sh
```

## What this is not

- Not a framework, a library, or a component set. The fixes are shown at the level every stack shares: the HTML the browser hands to assistive technology.
- Not a claim about any specific site.
- Not a complete audit method. Non-web finding types such as PDF, mobile apps, and video are out of scope.

## License

MIT. See `LICENSE`.
