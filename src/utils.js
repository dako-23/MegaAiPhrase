window.MP = {
    running: false,
    btnGenerate: null,
    btnConfirm: null,
    API_URL: 'https://server-tgjz.onrender.com/phrases/megaparts-phrases'
};

window.fetchPhrases = async function (items) {
    const res = await fetch(MP.API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
    });

    if (!res.ok) throw new Error('Backend error ' + res.status);

    const data = await res.json();
    return data.prices;
};
