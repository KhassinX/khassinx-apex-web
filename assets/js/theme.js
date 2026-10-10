(function () {
  var d = document.documentElement;
  function sync() {
    var t = null;
    try { t = localStorage.getItem("theme"); } catch (e) {}
    if (t === "light" || t === "dark") d.dataset.theme = t; else delete d.dataset.theme;
    var v = d.dataset.theme || "system";
    var r = document.querySelectorAll('input[name="theme"]');
    for (var i = 0; i < r.length; i++) r[i].checked = r[i].value === v;
  }
  sync();
  window.addEventListener("pageshow", sync);
  document.addEventListener("DOMContentLoaded", function () {
    var f = document.querySelector("fieldset.theme");
    sync();
    if (!f) return;
    f.addEventListener("change", function (e) {
      var v = e.target.value;
      if (v === "system") delete d.dataset.theme; else d.dataset.theme = v;
      try {
        if (v === "system") localStorage.removeItem("theme"); else localStorage.setItem("theme", v);
      } catch (x) {}
    });
    f.hidden = false;
  });
})();
