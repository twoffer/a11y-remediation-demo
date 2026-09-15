/*
 * Shell script for index.html (catalog) and compare.html (side-by-side).
 * Reads the manifest in shared/findings.js (window.A11Y_DEMO).
 * Plain script, no modules, no dependencies. All data is inserted with
 * textContent; nothing from the manifest is parsed as HTML.
 */
(function () {
  "use strict";

  var DEMO = window.A11Y_DEMO;
  if (!DEMO) {
    return;
  }

  function el(tag, attrs, text) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        node.setAttribute(k, attrs[k]);
      });
    }
    if (text !== undefined) {
      node.textContent = text;
    }
    return node;
  }

  function hiddenSuffix(text) {
    return el("span", { "class": "visually-hidden" }, " – " + text);
  }

  function criteriaText(finding) {
    return finding.sc
      .map(function (c) { return c.id + " " + c.name; })
      .join("; ");
  }

  function readmeUrl(finding) {
    return DEMO.repoUrl + "/blob/main/findings/" + finding.folder + "/README.md";
  }

  /* ---------- Catalog (index.html) ---------- */

  function renderCatalog(tbody) {
    DEMO.findings.forEach(function (f, i) {
      var tr = el("tr");
      var number = f.folder.split("-")[0];

      tr.appendChild(el("td", null, number));

      var titleCell = el("th", { scope: "row" });
      titleCell.textContent = f.title;
      tr.appendChild(titleCell);

      tr.appendChild(el("td", null, criteriaText(f)));

      var links = [
        ["Compare", "compare.html?f=" + encodeURIComponent(f.slug)],
        ["Before", "findings/" + f.folder + "/before.html"],
        ["After", "findings/" + f.folder + "/after.html"],
        ["README", readmeUrl(f)]
      ];
      links.forEach(function (pair) {
        var td = el("td");
        var a = el("a", { href: pair[1] }, pair[0]);
        a.appendChild(hiddenSuffix(f.title));
        td.appendChild(a);
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });
  }

  /* ---------- Compare (compare.html) ---------- */

  function findBySlug(slug) {
    for (var i = 0; i < DEMO.findings.length; i++) {
      if (DEMO.findings[i].slug === slug) {
        return DEMO.findings[i];
      }
    }
    return null;
  }

  function showNotFound(slug) {
    document.title = "Finding not found – " + DEMO.siteTitle;
    document.getElementById("page-title").textContent = "Finding not found";
    var notice = document.getElementById("notice");
    var message = slug
      ? "There is no finding class with the key “" + slug + "”."
      : "No finding class was requested.";
    notice.appendChild(el("p", null, message));
    var p = el("p");
    p.appendChild(el("a", { href: "index.html" }, "Back to the catalog"));
    notice.appendChild(p);
    notice.hidden = false;
    document.getElementById("compare-body").hidden = true;
  }

  function loadDiff(finding) {
    var status = document.getElementById("diff-status");
    var region = document.getElementById("diff-region");
    var pre = document.getElementById("diff");
    var url = "findings/" + finding.folder + "/diff.txt";

    function noDiff() {
      status.textContent = "No diff yet.";
      region.hidden = true;
    }

    fetch(url, { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) {
          throw new Error("missing");
        }
        return res.text();
      })
      .then(function (text) {
        if (!text.trim()) {
          noDiff();
          return;
        }
        pre.textContent = text;
        status.textContent = "Output of: git diff --no-index before.html after.html";
        region.hidden = false;
      })
      .catch(noDiff);
  }

  function renderCompare(slug) {
    var finding = findBySlug(slug);
    if (!finding) {
      showNotFound(slug);
      return;
    }

    var base = "findings/" + finding.folder + "/";

    document.title = finding.title + " – " + DEMO.siteTitle;
    document.getElementById("page-title").textContent = finding.title;
    document.getElementById("criteria").textContent =
      "WCAG 2.1 AA: " + criteriaText(finding);

    var readme = document.getElementById("readme-link");
    readme.href = readmeUrl(finding);

    ["before", "after"].forEach(function (which) {
      var frame = document.getElementById("frame-" + which);
      frame.title = (which === "before" ? "Before: " : "After: ") +
        finding.title + " sample page";
      frame.src = base + which + ".html";
      var link = document.getElementById("open-" + which);
      link.href = base + which + ".html";
    });

    var note = document.getElementById("client-note");
    if (finding.clientNote && finding.clientNote.trim()) {
      note.textContent = finding.clientNote;
      note.classList.remove("muted");
    } else {
      note.textContent = "Not written yet.";
      note.classList.add("muted");
    }

    loadDiff(finding);
  }

  function wireToggle() {
    var button = document.getElementById("mode-toggle");
    var panes = document.getElementById("panes");
    if (!button || !panes) {
      return;
    }
    button.addEventListener("click", function () {
      var pressed = button.getAttribute("aria-pressed") === "true";
      button.setAttribute("aria-pressed", pressed ? "false" : "true");
      panes.classList.toggle("serial", !pressed);
    });
  }

  /* ---------- Boot ---------- */

  document.addEventListener("DOMContentLoaded", function () {
    var tbody = document.getElementById("catalog-body");
    if (tbody) {
      renderCatalog(tbody);
    }

    var compare = document.getElementById("compare-body");
    if (compare) {
      var params = new URLSearchParams(window.location.search);
      renderCompare(params.get("f"));
      wireToggle();
    }
  });
})();
