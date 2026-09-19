# 01 — Form labels

**Finding class:** Inputs whose text labels are visually present in placeholders or nearby text blocks but are not programmatically associated with the controls.
**WCAG 2.1 AA SC:** 1.3.1 Info and Relationships; 3.3.2 Labels or Instructions; 4.1.2 Name, Role, Value
**Root cause:** The message field control reaches the accessibility tree with an empty name because that field's only label is a nearby unassociated bare text node. The phone field control reaches the accessibility tree with the hint text as its name because that field's only label is the last-resort placeholder text that the browser falls back to, but the hint text alone does not sufficiently describe the purpose of the field, and the field's only visible label disappears when the user types.
**Fix:** A `<label for=...>` for each field ensures that the same label text that is visually present on the page is also computed by the browser and properly associated with the correct elements in the accessibility tree. The format hint is moved out of the phone field and into a separate element that is referenced by `aria-describedby` so that key information about the expected format of the phone number is announced after the field's name and persists once the field has a value.
**Sample styling:** Presentation only: layout, colors, fonts, field sizing, and a `<fieldset>` border reset. The CSS is identical in the before and after samples; the diff intentionally carries only the markup fixes. The `placeholder` styling is used for legibility only and is preserved across the diff because it is not the mechanism under test.

## Verification
| Check          | Before                                                                                                                                                                                                  | After                                                                                                                                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| axe DevTools   | rule IDs: `label` (1 node) - full-page scan, Firefox add-on 4.10.3. See Note below.                                                                                                                     | clean: 0 issues - same scan                                                                                                                                                                                |
| Keyboard only  | Tab through 5 stops in DOM order, focus ring visible, no trap                                                                                                                                           | Same 5 stops, same order, same results; hint text is not focusable and does not add a stop                                                                                                                 |
| NVDA + Firefox | Phone field, focus mode: `"(123) 456-7890  edit  has auto complete  blank"` - name comes from the placeholder, not a label. Message field, focus mode: `"edit  multi line  blank"` - name not announced | Phone field, focus mode: `"Phone number:  edit  has auto complete  e.g. (123) 456-7890  blank"` - name then description. Message field, focus mode: `"Message:  edit  multi line  blank"` - name announced |

**Note:** The axe-core 4.10.3 rules in the Firefox add-on do not count the placeholder-only phone field as an issue. This is because the rules treat placeholder text as a non-recommended last-resort that passes the test:

> Lastly a placeholder attribute may be used to give text inputs an accessible name. This is not a recommended solution as the visual label (the placeholder text) will be removed once the user enters text into the input, causing them to not know what the input is for.
>
> — Deque University, axe 4.10 rule page for `label`: https://dequeuniversity.com/rules/axe/4.10/label

As a result, axe DevTools reports only 1 issue on the page even though the phone field still fails 3.3.2.

## Client note
The fix depends on the `id` attribute being present on the input elements and those `id`s being unique on the page. The `aria-describedby` text element also needs to travel with its associated input element. Whatever generates the input elements needs to be able to assign unique `id` attributes for those elements and ensure that the `aria-describedby` `id` exists on the page and belongs to the format hint text.

An alternative format hint approach moves the `aria-describedby` text into the input label itself at the cost of a longer accessible name with the hint being announced every time as part of the name rather than as a separate hint after the name.

## Reading log
- WCAG Understanding: https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html · https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html · https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html
- web.dev Learn Accessibility, Forms: https://web.dev/learn/accessibility/forms
- W3C WAI Tutorials, Forms: https://www.w3.org/WAI/tutorials/forms/
- MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label · https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset · https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms
- WebAIM, Creating Accessible Forms: https://webaim.org/techniques/forms/
- APG (widgets only): n/a
- Deque rule page(s): `label` - https://dequeuniversity.com/rules/axe/4.10/label
