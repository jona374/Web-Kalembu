/* ============================================================
   KALEMBU — Interacciones de la landing
   ============================================================ */
(function () {
  "use strict";

  var CFG = window.KALEMBU_CONFIG || {};
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- WhatsApp: construir enlaces ---------- */
  function waLink(extra) {
    var num = (CFG.whatsappNumber || "").replace(/\D/g, "");
    var msg = encodeURIComponent((CFG.whatsappMessage || "Hola Kalembu") + (extra ? " " + extra : ""));
    // Si no hay número definido, devolvemos la sección de contacto para no romper la navegación.
    if (!num) return "#contacto";
    return "https://wa.me/" + num + "?text=" + msg;
  }

  function setWhatsAppLinks() {
    var base = waLink();
    ["waFloat", "ctaWhatsApp", "buyWhatsApp", "cartWhatsApp"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.href = base;
    });
    var fw = document.getElementById("footerWhatsApp");
    if (fw && CFG.whatsappNumber) {
      fw.href = base;
      fw.textContent = "WhatsApp: " + CFG.whatsappNumber;
    }
    // Redes sociales del footer
    if (CFG.social) {
      var map = { Instagram: CFG.social.instagram, TikTok: CFG.social.tiktok, Facebook: CFG.social.facebook };
      $$(".footer__social a").forEach(function (a) {
        var label = a.getAttribute("aria-label");
        if (map[label]) { a.href = map[label]; a.target = "_blank"; a.rel = "noopener"; }
      });
    }
  }

  /* ---------- Topbar rotativa ---------- */
  function initTopbar() {
    var msgs = $$(".topbar__msg");
    if (msgs.length < 2) return;
    var i = 0;
    setInterval(function () {
      msgs[i].classList.remove("is-active");
      i = (i + 1) % msgs.length;
      msgs[i].classList.add("is-active");
    }, 3500);
  }

  /* ---------- Header al hacer scroll ---------- */
  function initHeaderScroll() {
    var header = $("#header");
    if (!header) return;
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 10); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Menú móvil del hero ---------- */
  function initMobileNav() {
    var burger = $("#khBurger"), nav = $("#khNav");
    if (!burger || !nav) return;
    function close() {
      burger.classList.remove("is-open");
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("kh-nav-open");
    }
    function toggle() {
      var open = nav.classList.toggle("is-open");
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("kh-nav-open", open);
    }
    burger.addEventListener("click", toggle);
    $$(".kh-nav__link", nav).forEach(function (l) { l.addEventListener("click", close); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  /* ---------- Animaciones reveal ---------- */
  function initReveal() {
    var els = $$(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("is-visible"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Galería de producto ---------- */
  function initProductGallery() {
    var main = $("#productMain");
    $$(".product__thumbs .thumb").forEach(function (t) {
      t.addEventListener("click", function () {
        $$(".product__thumbs .thumb").forEach(function (x) { x.classList.remove("is-active"); });
        t.classList.add("is-active");
        if (main) main.setAttribute("data-ph", t.getAttribute("data-view") + " · [PENDIENTE DEFINIR: fotografías oficiales]");
      });
    });
  }

  /* ---------- Selectores color/talla ---------- */
  var selected = { color: "Color 01", size: null };

  function initSelectors() {
    $$("#swatches .swatch").forEach(function (sw) {
      sw.addEventListener("click", function () {
        $$("#swatches .swatch").forEach(function (x) { x.classList.remove("is-active"); x.setAttribute("aria-checked", "false"); });
        sw.classList.add("is-active"); sw.setAttribute("aria-checked", "true");
        selected.color = sw.getAttribute("data-color");
      });
    });
    $$("#sizes .size").forEach(function (sz) {
      sz.addEventListener("click", function () {
        $$("#sizes .size").forEach(function (x) { x.classList.remove("is-active"); x.setAttribute("aria-checked", "false"); });
        sz.classList.add("is-active"); sz.setAttribute("aria-checked", "true");
        selected.size = sz.textContent.trim();
      });
    });
  }

  /* ---------- Carrito ---------- */
  var cart = [];

  function openCart()  { $("#cartDrawer").classList.add("is-open"); $("#cartOverlay").classList.add("is-open"); $("#cartDrawer").setAttribute("aria-hidden", "false"); }
  function closeCart() { $("#cartDrawer").classList.remove("is-open"); $("#cartOverlay").classList.remove("is-open"); $("#cartDrawer").setAttribute("aria-hidden", "true"); }

  function renderCart() {
    var body = $("#cartBody"), count = $("#cartCount");
    count.textContent = cart.length;
    if (!cart.length) {
      body.innerHTML = '<p class="cart-drawer__empty">Tu carrito está vacío.</p>';
    } else {
      body.innerHTML = cart.map(function (it, idx) {
        return '' +
          '<div class="cart-item">' +
            '<div class="cart-item__img placeholder" data-ph="Jean"></div>' +
            '<div class="cart-item__info">' +
              '<h4>El jean esencial de Kalembu</h4>' +
              '<p class="cart-item__meta">' + it.color + (it.size ? ' · Talla ' + it.size : '') + '</p>' +
              '<p class="cart-item__meta">[PENDIENTE DEFINIR: precio]</p>' +
              '<button class="cart-item__remove" data-idx="' + idx + '">Quitar</button>' +
            '</div>' +
          '</div>';
      }).join("");
      $$(".cart-item__remove", body).forEach(function (b) {
        b.addEventListener("click", function () { cart.splice(parseInt(b.getAttribute("data-idx"), 10), 1); renderCart(); });
      });
    }
    // Actualiza el enlace de WhatsApp del carrito con el detalle
    var waBtn = $("#cartWhatsApp");
    if (waBtn) {
      if (!cart.length) { waBtn.href = waLink(); }
      else {
        var detail = "Quiero pedir: " + cart.map(function (it) {
          return "El jean esencial de Kalembu (" + it.color + (it.size ? ", talla " + it.size : "") + ")";
        }).join("; ") + ".";
        waBtn.href = waLink(detail);
      }
    }
  }

  function initCart() {
    $("#cartBtn").addEventListener("click", openCart);
    $("#cartClose").addEventListener("click", closeCart);
    $("#cartOverlay").addEventListener("click", closeCart);

    $("#addToCart").addEventListener("click", function () {
      cart.push({ color: selected.color, size: selected.size });
      renderCart();
      openCart();
    });

    // El botón "Comprar por WhatsApp" del producto incluye la selección actual
    $("#buyWhatsApp").addEventListener("click", function () {
      var detail = "Me interesa El jean esencial de Kalembu (" + selected.color + (selected.size ? ", talla " + selected.size : "") + ").";
      this.href = waLink(detail);
    });

    renderCart();
  }

  /* ---------- Suscripción ---------- */
  function initSubscribe() {
    var form = $("#subscribeForm"), msg = $("#subMsg");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = $("#subEmail").value.trim();
      var ok = $("#subPolicy").checked;
      var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      msg.className = "subscribe__msg";
      if (!valid) { msg.textContent = "Ingresa un correo electrónico válido."; msg.classList.add("is-err"); return; }
      if (!ok)    { msg.textContent = "Debes aceptar la política de privacidad."; msg.classList.add("is-err"); return; }
      msg.textContent = "¡Gracias! Te has suscrito a las novedades de Kalembu.";
      msg.classList.add("is-ok");
      form.reset();
    });
  }

  /* ---------- Cerrar con Escape ---------- */
  function initEscape() {
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeCart(); }
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    setWhatsAppLinks();
    initTopbar();
    initHeaderScroll();
    initMobileNav();
    initReveal();
    initProductGallery();
    initSelectors();
    initCart();
    initSubscribe();
    initEscape();
  });
})();
