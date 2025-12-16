// ==UserScript==
// @name         Mega AI Phrase
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  MAIPH v.1.0.0
// @author       DAKO23
// @match        https://megasys.megaparts.bg/megasys/product*
// @icon         https://cdn.creazilla.com/cliparts/3171394/gear-clipart-lg.png

// @require      https://raw.githubusercontent.com/dako-23/MegaAiPrice/main/src/utils.js
// @require      https://raw.githubusercontent.com/dako-23/MegaAiPrice/main/src/fillPrices.js
// @require      https://raw.githubusercontent.com/dako-23/MegaAiPrice/main/src/confirmPrices.js
// @require      https://raw.githubusercontent.com/dako-23/MegaAiPrice/main/src/buttons/buttons.js

// @resource     CUSTOMCSS https://raw.githubusercontent.com/dako-23/MegaAiPrice/main/src/buttons/styles.css

// @grant        GM_addStyle
// @grant        GM_getResourceText

// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    GM_addStyle(GM_getResourceText("CUSTOMCSS"));

    initButtons();
})();
