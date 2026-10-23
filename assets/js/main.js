(function () {
  "use strict";

  // Panels can stay searchable while closed where the browser supports it:
  // Ctrl+F then opens the matching abstract on its own.
  var searchable = "onbeforematch" in document.body;

  function setOpen(button, panel, open) {
    button.setAttribute("aria-expanded", String(open));
    if (open) {
      panel.removeAttribute("hidden");
      panel.classList.remove("is-opening");
      void panel.offsetWidth; // restart the opening animation
      panel.classList.add("is-opening");
    } else if (searchable) {
      panel.setAttribute("hidden", "until-found");
    } else {
      panel.hidden = true;
    }
  }

  document.querySelectorAll(".toggle[aria-controls]").forEach(function (button) {
    var panel = document.getElementById(button.getAttribute("aria-controls"));
    if (!panel) return;

    setOpen(button, panel, false);

    button.addEventListener("click", function () {
      setOpen(button, panel, button.getAttribute("aria-expanded") !== "true");
    });

    panel.addEventListener("beforematch", function () {
      button.setAttribute("aria-expanded", "true");
    });
  });

  // Top bar: show the name once the header has scrolled away,
  // and mark the section currently on screen.
  var topbar = document.querySelector(".topbar");
  var name = document.getElementById("name");

  if ("IntersectionObserver" in window && topbar && name) {
    new IntersectionObserver(function (entries) {
      var hidden = !entries[0].isIntersecting;
      topbar.classList.toggle("show-brand", hidden);
      topbar.classList.toggle("is-scrolled", hidden);
    }, { rootMargin: "-56px 0px 0px 0px" }).observe(name);

    var links = {};
    document.querySelectorAll('.topbar nav a[href^="#"]').forEach(function (a) {
      links[a.getAttribute("href").slice(1)] = a;
    });

    var visible = {};
    var sections = Object.keys(links)
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { visible[entry.target.id] = entry.isIntersecting; });
      var current = null;
      sections.forEach(function (section) {
        if (!current && visible[section.id]) current = section.id;
      });
      Object.keys(links).forEach(function (id) {
        if (id === current) links[id].setAttribute("aria-current", "true");
        else links[id].removeAttribute("aria-current");
      });
    }, { rootMargin: "-40% 0px -55% 0px" });

    sections.forEach(function (section) { spy.observe(section); });
  }
})();
