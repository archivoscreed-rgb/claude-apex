/* Fichas de leyendas (parte 1: Alter → Lifeline).
   Kits verificados con las notas de parche hasta Temporada 30 «Marked», Split 2 (14 sep 2026).
   Clases: asalto · escaramuzador · recon · apoyo · control */
window.LEGENDS = (window.LEGENDS || []).concat([
  {
    id: 'alter', name: 'Alter', cls: 'escaramuzador', glyph: 'nexus', threat: 3,
    role: 'Rompedora del Vacío: abre caminos donde no los hay',
    abilities: [
      { type: 'Pasiva', name: 'Gift from the Rift', es: 'Regalo de la Grieta', icon: 'rift',
        desc: 'Puede tomar un objeto de una caja de muerte a distancia: lo marca y lo atrae a través del Vacío sin tener que acercarse.',
        facts: ['Permite recuperar munición o curas en mitad de una pelea sin exponerse.'] },
      { type: 'Táctica', name: 'Void Passage', es: 'Pasaje del Vacío', icon: 'passage',
        desc: 'Crea un portal a través de una superficie (pared, suelo o techo) que conecta con el otro lado. Lo pueden atravesar aliados y enemigos.',
        facts: ['Enfriamiento de 25 s desde la Temporada 29.', 'Rompe la idea de que un edificio tiene «una sola entrada».'] },
      { type: 'Definitiva', name: 'Void Nexus', es: 'Nexo del Vacío', icon: 'nexus',
        desc: 'Coloca un nexo. Sus aliados pueden activarlo desde lejos para regresar al instante a ese punto, intangibles durante el viaje.',
        facts: ['Alcance reducido a 250 m en la Temporada 29.', 'Es su herramienta de escape y de «reset» tras una pelea perdida.'] }
    ],
    weak: [
      'Sus portales son de doble sentido: tú también puedes usarlos o lanzar una granada por ellos.',
      'El Nexo marca un punto de regreso fijo. Si lo localizas, sabes exactamente dónde reaparecerán.',
      'Tras usar la táctica pasa 25 s sin reposicionamiento.',
      'Su kit es de movilidad, no de defensa: sin escape, es un duelo normal.'
    ],
    open: [
      'Su táctica necesita superficies: presiona cuando esté lejos de rocas y edificios.',
      'Si el equipo enemigo retrocede siempre hacia el mismo punto, ese es el Nexo: corta esa ruta.',
      'No persigas a un equipo que acaba de usar el Nexo; aprovecha para curar y saquear.'
    ],
    closed: [
      'Vigila techos y suelos, no solo puertas: el ataque puede llegar desde arriba o abajo.',
      'Elige esquinas sin paredes finas cerca para que no pueda abrir portal a tu espalda.',
      'Si ves un portal abierto, apunta a su salida: quien lo cruza llega con un timing predecible.'
    ],
    nc: {
      steps: [
        'Lanza el Escudo móvil hacia la salida del portal: quien lo cruce aparece de cara a tu escudo.',
        'Coloca a un aliado en ángulo lateral a la salida para crear fuego cruzado.',
        'Guarda una granada para la salida del portal; el portal no se cierra al instante.',
        'Si usan el Nexo para huir, no los persigas: rota y quédate con la mejor posición.'
      ],
      dia: {
        label: 'Contra Alter: escudo móvil apuntando a la salida del portal que atraviesa la pared',
        env: 'closed', rooms: [{ x: 150, y: 40, w: 210, h: 170, doors: [['e', 0.5, 24]] }],
        zones: [['portal', 104, 125, 176, 125]],
        shields: [[206, 125, 180]],
        paths: [['team', [[296, 92], [196, 120]]]],
        units: [['enemy', 76, 104, 'Alter'], ['enemy', 64, 152], ['nc', 248, 128], ['ally', 300, 88], ['ally', 290, 172]],
        steps: [[1, 206, 98], [2, 318, 70]],
        notes: [[20, 30, 'El Pasaje del Vacío atraviesa la pared']]
      }
    },
    quick: { weak: 'Portales de doble sentido; Nexo predecible', open: 'Presiona lejos de superficies', closed: 'Vigila techo y suelo; apunta a la salida', nc: 'Escudo móvil en la salida del portal' }
  },
  {
    id: 'ash', name: 'Ash', cls: 'asalto', glyph: 'breach', threat: 4,
    role: 'Instigadora incisiva: marca, atrapa y entra por la brecha',
    abilities: [
      { type: 'Pasiva', name: 'Marked for Death', es: 'Marcada para morir', icon: 'deathbox',
        desc: 'Ve en el mapa dónde hubo muertes recientes e interroga cajas de muerte para revelar la posición de quienes las causaron. Además tiene un dash corto de fase.',
        facts: ['El dash bajó a 10 s de enfriamiento y ganó velocidad en la Temporada 29.'] },
      { type: 'Táctica', name: 'Arc Snare', es: 'Lazo de arco', icon: 'snare',
        desc: 'Lanza un lazo giratorio que daña y ata a los enemigos cercanos al impacto: no pueden alejarse más allá de su radio mientras dura.',
        facts: ['Atado aún puedes disparar y curarte; solo no puedes salir del círculo.'] },
      { type: 'Definitiva', name: 'Phase Breach', es: 'Brecha de fase', icon: 'breach',
        desc: 'Abre un portal de un solo sentido hacia un punto lejano; ella y su equipo lo atraviesan para atacar o huir.',
        facts: ['El destino es fijo y visible para quien está cerca de la salida.'] }
    ],
    weak: [
      'La Brecha es de un solo sentido y su salida es visible: puedes esperarla allí.',
      'El lazo se esquiva si lo ves venir, y atado sigues pudiendo disparar.',
      'Interrogar cajas tarda unos segundos: si te alejas de las cajas, la información pierde valor.',
      'Tras el dash hay una ventana de unos 10 s sin reposicionamiento.'
    ],
    open: [
      'Escucha la Brecha y mira hacia dónde termina: allí llegará el equipo entero.',
      'Mantén media distancia; el lazo y su agresividad brillan de cerca.',
      'Después de una pelea, muévete: tus cajas le dicen dónde estás.'
    ],
    closed: [
      'En interiores el lazo es muy fuerte: no os amontonéis en una sola habitación.',
      'No te quedes en la salida de la Brecha; dispara desde un ángulo a quien entre.',
      'Ten la escopeta lista: Ash suele entrar tras el dash.'
    ],
    nc: {
      steps: [
        'Si el lazo atrapa a tu aliado derribado, no intentes arrastrarlo fuera: pon el Escudo móvil entre el lazo y el enemigo y revive en el sitio.',
        'Ante una Brecha hacia vosotros, salta con Castle Wall y orienta el muro hacia la salida: llegan en fila contra el lado electrificado.',
        'Guarda el escudo para el momento en que Ash usa el dash; tu equipo castiga los 10 s sin escape.',
        'Tras ganar una pelea, rota: las cajas de muerte le dan tu posición.'
      ],
      dia: {
        label: 'Contra Ash: revive dentro del lazo con escudo y muro hacia la salida de la Brecha de fase',
        env: 'open', rocks: [[60, 40, 40, 28]],
        zones: [['breach', 366, 46, 262, 112], ['snare', 146, 180, 24]],
        walls: [[232, 176, 200, 94, 262, 112]],
        shields: [[172, 162, -35]],
        paths: [['leap', [[70, 120], [190, 140]]]],
        units: [['enemy', 340, 26, 'Ash'], ['enemy', 386, 30], ['nc', 192, 142], ['down', 146, 180], ['ally', 124, 150]],
        steps: [[1, 110, 214], [2, 246, 72]],
        notes: [[20, 236, 'Atado: revive en el sitio, no arrastres']]
      }
    },
    quick: { weak: 'Brecha visible y de un sentido', open: 'Media distancia; vigila la salida de la Brecha', closed: 'No os amontonéis por el lazo', nc: 'Muro electrificado hacia la salida de la Brecha' }
  },
  {
    id: 'axle', name: 'Axle', cls: 'escaramuzador', glyph: 'kick', threat: 3,
    role: 'Piloto de combate: deslizamientos imposibles (nueva en T29)',
    abilities: [
      { type: 'Pasiva', name: 'Drift', es: 'Derrape', icon: 'drift',
        desc: 'Acelera más y tiene más control lateral al deslizarse; en deslizamiento es más rápida que cualquier otra leyenda.',
        facts: ['La Temporada 30 acortó su ventana de deslizamiento extendido.'] },
      { type: 'Táctica', name: 'Nitro Gate', es: 'Puerta nitro', icon: 'gate',
        desc: 'Despliega una puerta: quien la cruza entra en un deslizamiento muy rápido con gran control lateral durante hasta 5 s, mientras no se frene.',
        facts: ['La pueden usar aliados y enemigos.'] },
      { type: 'Definitiva', name: 'Kickstart', es: 'Arranque', icon: 'kick',
        desc: 'Dron buscador que persigue a un enemigo detectado. Si no lo destruyes o esquivas, detona: lanza por los aires a todos en el radio, los revela, los aturde brevemente y hace daño explosivo.',
        facts: ['Desde la T29 el lanzamiento hereda tu velocidad en vez de lanzarte recto hacia arriba.', 'Desde la T30 también puede desestabilizar a los aliados de Axle.'] }
    ],
    weak: [
      'La Puerta nitro también te sirve a ti: úsala para huir o para cerrar distancia.',
      'El dron Kickstart se puede destruir a disparos o esquivar rompiendo línea de visión.',
      'Su deslizamiento es rápido pero lineal: fácil de pre-apuntar.',
      'Desde la T30 su definitiva puede molestar a su propio equipo si se agrupan.'
    ],
    open: [
      'Pre-apunta la línea del deslizamiento; no la persigas en lateral.',
      'Al ver el dron, dispárale de inmediato o pon un obstáculo alto entre tú y él.',
      'Si la puerta queda en tu ruta, úsala para rotar tú.'
    ],
    closed: [
      'Escaleras, esquinas y puertas cortan su derrape: pelea en habitaciones con giros.',
      'Bajo techo el lanzamiento del dron te deja menos expuesto; aun así, no os agrupéis.',
      'Cerrar una puerta obliga a Axle a frenar el deslizamiento.'
    ],
    nc: {
      steps: [
        'Coloca Castle Wall atravesando la línea de entrada de su deslizamiento: el lado electrificado la aturde si trepa.',
        'Lanza el Escudo móvil bajo y adelantado para que tenga que rodearlo y pierda velocidad.',
        'Ante el dron, prioriza destruirlo; si no puedes, sepárate de tus aliados para que no lance a todo el equipo.',
        'No la persigas en abierto: deja que venga hacia tu muro.'
      ],
      dia: {
        label: 'Contra Axle: el muro corta la línea de deslizamiento que sale de la Puerta nitro y el equipo derriba el dron',
        env: 'open', rocks: [[60, 30, 36, 26]],
        zones: [['gate', 300, 130, 180], ['kick', 272, 66]],
        walls: [[204, 88, 204, 172, 262, 130]],
        paths: [['enemy', [[368, 132], [300, 130], [220, 130]]], ['team', [[142, 98], [262, 70]]]],
        units: [['enemy', 374, 134, 'Axle'], ['enemy', 384, 184], ['nc', 162, 140], ['ally', 136, 100], ['ally', 124, 172]],
        steps: [[1, 204, 72], [3, 272, 44]],
        notes: [[396, 238, 'La puerta nitro también te sirve a ti', 'end']]
      }
    },
    quick: { weak: 'Línea de slide predecible; dron destruible', open: 'Pre-apunta el slide; dispara al dron', closed: 'Giros y puertas cortan el derrape', nc: 'Muro atravesando la línea de deslizamiento' }
  },
  {
    id: 'ballistic', name: 'Ballistic', cls: 'asalto', glyph: 'tempest', threat: 3,
    role: 'Pistolero refinado: tres armas y una tempestad',
    abilities: [
      { type: 'Pasiva', name: 'Sling', es: 'Funda', icon: 'sling',
        desc: 'Lleva una tercera arma en una funda y cambia a ella rápidamente. No admite armas de paquete de suministro.',
        facts: ['Durante su definitiva el arma de la funda recibe mejoras al máximo.'] },
      { type: 'Táctica', name: 'Whistler', es: 'Silbadora', icon: 'whistler',
        desc: 'Dispara una bala inteligente que se ancla a un enemigo. Si la víctima dispara mientras está marcada, su arma se sobrecalienta y recibe daño.',
        facts: ['Solo castiga si disparas: si no aprietas el gatillo, no pasa nada.'] },
      { type: 'Definitiva', name: 'Tempest', es: 'Tempestad', icon: 'tempest',
        desc: 'Potencia a su equipo durante un tiempo: más velocidad de movimiento, recarga más rápida y munición infinita.',
        facts: ['Es temporal: el momento de contraatacar es justo cuando termina.'] }
    ],
    weak: [
      'La Silbadora solo castiga si disparas: deja de disparar, cúbrete y recoloca hasta que pase.',
      'La Tempestad tiene duración limitada: aguanta tras cobertura y contraataca al terminar.',
      'No tiene movilidad propia: si lo pillas lejos de cobertura, no puede escapar.'
    ],
    open: [
      'No aceptes duelos durante la Tempestad; rompe la línea de visión y espera.',
      'Si te silba en abierto, deslízate a cobertura sin disparar.',
      'Castiga su falta de movilidad flanqueando por los lados.'
    ],
    closed: [
      'En interiores la recarga rápida y la munición infinita son peligrosas: cierra puertas y oblígale a rodear.',
      'Usa granadas para sacarlo de una habitación en lugar de asomarte.'
    ],
    nc: {
      steps: [
        'Si la Silbadora te marca, es el momento del Escudo móvil: deja de disparar, avanza tras el escudo y recoloca.',
        'Contra la Tempestad, Castle Wall: nueve segmentos absorben gran parte de su munición infinita mientras dura el buff.',
        'Revive a tu aliado detrás del muro durante la Tempestad; no la desafíes de frente.',
        'Cuando el buff termine, contraataca: con Ready To Rumble sales del revive con el arma recargada.'
      ],
      dia: {
        label: 'Contra Ballistic: muro durante la Tempestad, revive detrás y contraataque cuando termina',
        env: 'open', rocks: [[60, 190, 34, 26]],
        walls: [[234, 66, 234, 182, 300, 124]],
        zones: [['mark', 160, 164]],
        paths: [['fire', [[322, 100], [246, 110]]], ['fire', [[332, 150], [246, 146]]], ['drag', [[208, 150], [188, 136]]], ['team', [[176, 180], [250, 206], [318, 166]]]],
        units: [['enemy', 330, 96, 'Ballistic'], ['enemy', 340, 152], ['nc', 196, 108], ['down', 186, 138], ['ally', 160, 164]],
        steps: [[1, 136, 194], [2, 234, 50], [3, 150, 120], [4, 262, 222]],
        notes: [[20, 30, 'Marcado por la Silbadora: no dispares']]
      }
    },
    quick: { weak: 'Sin movilidad; Tempestad temporal', open: 'Rompe línea durante la Tempestad', closed: 'Granadas y puertas cerradas', nc: 'Muro durante el buff, contraataque al terminar' }
  },
  {
    id: 'bangalore', name: 'Bangalore', cls: 'asalto', glyph: 'artillery', threat: 3,
    role: 'Soldado profesional (y hermana de Newcastle)',
    abilities: [
      { type: 'Pasiva', name: 'Double Time', es: 'Doble paso', icon: 'speed',
        desc: 'Cuando le disparan cerca gana un impulso de velocidad al esprintar.',
        facts: ['Cada disparo fallado que le pasa cerca le da velocidad.'] },
      { type: 'Táctica', name: 'Smoke Launcher', es: 'Lanzahumo', icon: 'smoke',
        desc: 'Dispara cartuchos de humo (2 cargas) que crean una cortina que bloquea la visión.',
        facts: ['Desde la T26 el cartucho puede romper puertas, y con mejoras el humo electrocuta enemigos o destruye trampas.'] },
      { type: 'Definitiva', name: 'Rolling Thunder', es: 'Trueno rodante', icon: 'artillery',
        desc: 'Pide un bombardeo que avanza lentamente por una zona; las explosiones dañan y ralentizan.',
        facts: ['Está telegrafiado: marcadores en el suelo y sonido antes de cada explosión.'] }
    ],
    weak: [
      'El humo es de doble sentido: ella tampoco ve sin mira de amenaza digital o una leyenda de rastreo.',
      'El Trueno rodante avanza lento y avisa antes de explotar.',
      'Su pasiva solo se activa si le disparas cerca: no regales disparos fallidos.'
    ],
    open: [
      'No entres al humo: espera en sus bordes; quien sale lo hace desorientado.',
      'Ante el Trueno rodante, muévete en perpendicular a su avance, no hacia atrás.',
      'Dispara solo con tiro claro: cada fallo le da velocidad.'
    ],
    closed: [
      'Humo dentro de una habitación significa ataque inminente: retrocede a un ángulo que domine la puerta.',
      'Su cartucho puede romper puertas: no confíes en una puerta cerrada.'
    ],
    nc: {
      steps: [
        'Si te pilla el Trueno rodante, usa la definitiva para salir saltando hacia un aliado (hasta 75 m), no para atrincherarte dentro.',
        'Coloca Castle Wall en el borde del humo con el lado electrificado hacia él: quien empuja a ciegas trepa y queda aturdido.',
        'Monta fuego cruzado en los dos bordes del humo, no en el centro.',
        'Si juegas con Bangalore: su humo más tu muro crean la fortaleza perfecta para revivir.'
      ],
      dia: {
        label: 'Contra Bangalore: salir del bombardeo saltando y muro electrificado en el borde del humo',
        env: 'open',
        zones: [['bomb', 88, 196, 32], ['smoke', 304, 122, 36]],
        walls: [[240, 72, 240, 172, 300, 122]],
        paths: [['leap', [[88, 196], [196, 128]]], ['team', [[196, 78], [266, 88]]], ['team', [[202, 168], [266, 156]]]],
        units: [['enemy', 300, 112, 'Bangalore'], ['enemy', 322, 150], ['nc', 200, 122], ['ally', 190, 74], ['ally', 196, 170]],
        steps: [[1, 88, 160], [2, 240, 56], [3, 274, 196]],
        notes: [[20, 30, 'Trueno rodante: sal, no te quedes']]
      }
    },
    quick: { weak: 'Humo de doble sentido; Trueno telegrafiado', open: 'Espera en los bordes del humo', closed: 'Humo en la sala = ataque inminente', nc: 'Muro electrificado en el borde del humo' }
  },
  {
    id: 'bloodhound', name: 'Bloodhound', cls: 'recon', glyph: 'cloakdome', threat: 3,
    role: 'Rastreador tecnológico (rework de la Temporada 30)',
    abilities: [
      { type: 'Pasiva', name: 'Tracker', es: 'Rastreador', icon: 'raven',
        desc: 'Ve rastros brillantes de los enemigos, más claros desde la T30. Sus Cuervos blancos vuelan más lejos y se activan con solo mirarlos para guiarle hacia enemigos cercanos.',
        facts: ['Los cuervos ya no necesitan escaneo ni contacto para activarse.'] },
      { type: 'Táctica', name: 'Eye of the Allfather', es: 'Ojo del Padre de Todos', icon: 'eye',
        desc: 'Escaneo en cono que revela enemigos, trampas y pistas. Desde la T30 lanza instantáneas posteriores que mantienen a los enemigos revelados más tiempo.',
        facts: ['El juego te avisa cuando te escanean.'] },
      { type: 'Definitiva', name: "Allfather's Cloak", es: 'Manto del Padre de Todos', icon: 'cloakdome',
        desc: 'Sustituye a Beast of the Hunt. Despliega un dispositivo que camufla a cualquiera que entre en su radio, con más velocidad y visión de amenazas.',
        facts: ['El camuflaje dura hasta 12 s tras salir del área.', 'Recibir daño o disparar lo rompe; desde el Split 2 el daño de la tormenta ya no.', 'Se nota un brillo azul y un sonido cerca de ti.'] }
    ],
    weak: [
      'Te avisan cuando te escanean: es la señal de que viene un ataque.',
      'El camuflaje se rompe con cualquier daño: granadas, fuego de supresión o daño de área.',
      'Para disparar tienen que revelarse: el primer disparo es suyo, el segundo puede ser tuyo.',
      'El dispositivo del Manto marca el área desde la que empujan.'
    ],
    open: [
      'Tras un escaneo, rota lateralmente para que las instantáneas no te fijen.',
      'Escucha el sonido del manto y busca la distorsión azul.',
      'Suprime en arco hacia la zona del dispositivo.'
    ],
    closed: [
      'Camuflados en esquinas son letales: pre-dispara o lanza granada a la entrada.',
      'Cambia de habitación después de cada escaneo.'
    ],
    nc: {
      steps: [
        'Cuando te escaneen, orienta escudo o muro hacia la dirección del escaneo: el ataque llegará por ahí.',
        'Castle Wall electrificado: quien trepa camuflado recibe daño, pierde el camuflaje y queda aturdido.',
        'Lanza granadas a la zona del Manto antes de que salgan.',
        'Revive siempre detrás de algo: la visión de amenazas les muestra a tu aliado derribado.'
      ],
      dia: {
        label: 'Contra Bloodhound: el escaneo delata la dirección del ataque; el muro electrificado rompe el camuflaje',
        env: 'open',
        zones: [['cloak', 322, 120, 40], ['scan', 330, 120, 180, 46, 210]],
        walls: [[222, 74, 222, 170, 280, 120]],
        paths: [['enemy', [[300, 98], [240, 100]]], ['team', [[172, 150], [306, 126]]]],
        units: [['enemy', 312, 110, 'Bloodhound'], ['enemy', 346, 150], ['nc', 182, 118], ['ally', 162, 88], ['ally', 166, 158]],
        steps: [[1, 350, 70], [2, 222, 58], [3, 260, 196]],
        notes: [[20, 236, 'Daño = adiós camuflaje']]
      }
    },
    quick: { weak: 'El daño rompe el camuflaje; escaneo avisado', open: 'Rota tras el escaneo', closed: 'Granada a la entrada', nc: 'Muro electrificado contra camuflados' }
  },
  {
    id: 'catalyst', name: 'Catalyst', cls: 'control', glyph: 'veil', threat: 3,
    role: 'Conjuradora defensiva de ferrofluido',
    abilities: [
      { type: 'Pasiva', name: 'Barricade', es: 'Barricada', icon: 'door',
        desc: 'Refuerza puertas con ferrofluido para que resistan más.',
        facts: ['Hasta 4 puertas desde la T28 (antes 2).'] },
      { type: 'Táctica', name: 'Piercing Spikes', es: 'Púas perforantes', icon: 'spikes',
        desc: 'Lanza un charco de ferrofluido que se convierte en púas cuando entra un enemigo: daño y ralentización.',
        facts: ['Hasta 3 trampas activas; desde la T28 son más grandes, llegan más lejos y se activan antes.'] },
      { type: 'Definitiva', name: 'Dark Veil', es: 'Velo oscuro', icon: 'veil',
        desc: 'Levanta un muro de ferrofluido que ralentiza y ciega parcialmente a los enemigos que lo cruzan. Desde la T28 puede desplegarse en horizontal para sellar pasos y reduce el daño de las balas que lo atraviesan.',
        facts: ['Desde el Split 2 de la T30 sus aliados ya no se ralentizan ni ciegan al cruzarlo.'] }
    ],
    weak: [
      'Es estática: si no peleas en su zona, su kit vale mucho menos.',
      'Las púas se pueden destruir a distancia antes de pisarlas.',
      'Las puertas reforzadas ceden ante daño suficiente y explosivos.',
      'El Velo delata por dónde no quiere que pases.'
    ],
    open: [
      'Sácala del edificio con el ring o con presión de largo alcance.',
      'No cruces el Velo en abierto: es largo pero finito, rodéalo.'
    ],
    closed: [
      'Dispara a las púas antes de entrar y espera a que se rompan.',
      'No pelees a través de puertas reforzadas: busca ventanas o techos, o fuérzala a salir con granadas.',
      'Asedio corto: si en 20-30 s no puedes entrar, rota.'
    ],
    nc: {
      steps: [
        'No asaltes su edificio de frente: planta Castle Wall fuera, delante de la salida que usarán cuando llegue el ring.',
        'Manda el Escudo móvil por delante para destruir sus púas desde cobertura.',
        'Si sellan un paso con el Velo, salta por encima con la definitiva hacia un aliado o un punto alto.',
        'En tu equipo, Catalyst y Newcastle forman una de las mejores defensas: puertas reforzadas y muro.'
      ],
      dia: {
        label: 'Contra Catalyst: no asaltar; muro fuera de la salida y escudo para destruir las púas mientras el ring la obliga a salir',
        env: 'closed', ring: { cx: 430, cy: 125, r: 214 },
        rooms: [{ x: 30, y: 50, w: 150, h: 150, doors: [['e', 0.5, 24]] }],
        zones: [['door', 180, 125], ['spikes', 212, 125, 16]],
        walls: [[284, 84, 284, 166, 220, 125]],
        shields: [[244, 125, 180]],
        paths: [['team', [[318, 96], [220, 120]]]],
        units: [['enemy', 100, 108, 'Catalyst'], ['enemy', 122, 150], ['nc', 322, 126], ['ally', 330, 88], ['ally', 326, 170]],
        steps: [[1, 284, 68], [2, 244, 98]],
        notes: [[396, 238, 'El ring la obliga a salir', 'end']]
      }
    },
    quick: { weak: 'Estática; púas destruibles', open: 'Sácala con el ring', closed: 'Rompe púas; no pelees en sus puertas', nc: 'Muro fuera de la salida, espera al ring' }
  },
  {
    id: 'caustic', name: 'Caustic', cls: 'control', glyph: 'gascloud', threat: 4,
    role: 'Trampero tóxico: convierte un edificio en una trampa',
    abilities: [
      { type: 'Pasiva', name: 'Nox Vision', es: 'Visión Nox', icon: 'noxeye',
        desc: 'Ve resaltados a los enemigos que están dentro de su gas.',
        facts: ['Desde la T26 puede conseguir mejoras adicionales (Field Research).'] },
      { type: 'Táctica', name: 'Nox Gas Trap', es: 'Trampa de gas Nox', icon: 'barrel',
        desc: 'Coloca barriles que liberan gas cuando un enemigo se acerca o les dispara.',
        facts: ['Desde la T26 el gas hace 10–15 de daño por segundo (antes 4–10).'] },
      { type: 'Definitiva', name: 'Nox Gas Grenade', es: 'Granada de gas Nox', icon: 'gascloud',
        desc: 'Lanza una granada que cubre un área grande de gas.',
        facts: ['El gas impide saltar, nubla el HUD y provoca sacudida al apuntar.'] }
    ],
    weak: [
      'Su kit es casi solo de zona: en terreno abierto pierde gran parte de su valor.',
      'Los barriles se pueden activar desde lejos; espera a que se disipe el gas y entra después.',
      'El gas no para las balas: puedes dispararle desde fuera de la nube.',
      'Cuando el ring le obliga a salir, queda expuesto.'
    ],
    open: [
      'Pelea a media o larga distancia: sus barriles no te alcanzan.',
      'Si lanza la granada, sal por el lado más corto de la nube.'
    ],
    closed: [
      'No entres a una casa de Caustic sin limpiar barriles: dispárales desde la puerta y espera.',
      'Usa ventanas y techos; evita escaleras estrechas.',
      'Si el ring se acerca, espera fuera, en su salida.'
    ],
    nc: {
      steps: [
        'Ni el Escudo móvil ni el muro paran el gas: no te atrinchires dentro de su nube.',
        'Coloca Castle Wall frente a la salida del edificio, lado electrificado hacia ellos: cuando el ring les obligue a salir, salen contra tu muro.',
        'Acerca el Escudo móvil a la ventana para destruir barriles sin recibir daño.',
        'Revive fuera del gas: arrastra al aliado (la penalización de movimiento al revivir se reduce un 75%) hasta salir de la nube.'
      ],
      dia: {
        label: 'Contra Caustic: destruir barriles desde lejos con el escudo y esperar con el muro en la salida',
        env: 'closed', ring: { cx: 440, cy: 125, r: 222 },
        rooms: [{ x: 30, y: 40, w: 160, h: 170, doors: [['e', 0.5, 24], ['n', 0.6, 20]] }],
        zones: [['gas', 106, 125, 60], ['barrel', 202, 125], ['barrel', 126, 30]],
        walls: [[292, 82, 292, 168, 232, 125]],
        shields: [[234, 108, 180]],
        paths: [['team', [[324, 96], [212, 122]]]],
        units: [['enemy', 100, 108, 'Caustic'], ['enemy', 90, 150], ['nc', 332, 126], ['ally', 326, 90], ['ally', 330, 170]],
        steps: [[2, 292, 66], [3, 234, 82]],
        notes: [[396, 238, 'El ring los saca del gas', 'end']]
      }
    },
    quick: { weak: 'Lento; débil en abierto', open: 'Media/larga distancia', closed: 'Limpia barriles desde la puerta', nc: 'Muro en la salida; revive fuera del gas' }
  },
  {
    id: 'conduit', name: 'Conduit', cls: 'apoyo', glyph: 'jammer', threat: 2,
    role: 'Sanadora de escudos',
    abilities: [
      { type: 'Pasiva', name: "Savior's Speed", es: 'Velocidad del salvador', icon: 'run',
        desc: 'Gana velocidad al correr hacia aliados que están lejos de ella.',
        facts: ['Si la aíslas de su equipo pierde parte de su valor.'] },
      { type: 'Táctica', name: 'Radiant Transfer', es: 'Transferencia radiante', icon: 'transfer',
        desc: 'Da a un aliado (o a sí misma) escudos temporales que se regeneran.',
        facts: ['Desde la T29 tiene 2 cargas de base, con una regeneración más corta (6 s).'] },
      { type: 'Definitiva', name: 'Energy Barricade', es: 'Barricada energética', icon: 'jammer',
        desc: 'Lanza una línea de dispositivos que dañan y ralentizan a los enemigos que pasan cerca, bloqueando una zona.',
        facts: ['Los dispositivos se pueden destruir a disparos.'] }
    ],
    weak: [
      'Los escudos temporales caducan: presiona en ráfaga, no con disparos sueltos.',
      'Los dispositivos de la barricada son destruibles.',
      'No tiene herramientas de escape propias.'
    ],
    open: [
      'Prioriza a Conduit: sin ella el equipo pierde su capacidad de aguante.',
      'Destruye la barricada desde fuera de su radio.'
    ],
    closed: [
      'Una barricada en la puerta sella la habitación: destrúyela o busca otra entrada.',
      'Ráfaga corta con escopeta para negar la regeneración.'
    ],
    nc: {
      steps: [
        'Rompe la barricada desde detrás del Escudo móvil.',
        'Concentra la ráfaga en el aliado que acaba de recibir escudo temporal: si no lo rompes rápido, se regenera.',
        'Corta la línea entre Conduit y su aliado con Castle Wall para dificultar nuevas transferencias.',
        'En tu equipo: Conduit y Newcastle hacen el revive más seguro del juego (escudo temporal más Ultimate Savior).'
      ],
      dia: {
        label: 'Contra Conduit: el escudo cubre mientras se destruye la barricada y el equipo revienta al objetivo con escudo temporal',
        env: 'open', rocks: [[70, 40, 34, 26]],
        zones: [['jammers', 256, 60, 256, 190], ['heal', 304, 170, 15]],
        shields: [[232, 124, 0]],
        paths: [['team', [[200, 110], [250, 96]]], ['team', [[192, 162], [294, 170]]]],
        units: [['enemy', 344, 80, 'Conduit'], ['enemy', 304, 170], ['nc', 192, 120], ['ally', 172, 88], ['ally', 182, 166]],
        steps: [[1, 232, 96], [2, 304, 204]],
        notes: [[20, 236, 'Escudo temporal: ráfaga, no goteo']]
      }
    },
    quick: { weak: 'Escudos temporales caducan; barricada destruible', open: 'Prioriza a Conduit', closed: 'Ráfaga corta, rompe la barricada', nc: 'Escudo móvil y rompe los dispositivos' }
  },
  {
    id: 'crypto', name: 'Crypto', cls: 'recon', glyph: 'emp', threat: 4,
    role: 'Experto en vigilancia',
    abilities: [
      { type: 'Pasiva', name: 'Neurolink', es: 'Neuroenlace', icon: 'network',
        desc: 'Los enemigos que detecta su dron en un radio cercano quedan revelados para todo su equipo.',
        facts: ['Desde enero de 2026 se camufla mientras controla el dron (antes era una mejora).'] },
      { type: 'Táctica', name: 'Surveillance Drone', es: 'Dron de vigilancia', icon: 'drone',
        desc: 'Dron controlable para explorar, abrir puertas, recoger estandartes y usar balizas.',
        facts: ['Si destruyes el dron, su táctica entra en un enfriamiento largo.'] },
      { type: 'Definitiva', name: 'Drone EMP', es: 'PEM del dron', icon: 'emp',
        desc: 'Tras unos segundos de carga, el dron suelta una explosión que daña escudos, ralentiza y desactiva trampas y despliegues.',
        facts: ['La carga es audible: hay tiempo para salir del radio.'] }
    ],
    weak: [
      'Destruir el dron le deja sin información durante bastante tiempo.',
      'El PEM avisa con su carga: sal del radio antes de que explote.',
      'Mientras pilota está quieto (aunque camuflado), cerca de donde salió el dron.'
    ],
    open: [
      'Dispara al dron en cuanto lo veas.',
      'Si el dron te ha visto, cambia de ubicación.'
    ],
    closed: [
      'El PEM desactiva trampas: no confíes en tus despliegues dentro de su radio.',
      'Escucha el zumbido del dron en interiores.'
    ],
    nc: {
      steps: [
        'Sal del radio del PEM en cuanto oigas la carga; no plantes el escudo dentro del radio y vuelve a lanzarlo tras la explosión.',
        'Dispara al dron: sin información no sabrán dónde vas a poner el muro.',
        'Guarda Castle Wall para después del PEM: el muro nuevo llega justo cuando ellos empujan.',
        'Revive cuando el PEM ya se haya gastado.'
      ],
      dia: {
        label: 'Contra Crypto: salir del radio del PEM, derribar el dron y levantar el muro después de la explosión',
        env: 'open',
        zones: [['emp', 186, 120, 56], ['drone', 186, 120]],
        walls: [[262, 80, 262, 176, 320, 128]],
        paths: [['move', [[150, 118], [104, 112]]], ['team', [[110, 150], [178, 124]]]],
        units: [['enemy', 356, 196, 'Crypto'], ['enemy', 338, 60], ['nc', 96, 110], ['ally', 92, 152], ['ally', 104, 70]],
        steps: [[1, 186, 50], [2, 140, 168], [3, 262, 62]],
        notes: [[396, 238, 'El muro, después del PEM', 'end']]
      }
    },
    quick: { weak: 'Dron destruible; PEM con carga audible', open: 'Dispara al dron siempre', closed: 'Sin trampas dentro del radio del PEM', nc: 'Muro después del PEM' }
  },
  {
    id: 'fuse', name: 'Fuse', cls: 'asalto', glyph: 'motherlode', threat: 5,
    role: 'Experto en explosivos: el peor enemigo de un búnker',
    abilities: [
      { type: 'Pasiva', name: 'Grenadier', es: 'Granadero', icon: 'grenadier',
        desc: 'Lleva granadas extra por espacio y las lanza más lejos y más rápido. El daño explosivo no le ralentiza.',
        facts: ['Desde el Split 2 de la T30 tiene el salto cohete de base: dispara su táctica al suelo para impulsarse.'] },
      { type: 'Táctica', name: 'Knuckle Cluster', es: 'Racimo de nudillos', icon: 'knuckle',
        desc: 'Lanza una bomba de racimo que suelta una serie de pequeñas explosiones.',
        facts: ['Las explosiones cubren un área un 50% mayor desde el Split 2 de la T30.'] },
      { type: 'Definitiva', name: 'The Motherlode', es: 'La Madre de las bombas', icon: 'motherlode',
        desc: 'Bombardeo que, tras el rework de la T28, acribilla la zona objetivo con bombas de racimo.',
        facts: ['Split 2 de la T30: se lanza antes, apunta mejor a corta distancia y las minibombas explotan más rápido.'] }
    ],
    weak: [
      'Sus explosivos tienen retardo: si te mueves al oírlos, evitas la mayor parte del daño.',
      'Tras gastar granadas, táctica y definitiva, su kit queda vacío durante un rato.',
      'El salto cohete le deja en el aire, expuesto.'
    ],
    open: [
      'Movimiento lateral constante; no te quedes detrás de una sola roca.',
      'Castiga el salto cohete: es un blanco aéreo predecible.'
    ],
    closed: [
      'Es letal en habitaciones pequeñas: no aceptes peleas con varias granadas en el aire.',
      'Separa a tu equipo en habitaciones distintas.'
    ],
    nc: {
      steps: [
        'No te quedes detrás del muro estático: contra Fuse, Castle Wall sirve para avanzar o cruzar, no para esperar.',
        'Mantén el Escudo móvil en movimiento: los explosivos de área castigan la cobertura fija.',
        'Revive arrastrando fuera de la zona de explosión; desde enero de 2026 la penalización de movimiento al revivir se reduce un 75%.',
        'Presiona cuando haya gastado racimo y definitiva: es la ventana sin sus herramientas grandes.'
      ],
      dia: {
        label: 'Contra Fuse: abandonar la cobertura bombardeada y usar el salto para avanzar con el muro',
        env: 'open', rocks: [[94, 110, 30, 30]],
        zones: [['fire', 108, 125, 42]],
        walls: [[244, 80, 244, 172, 300, 126]],
        shields: [[262, 196, -20]],
        paths: [['leap', [[108, 125], [222, 128]]], ['move', [[150, 178], [244, 196]]]],
        units: [['enemy', 340, 108, 'Fuse'], ['enemy', 352, 158], ['nc', 224, 130], ['ally', 204, 96], ['ally', 150, 180]],
        steps: [[1, 176, 62], [2, 286, 216]],
        notes: [[20, 236, 'Cobertura fija = blanco de Fuse']]
      }
    },
    quick: { weak: 'Retardo en explosivos; kit vacío tras gastarlo', open: 'Movimiento lateral constante', closed: 'Separa al equipo en salas', nc: 'Muro para avanzar, no para esperar' }
  },
  {
    id: 'gibraltar', name: 'Gibraltar', cls: 'apoyo', glyph: 'dome', threat: 3,
    role: 'Fortaleza escudada',
    abilities: [
      { type: 'Pasiva', name: 'Gun Shield', es: 'Escudo de arma', icon: 'shield',
        desc: 'Al apuntar despliega un escudo frente a él. Desde el Split 2 de la T28 también tiene Momentum Boost: tras esprintar unos segundos gana un impulso de velocidad.',
        facts: ['Su golpe cuerpo a cuerpo hace el doble de daño a las mallas Hardlight.'] },
      { type: 'Táctica', name: 'Dome of Protection', es: 'Domo de protección', icon: 'dome',
        desc: 'Cúpula que bloquea balas en ambos sentidos durante unos segundos. Revivir dentro es más rápido.',
        facts: ['Enfriamiento de 13 s desde el Split 2 de la T28 (antes 17 s).'] },
      { type: 'Definitiva', name: 'Defensive Bombardment', es: 'Bombardeo defensivo', icon: 'mortar',
        desc: 'Lanza una granada de humo que marca la zona de un bombardeo de mortero.',
        facts: ['Radio un 20% mayor desde el Split 2 de la T28.'] }
    ],
    weak: [
      'El domo bloquea en ambos sentidos: entra y pelea dentro, de cerca.',
      'Una granada dentro del domo lo convierte en trampa.',
      'El bombardeo está marcado por humo: hay tiempo para salir.',
      'Hitbox grande.'
    ],
    open: [
      'Un domo en abierto es temporal: rodéalo y espera a que caiga.',
      'Dispara desde ángulos laterales para esquivar su escudo de arma.'
    ],
    closed: [
      'Domo en una habitación pequeña: lanza granadas dentro.',
      'Entra con escopeta cuando el domo esté a punto de caer.'
    ],
    nc: {
      steps: [
        'No ganes el duelo de coberturas esperando: Escudo móvil delante y entrad al domo con escopetas.',
        'Ante el bombardeo, sal saltando con la definitiva hacia un aliado fuera de la zona.',
        'Usa Castle Wall para cortarles la retirada cuando el domo caiga.',
        'Tu muro corta la línea de su escudo de arma y le obliga a rodear.'
      ],
      dia: {
        label: 'Contra Gibraltar: el escudo móvil abre paso y el equipo entra al domo a corta distancia',
        env: 'open',
        zones: [['dome', 292, 122, 44], ['bomb', 92, 56, 30]],
        shields: [[236, 124, 0]],
        paths: [['move', [[180, 100], [252, 108]]], ['move', [[178, 160], [256, 140]]]],
        units: [['enemy', 284, 112, 'Gibraltar'], ['enemy', 308, 148], ['nc', 186, 130], ['ally', 170, 98], ['ally', 172, 164]],
        steps: [[1, 236, 98], [2, 92, 100]],
        notes: [[20, 236, 'Bombardeo marcado con humo: sal saltando']]
      }
    },
    quick: { weak: 'Domo de doble sentido; bombardeo avisado', open: 'Rodea el domo y espera', closed: 'Granada dentro del domo', nc: 'Escudo delante y entrad al domo' }
  },
  {
    id: 'horizon', name: 'Horizon', cls: 'escaramuzador', glyph: 'blackhole', threat: 4,
    role: 'Manipuladora gravitacional',
    abilities: [
      { type: 'Pasiva', name: 'Spacewalk', es: 'Paseo espacial', icon: 'spacewalk',
        desc: 'Más control aéreo y sin aturdimiento al aterrizar tras caídas largas. Si aterriza agachada, entra directamente en deslizamiento.',
        facts: ['Desde la T27 puede caer rápido agachándose en el aire.'] },
      { type: 'Táctica', name: 'Gravity Lift', es: 'Elevador gravitacional', icon: 'lift',
        desc: 'Crea una columna que eleva verticalmente a quien entra; puede salir planeando.',
        facts: ['T27: menos enfriamiento, subida más rápida y recupera cargas al derribar.'] },
      { type: 'Definitiva', name: 'Black Hole', es: 'Agujero negro', icon: 'blackhole',
        desc: 'Lanza el dispositivo N.E.W.T., que crea un agujero negro que atrae a los enemigos hacia su centro.',
        facts: ['Tiene más vida desde la T27, pero se puede destruir.'] }
    ],
    weak: [
      'En el elevador sube en línea recta: es un blanco fácil en el punto más alto.',
      'El N.E.W.T. se puede destruir: dispárale primero.',
      'El agujero negro atrae pero no inmoviliza: puedes moverte y disparar.'
    ],
    open: [
      'No uses su elevador; castiga la subida.',
      'Si te atrapa el agujero negro, muévete hacia fuera mientras disparas al dispositivo.'
    ],
    closed: [
      'Bajo techos bajos el elevador apenas sirve: pelea en interiores con poca altura.',
      'Un agujero negro en un pasillo es mortal: no os agrupéis.'
    ],
    nc: {
      steps: [
        'El agujero negro te saca de detrás del escudo: si te atrapa, dispara al N.E.W.T. mientras te alejas.',
        'Si tienes la definitiva, salta hacia un aliado lejano (hasta 75 m) para salir del radio.',
        'Castiga el elevador: escudo bajo y dispara al que sube.',
        'No agrupes al equipo detrás del mismo muro si Horizon tiene la definitiva lista.'
      ],
      dia: {
        label: 'Contra Horizon: destruir el N.E.W.T. y salir del radio saltando hacia un aliado',
        env: 'open',
        zones: [['bh', 220, 120, 56], ['lift', 330, 70]],
        paths: [['team', [[72, 196], [212, 126]]], ['leap', [[204, 136], [86, 200]]]],
        units: [['enemy', 340, 100, 'Horizon'], ['enemy', 356, 160], ['nc', 200, 140], ['ally', 66, 200]],
        steps: [[1, 220, 54], [2, 130, 132], [3, 330, 44]],
        notes: [[20, 30, 'El agujero negro atrae, no inmoviliza']]
      }
    },
    quick: { weak: 'N.E.W.T. destruible; elevador predecible', open: 'Castiga la subida del elevador', closed: 'No os agrupéis en pasillos', nc: 'Dispara al N.E.W.T. o sal saltando' }
  },
  {
    id: 'lifeline', name: 'Lifeline', cls: 'apoyo', glyph: 'halo', threat: 2,
    role: 'Médica de combate',
    abilities: [
      { type: 'Pasiva', name: 'Combat Revive', es: 'Reanimación de combate', icon: 'revive',
        desc: 'D.O.C. revive automáticamente a sus aliados (hasta 2 a la vez) y además los cura con el tiempo. Con Combat Glide puede planear hasta 4 s manteniendo el salto en el aire.',
        facts: ['Mientras D.O.C. revive, Lifeline puede seguir disparando.'] },
      { type: 'Táctica', name: 'D.O.C. Heal Drone', es: 'Dron de curación', icon: 'healdrone',
        desc: 'D.O.C. cura con el tiempo a los aliados cercanos mientras no reciban daño.',
        facts: ['Radio de unos 6 m, alrededor de 8 de vida por segundo.'] },
      { type: 'Definitiva', name: 'D.O.C. HALO', es: 'HALO', icon: 'halo',
        desc: 'D.O.C. crea un escudo de 360° que bloquea el daño entrante. Dentro, los objetos de curación se usan un 50% más rápido.',
        facts: ['El efecto de curación rápida vale para cualquiera dentro, enemigos incluidos.'] }
    ],
    weak: [
      'Dentro del HALO tú también te curas más rápido.',
      'Los revives de D.O.C. dejan al aliado expuesto: presiona durante el revive.',
      'El dron solo cura si no reciben daño: la presión constante lo anula.'
    ],
    open: [
      'Presión sostenida a distancia para negar la curación del dron.',
      'Mientras planea, su trayectoria es predecible.'
    ],
    closed: [
      'HALO en una habitación pequeña: entra con escopeta.',
      'Prioriza a los dos revividos: salen con poca vida.'
    ],
    nc: {
      steps: [
        'Si D.O.C. revive a dos enemigos a la vez, empuja ya: Escudo móvil delante, son dos objetivos con poca vida.',
        'Entra al HALO: tu equipo también se cura más rápido dentro.',
        'Mantén presión de daño para que su dron no cure.',
        'Gana quien castiga primero el revive del otro: tú revives moviéndote y protegido, ella revive a distancia.'
      ],
      dia: {
        label: 'Contra Lifeline: empujar con el escudo mientras D.O.C. revive y pelear dentro del HALO',
        env: 'open',
        zones: [['halo', 292, 125, 44], ['drone', 292, 134]],
        shields: [[240, 125, 0]],
        paths: [['move', [[190, 100], [262, 108]]], ['move', [[190, 160], [264, 142]]]],
        units: [['enemy', 296, 100, 'Lifeline'], ['edown', 314, 152], ['edown', 272, 152], ['nc', 200, 128], ['ally', 180, 98], ['ally', 186, 162]],
        steps: [[1, 240, 98], [2, 292, 72]],
        notes: [[20, 236, 'Dos revividos = dos objetivos con poca vida']]
      }
    },
    quick: { weak: 'HALO también te cura a ti; revives expuestos', open: 'Presión constante', closed: 'Escopeta dentro del HALO', nc: 'Empuja con escudo durante el revive de D.O.C.' }
  }
]);
