; (function () {
    'use strict';

    if (!location.href.includes('/megasys/product/editMegapartsAdmin/')) return;

    function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

    function getIdFromUrl() {
        const m = location.pathname.match(/editMegapartsAdmin\/(\d+)/);
        return m ? m[1] : null;
    }

    function findPhraseInput() {
        return document.querySelector('#name');
    }

    async function fillAndSelectWithEnter(input, phrase) {
        input.focus();

        input.value = phrase;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));

        await sleep(2000);

        input.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'ArrowDown',
            code: 'ArrowDown',
            keyCode: 40,
            which: 40,
            bubbles: true
        }));

        await sleep(2000);

        input.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            which: 13,
            bubbles: true
        }));

        input.dispatchEvent(new Event('change', { bubbles: true }));
        input.blur();
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

        await sleep(2000);

        // чакаме input да се появи
        for (let i = 0; i < 30; i++) {
            const input = findPhraseInput();
            if (input) {
                await fillAndSelectWithEnter(input, current.phrase);
                console.log('[MP] Filled:', current.id, current.phrase);

                // ако искаш auto-save: тук натискаш бутона Save (трябва selector)
                // document.querySelector('button[type="submit"]')?.click();

                // ACK към list tab-а
                GM_setValue('MP_ACK', { jobId: current.jobId, index: current.index, id: current.id, ok: true });

                await sleep(2000);
                // window.close();
                return;
            }
            await sleep(2000);
        }

        // ако не намерим input, пак ACK, но ok:false
        GM_setValue('MP_ACK', { jobId: current.jobId, index: current.index, id: current.id, ok: false, reason: 'input_not_found' });
    }

    run();
})();
