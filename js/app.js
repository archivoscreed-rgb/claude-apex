/* Montaje de la página: índice, fichas, tabla, láminas, composiciones y listas de control. */
(function () {
  const L = window.LEGENDS.slice().sort((a, b) => a.name.localeCompare(b.name, 'es'));
  const D = window.DIAGRAM;
  const byId = Object.fromEntries(L.map(l => [l.id, l]));
  const CLASSES = [
    { id: 'asalto', name: 'Asalto' },
    { id: 'escaramuzador', name: 'Escaramuzador' },
    { id: 'recon', name: 'Reconocimiento' },
    { id: 'apoyo', name: 'Apoyo' },
    { id: 'control', name: 'Controlador' }
  ];
  const className = id => (CLASSES.find(c => c.id === id) || {}).name || id;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* almacenamiento no disponible */ } }
  };

  document.body.insertAdjacentHTML('afterbegin', D.DEFS);

  function plateHTML(spec, title, cap) {
    const r = D.render(spec);
    return r.svg + '<figcaption>' + (title ? '<div class="plate-title">' + esc(title) + '</div>' : '') +
      (cap ? '<p class="plate-cap">' + esc(cap) + '</p>' : '') + D.keyHTML(r.used) + '</figcaption>';
  }

  // Láminas estáticas del documento
  $$('figure[data-dia]').forEach(f => {
    const spec = D.M[f.dataset.dia];
    if (spec) f.innerHTML = plateHTML(spec, f.dataset.title, f.dataset.cap);
  });
  // Iconos de las tarjetas del kit
  $$('[data-icon]').forEach(el => { el.innerHTML = window.icon(el.dataset.icon); });
  const nDia = L.length + Object.keys(D.M).length;
  const statDia = $('#stat-dia');
  if (statDia) statDia.textContent = nDia;

  // Chips de clase
  const chipsEl = $('#class-chips');
  chipsEl.innerHTML = '<button class="chip" type="button" data-cls="" aria-pressed="true">Todas</button>' +
    CLASSES.map(c => '<button class="chip" type="button" data-cls="' + c.id + '" aria-pressed="false"><span class="dot cls-' + c.id + '"></span>' + c.name + '</button>').join('');

  // Índice
  $('#index-grid').innerHTML = L.map(l =>
    '<a class="index-card cls-' + l.cls + '" href="#l-' + l.id + '" data-id="' + l.id + '">' + window.emblem(l, 40) +
    '<span><b>' + esc(l.name) + '</b><span class="class-tag">' + className(l.cls) + '</span></span></a>').join('');

  // Fichas
  function pips(n) {
    let s = '<span class="pips" aria-hidden="true">';
    for (let i = 1; i <= 5; i++) s += '<i' + (i <= n ? ' class="on"' : '') + '></i>';
    return s + '</span>';
  }
  function dossier(l) {
    const diaSteps = new Set((l.nc.dia.steps || []).map(s => s[0]));
    const abil = l.abilities.map(a =>
      '<section class="ab"><div class="ab-top"><span class="ab-icon">' + window.icon(a.icon) + '</span>' +
      '<div><span class="ab-type">' + a.type + '</span><h4 class="ab-name">' + esc(a.name) + '</h4><span class="ab-es">' + esc(a.es) + '</span></div></div>' +
      '<p>' + esc(a.desc) + '</p>' +
      (a.facts && a.facts.length ? '<ul class="facts">' + a.facts.map(f => '<li>' + esc(f) + '</li>').join('') + '</ul>' : '') +
      '</section>').join('');
    const list = arr => '<ul>' + arr.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>';
    return '<article class="dossier cls-' + l.cls + '" id="l-' + l.id + '" data-id="' + l.id + '">' +
      '<header class="ds-head">' + window.emblem(l, 72) +
      '<div><span class="class-tag">' + className(l.cls) + '</span><h3>' + esc(l.name) + '</h3><p class="ds-role">' + esc(l.role) + '</p></div>' +
      '<div class="threat"><span class="threat-label">Amenaza para Newcastle</span>' + pips(l.threat) + '<span class="threat-num">' + l.threat + '/5</span></div>' +
      '</header>' +
      '<div class="abilities">' + abil + '</div>' +
      '<div class="counter">' +
      '<section class="ct weak"><h4>Debilidades</h4>' + list(l.weak) + '</section>' +
      '<section class="ct"><h4>En espacios abiertos</h4>' + list(l.open) + '</section>' +
      '<section class="ct"><h4>En espacios cerrados</h4>' + list(l.closed) + '</section>' +
      '</div>' +
      '<div class="ncplan"><figure class="plate">' + plateHTML(l.nc.dia, 'Diagrama · ' + l.name, null) + '</figure>' +
      '<div class="ncsteps"><h4>' + window.icon('castle') + (l.id === 'newcastle' ? 'Newcastle contra Newcastle' : 'Plan con Newcastle') + '</h4><ol>' +
      l.nc.steps.map((s, i) => '<li' + (diaSteps.has(i + 1) ? ' class="in-dia"' : '') + '>' + esc(s) + '</li>').join('') +
      '</ol></div></div>' +
      '</article>';
  }
  const dossiersEl = $('#dossiers');
  dossiersEl.innerHTML = L.map(dossier).join('') + '<p class="empty-state" id="no-results" hidden>Ninguna leyenda coincide con la búsqueda. Prueba con otro nombre o habilidad.</p>';

  // Filtro (clase + texto)
  const haystack = Object.fromEntries(L.map(l => [l.id, [l.name, l.role, className(l.cls)].concat(l.abilities.flatMap(a => [a.name, a.es])).join(' ').toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')]));
  let cls = store.get('codice.cls') || '';
  const q = $('#q');
  function applyFilter() {
    const term = q.value.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    let shown = 0;
    L.forEach(l => {
      const ok = (!cls || l.cls === cls) && (!term || haystack[l.id].includes(term));
      if (ok) shown++;
      $('#l-' + l.id).hidden = !ok;
      $('.index-card[data-id="' + l.id + '"]').hidden = !ok;
    });
    $$('.chip', chipsEl).forEach(c => c.setAttribute('aria-pressed', String(c.dataset.cls === cls)));
    $('#no-results').hidden = shown > 0;
    $('#filter-count').textContent = shown === L.length ? L.length + ' leyendas' : shown + ' de ' + L.length + ' leyendas';
  }
  chipsEl.addEventListener('click', e => {
    const b = e.target.closest('.chip');
    if (!b) return;
    cls = b.dataset.cls;
    store.set('codice.cls', cls);
    applyFilter();
  });
  q.addEventListener('input', applyFilter);
  if (cls && !CLASSES.some(c => c.id === cls)) cls = '';
  applyFilter();

  // Tabla rápida
  const tbody = $('#quick-table tbody');
  let sortKey = 'name', sortDir = 1;
  function renderTable() {
    const rows = L.slice().sort((a, b) => sortKey === 'threat' ? (b.threat - a.threat) * sortDir || a.name.localeCompare(b.name, 'es') : a.name.localeCompare(b.name, 'es') * sortDir);
    tbody.innerHTML = rows.map(l =>
      '<tr class="cls-' + l.cls + '"><th scope="row"><div class="who">' + window.emblem(l, 30) + '<div><a href="#l-' + l.id + '">' + esc(l.name) + '</a><br><span class="class-tag">' + className(l.cls) + '</span></div></div></th>' +
      '<td><span class="sr">' + pips(l.threat) + '</span><span class="threat-num">' + l.threat + '/5</span></td>' +
      '<td>' + esc(l.quick.weak) + '</td><td>' + esc(l.quick.open) + '</td><td>' + esc(l.quick.closed) + '</td><td class="nc">' + esc(l.quick.nc) + '</td></tr>').join('');
  }
  $$('.sort-btn').forEach(b => b.addEventListener('click', () => {
    if (sortKey === b.dataset.sort) sortDir = -sortDir; else { sortKey = b.dataset.sort; sortDir = 1; }
    renderTable();
  }));
  renderTable();

  // Composiciones
  const COMBOS = [
    ['bangalore', 'Humo y muro: una fortaleza ciega para revivir. Además es su hermana.'],
    ['wattson', 'Vallas, pilón y muro: la defensa de final de partida más dura.'],
    ['catalyst', 'Puertas reforzadas y Velo para sellar; tu muro cubre el exterior.'],
    ['conduit', 'Escudos temporales más Ultimate Savior: el revive más seguro del juego.'],
    ['seer', 'Su información te dice dónde y cuándo levantar el muro.'],
    ['bloodhound', 'Escaneo para orientar el muro y camuflaje para cruzar con él.'],
    ['sparrow', 'Sus dardos vigilan los flancos que tu muro no cubre.'],
    ['horizon', 'El elevador lleva al equipo arriba; tu salto lleva el muro detrás.'],
    ['valkyrie', 'Reposicionamiento aéreo y, al aterrizar, tu muro como cobertura inmediata.'],
    ['alter', 'Portales para flanquear mientras tu muro sujeta el frente.'],
    ['maggie', 'Ella rompe la cobertura enemiga mientras tú creas la tuya.'],
    ['fuse', 'Explosivos para sacarlos de su cobertura; tu muro aguanta la respuesta.']
  ];
  $('#combos').innerHTML = COMBOS.map(([id, txt]) => {
    const l = byId[id];
    return '<a class="combo cls-' + l.cls + '" href="#l-' + id + '" style="text-decoration:none">' + window.emblem(l, 44) + '<div><b style="color:var(--ink)">' + esc(l.name) + '</b><p>' + esc(txt) + '</p></div></a>';
  }).join('');

  // Listas de control (se recuerdan en este navegador)
  $$('#checklists input[type="checkbox"]').forEach(cb => {
    cb.checked = store.get('codice.' + cb.id) === '1';
    cb.addEventListener('change', () => store.set('codice.' + cb.id, cb.checked ? '1' : '0'));
  });

  // Navegación activa
  const navLinks = $$('.nav a');
  const sections = navLinks.map(a => $(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => io.observe(s));
  }

  // Enlace directo a una ficha (#l-newcastle)
  if (location.hash && location.hash.length > 1) {
    const t = document.getElementById(location.hash.slice(1));
    if (t) requestAnimationFrame(() => t.scrollIntoView());
  }
})();
