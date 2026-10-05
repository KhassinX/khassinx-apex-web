(function () {
  var d = document.documentElement;
  function sync() {
    var t = null;
    try { t = localStorage.getItem("theme"); } catch (e) {}
    if (t === "light" || t === "dark") d.dataset.theme = t; else delete d.dataset.theme;
    var s = document.getElementById("theme");
    if (s) s.value = d.dataset.theme || "system";
  }
  sync();
  window.addEventListener("pageshow", sync);
  document.addEventListener("DOMContentLoaded", function () {
    var s = document.getElementById("theme");
    sync();
    s.onchange = function () {
      if (s.value === "system") delete d.dataset.theme; else d.dataset.theme = s.value;
      try {
        if (s.value === "system") localStorage.removeItem("theme"); else localStorage.setItem("theme", s.value);
      } catch (e) {}
    };
    s.parentNode.hidden = false;
  });
})();
