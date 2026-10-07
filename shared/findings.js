/*
 * Catalog manifest for the accessibility remediation demo.
 *
 * This is the ONE place that defines which finding classes appear in the
 * catalog and in what order. index.html and compare.html both read it.
 * To reorder: move entries. To cut a class from the catalog: remove its
 * entry (leave the folder in place; folder numbers are stable identifiers
 * and are never renamed).
 *
 * The order is remediation priority, not folder order and not frequency,
 * which is why 09 sits second and 02 sits below it. README.md, "What this
 * is", states the rule the order follows. Classes appear here once they
 * are scaffolded, so the list grows in build order and reads in priority
 * order; the gaps are classes not yet scaffolded, not classes that were
 * cut.
 *
 * Fields:
 *   slug        query-string key used by compare.html?f=<slug>
 *   folder      directory under findings/ (NN-slug, never renamed)
 *   title       display name
 *   sc          WCAG 2.1 AA success criteria: { id, name }
 *   clientNote  one sentence for the compare page, hand-written: a shorter
 *               version of the class README's "## Client note", written
 *               after it and asserting nothing it does not. Plain text only
 *               — it is inserted with textContent, so backticks and links
 *               render literally. Leave "" until the README note exists;
 *               the compare page then shows "Not written yet." and its link
 *               to the README. The README is the canonical record; the
 *               convention is "Client note (compare page)" in
 *               shared/README.md.
 */
window.A11Y_DEMO = {
  siteTitle: "Accessibility remediation demo",
  repoUrl: "https://github.com/twoffer/a11y-remediation-demo",
  findings: [
    {
      slug: "form-labels",
      folder: "01-form-labels",
      title: "Form labels",
      sc: [
        { id: "1.3.1", name: "Info and Relationships" },
        { id: "3.3.2", name: "Labels or Instructions" },
        { id: "4.1.2", name: "Name, Role, Value" }
      ],
      clientNote: "The fix depends on each field having an id that is unique on the page, so whatever generates these fields has to assign one per instance."
    },
    {
      slug: "errors-status",
      folder: "09-errors-status",
      title: "Errors and status messages",
      sc: [
        { id: "3.3.1", name: "Error Identification" },
        { id: "4.1.3", name: "Status Messages" },
        { id: "1.4.1", name: "Use of Color" }
      ],
      clientNote: "With errors in more than one field, per-field live regions can announce at once, so on a failed submit, move focus to an error summary that links to each invalid field."
    },
    {
      slug: "contrast",
      folder: "02-contrast",
      title: "Contrast",
      sc: [
        { id: "1.4.3", name: "Contrast (Minimum)" },
        { id: "1.4.11", name: "Non-text Contrast" }
      ],
      clientNote: ""
    },
    {
      slug: "image-alt",
      folder: "03-image-alt",
      title: "Image alt",
      sc: [
        { id: "1.1.1", name: "Non-text Content" }
      ],
      clientNote: ""
    }
  ]
};
