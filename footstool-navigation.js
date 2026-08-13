(function () {
  const root = new URL("./", location.href);
  const path = location.pathname.toLowerCase();
  const nav = document.createElement("nav"); nav.className = "course-family-nav screen-only"; nav.setAttribute("aria-label", "Footstool course navigation");
  const inner = document.createElement("div"); inner.className = "course-family-nav__inner";
  const brand = document.createElement("a"); brand.className = "course-family-nav__brand"; brand.href = new URL("index.html", root).href; brand.innerHTML = '<span class="course-family-nav__mark" aria-hidden="true">FT</span><span>Footstool</span>';
  const links = document.createElement("div"); links.className = "course-family-nav__links";
  const items = [["Course","index.html",path.endsWith("/year-8-intro-timber-technology/") || path.endsWith("/index.html")],["Modules","index.html#modules",path.includes("/modules/")],["Video learning","youtube.html",path.endsWith("/youtube.html")],["Busy Work","busy-work.html",path.endsWith("/busy-work.html")],["My folio","folio.html",path.endsWith("/folio.html")],["Open Plans","plans.html",path.endsWith("/plans.html")],["Teacher resources","teacher-resources.html",path.endsWith("/teacher-resources.html")],["Main Menu","https://stevencowell.github.io/Main-Page/",false,true]];
  items.forEach(([label,href,current,external])=>{const a=document.createElement("a");a.textContent=label;a.href=external?href:new URL(href,root).href;if(current)a.setAttribute("aria-current","page");links.append(a);});
  inner.append(brand,links);nav.append(inner);document.body.prepend(nav);
})();
