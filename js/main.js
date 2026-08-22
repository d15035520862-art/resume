/* 丁艳楠 · 个人简历网站 — 交互脚本
   仅使用 IntersectionObserver（无 scroll 监听），并遵循 prefers-reduced-motion */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 移动端导航 ---------- */
  var toggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  function closeNav() {
    navLinks.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "打开菜单");
  }

  toggle.addEventListener("click", function () {
    var open = navLinks.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
  });

  navLinks.addEventListener("click", function (e) {
    if (e.target.closest("a")) closeNav();
  });

  /* ---------- 滚动显现 ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  }

  /* ---------- 导航高亮（当前区块） ---------- */
  var sections = document.querySelectorAll("main section[id]");
  var navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  if ("IntersectionObserver" in window) {
    var activeObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute("id");
          navAnchors.forEach(function (a) {
            var match = a.getAttribute("href") === "#" + id;
            a.style.color = match ? "" : "";
            a.style.fontWeight = match ? "700" : "";
            a.style.background = match ? "var(--paper-3)" : "";
            if (match) a.style.color = "var(--ink)";
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { activeObs.observe(s); });
  }

  /* ---------- 灯箱 ---------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxClose = document.getElementById("lightboxClose");

  document.getElementById("storyboard").addEventListener("click", function (e) {
    var img = e.target.closest("img");
    if (!img) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  });

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });
})();
