/* 丁艳楠 · 个人简历网站 — 内容渲染
   从 data/content.json 读取内容并填充页面；若加载失败（如 file:// 直接打开），
   页面保留 index.html 里的默认内容作为兜底，不影响展示。 */
(function () {
  "use strict";

  var CONTENT_URL = "data/content.json";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function fill(selector, html) {
    var el = document.querySelector(selector);
    if (el) el.innerHTML = html;
  }

  function renderHero(h) {
    fill(".hero-eyebrow", esc(h.eyebrow));
    fill(".hero-name", esc(h.name));
    fill(".hero-role", esc(h.role));
    fill(".hero-lead", esc(h.lead));
    fill(".hero-meta", (h.meta || []).map(function (m) { return "<li>" + esc(m) + "</li>"; }).join(""));
  }

  function renderAbout(a) {
    var p = document.querySelector(".about-text");
    if (p) {
      var paras = (a.paragraphs || []).map(function (x) { return "<p>" + x + "</p>"; }).join("");
      var stats = (a.stats || []).map(function (s) {
        return "<li><strong>" + esc(s.value) + "</strong><span>" + esc(s.label) + "</span></li>";
      }).join("");
      var ul = "<ul class=\"about-stats\">" + stats + "</ul>";
      // 只替换段落与统计，保留照片 figure
      var photo = p.parentElement.querySelector(".about-photo");
      p.innerHTML = paras + ul;
      if (photo) p.parentElement.appendChild(photo);
      if (a.photo) {
        var img = p.parentElement.querySelector(".about-photo img");
        if (img) img.src = a.photo;
      }
    }
  }

  function renderEducation(ed) {
    fill(".edu-list", (ed.items || []).map(function (it) {
      return "<div class=\"edu reveal in\">" +
        "<div class=\"edu-time\">" + esc(it.time) + "</div>" +
        "<div class=\"edu-body\"><h3>" + esc(it.school) + "</h3><p>" + esc(it.major) + "</p></div>" +
        "</div>";
    }).join(""));
    fill(".edu-courses .tags", (ed.courses || []).map(function (c) { return "<li>" + esc(c) + "</li>"; }).join(""));
  }

  function renderSkills(skills) {
    fill(".skills-grid", (skills || []).map(function (g) {
      return "<div class=\"skill-group reveal in\"><h3>" + esc(g.title) + "</h3>" +
        "<ul class=\"tags\">" + (g.items || []).map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") +
        "</ul></div>";
    }).join(""));
  }

  function renderProjects(projects) {
    fill(".project-list", (projects || []).map(function (p) {
      var flag = p.flag ? " · <span class=\"flag\">" + esc(p.flag) + "</span>" : "";
      var linkBtn = p.link
        ? "<a class=\"btn btn-ghost btn-sm\" href=\"" + esc(p.link) + "\" target=\"_blank\" rel=\"noopener\">" + esc(p.linkText || "查看 ↗") + "</a>"
        : "";
      var points = (p.points || []).map(function (pt) {
        return "<li><b>" + esc(pt.b) + "</b>" + esc(pt.text) + "</li>";
      }).join("");
      var tags = (p.tags || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
      return "<article class=\"project reveal in\">" +
        "<div class=\"project-head\"><div>" +
        "<h3>" + esc(p.title) + "</h3>" +
        "<p class=\"project-meta\">" + esc(p.meta) + flag + "</p>" +
        "</div>" + linkBtn + "</div>" +
        "<p class=\"project-brief\">" + esc(p.brief) + "</p>" +
        "<ul class=\"project-points\">" + points + "</ul>" +
        "<div class=\"project-foot\"><ul class=\"tags\">" + tags + "</ul>" +
        "<span class=\"project-result\">" + esc(p.result || "") + "</span></div>" +
        "</article>";
    }).join(""));
  }

  function renderWorkCards(cards) {
    fill(".work-more", (cards || []).map(function (c) {
      var inner = "<h4>" + esc(c.title) + "</h4><p>" + esc(c.desc) + "</p>" +
        "<span class=\"work-link\">" + esc(c.linkText || "") + "</span>";
      if (c.link) {
        return "<a class=\"work-card reveal in\" href=\"" + esc(c.link) + "\" target=\"_blank\" rel=\"noopener\">" + inner + "</a>";
      }
      return "<div class=\"work-card reveal in\">" + inner + "</div>";
    }).join(""));
  }

  function renderContact(c) {
    fill(".contact-grid",
      "<a class=\"contact-item reveal in\" href=\"mailto:" + esc(c.email) + "\">" +
      "<span class=\"contact-ico\" aria-hidden=\"true\">✉</span>" +
      "<span class=\"contact-body\"><small>邮箱</small><strong>" + esc(c.email) + "</strong></span></a>" +
      "<a class=\"contact-item reveal in\" href=\"tel:" + esc(c.phoneRaw) + "\">" +
      "<span class=\"contact-ico\" aria-hidden=\"true\">☎</span>" +
      "<span class=\"contact-body\"><small>电话</small><strong>" + esc(c.phone) + "</strong></span></a>");
    var mailBtn = document.querySelector(".contact-cta a[href^='mailto']");
    if (mailBtn) mailBtn.setAttribute("href", "mailto:" + c.email);
  }

  fetch(CONTENT_URL)
    .then(function (r) { if (!r.ok) throw new Error("no content.json"); return r.json(); })
    .then(function (data) {
      if (data.hero) renderHero(data.hero);
      if (data.about) renderAbout(data.about);
      if (data.education) renderEducation(data.education);
      if (data.skills) renderSkills(data.skills);
      if (data.projects) renderProjects(data.projects);
      if (data.workCards) renderWorkCards(data.workCards);
      if (data.contact) renderContact(data.contact);
    })
    .catch(function () {
      /* file:// 或缺失时，保留 index.html 默认内容 */
    });
})();
