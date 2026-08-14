"use strict";

(function () {
  if (document.querySelector(".course-family-nav")) return;

  const script = document.currentScript;
  const courseRoot = new URL("./", script && script.src ? script.src : location.href);
  const path = location.pathname.toLowerCase();
  const rootPath = courseRoot.pathname.toLowerCase();
  const isCourseHome =
    path === rootPath ||
    path === rootPath.replace(/\/$/, "") ||
    path === new URL("index.html", courseRoot).pathname.toLowerCase();

  if (!document.querySelector('link[data-course-family-nav]')) {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = new URL("footstool-navigation.css?v=20260814", courseRoot).href;
    stylesheet.dataset.courseFamilyNav = "";
    document.head.append(stylesheet);
  }

  const nav = document.createElement("nav");
  nav.className = "course-family-nav screen-only";
  nav.setAttribute("aria-label", "Footstool course navigation");

  const inner = document.createElement("div");
  inner.className = "course-family-nav__inner";

  const brand = document.createElement("a");
  brand.className = "course-family-nav__brand";
  brand.href = new URL("index.html", courseRoot).href;
  brand.innerHTML =
    '<span class="course-family-nav__mark" aria-hidden="true">FT</span><span>Footstool</span>';

  const links = document.createElement("div");
  links.className = "course-family-nav__links";

  const items = [
    ["Course", "index.html", isCourseHome],
    ["Modules", "index.html#modules", path.includes("/modules/")],
    ["Video learning", "youtube.html", path.endsWith("/youtube.html")],
    ["Busy Work", "busy-work.html", path.endsWith("/busy-work.html")],
    ["My folio", "folio.html", path.endsWith("/folio.html")],
    ["Open Plans", "plans.html", path.endsWith("/plans.html")],
    ["Teacher resources", "teacher-resources.html", path.endsWith("/teacher-resources.html")],
    ["Main Menu", "https://stevencowell.github.io/Main-Page/", false, true]
  ];

  items.forEach(([label, href, current, external]) => {
    const link = document.createElement("a");
    link.textContent = label;
    link.href = external ? href : new URL(href, courseRoot).href;
    if (current) link.setAttribute("aria-current", "page");
    links.append(link);
  });

  inner.append(brand, links);
  nav.append(inner);
  document.body.prepend(nav);
  document.documentElement.classList.add("has-course-family-nav");
})();
