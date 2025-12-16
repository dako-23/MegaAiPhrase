function imageUrlParser(src) {
  if (!src) return '';

  const normalized = src.startsWith('/') ? src : '/' + src;

  let url = 'https://megasys.megaparts.bg' + normalized;

  url = url.replace('/images/400x265/', '/images/originals/');

  return url;
}

function detailsUrlParser(href) {
  if (!href) return '';

  if (href.startsWith('http')) return href;

  const normalized = href.startsWith('/') ? href : '/' + href;

  return 'https://megasys.megaparts.bg' + normalized;
}

window.collectAndSendToBackend = async function () {
  const rows = document.querySelectorAll('table tbody tr');
  const items = [];

  for (const tr of rows) {

    const aDetails = tr.querySelector('a[href*="/megasys/product/editMegapartsAdmin/"]');
    if (!aDetails) continue;

    const id = (aDetails.textContent || '').trim();
    const detailsUrl = detailsUrlParser(aDetails.getAttribute('href'));

    const img = tr.querySelector('img[src*="/uploads/productgalleryfile/images/"]');
    const imgSrc = img?.getAttribute('src') || '';
    const imageUrl = imageUrlParser(imgSrc);

    if (!id || !detailsUrl || !imageUrl) continue;

    items.push({ id, detailsUrl, imageUrl });

    if (items.length >= 50) break;
  }

  try {
    const result = await fetchPhrases(items)

    await runPhrasePipeline(phrases);
  }
  catch (err) {
    console.log(err);
  }

  // console.log('Collected:', items);
}
