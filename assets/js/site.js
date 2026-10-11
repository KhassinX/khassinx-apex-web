// Theme: System / Light / Dark. Loaded synchronously in <head> so the saved theme is set before the first paint;
// the buttons are wired once the footer exists. The choice lives in localStorage "theme" (System = no key).
(function () {
  var root = document.documentElement;

  function saved() {
    try { var t = localStorage.getItem("theme"); return t === "light" || t === "dark" ? t : "system"; } catch (err) { return "system"; }
  }
  function store(v) {
    try { if (v === "system") localStorage.removeItem("theme"); else localStorage.setItem("theme", v); } catch (err) {}
  }
  function set(v) {
    if (v === "system") delete root.dataset.theme;
    else root.dataset.theme = v;
  }

  set(saved());

  document.addEventListener("DOMContentLoaded", function () {
    var group = document.querySelector("[data-theme-group]");
    if (!group) return;
    var buttons = Array.prototype.slice.call(group.querySelectorAll("[data-theme-choice]"));

    function mark(v) {
      buttons.forEach(function (b) {
        var on = b.dataset.themeChoice === v;
        b.setAttribute("aria-checked", on ? "true" : "false");
        b.tabIndex = on ? 0 : -1;
      });
    }

    // A switch the visitor makes fades the page in 480 ms; the first paint does not.
    var fadeTimer;
    function choose(v) {
      root.classList.add("theme-fade");
      clearTimeout(fadeTimer);
      fadeTimer = setTimeout(function () { root.classList.remove("theme-fade"); }, 520);
      set(v);
      store(v);
      mark(v);
    }

    mark(saved());
    // Back/forward cache: another tab may have changed the theme while this page was frozen.
    window.addEventListener("pageshow", function () { var v = saved(); set(v); mark(v); });
    buttons.forEach(function (b) {
      b.addEventListener("click", function () { choose(b.dataset.themeChoice); });
    });
    group.addEventListener("keydown", function (event) {
      var order = ["system", "light", "dark"];
      var i = order.indexOf(saved());
      if (event.key === "ArrowRight" || event.key === "ArrowDown") i = (i + 1) % 3;
      else if (event.key === "ArrowLeft" || event.key === "ArrowUp") i = (i + 2) % 3;
      else return;
      event.preventDefault();
      choose(order[i]);
      buttons[i].focus();
    });
  });
})();
