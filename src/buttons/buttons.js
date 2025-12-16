window.initButtons = function () {

    const genPhrases = document.createElement("button");
    genPhrases.id = "mp-generate-prices";
    genPhrases.textContent = "Генерирай фрази";
    genPhrases.onclick = collectAndSendToBackend;

    // const conf = document.createElement("button");
    // conf.id = "mp-confirm-prices";
    // conf.textContent = "Потвърди цени";
    // conf.onclick = confirmAllPrices;
    // conf.disabled = true;
    // conf.classList.add("disabled");

    document.body.appendChild(genPhrases);
    // document.body.appendChild(conf);

    MP.btnGenerate = genPhrases;
    // MP.btnConfirm = conf;
};