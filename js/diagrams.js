/* Motor de diagramas tácticos (vista cenital, lienzo 400x250).
   Cada diagrama es un objeto "spec" con capas: terreno, edificios, zonas,
   muros de Newcastle, escudos, rutas, unidades, pasos numerados y notas. */
(function () {
  const W = 400, H = 250;
  const r1 = n => Math.round(n * 10) / 10;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  /* Definiciones compartidas (patrones y puntas de flecha). Se insertan una vez en el documento. */
  const DEFS = '<svg class="pl-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs>' +
    '<pattern id="pl-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" class="pl-gridline"/></pattern>' +
    '<pattern id="pl-hatch-gas" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" class="pl-gas-bg"/><path d="M0 0V6" class="pl-gas-line"/></pattern>' +
    '<pattern id="pl-hatch-bomb" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><rect width="7" height="7" class="pl-bomb-bg"/><path d="M0 0V7" class="pl-bomb-line"/></pattern>' +
    '<pattern id="pl-hatch-storm" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><rect width="8" height="8" class="pl-storm-bg"/><path d="M0 0V8" class="pl-storm-line"/></pattern>' +
    mk('move') + mk('enemy') + mk('leap') + mk('fire') + mk('team') + mk('drag') +
    '</defs></svg>';
  function mk(k) {
    return '<marker id="ah-' + k + '" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="mk-' + k + '"/></marker>';
  }

  const KEY = {
    nc: 'Newcastle', ally: 'Aliado', down: 'Aliado derribado', ncdown: 'Newcastle derribado', enemy: 'Enemigo', edown: 'Enemigo derribado',
    castle: 'Castle Wall (zigzag = lado electrificado)', ghost: 'Orientación descartada', shield: 'Escudo móvil', rshield: 'Escudo de reanimación',
    move: 'Movimiento aliado', leap: 'Salto de la definitiva', drag: 'Arrastre mientras revive', enemyPath: 'Movimiento enemigo',
    fire: 'Fuego enemigo', team: 'Fuego aliado', step: 'Paso (orden de la jugada)',
    rock: 'Cobertura', room: 'Edificio / puerta', hill: 'Terreno alto', ring: 'Tormenta (fuera del ring)',
    gas: 'Gas Nox', smoke: 'Humo', dome: 'Domo', fire_z: 'Fuego', exhibit: 'Exhibición', bh: 'Agujero negro', halo: 'HALO',
    cloak: 'Zona de camuflaje', heal: 'Curación / regeneración', emp: 'PEM', spikes: 'Púas', bomb: 'Bombardeo',
    fence: 'Valla eléctrica', veil: 'Velo oscuro', zipline: 'Tirolina', portal: 'Portal (dos sentidos)', breach: 'Brecha (un sentido)',
    scan: 'Escaneo / línea de visión', pad: 'Plataforma de salto', lift: 'Elevador', drill: 'Taladro (fuego tras la cobertura)',
    gate: 'Puerta nitro', barrel: 'Barril de gas', drone: 'Dron', dart: 'Dardo rastreador', jammers: 'Barricada energética',
    ecover: 'Cobertura enemiga', nexus: 'Nexo del Vacío', door: 'Puerta reforzada', impact: 'Zona de impacto de la definitiva',
    kick: 'Dron Kickstart', bolt: 'Virote aguijón', missiles: 'Enjambre de misiles', ball: 'Bola de demolición', pylon: 'Pilón',
    snare: 'Lazo de arco', beacon: 'Baliza', mark: 'Objetivo marcado'
  };

  function render(spec) {
    const used = new Set();
    const o = [];
    const closed = spec.env === 'closed';
    o.push('<rect class="pl-bg' + (closed ? ' pl-bg-closed' : '') + '" width="' + W + '" height="' + H + '"/>');
    o.push('<rect fill="url(#pl-grid)" width="' + W + '" height="' + H + '"/>');

    if (spec.ring) {
      const g = spec.ring;
      used.add('ring');
      o.push('<path class="pl-storm" fill-rule="evenodd" d="M0 0H' + W + 'V' + H + 'H0Z M' + (g.cx - g.r) + ' ' + g.cy + 'a' + g.r + ' ' + g.r + ' 0 1 0 ' + (2 * g.r) + ' 0a' + g.r + ' ' + g.r + ' 0 1 0 ' + (-2 * g.r) + ' 0Z"/>');
      o.push('<circle class="pl-ring" cx="' + g.cx + '" cy="' + g.cy + '" r="' + g.r + '"/>');
    }
    (spec.hills || []).forEach(h => {
      used.add('hill');
      const [cx, cy, rx, ry] = h;
      [1, 0.66, 0.33].forEach(k => o.push('<ellipse class="pl-hill" cx="' + cx + '" cy="' + cy + '" rx="' + r1(rx * k) + '" ry="' + r1(ry * k) + '"/>'));
    });
    (spec.rooms || []).forEach(rm => { used.add('room'); o.push('<rect class="pl-floor" x="' + rm.x + '" y="' + rm.y + '" width="' + rm.w + '" height="' + rm.h + '"/>'); });

    // Zonas de área (debajo de coberturas y unidades)
    (spec.zones || []).forEach(z => o.push(zoneArea(z, used)));

    (spec.rocks || []).forEach(rk => { used.add('rock'); o.push('<rect class="pl-rock" x="' + rk[0] + '" y="' + rk[1] + '" width="' + rk[2] + '" height="' + rk[3] + '" rx="5"/>'); });
    (spec.rooms || []).forEach(rm => o.push(roomWalls(rm)));

    // Zonas lineales y objetos
    (spec.zones || []).forEach(z => o.push(zoneLine(z, used)));

    (spec.walls || []).forEach(w => o.push(castleWall(w, used)));
    (spec.paths || []).forEach(p => o.push(path(p, used)));
    (spec.shields || []).forEach(s => o.push(mobileShield(s, used)));
    (spec.units || []).forEach(u => o.push(unit(u, used)));
    (spec.steps || []).forEach(s => {
      used.add('step');
      o.push('<g class="pl-step"><circle cx="' + s[1] + '" cy="' + s[2] + '" r="7.5"/><text x="' + s[1] + '" y="' + (s[2] + 3.2) + '">' + s[0] + '</text></g>');
    });
    (spec.notes || []).forEach(n => {
      const lines = String(n[2]).split('\n');
      const anchor = n[3] || 'start';
      o.push('<text class="pl-note" x="' + n[0] + '" y="' + n[1] + '" text-anchor="' + anchor + '">' +
        lines.map((l, i) => '<tspan x="' + n[0] + '" dy="' + (i ? 11 : 0) + '">' + esc(l) + '</tspan>').join('') + '</text>');
    });

    const svg = '<svg class="plate-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(spec.label || 'Diagrama táctico') + '">' + o.join('') + '</svg>';
    return { svg, used };
  }

  function roomWalls(rm) {
    const out = [];
    const sides = {
      n: [rm.x, rm.y, rm.x + rm.w, rm.y], s: [rm.x, rm.y + rm.h, rm.x + rm.w, rm.y + rm.h],
      w: [rm.x, rm.y, rm.x, rm.y + rm.h], e: [rm.x + rm.w, rm.y, rm.x + rm.w, rm.y + rm.h]
    };
    Object.keys(sides).forEach(k => {
      const [x1, y1, x2, y2] = sides[k];
      const len = Math.hypot(x2 - x1, y2 - y1);
      const ux = (x2 - x1) / len, uy = (y2 - y1) / len;
      const gaps = (rm.doors || []).filter(d => d[0] === k).map(d => {
        const c = d[1] * len, half = (d[2] || 22) / 2;
        return [c - half, c + half];
      }).sort((a, b) => a[0] - b[0]);
      const segs = [];
      let t = 0;
      gaps.forEach(g => { if (g[0] > t) segs.push([t, g[0]]); t = g[1]; });
      if (t < len) segs.push([t, len]);
      segs.forEach(([a, b]) => {
        out.push('<line class="pl-wall" x1="' + r1(x1 + ux * a) + '" y1="' + r1(y1 + uy * a) + '" x2="' + r1(x1 + ux * b) + '" y2="' + r1(y1 + uy * b) + '"/>');
      });
    });
    return out.join('');
  }

  function castleWall(w, used) {
    const [x1, y1, x2, y2, ex, ey, ghost] = w;
    used.add(ghost ? 'ghost' : 'castle');
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
    let nx = -dy / L, ny = dx / L;
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    if (ex !== undefined && ((ex - mx) * nx + (ey - my) * ny) < 0) { nx = -nx; ny = -ny; }
    if (ghost) {
      return '<line class="pl-castle-ghost" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"/>';
    }
    const N = 18, pts = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N, off = i % 2 ? 9 : 5;
      pts.push(r1(x1 + dx * t + nx * off) + ',' + r1(y1 + dy * t + ny * off));
    }
    const seg = L / 9;
    return '<polyline class="pl-elec" points="' + pts.join(' ') + '"/>' +
      '<line class="pl-castle" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke-dasharray="' + r1(seg - 2) + ' 2"/>';
  }

  function mobileShield(s, used) {
    const [x, y, a] = s;
    used.add('shield');
    const R = 13, rad = d => d * Math.PI / 180;
    const p1 = [x + R * Math.cos(rad(a - 58)), y + R * Math.sin(rad(a - 58))];
    const p2 = [x + R * Math.cos(rad(a + 58)), y + R * Math.sin(rad(a + 58))];
    return '<g class="pl-mshield"><path d="M' + r1(p1[0]) + ' ' + r1(p1[1]) + 'A' + R + ' ' + R + ' 0 0 1 ' + r1(p2[0]) + ' ' + r1(p2[1]) + '"/>' +
      '<rect x="' + (x - 3) + '" y="' + (y - 3) + '" width="6" height="6" rx="1.5"/></g>';
  }

  function path(p, used) {
    const [kind, pts] = p;
    used.add(kind === 'enemy' ? 'enemyPath' : kind);
    if (kind === 'leap') {
      const [a, b] = [pts[0], pts[pts.length - 1]];
      const d = Math.hypot(b[0] - a[0], b[1] - a[1]);
      const cx = (a[0] + b[0]) / 2, cy = Math.min(a[1], b[1]) - d * 0.32;
      return '<path class="pl-p pl-p-leap" d="M' + a[0] + ' ' + a[1] + 'Q' + r1(cx) + ' ' + r1(cy) + ' ' + b[0] + ' ' + b[1] + '" marker-end="url(#ah-leap)"/>';
    }
    return '<polyline class="pl-p pl-p-' + kind + '" points="' + pts.map(q => q.join(',')).join(' ') + '" marker-end="url(#ah-' + kind + ')"/>';
  }

  function unit(u, used) {
    const [kind, x, y, label] = u;
    used.add(kind);
    let g = '';
    if (kind === 'nc' || kind === 'ncdown') {
      g = '<path class="pl-u-nc' + (kind === 'ncdown' ? ' is-down' : '') + '" d="M' + (x - 8) + ' ' + (y - 8) + 'h16v7q0 7.5-8 10q-8-2.5-8-10z"/><text class="pl-u-nct" x="' + x + '" y="' + (y + 2.8) + '">N</text>';
    } else if (kind === 'ally') {
      g = '<circle class="pl-u-ally" cx="' + x + '" cy="' + y + '" r="7"/>';
    } else if (kind === 'down') {
      g = '<circle class="pl-u-down" cx="' + x + '" cy="' + y + '" r="7"/><path class="pl-u-downx" d="M' + (x - 3.5) + ' ' + y + 'h7M' + x + ' ' + (y - 3.5) + 'v7"/>';
    } else if (kind === 'enemy') {
      g = '<path class="pl-u-enemy" d="M' + x + ' ' + (y - 8.5) + 'L' + (x + 8) + ' ' + (y + 6) + 'H' + (x - 8) + 'Z"/>';
    } else if (kind === 'edown') {
      g = '<path class="pl-u-edown" d="M' + (x - 5) + ' ' + (y - 5) + 'l10 10M' + (x + 5) + ' ' + (y - 5) + 'l-10 10"/>';
    }
    if (label) g += '<text class="pl-ulabel" x="' + x + '" y="' + (y + 19) + '">' + esc(label) + '</text>';
    return '<g>' + g + '</g>';
  }

  function zoneArea(z, used) {
    const k = z[0];
    const circ = (cls) => '<circle class="' + cls + '" cx="' + z[1] + '" cy="' + z[2] + '" r="' + z[3] + '"/>';
    switch (k) {
      case 'gas': used.add('gas'); return circ('pl-z-gas');
      case 'smoke': used.add('smoke'); return '<g class="pl-z-smoke">' + [[0, 0, 1], [-.45, .25, .7], [.45, .2, .72], [.1, -.4, .65]].map(c => '<circle cx="' + r1(z[1] + c[0] * z[3]) + '" cy="' + r1(z[2] + c[1] * z[3]) + '" r="' + r1(z[3] * c[2]) + '"/>').join('') + '</g>';
      case 'dome': used.add('dome'); return circ('pl-z-dome');
      case 'fire': used.add('fire_z'); return circ('pl-z-fire');
      case 'exhibit': used.add('exhibit'); return circ('pl-z-exhibit');
      case 'halo': used.add('halo'); return circ('pl-z-halo');
      case 'cloak': used.add('cloak'); return circ('pl-z-cloak');
      case 'heal': used.add('heal'); return circ('pl-z-heal');
      case 'emp': used.add('emp'); return circ('pl-z-emp') + '<circle class="pl-z-empc" cx="' + z[1] + '" cy="' + z[2] + '" r="3"/>';
      case 'bomb': used.add('bomb'); return circ('pl-z-bomb');
      case 'impact': used.add('impact'); return circ('pl-z-impact');
      case 'bh': {
        used.add('bh');
        const [, x, y, r] = z;
        return circ('pl-z-bhr') + '<path class="pl-z-bh" d="M' + x + ' ' + y + 'a1.5 1.5 0 0 1 3 0 4.5 4.5 0 0 1-9 0 7.5 7.5 0 0 1 15 0 10.5 10.5 0 0 1-21 0"/>';
      }
      case 'spikes': {
        used.add('spikes');
        const [, x, y, r] = z;
        let s = circ('pl-z-spikesr');
        for (let i = 0; i < 7; i++) {
          const a = i * 2 * Math.PI / 7, rr = r * 0.55;
          const px = x + Math.cos(a) * rr * (i % 2 ? 1 : .5), py = y + Math.sin(a) * rr * (i % 2 ? 1 : .5);
          s += '<path class="pl-z-spike" d="M' + r1(px - 3) + ' ' + r1(py + 2.5) + 'L' + r1(px) + ' ' + r1(py - 3.5) + 'L' + r1(px + 3) + ' ' + r1(py + 2.5) + 'Z"/>';
        }
        return s;
      }
      case 'scan': {
        used.add('scan');
        const [, x, y, a, spread, r] = z, rad = d => d * Math.PI / 180;
        const p1 = [x + r * Math.cos(rad(a - spread / 2)), y + r * Math.sin(rad(a - spread / 2))];
        const p2 = [x + r * Math.cos(rad(a + spread / 2)), y + r * Math.sin(rad(a + spread / 2))];
        return '<path class="pl-z-scan" d="M' + x + ' ' + y + 'L' + r1(p1[0]) + ' ' + r1(p1[1]) + 'A' + r + ' ' + r + ' 0 0 1 ' + r1(p2[0]) + ' ' + r1(p2[1]) + 'Z"/>';
      }
      default: return '';
    }
  }

  function zoneLine(z, used) {
    const k = z[0];
    switch (k) {
      case 'fence': {
        used.add('fence');
        const [, x1, y1, x2, y2] = z;
        const L = Math.hypot(x2 - x1, y2 - y1), n = Math.max(4, Math.round(L / 8)), pts = [];
        const nx = -(y2 - y1) / L, ny = (x2 - x1) / L;
        for (let i = 0; i <= n; i++) { const t = i / n, off = i % 2 ? 3 : -3; pts.push(r1(x1 + (x2 - x1) * t + nx * off) + ',' + r1(y1 + (y2 - y1) * t + ny * off)); }
        return '<polyline class="pl-z-fence" points="' + pts.join(' ') + '"/><circle class="pl-z-node" cx="' + x1 + '" cy="' + y1 + '" r="3.5"/><circle class="pl-z-node" cx="' + x2 + '" cy="' + y2 + '" r="3.5"/>';
      }
      case 'veil': {
        used.add('veil');
        const [, x1, y1, x2, y2] = z;
        return '<line class="pl-z-veil" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"/>';
      }
      case 'jammers': {
        used.add('jammers');
        const [, x1, y1, x2, y2] = z;
        let s = '<line class="pl-z-jamline" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"/>';
        for (let i = 0; i < 5; i++) { const t = i / 4; s += '<rect class="pl-z-jam" x="' + r1(x1 + (x2 - x1) * t - 3) + '" y="' + r1(y1 + (y2 - y1) * t - 3) + '" width="6" height="6"/>'; }
        return s;
      }
      case 'ecover': {
        used.add('ecover');
        const [, x1, y1, x2, y2] = z;
        return '<line class="pl-z-ecover" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"/>';
      }
      case 'zipline': {
        used.add('zipline');
        const [, x1, y1, x2, y2] = z;
        return '<line class="pl-z-zip" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"/><circle class="pl-z-node" cx="' + x1 + '" cy="' + y1 + '" r="3"/><circle class="pl-z-node" cx="' + x2 + '" cy="' + y2 + '" r="3"/>';
      }
      case 'portal':
      case 'breach': {
        used.add(k);
        const [, x1, y1, x2, y2] = z;
        const end = k === 'breach' ? ' marker-end="url(#ah-enemy)"' : '';
        return '<line class="pl-z-portalline" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"' + end + '/>' +
          (k === 'portal' ? '<ellipse class="pl-z-portal" cx="' + x1 + '" cy="' + y1 + '" rx="4" ry="8"/>' : '<circle class="pl-z-node" cx="' + x1 + '" cy="' + y1 + '" r="3"/>') +
          '<ellipse class="pl-z-portal" cx="' + x2 + '" cy="' + y2 + '" rx="4" ry="8"/>';
      }
      case 'pad': used.add('pad'); return '<g class="pl-z-obj"><rect x="' + (z[1] - 7) + '" y="' + (z[2] - 4) + '" width="14" height="8" rx="2"/><path d="M' + z[1] + ' ' + (z[2] + 2) + 'v-9M' + (z[1] - 3) + ' ' + (z[2] - 4) + 'l3-3 3 3"/></g>';
      case 'lift': used.add('lift'); return '<g class="pl-z-obj"><circle cx="' + z[1] + '" cy="' + z[2] + '" r="9"/><path d="M' + z[1] + ' ' + (z[2] + 5) + 'v-10M' + (z[1] - 3.5) + ' ' + (z[2] - 1.5) + 'l3.5-3.5 3.5 3.5"/></g>';
      case 'gate': {
        used.add('gate');
        const [, x, y, a] = z;
        return '<g class="pl-z-obj" transform="rotate(' + a + ' ' + x + ' ' + y + ')"><path d="M' + (x - 2) + ' ' + (y - 10) + 'v20M' + (x + 2) + ' ' + (y - 10) + 'v20"/><path d="M' + (x + 6) + ' ' + (y - 4) + 'l4 4-4 4M' + (x + 11) + ' ' + (y - 4) + 'l4 4-4 4"/></g>';
      }
      case 'drill': {
        used.add('drill');
        const [, x, y, a] = z, rad = a * Math.PI / 180;
        const fx = x + Math.cos(rad) * 16, fy = y + Math.sin(rad) * 16;
        return '<circle class="pl-z-firecone" cx="' + r1(fx) + '" cy="' + r1(fy) + '" r="13"/><rect class="pl-z-drill" x="' + (x - 3.5) + '" y="' + (y - 3.5) + '" width="7" height="7" transform="rotate(45 ' + x + ' ' + y + ')"/>';
      }
      case 'barrel': used.add('barrel'); return '<g class="pl-z-barrel"><rect x="' + (z[1] - 4) + '" y="' + (z[2] - 5.5) + '" width="8" height="11" rx="1.5"/><path d="M' + (z[1] - 4) + ' ' + z[2] + 'h8"/></g>';
      case 'drone': used.add('drone'); return '<g class="pl-z-obj"><rect x="' + (z[1] - 3) + '" y="' + (z[2] - 2) + '" width="6" height="4" rx="1"/><circle cx="' + (z[1] - 6) + '" cy="' + (z[2] - 4) + '" r="2.4"/><circle cx="' + (z[1] + 6) + '" cy="' + (z[2] - 4) + '" r="2.4"/><circle cx="' + (z[1] - 6) + '" cy="' + (z[2] + 4) + '" r="2.4"/><circle cx="' + (z[1] + 6) + '" cy="' + (z[2] + 4) + '" r="2.4"/></g>';
      case 'kick': used.add('kick'); return '<g class="pl-z-eobj"><circle cx="' + z[1] + '" cy="' + z[2] + '" r="5"/><path d="M' + (z[1] - 8) + ' ' + z[2] + 'h-4M' + (z[1] + 8) + ' ' + z[2] + 'h4"/></g>';
      case 'dart': used.add('dart'); return '<g class="pl-z-eobj"><path d="M' + (z[1] - 6) + ' ' + (z[2] + 6) + 'L' + (z[1] + 4) + ' ' + (z[2] - 4) + '"/><circle cx="' + (z[1] + 4) + '" cy="' + (z[2] - 4) + '" r="2.6"/></g>';
      case 'bolt': used.add('bolt'); return '<g class="pl-z-eobj"><circle class="pl-z-boltr" cx="' + z[1] + '" cy="' + z[2] + '" r="' + (z[3] || 30) + '"/><path d="M' + z[1] + ' ' + (z[2] - 9) + 'v12M' + (z[1] - 4) + ' ' + z[2] + 'l4 4 4-4"/></g>';
      case 'missiles': {
        used.add('missiles');
        const [, x, y] = z;
        let s = '';
        for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) s += '<circle class="pl-z-missile" cx="' + (x - 14 + i * 14) + '" cy="' + (y - 14 + j * 14) + '" r="4"/>';
        return s;
      }
      case 'ball': used.add('ball'); return '<g class="pl-z-eobj"><circle cx="' + z[1] + '" cy="' + z[2] + '" r="6"/><path d="M' + (z[1] - 6) + ' ' + z[2] + 'h12"/></g>';
      case 'pylon': used.add('pylon'); return '<g class="pl-z-eobj"><path d="M' + z[1] + ' ' + (z[2] - 8) + 'l5 14h-10z"/><circle class="pl-z-pylonr" cx="' + z[1] + '" cy="' + z[2] + '" r="' + (z[3] || 32) + '"/></g>';
      case 'snare': used.add('snare'); return '<g class="pl-z-eobj"><circle cx="' + z[1] + '" cy="' + z[2] + '" r="3"/><circle class="pl-z-snarer" cx="' + z[1] + '" cy="' + z[2] + '" r="' + (z[3] || 22) + '"/></g>';
      case 'beacon': used.add('beacon'); return '<g class="pl-z-obj"><path d="M' + z[1] + ' ' + (z[2] + 7) + 'v-12M' + (z[1] - 5) + ' ' + (z[2] - 6) + 'a7 7 0 0 1 10 0"/></g>';
      case 'nexus': used.add('nexus'); return '<path class="pl-z-eobj" d="M' + z[1] + ' ' + (z[2] - 8) + 'l6 8-6 8-6-8z"/>';
      case 'door': used.add('door'); return '<rect class="pl-z-door" x="' + (z[1] - 3) + '" y="' + (z[2] - 11) + '" width="6" height="22"' + (z[3] ? ' transform="rotate(' + z[3] + ' ' + z[1] + ' ' + z[2] + ')"' : '') + '/>';
      case 'rshield': {
        used.add('rshield');
        const [, x, y, a] = z, R = 11, rad = d => d * Math.PI / 180;
        const p1 = [x + R * Math.cos(rad(a - 50)), y + R * Math.sin(rad(a - 50))];
        const p2 = [x + R * Math.cos(rad(a + 50)), y + R * Math.sin(rad(a + 50))];
        return '<path class="pl-z-rshield" d="M' + r1(p1[0]) + ' ' + r1(p1[1]) + 'A' + R + ' ' + R + ' 0 0 1 ' + r1(p2[0]) + ' ' + r1(p2[1]) + '"/>';
      }
      case 'mark': used.add('mark'); return '<g class="pl-z-mark"><circle cx="' + z[1] + '" cy="' + z[2] + '" r="12"/><path d="M' + z[1] + ' ' + (z[2] - 16) + 'v6M' + z[1] + ' ' + (z[2] + 10) + 'v6M' + (z[1] - 16) + ' ' + z[2] + 'h6M' + (z[1] + 10) + ' ' + z[2] + 'h6"/></g>';
      default: return '';
    }
  }

  /* Muestras para la leyenda bajo cada diagrama */
  function swatch(k) {
    const s = (inner) => '<svg viewBox="0 0 28 16" width="28" height="16" aria-hidden="true">' + inner + '</svg>';
    switch (k) {
      case 'nc': return s('<path class="pl-u-nc" d="M8 2h12v5q0 5.5-6 7.5q-6-2-6-7.5z"/>');
      case 'ncdown': return s('<path class="pl-u-nc is-down" d="M8 2h12v5q0 5.5-6 7.5q-6-2-6-7.5z"/>');
      case 'ally': return s('<circle class="pl-u-ally" cx="14" cy="8" r="6"/>');
      case 'down': return s('<circle class="pl-u-down" cx="14" cy="8" r="6"/><path class="pl-u-downx" d="M11 8h6M14 5v6"/>');
      case 'enemy': return s('<path class="pl-u-enemy" d="M14 1.5L21 14H7Z"/>');
      case 'edown': return s('<path class="pl-u-edown" d="M10 4l8 8M18 4l-8 8"/>');
      case 'castle': return s('<polyline class="pl-elec" points="2,4 5,1.5 8,4 11,1.5 14,4 17,1.5 20,4 23,1.5 26,4"/><line class="pl-castle" x1="2" y1="10" x2="26" y2="10"/>');
      case 'ghost': return s('<line class="pl-castle-ghost" x1="2" y1="8" x2="26" y2="8"/>');
      case 'shield': return s('<g class="pl-mshield"><path d="M6 4A10 10 0 0 1 22 4"/><rect x="11" y="9" width="6" height="5" rx="1.5"/></g>');
      case 'rshield': return s('<path class="pl-z-rshield" d="M6 12A10 10 0 0 1 22 12"/>');
      case 'move': case 'enemyPath': case 'leap': case 'drag': case 'fire': case 'team': {
        const kind = k === 'enemyPath' ? 'enemy' : k;
        return s(kind === 'leap' ? '<path class="pl-p pl-p-leap" d="M2 14Q14 -4 24 12" marker-end="url(#ah-leap)"/>' : '<polyline class="pl-p pl-p-' + kind + '" points="2,8 23,8" marker-end="url(#ah-' + kind + ')"/>');
      }
      case 'step': return s('<g class="pl-step"><circle cx="14" cy="8" r="6.5"/><text x="14" y="11">1</text></g>');
      case 'rock': return s('<rect class="pl-rock" x="5" y="2" width="18" height="12" rx="3"/>');
      case 'room': return s('<rect class="pl-floor" x="3" y="2" width="22" height="12"/><path class="pl-wall" d="M3 2h22v12H17M11 14H3V2"/>');
      case 'hill': return s('<ellipse class="pl-hill" cx="14" cy="8" rx="12" ry="6.5"/><ellipse class="pl-hill" cx="14" cy="8" rx="6" ry="3.2"/>');
      case 'ring': return s('<rect class="pl-storm" x="2" y="2" width="12" height="12"/><path class="pl-ring" d="M16 2v12"/>');
      case 'gas': return s('<circle class="pl-z-gas" cx="14" cy="8" r="6.5"/>');
      case 'smoke': return s('<g class="pl-z-smoke"><circle cx="11" cy="9" r="5"/><circle cx="17" cy="7" r="5"/></g>');
      case 'dome': return s('<circle class="pl-z-dome" cx="14" cy="8" r="6.5"/>');
      case 'fire_z': return s('<circle class="pl-z-fire" cx="14" cy="8" r="6.5"/>');
      case 'exhibit': return s('<circle class="pl-z-exhibit" cx="14" cy="8" r="6.5"/>');
      case 'halo': return s('<circle class="pl-z-halo" cx="14" cy="8" r="6.5"/>');
      case 'cloak': return s('<circle class="pl-z-cloak" cx="14" cy="8" r="6.5"/>');
      case 'heal': return s('<circle class="pl-z-heal" cx="14" cy="8" r="6.5"/>');
      case 'emp': return s('<circle class="pl-z-emp" cx="14" cy="8" r="6.5"/>');
      case 'bomb': return s('<circle class="pl-z-bomb" cx="14" cy="8" r="6.5"/>');
      case 'impact': return s('<circle class="pl-z-impact" cx="14" cy="8" r="6.5"/>');
      case 'bh': return s('<circle class="pl-z-bhr" cx="14" cy="8" r="6.5"/><path class="pl-z-bh" d="M14 8a1 1 0 0 1 2 0 3 3 0 0 1-6 0 5 5 0 0 1 10 0"/>');
      case 'spikes': return s('<path class="pl-z-spike" d="M6 13L9 4 12 13ZM12 13L15 3 18 13ZM18 13L21 5 24 13Z"/>');
      case 'scan': return s('<path class="pl-z-scan" d="M3 8L25 1V15Z"/>');
      case 'fence': return s('<polyline class="pl-z-fence" points="4,8 8,5 12,11 16,5 20,11 24,8"/>');
      case 'veil': return s('<line class="pl-z-veil" x1="2" y1="8" x2="26" y2="8"/>');
      case 'jammers': return s('<line class="pl-z-jamline" x1="3" y1="8" x2="25" y2="8"/><rect class="pl-z-jam" x="4" y="5" width="6" height="6"/><rect class="pl-z-jam" x="18" y="5" width="6" height="6"/>');
      case 'ecover': return s('<line class="pl-z-ecover" x1="3" y1="8" x2="25" y2="8"/>');
      case 'zipline': return s('<line class="pl-z-zip" x1="3" y1="13" x2="25" y2="3"/>');
      case 'portal': return s('<line class="pl-z-portalline" x1="6" y1="8" x2="22" y2="8"/><ellipse class="pl-z-portal" cx="5" cy="8" rx="3" ry="6"/><ellipse class="pl-z-portal" cx="23" cy="8" rx="3" ry="6"/>');
      case 'breach': return s('<line class="pl-z-portalline" x1="3" y1="8" x2="19" y2="8" marker-end="url(#ah-enemy)"/><ellipse class="pl-z-portal" cx="23" cy="8" rx="3" ry="6"/>');
      default: return s('<circle class="pl-z-eobj" cx="14" cy="8" r="5"/>');
    }
  }

  function keyHTML(used) {
    const order = ['nc', 'ncdown', 'ally', 'down', 'enemy', 'edown', 'castle', 'ghost', 'shield', 'rshield', 'move', 'drag', 'leap', 'enemyPath', 'fire', 'team', 'step'];
    const list = order.filter(k => used.has(k)).concat([...used].filter(k => !order.includes(k)));
    return '<ul class="plate-key">' + list.map(k => '<li>' + swatch(k) + '<span>' + (KEY[k] || k) + '</span></li>').join('') + '</ul>';
  }

  /* Diagramas del manual de Newcastle y del capítulo de Battle IQ */
  const M = {
    rescate: {
      label: 'Rescate con arrastre: escudo móvil delante, Newcastle llega al aliado y lo arrastra tras la roca mientras lo revive',
      env: 'open', rocks: [[88, 100, 34, 58], [300, 40, 34, 26], [296, 186, 30, 24]],
      shields: [[262, 124, 0]],
      zones: [['rshield', 214, 126, 0]],
      paths: [['fire', [[345, 66], [272, 118]]], ['fire', [[352, 176], [272, 132]]], ['move', [[62, 136], [150, 172], [214, 136]]], ['drag', [[224, 124], [160, 110], [72, 122]]]],
      units: [['enemy', 350, 58], ['enemy', 356, 170], ['down', 226, 125], ['nc', 62, 136]],
      steps: [[1, 262, 98], [2, 150, 188], [3, 160, 94]],
      notes: [[236, 178, 'Escudo de reanimación\nmirando al enemigo', 'middle'], [20, 30, 'La vida del escudo de reanimación\n= nivel de tu escudo de derribo']]
    },
    escudoAdelantado: {
      label: 'Peek seguro: el escudo llega a la puerta antes que Newcastle; luego se asoma por el lateral',
      env: 'closed', rooms: [{ x: 30, y: 40, w: 190, h: 170, doors: [['e', 0.5, 26]] }],
      rocks: [[300, 58, 34, 26], [292, 176, 34, 26]],
      shields: [[236, 125, 0]],
      paths: [['fire', [[318, 92], [246, 120]]], ['fire', [[312, 172], [246, 130]]], ['move', [[150, 125], [200, 98]]], ['move', [[100, 168], [190, 150]]]],
      units: [['enemy', 320, 96], ['enemy', 314, 168], ['nc', 140, 125], ['ally', 92, 170]],
      steps: [[1, 236, 98], [2, 200, 80], [3, 196, 168]],
      notes: [[40, 30, 'Primero el escudo, después tu cabeza']]
    },
    salto: {
      label: 'Salto al aliado: la definitiva alcanza 75 m si apuntas a un compañero o a su caja de muerte',
      env: 'open', rocks: [[24, 214, 40, 24], [260, 60, 26, 22]],
      walls: [[318, 58, 318, 150, 380, 104]],
      paths: [['leap', [[46, 204], [296, 112]]], ['fire', [[366, 50], [326, 80]]], ['fire', [[372, 150], [326, 128]]]],
      units: [['nc', 46, 204], ['down', 300, 104], ['enemy', 370, 42], ['enemy', 376, 158]],
      steps: [[1, 46, 182], [2, 170, 52], [3, 300, 168]],
      notes: [[110, 236, '35 m a un punto · 75 m a un aliado o su caja']]
    },
    giro: {
      label: 'Gira en el aire: el muro mira hacia donde apuntas al aterrizar, no hacia donde saltaste',
      env: 'open', rocks: [[80, 40, 40, 30], [150, 200, 40, 26]],
      walls: [[150, 78, 250, 78, 200, 40, 'ghost'], [236, 70, 236, 160, 300, 115]],
      paths: [['leap', [[200, 222], [200, 120]]], ['fire', [[352, 96], [248, 104]]], ['fire', [[352, 140], [248, 132]]]],
      units: [['nc', 200, 120], ['ally', 175, 140], ['enemy', 358, 90], ['enemy', 358, 146]],
      steps: [[1, 178, 226], [2, 140, 78], [3, 256, 176]],
      notes: [[228, 98, 'orientación por defecto', 'end'], [396, 236, 'Gira la cámara durante el salto', 'end']]
    },
    puente: {
      label: 'Muro como puente de rotación: el salto crea cobertura a mitad de un campo abierto vigilado por un francotirador',
      env: 'open', hills: [[76, 44, 70, 40]],
      rocks: [[28, 196, 46, 30], [300, 58, 40, 30]],
      zones: [['scan', 80, 44, 40, 40, 190]],
      walls: [[226, 100, 174, 168, 140, 96]],
      paths: [['leap', [[56, 190], [204, 150]]], ['move', [[60, 214], [150, 196], [214, 172]]], ['move', [[222, 146], [280, 110], [306, 96]]]],
      shields: [[288, 96, 220]],
      units: [['enemy', 80, 44, 'Francotirador'], ['nc', 210, 156], ['ally', 62, 214], ['ally', 44, 186]],
      steps: [[1, 120, 128], [2, 150, 214], [3, 272, 70]],
      notes: [[396, 238, 'Zona segura →', 'end']]
    },
    third: {
      label: 'Anti third party: termina los derribos y pon el muro hacia el equipo que llega, no hacia el que ya está roto',
      env: 'open',
      walls: [[222, 214, 166, 142, 140, 214]],
      paths: [['enemy', [[90, 238], [130, 210]]], ['enemy', [[140, 246], [168, 222]]], ['team', [[250, 120], [326, 86]]], ['team', [[260, 148], [336, 150]]]],
      units: [['nc', 210, 170], ['ally', 242, 124], ['ally', 254, 150], ['enemy', 340, 80, 'Equipo A'], ['edown', 336, 120], ['enemy', 348, 150], ['enemy', 84, 230, 'Equipo B'], ['enemy', 134, 240]],
      steps: [[1, 296, 64], [2, 160, 166], [3, 290, 176]],
      notes: [[20, 30, 'El equipo que llega viene con vida llena:\nél es la amenaza real']]
    },
    electro: {
      label: 'Lado electrificado como anti-push: el muro sella el paso y quien trepa queda aturdido',
      env: 'open', rocks: [[150, 20, 60, 76], [150, 164, 60, 70]],
      walls: [[192, 96, 192, 164, 260, 130]],
      paths: [['enemy', [[340, 130], [216, 130]]], ['team', [[110, 110], [190, 118]]]],
      units: [['enemy', 348, 128, 'Octane'], ['enemy', 372, 168], ['nc', 128, 136], ['ally', 104, 106], ['ally', 96, 162]],
      steps: [[1, 192, 82], [2, 280, 112]],
      notes: [[214, 196, 'Trepar el lado electrificado:\naturdimiento + 20 de daño']]
    },
    edificio: {
      label: 'Revive dentro de un edificio: escudo en la puerta exterior y arrastre hasta la habitación interior',
      env: 'closed',
      rooms: [{ x: 26, y: 40, w: 150, h: 170, doors: [['e', 0.5, 26]] }, { x: 176, y: 40, w: 166, h: 170, doors: [['w', 0.5, 26], ['e', 0.35, 26]] }],
      shields: [[354, 100, 0]],
      paths: [['drag', [[306, 104], [210, 124], [96, 130]]], ['fire', [[380, 64], [364, 92]]]],
      units: [['down', 308, 104], ['nc', 90, 132], ['ally', 120, 170], ['enemy', 384, 56], ['enemy', 386, 168]],
      steps: [[1, 354, 74], [2, 250, 102], [3, 70, 110]],
      notes: [[36, 232, 'Dos paredes entre el revive y el enemigo']]
    },
    final: {
      label: 'Ring final: guarda la definitiva para el último cierre y pon el muro contra el equipo con mejor ángulo',
      env: 'open', ring: { cx: 200, cy: 125, r: 92 },
      rocks: [[128, 150, 22, 18]],
      walls: [[226, 148, 184, 92, 250, 92]],
      shields: [[166, 118, 217]],
      paths: [['fire', [[258, 70], [222, 100]]], ['fire', [[124, 92], [158, 112]]]],
      units: [['nc', 196, 136], ['ally', 182, 156], ['ally', 212, 162], ['enemy', 262, 62], ['enemy', 276, 82], ['enemy', 118, 84], ['enemy', 108, 104]],
      steps: [[1, 196, 196], [2, 248, 128], [3, 142, 134]],
      notes: [[396, 22, 'Fuera del ring = tormenta', 'end']]
    },
    suelo: {
      label: 'Escudo desde el suelo: derribado, Newcastle sigue moviendo el escudo para frenar el remate mientras llega su aliado',
      env: 'open', rocks: [[40, 100, 30, 50]],
      shields: [[252, 136, 0]],
      paths: [['enemy', [[340, 132], [276, 134]]], ['move', [[84, 130], [184, 138]]]],
      units: [['ncdown', 210, 138], ['enemy', 348, 130, 'Enemigo'], ['ally', 80, 128]],
      steps: [[1, 252, 110], [2, 130, 116]],
      notes: [[210, 176, 'Derribado aún controlas el escudo', 'middle']]
    },
    savior: {
      label: 'Ultimate Savior: los aliados dentro de la zona de impacto regeneran escudo durante 15 segundos',
      env: 'open', zones: [['impact', 200, 140, 52], ['heal', 200, 140, 40]],
      walls: [[146, 84, 254, 84, 200, 40]],
      paths: [['leap', [[60, 220], [196, 148]]], ['fire', [[150, 34], [170, 76]]], ['fire', [[262, 36], [236, 76]]]],
      units: [['nc', 200, 146], ['ally', 174, 128], ['ally', 226, 132], ['enemy', 146, 26], ['enemy', 266, 28]],
      steps: [[1, 60, 200], [2, 200, 104]],
      notes: [[268, 160, '+15 s de\nregeneración\nde escudo']]
    },
    abierto: {
      label: 'Principios en espacios abiertos: terreno alto, saltos de cobertura en cadena y rotación por el borde',
      env: 'open', hills: [[300, 70, 90, 50]],
      rocks: [[60, 180, 30, 22], [130, 150, 30, 22], [200, 116, 30, 22], [280, 60, 34, 22]],
      paths: [['move', [[50, 214], [74, 176], [144, 148], [214, 112], [290, 56]]], ['fire', [[296, 74], [120, 210]]]],
      units: [['ally', 50, 220], ['nc', 300, 50], ['enemy', 110, 222, 'Terreno bajo']],
      steps: [[1, 100, 160], [2, 330, 92]],
      notes: [[396, 214, 'Cobertura → cobertura; nunca un\ncampo abierto sin muro o escudo', 'end']]
    },
    cerrado: {
      label: 'Principios en espacios cerrados: controla puertas, separa al equipo y no pelees en la entrada',
      env: 'closed',
      rooms: [{ x: 30, y: 30, w: 140, h: 100, doors: [['s', 0.5, 24], ['e', 0.5, 24]] }, { x: 170, y: 30, w: 150, h: 100, doors: [['w', 0.5, 24], ['s', 0.3, 24]] }, { x: 30, y: 130, w: 290, h: 90, doors: [['n', 0.24, 24], ['n', 0.6, 24], ['e', 0.5, 24]] }],
      zones: [['door', 320, 175]],
      shields: [[300, 175, 0]],
      paths: [['enemy', [[384, 175], [340, 175]]]],
      units: [['nc', 260, 176], ['ally', 100, 80], ['ally', 230, 80], ['enemy', 388, 160], ['enemy', 388, 196]],
      steps: [[1, 300, 152], [2, 100, 56], [3, 230, 56]],
      notes: [[40, 240, 'Ángulos cruzados desde habitaciones distintas']]
    },
    rotacion: {
      label: 'Rotación temprana por el borde del ring evitando el centro donde pelean otros equipos',
      env: 'open', ring: { cx: 300, cy: 40, r: 230 },
      rocks: [[150, 120, 30, 24], [240, 200, 36, 22]],
      paths: [['move', [[60, 236], [120, 200], [200, 214], [270, 186], [340, 150]]], ['fire', [[180, 58], [240, 92]]], ['fire', [[250, 98], [190, 62]]]],
      walls: [[196, 176, 236, 236, 160, 230]],
      units: [['nc', 218, 212], ['ally', 66, 232], ['ally', 92, 220], ['enemy', 176, 54, 'Pelea entre dos equipos'], ['enemy', 252, 102]],
      steps: [[1, 120, 182], [2, 250, 236], [3, 352, 132]],
      notes: [[396, 22, 'Zona segura', 'end']]
    },
    reset: {
      label: 'Resetear tras una pelea: muro hacia el equipo que se acerca, curas y revive detrás',
      env: 'open', rocks: [[110, 160, 30, 26]],
      walls: [[230, 70, 230, 170, 300, 120]],
      zones: [['heal', 190, 120, 36]],
      paths: [['enemy', [[372, 70], [320, 96]]], ['enemy', [[380, 170], [326, 150]]], ['drag', [[214, 104], [186, 118]]]],
      units: [['nc', 196, 104], ['down', 182, 124], ['ally', 170, 92], ['enemy', 380, 62], ['enemy', 388, 176], ['edown', 300, 40], ['edown', 290, 210]],
      steps: [[1, 230, 52], [2, 150, 130], [3, 330, 200]],
      notes: [[20, 30, 'Pelea ganada ≠ pelea terminada']]
    }
  };

  window.DIAGRAM = { render, keyHTML, DEFS, M };
})();
