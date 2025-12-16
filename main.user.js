// ==UserScript==
// @name         Mega AI Phrase
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  MAIPH v.1.0.1
// @author       DAKO23
// @match        https://megasys.megaparts.bg/megasys/product*
// @icon         https://cdn.creazilla.com/cliparts/3171394/gear-clipart-lg.png

// @require      https://raw.githubusercontent.com/dako-23/MegaAiPhrase/main/src/utils.js?v=1
// @require      https://raw.githubusercontent.com/dako-23/MegaAiPhrase/main/src/phrasePipeline.js?v=1
// @require      https://raw.githubusercontent.com/dako-23/MegaAiPhrase/main/src/collectData.js?v=1
// @require      https://raw.githubusercontent.com/dako-23/MegaAiPhrase/main/src/editAutoFill.js?v=1
// @require      https://raw.githubusercontent.com/dako-23/MegaAiPhrase/main/src/buttons/buttons.js?v=1

// @resource     CUSTOMCSS https://raw.githubusercontent.com/dako-23/MegaAiPhrase/main/src/buttons/styles.css

// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant GM_openInTab
// @grant GM_setValue
// @grant GM_getValue


// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    GM_addStyle(GM_getResourceText("CUSTOMCSS"));

    initButtons();
})();
