/* GodelPromo — shared behaviour. Deferred; nothing here is required for the
   page to be readable or for the promo code to be usable. */
(function () {
  'use strict';

  var codeEl = document.querySelector('[data-code]');
  var CODE = codeEl ? codeEl.textContent.trim() : 'TAKE30';
  var toast = document.querySelector('.toast');
  var toastTimer;

  function showToast(msg) {
    if (!toast) { return; }
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 2000);
  }

  function track(name, params) {
    try { if (window.gtag) { window.gtag('event', name, params || {}); } } catch (e) { /* analytics is never load-bearing */ }
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(CODE);
      showToast('Copied ' + CODE + ' — paste it at checkout');
    } catch (e) {
      // Clipboard API needs a secure context and can be denied. Fall back to a
      // selectable prompt rather than silently failing.
      window.prompt('Copy this promo code:', CODE);
    }
    track('copy_promo_code', { event_category: 'engagement', event_label: CODE });
  }

  document.querySelectorAll('[data-copy]').forEach(function (el) {
    el.addEventListener('click', copyCode);
  });

  /* Outbound clicks fire a Google Ads conversion before navigating. The
     original implementation called preventDefault() and waited on gtag's
     event_callback — if gtag was blocked the callback never fired and the
     link did nothing at all. Modified clicks are left alone entirely so
     cmd-click and middle-click still open a new tab. */
  document.querySelectorAll('[data-outbound]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) { return; }
      track('outbound_click', { event_category: 'engagement', event_label: a.href });
      if (typeof window.gtag_report_conversion === 'function') {
        e.preventDefault();
        window.gtag_report_conversion(a.href);
      }
    });
  });

  /* ---- Terminal cost calculator (only present on /cost-calculator/) ---- */
  var calc = document.querySelector('[data-calc]');
  if (calc) {
    var seatsInput = calc.querySelector('[data-seats]');
    var yearsInput = calc.querySelector('[data-years]');
    var seatsOut = calc.querySelector('[data-seats-out]');
    var yearsOut = calc.querySelector('[data-years-out]');
    var rows = Array.prototype.slice.call(calc.querySelectorAll('[data-annual]'));
    var savingsEl = calc.querySelector('[data-savings]');

    var fmt = new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD', maximumFractionDigits: 0
    });

    function render() {
      var seats = parseInt(seatsInput.value, 10) || 1;
      var years = parseInt(yearsInput.value, 10) || 1;
      if (seatsOut) { seatsOut.textContent = seats + (seats === 1 ? ' seat' : ' seats'); }
      if (yearsOut) { yearsOut.textContent = years + (years === 1 ? ' year' : ' years'); }

      var totals = rows.map(function (r) {
        return parseFloat(r.getAttribute('data-annual')) * seats * years;
      });
      var max = Math.max.apply(null, totals);

      rows.forEach(function (r, i) {
        var fill = r.querySelector('.bar-fill');
        var val = r.querySelector('.bar-value');
        if (fill) { fill.style.width = ((totals[i] / max) * 100).toFixed(1) + '%'; }
        if (val) { val.textContent = fmt.format(totals[i]); }
      });

      // Savings framed against Bloomberg, the anchor Godel's own marketing uses.
      var godel = rows.find(function (r) { return r.hasAttribute('data-godel'); });
      var bloomberg = rows.find(function (r) { return r.hasAttribute('data-bloomberg'); });
      if (savingsEl && godel && bloomberg) {
        var diff = (parseFloat(bloomberg.getAttribute('data-annual')) -
                    parseFloat(godel.getAttribute('data-annual'))) * seats * years;
        savingsEl.textContent = fmt.format(diff);
      }
    }

    if (seatsInput) { seatsInput.addEventListener('input', render); }
    if (yearsInput) { yearsInput.addEventListener('input', render); }
    render();
  }

  /* ---- Command filter (only present on /godel-terminal-commands/) ---- */
  var filter = document.querySelector('[data-cmd-filter]');
  if (filter) {
    var cards = Array.prototype.slice.call(document.querySelectorAll('[data-cmd]'));
    var empty = document.querySelector('[data-cmd-empty]');
    filter.addEventListener('input', function () {
      var q = filter.value.trim().toLowerCase();
      var shown = 0;
      cards.forEach(function (c) {
        var hit = !q || c.getAttribute('data-cmd').toLowerCase().indexOf(q) !== -1;
        c.hidden = !hit;
        if (hit) { shown++; }
      });
      if (empty) { empty.hidden = shown !== 0; }
    });
  }
})();
