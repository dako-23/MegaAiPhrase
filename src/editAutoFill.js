(function () {
  'use strict';

  if (!location.href.includes('/megasys/product/editMegapartsAdmin/')) return;

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  function getIdFromUrl() {
    const m = location.pathname.match(/editMegapartsAdmin\/(\d+)/);
    return m ? m[1] : null;
  }

  function setNativeValue(el, value) {
    el.focus();
    el.value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    el.blur();
  }

  function findPhraseInput() {
    return document.querySelector('#name');
  }

  async function run() {
    const urlId = getIdFromUrl();
    if (!urlId) return;

    const current = GM_getValue('MP_CURRENT', null);
    if (!current?.jobId) return;

    // безопасност: да не попълваме грешен таб
    if (String(current.id) !== String(urlId)) {
      console.log('[MP] Not my job. urlId=', urlId, 'current.id=', current.id);
      return;
    }

    // чакаме input да се появи
    for (let i = 0; i < 30; i++) {
      const input = findPhraseInput();
      if (input) {
        setNativeValue(input, current.phrase);
        console.log('[MP] Filled:', current.id, current.phrase);

        // ако искаш auto-save: тук натискаш бутона Save (трябва selector)
        // document.querySelector('button[type="submit"]')?.click();

        // ACK към list tab-а
        GM_setValue('MP_ACK', { jobId: current.jobId, index: current.index, id: current.id, ok: true });

        await sleep(300);
        // window.close();
        return;
      }
      await sleep(250);
    }

    // ако не намерим input, пак ACK, но ok:false
    GM_setValue('MP_ACK', { jobId: current.jobId, index: current.index, id: current.id, ok: false, reason: 'input_not_found' });
  }

  run();
})();
