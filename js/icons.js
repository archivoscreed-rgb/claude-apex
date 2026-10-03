/* Biblioteca de iconos de habilidades (SVG 24x24, trazo = currentColor).
   Ilustraciones originales; no son arte oficial del juego. */
(function () {
  const F = 'fill="currentColor"';
  const G = {
    // Recon / información
    eye: '<path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    noxeye: '<path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><circle cx="5" cy="19" r="1" ' + F + '/><circle cx="9" cy="21" r="1" ' + F + '/><circle cx="19" cy="19.5" r="1" ' + F + '/>',
    raven: '<path d="M3 13c3-1 5-4 9-4 2.5 0 4 1 5.5 2.5L21 11l-2.5 2c-1 3-4 5-7.5 5H8l-3 2 1-3c-1.4-1-2.4-2.4-3-4z"/><circle cx="16" cy="11.5" r=".9" ' + F + '/>',
    cloakdome: '<circle cx="12" cy="12" r="9.5" stroke-dasharray="2.5 2"/><path d="M12 6c-2.2 0-3.8 1.9-3.8 4.4V17l1.9-1.2 1.9 1.2 1.9-1.2 1.9 1.2v-6.6C15.8 7.9 14.2 6 12 6z"/>',
    network: '<circle cx="12" cy="5" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><circle cx="12" cy="13" r="2"/><path d="M12 7v4M10.4 14.3l-3.7 2.5M13.6 14.3l3.7 2.5"/>',
    drone: '<rect x="9" y="10" width="6" height="4" rx="1"/><path d="M9 11L6.2 9M15 11l2.8-2M9 13l-2.8 2M15 13l2.8 2"/><circle cx="5" cy="8" r="2"/><circle cx="19" cy="8" r="2"/><circle cx="5" cy="16" r="2"/><circle cx="19" cy="16" r="2"/>',
    emp: '<circle cx="12" cy="12" r="2.5" ' + F + '/><circle cx="12" cy="12" r="6" stroke-dasharray="2 2"/><circle cx="12" cy="12" r="9.5"/>',
    heart: '<path d="M2 12h4l2-5 3 10 2.5-7 1.5 2h7"/>',
    reticle: '<circle cx="12" cy="12" r="7"/><path d="M12 2v5M12 17v5M2 12h5M17 12h5"/><circle cx="12" cy="12" r="1.3" ' + F + '/>',
    sphere: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="9" ry="3.5"/><circle cx="9" cy="9.5" r="1" ' + F + '/><circle cx="15.5" cy="14.5" r="1" ' + F + '/>',
    lens: '<circle cx="7" cy="15" r="4"/><circle cx="17" cy="15" r="4"/><path d="M11 15h2M5 11.5L7 5h3l1 6.5M19 11.5L17 5h-3l-1 6.5"/>',
    bat: '<path d="M2 9c2 0 3 1 4 3 1-1.5 2.3-2 3-1.5L12 8l3 2.5c.7-.5 2-.1 3 1.5 1-2 2-3 4-3-1 4-3 7-6 7l-4 2-4-2c-3 0-5-3-6-7z"/>',
    scope: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5" opacity=".55"/><path d="M12 3v18M3 12h18"/>',
    doublejump: '<path d="M12 21v-7"/><path d="M8 16l4-4 4 4"/><path d="M8 9.5l4-4 4 4"/>',
    dart: '<path d="M4 20L14 10"/><path d="M14 10l6-6M14 10l-.8-4.2M14 10l4.2.8"/><circle cx="8.5" cy="15.5" r="1.3" ' + F + '/>',
    bolt: '<path d="M12 2.5v13"/><path d="M8.5 12L12 15.5 15.5 12"/><ellipse cx="12" cy="19" rx="8" ry="2.6"/><path d="M4.5 14.5L3 13M19.5 14.5L21 13"/>',
    beacon: '<path d="M12 21V9"/><path d="M8 21h8"/><path d="M8.5 6.5a5 5 0 0 1 7 0M6 4a8.5 8.5 0 0 1 12 0"/><circle cx="12" cy="9" r="1.5" ' + F + '/>',
    // Apoyo
    shield: '<path d="M12 3l7 3v5c0 5-3.2 8.3-7 10-3.8-1.7-7-5-7-10V6l7-3z"/>',
    dome: '<path d="M3 19h18"/><path d="M5 19a7 7 0 0 1 14 0"/><path d="M8.5 19a3.5 3.5 0 0 1 7 0" opacity=".55"/>',
    mortar: '<path d="M6 3v6M12 2v7M18 3v6"/><path d="M4 7.5L6 9.5l2-2M10 7L12 9l2-2M16 7.5l2 2 2-2"/><path d="M3 20h18"/><circle cx="6" cy="16.5" r="1.6"/><circle cx="12" cy="15.5" r="1.9"/><circle cx="18" cy="16.5" r="1.6"/>',
    revive: '<path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10z"/><path d="M12 10v6M9 13h6"/>',
    healdrone: '<rect x="9" y="12" width="6" height="4" rx="1"/><path d="M9 13l-3-1.5M15 13l3-1.5"/><circle cx="5" cy="11" r="1.8"/><circle cx="19" cy="11" r="1.8"/><path d="M12 3v6M9 6h6"/><path d="M10 18.5l-1 2M14 18.5l1 2"/>',
    halo: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5" stroke-dasharray="2 2"/><path d="M12 9.5v5M9.5 12h5"/>',
    loot: '<path d="M6 4h12l3 5-9 11L3 9z"/><path d="M3 9h18M9 4l3 16 3-16"/>',
    bracelet: '<circle cx="10" cy="14" r="5.5"/><path d="M15.5 3l1 2.3 2.3 1-2.3 1-1 2.3-1-2.3-2.3-1 2.3-1z" ' + F + '/>',
    market: '<path d="M4 9l2-5h12l2 5"/><path d="M4 9h16v11H4z"/><path d="M9 20v-6h6v6"/>',
    cloak: '<path d="M12 3c-3.5 0-6 3-6 7v10l3-2 3 2 3-2 3 2V10c0-4-2.5-7-6-7z"/><path d="M9.5 11h5"/>',
    decoy: '<circle cx="8.5" cy="7" r="2.5"/><path d="M4 20v-3a4.5 4.5 0 0 1 9 0v3"/><circle cx="16" cy="7" r="2.5" stroke-dasharray="1.6 1.6"/><path d="M13.6 13.4A4.5 4.5 0 0 1 20.5 17v3" stroke-dasharray="1.6 1.6"/>',
    party: '<circle cx="12" cy="6" r="2.3"/><path d="M8 20v-3a4 4 0 0 1 8 0v3"/><circle cx="4.5" cy="9" r="1.8" stroke-dasharray="1.4 1.4"/><circle cx="19.5" cy="9" r="1.8" stroke-dasharray="1.4 1.4"/><path d="M2 19v-2a3 3 0 0 1 4.5-2.6M22 19v-2a3 3 0 0 0-4.5-2.6" stroke-dasharray="1.4 1.4"/>',
    run: '<circle cx="14.5" cy="4.5" r="2"/><path d="M7 21l3.2-6 3 2.2V21"/><path d="M10.2 15L11.5 9l4 2.2 3 2.8"/><path d="M11.5 9L7.5 10 5.5 13"/>',
    transfer: '<path d="M15 4l5 2v4c0 3.5-2.2 5.8-5 7.2"/><path d="M3 13h9M8.5 9.5L12 13l-3.5 3.5"/>',
    jammer: '<path d="M3 20.5h18"/><rect x="4" y="13.5" width="3" height="7"/><rect x="10.5" y="13.5" width="3" height="7"/><rect x="17" y="13.5" width="3" height="7"/><path d="M5.5 10l3.2-3 3.3 3 3.2-3 3.3 3"/>',
    drag: '<circle cx="16.5" cy="4.5" r="2"/><path d="M16.5 6.5L15.5 13l-2.5 7M15.5 13l3 6.5"/><path d="M16 9l-6 3.5"/><circle cx="4.5" cy="15.5" r="1.8"/><path d="M6.2 16.3L10 12.5M6 17.5l5 1.5"/>',
    mobileshield: '<path d="M4 12a8 8 0 0 1 16 0v3H4z"/><path d="M4 12h16" opacity=".5"/><rect x="10" y="17.5" width="4" height="2.6" rx=".8"/><path d="M8 18.8H5.5M16 18.8h2.5"/>',
    castle: '<path d="M3 20V9h3V5.5h3V9h2V5.5h2V9h2V5.5h3V9h3v11z"/><path d="M6.5 15l2-2 1.5 2 2-2 1.5 2 2-2 1.5 2" />',
    // Escaramuzadores / movilidad
    grapple: '<path d="M12 21V9"/><path d="M12 9c-3 0-5-2-5-4.5M12 9c3 0 5-2 5-4.5M12 9V3"/><path d="M7 4.5L5.5 6M17 4.5L18.5 6"/><circle cx="12" cy="21" r="1.2" ' + F + '/>',
    zip: '<path d="M3 5l18 10"/><path d="M12 10v5"/><rect x="9.5" y="15" width="5" height="4" rx="1"/><circle cx="3" cy="5" r="1.4" ' + F + '/><circle cx="21" cy="15" r="1.4" ' + F + '/>',
    ear: '<path d="M3 10v4h3l4 3V7L6 10H3z"/><path d="M14 9a4 4 0 0 1 0 6M17 6.5a7.5 7.5 0 0 1 0 11"/>',
    void: '<path d="M12 4a8 8 0 1 0 8 8"/><path d="M12 8a4 4 0 1 0 4 4"/><circle cx="12" cy="12" r="1" ' + F + '/><path d="M15 4.5l2.2.9.9 2.2"/>',
    portal: '<ellipse cx="6.5" cy="12" rx="3" ry="6.5"/><ellipse cx="17.5" cy="12" rx="3" ry="6.5"/><path d="M9.5 12h5" stroke-dasharray="1.5 2"/>',
    mend: '<path d="M12 6.5v11M6.5 12h11"/><circle cx="12" cy="12" r="9" stroke-dasharray="3 2"/>',
    stim: '<path d="M14 4l6 6M17 7l-9 9-3.5 1 1-3.5 9-9"/><path d="M11 10l3 3M4.5 19.5L3 21"/>',
    pad: '<path d="M4 17h16"/><path d="M6 17l2 3h8l2-3"/><path d="M12 14V4M8.5 7.5L12 4l3.5 3.5"/>',
    spacewalk: '<circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-25 12 12)"/>',
    lift: '<path d="M7 21V6M12 21V3.5M17 21V6"/><path d="M4.8 8.2L7 6l2.2 2.2M9.8 5.7L12 3.5l2.2 2.2M14.8 8.2L17 6l2.2 2.2"/>',
    blackhole: '<path d="M12 12a1 1 0 0 1 2 0 3 3 0 0 1-6 0 5 5 0 0 1 10 0 7 7 0 0 1-14 0"/><path d="M20.5 9.5L22 8M3.5 14.5L2 16"/>',
    jets: '<path d="M12 2.5l3 6v6l-3 2-3-2v-6z"/><path d="M10 17.5l-1 4M14 17.5l1 4M12 17.5V22"/>',
    missile: '<path d="M14 4h6v6L10 20l-6-6z"/><path d="M8 12l4 4M4 20l2.5-2.5"/>',
    dive: '<path d="M12 21V6.5"/><path d="M7 11.5l5-5 5 5"/><path d="M4 3h16" stroke-dasharray="2 2"/>',
    drift: '<circle cx="7" cy="16" r="3.2"/><circle cx="7" cy="16" r="1" ' + F + '/><path d="M12 16h9M13.5 12h7.5M15 8h6"/>',
    gate: '<path d="M5 21V9a7 7 0 0 1 14 0v12"/><path d="M9 11l3 3 3-3M9 15.5l3 3 3-3"/>',
    kick: '<circle cx="12" cy="17.5" r="3"/><path d="M12 14.5V3.5M8 7.5l4-4 4 4"/><path d="M5 21l2-2M19 21l-2-2"/>',
    rift: '<rect x="8" y="9" width="8" height="7" rx="1"/><path d="M8 12h8"/><path d="M4 6a11 11 0 0 1 16 0" stroke-dasharray="2 2"/><path d="M4 19a11 11 0 0 0 16 0" stroke-dasharray="2 2"/>',
    passage: '<path d="M10 3v18M14 3v18"/><ellipse cx="12" cy="12" rx="5" ry="4.2"/><path d="M2 12h3M19 12h3"/>',
    nexus: '<path d="M12 3l6 9-6 9-6-9z"/><circle cx="12" cy="12" r="2" ' + F + '/><path d="M2.5 12h2M19.5 12h2"/>',
    // Asalto
    speed: '<path d="M4 6l6 6-6 6M11 6l6 6-6 6"/><path d="M20 6v12" opacity=".55"/>',
    smoke: '<path d="M6 17a4 4 0 0 1-.5-8A5.5 5.5 0 0 1 16 8a4.5 4.5 0 0 1 2 8.6"/><path d="M6 17h12"/><path d="M8 20.5h8" opacity=".6"/>',
    artillery: '<path d="M3 20.5h18"/><circle cx="6" cy="16.5" r="2"/><circle cx="12" cy="14" r="2.5"/><circle cx="18" cy="16.5" r="2"/><path d="M12 2.5v6M9.5 6l2.5 2.5L14.5 6"/>',
    deathbox: '<rect x="4" y="8" width="16" height="11" rx="1.5"/><path d="M4 12h16"/><path d="M9 5h6v3"/><circle cx="12" cy="15.5" r="1.3" ' + F + '/>',
    snare: '<circle cx="12" cy="12" r="2.6"/><path d="M12 9.4V3M12 14.6V21M9.4 12H3M14.6 12H21"/><path d="M5.5 5.5l2.6 2.6M18.5 18.5l-2.6-2.6M18.5 5.5l-2.6 2.6M5.5 18.5l2.6-2.6" opacity=".6"/>',
    breach: '<ellipse cx="17" cy="12" rx="3" ry="7"/><path d="M3 12h10M9.5 8.5L13 12l-3.5 3.5"/>',
    sling: '<path d="M3 9h12l2 2h4v3h-6l-2 2H8l-1 4H4l1-5H3z"/><path d="M13 3L5 21" opacity=".45"/>',
    whistler: '<path d="M3 12h9"/><path d="M12 8.5l7.5 3.5-7.5 3.5z" ' + F + '/><path d="M5 8c2 1 2 7 0 8M8 7c2.5 1.5 2.5 8.5 0 10" opacity=".6"/>',
    tempest: '<path d="M12 3a9 9 0 1 0 9 9"/><path d="M13.5 6.5L9 13h4l-2 5.5 5-7.5h-4z" ' + F + '/>',
    grenadier: '<circle cx="8" cy="15" r="4.5"/><circle cx="16" cy="15" r="4.5"/><path d="M8 10.5V8h3M16 10.5V8h3"/>',
    knuckle: '<circle cx="8" cy="9" r="3"/><circle cx="15.5" cy="8" r="2.5"/><circle cx="11" cy="15.5" r="3.5"/><path d="M17.5 14l3 1M18.5 18l2 2M15.5 19.5l1 2.5"/>',
    motherlode: '<circle cx="12" cy="12" r="8.5" stroke-dasharray="3 2"/><path d="M12 7.5c1.6 1.6 2.6 3.2 1.6 5.2a2 2 0 0 1-3.2 0c-.7-1 0-2.1.5-2.6"/>',
    warlord: '<path d="M12 3c2 3 6 5 6 10a6 6 0 0 1-12 0c0-3 2-5 3-6 0 2 1 3 2 3 0-2-1-4 1-7z"/>',
    drill: '<path d="M3 12h6l3-3h4l5 3-5 3h-4l-3-3"/><path d="M14 9.5l1 5M17 10.6l.6 2.8"/>',
    ball: '<circle cx="11" cy="13" r="7"/><path d="M6 10c3 1 7 1 10 0M5 15.2c3 1.2 8 1.2 12 0"/><path d="M17 5l3-2M18.5 8l3-.5"/>',
    climb: '<path d="M5 3v18"/><path d="M10 20.5l3-6 3 2 2.5-5"/><circle cx="17.5" cy="6.5" r="2"/><path d="M8.5 11l4-2 3.2 1.2"/>',
    claw: '<path d="M5 20L10 4M10.5 21l4-17M15.5 20l4-15"/>',
    shadow: '<path d="M12 3c4 2 7 5 7 9 0 5-3 8-7 9-4-1-7-4-7-9 0-4 3-7 7-9z" stroke-dasharray="2.5 2"/><circle cx="12" cy="10.5" r="2.5"/><path d="M8.5 17.5a4 4 0 0 1 7 0"/>',
    // Controladores
    cover: '<rect x="3" y="8" width="18" height="10" rx="1"/><path d="M7 8V5M12 8V5M17 8V5"/><path d="M8 13h8M13 11l3 2-3 2"/>',
    minigun: '<rect x="3" y="9" width="10" height="6" rx="1"/><path d="M13 10h8M13 12h8M13 14h8"/><path d="M6 15l-1 5h4l1-5"/>',
    reload: '<path d="M8 3h6l1 9-1 9H8"/><path d="M9.5 7h3.5M9.5 11h3.5M9.5 15h3.5"/><path d="M18 8a5 5 0 0 1 0 8"/>',
    fence: '<path d="M5 4v16M19 4v16"/><path d="M5 8l3.5 3L12 8l3.5 3L19 8M5 14l3.5 3 3.5-3 3.5 3 3.5-3"/>',
    pylon: '<path d="M12 3l4 18H8z"/><path d="M9.6 14h4.8M10.6 9h2.8"/><path d="M5 6a9 9 0 0 0 0 9M19 6a9 9 0 0 1 0 9"/>',
    spark: '<path d="M13 2L5 13h6l-1 9 8-12h-6z"/>',
    barrel: '<rect x="7" y="5" width="10" height="15" rx="2"/><path d="M7 9h10M7 16h10"/><path d="M12 2v3"/>',
    gascloud: '<circle cx="8" cy="13" r="4"/><circle cx="15" cy="11" r="5"/><circle cx="13" cy="17" r="3"/><circle cx="14.5" cy="10.5" r="1" ' + F + '/><circle cx="8" cy="13.5" r="1" ' + F + '/>',
    door: '<rect x="6" y="3" width="12" height="18" rx="1"/><path d="M6 9h12M6 15h12"/><path d="M9 6l6 6M9 12l6 6" opacity=".6"/>',
    spikes: '<path d="M3 20h18"/><path d="M5 20l2-8 2 8M10 20l2-11 2 11M15 20l2-8 2 8"/>',
    veil: '<path d="M4 4v16M20 4v16"/><path d="M4 6c3 2 5-2 8 0s5-2 8 0M4 12c3 2 5-2 8 0s5-2 8 0M4 18c3 2 5-2 8 0s5-2 8 0"/>'
  };

  window.GLYPHS = G;
  window.icon = function (name, cls) {
    const body = G[name] || G.shield;
    return '<svg class="ic ' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + '</svg>';
  };

  /* Emblema de leyenda: placa angular con el glifo de su definitiva. */
  window.emblem = function (legend, size) {
    const s = size || 64;
    const body = G[legend.glyph] || G.shield;
    return '<svg class="emblem cls-' + legend.cls + '" width="' + s + '" height="' + s + '" viewBox="0 0 64 64" role="img" aria-label="Emblema de ' + legend.name + '">' +
      '<path class="em-plate" d="M10 2h44l8 8v44l-8 8H10l-8-8V10z"/>' +
      '<path class="em-rim" d="M12 6h40l6 6v40l-6 6H12l-6-6V12z"/>' +
      '<g transform="translate(14 13) scale(1.5)" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + body + '</g>' +
      '</svg>';
  };
})();
