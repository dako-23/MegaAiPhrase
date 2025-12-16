window.runPhrasePipeline = async function (phrases) {
  if (!Array.isArray(phrases) || phrases.length === 0) {
    console.warn('[MP] No phrases to process');
    return;
  }

  const jobId = Date.now().toString();
  console.log('[MP] Start pipeline job:', jobId, 'count:', phrases.length);

  GM_setValue('MP_JOB_ID', jobId);
  GM_setValue('MP_ACK', null);

  for (let i = 0; i < phrases.length; i++) {
    const p = phrases[i];
    if (!p?.id || !p?.detailsUrl || !p?.phrase) continue;

    // записваме "текущата задача", която edit табът трябва да изпълни
    GM_setValue('MP_CURRENT', {
      jobId,
      index: i,
      id: String(p.id),
      detailsUrl: p.detailsUrl,
      phrase: p.phrase
    });

    console.log(`[MP] (${i + 1}/${phrases.length}) open:`, p.detailsUrl);

    // отваряме таба
    GM_openInTab(p.detailsUrl, { active: false, insert: true });

    // чакаме ACK от edit таба (с timeout)
    const ok = await waitForAck(jobId, i, 5000); // 20s timeout
    if (!ok) {
      console.warn('[MP] timeout / no ack for', p.id, 'continuing...');
    }

    await sleep(400);
  }

  console.log('[MP] Pipeline done');
  GM_setValue('MP_CURRENT', null);
};

window.waitForAck = async function (jobId, index, timeoutMs) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const ack = GM_getValue('MP_ACK', null);

    if (ack && ack.jobId === jobId && ack.index === index) {
      // изчистваме ACK, за да не пречи на следващия
      GM_setValue('MP_ACK', null);
      return true;
    }
    await sleep(200);
  }
  return false;
};
