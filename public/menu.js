(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var header = document.querySelector(".site-header");
    var btn = document.getElementById("menu-toggle");
    if (!header || !btn) return;
    function set(open) {
      if (open) header.setAttribute("data-open", ""); else header.removeAttribute("data-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    }
    btn.addEventListener("click", function () { set(!header.hasAttribute("data-open")); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
    header.addEventListener("click", function (e) {
      var a = e.target && e.target.closest ? e.target.closest(".site-nav a") : null;
      if (a) set(false);
    });
  });
})();
