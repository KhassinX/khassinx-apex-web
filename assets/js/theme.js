(function () {
  var d = document.documentElement;
  try {
    var t = localStorage.getItem("theme");
    if (t === "light" || t === "dark") d.dataset.theme = t;
  } catch (e) {}
  document.addEventListener("DOMContentLoaded", function () {
    var s = document.getElementById("theme");
    s.value = d.dataset.theme || "system";
    s.onchange = function () {
      if (s.value === "system") delete d.dataset.theme; else d.dataset.theme = s.value;
      try {
        if (s.value === "system") localStorage.removeItem("theme"); else localStorage.setItem("theme", s.value);
      } catch (e) {}
    };
    s.parentNode.hidden = false;
  });
})();
