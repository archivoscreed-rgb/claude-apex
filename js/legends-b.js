/* Fichas de leyendas (parte 2: Loba → Wraith). */
window.LEGENDS = (window.LEGENDS || []).concat([
  {
    id: 'loba', name: 'Loba', cls: 'apoyo', glyph: 'bracelet', threat: 2,
    role: 'Ladrona translocadora',
    abilities: [
      { type: 'Pasiva', name: 'Eye for Quality', es: 'Ojo de experta', icon: 'loot',
        desc: 'Ve el botín épico y legendario cercano a través de las paredes.',
        facts: ['Su equipo suele estar mejor equipado a mitad de partida.'] },
      { type: 'Táctica', name: "Burglar's Best Friend", es: 'El mejor amigo del ladrón', icon: 'bracelet',
        desc: 'Lanza su brazalete y se teletransporta al punto donde aterriza.',
        facts: ['T30: se activa antes, vuela un 30% más rápido y llega un 15% más lejos.'] },
      { type: 'Definitiva', name: 'Black Market Boutique', es: 'Mercado negro', icon: 'market',
        desc: 'Coloca un dispositivo que permite tomar a distancia el botín cercano.',
        facts: ['Enfriamiento de 120 s desde la T30 (antes 150 s).', 'Los enemigos también pueden usarlo.'] }
    ],
    weak: [
      'El brazalete se ve y se oye: puedes predecir dónde aterrizará.',
      'Su kit no tiene daño ni defensa directa.',
      'Su Mercado negro también lo puedes usar tú.'
    ],
    open: [
      'Sigue la trayectoria del brazalete y pre-apunta el aterrizaje.',
      'Castiga su llegada: aparece sola, antes que su equipo.'
    ],
    closed: [
      'El brazalete rebota en techos y paredes: espera que entre por ventanas o puertas.',
      'Su teletransporte no atraviesa paredes: controla los huecos.'
    ],
    nc: {
      steps: [
        'Pre-apunta el punto de aterrizaje del brazalete y gira tu escudo hacia esa zona.',
        'Castle Wall bloquea la trayectoria del brazalete: le obliga a rodearlo.',
        'Si dejan el Mercado negro cerca, úsalo para tu equipo.',
        'No gastes la definitiva en Loba sola: espera a que llegue su equipo.'
      ],
      dia: {
        label: 'Contra Loba: seguir el brazalete y pre-apuntar el aterrizaje con el escudo móvil',
        env: 'open', rocks: [[60, 40, 34, 26]],
        zones: [['mark', 252, 190]],
        shields: [[222, 168, 40]],
        paths: [['enemy', [[346, 50], [304, 120], [258, 182]]], ['team', [[178, 170], [242, 188]]]],
        units: [['enemy', 364, 46, 'Loba'], ['enemy', 380, 84], ['nc', 182, 132], ['ally', 162, 100], ['ally', 170, 168]],
        steps: [[1, 278, 206]],
        notes: [[20, 236, 'Mercado negro: tú también puedes usarlo']]
      }
    },
    quick: { weak: 'Brazalete visible y audible', open: 'Pre-apunta el aterrizaje', closed: 'Controla huecos y ventanas', nc: 'Escudo hacia el aterrizaje del brazalete' }
  },
  {
    id: 'maggie', name: 'Mad Maggie', cls: 'asalto', glyph: 'ball', threat: 4,
    role: 'Señora de la guerra rebelde: la anti-cobertura',
    abilities: [
      { type: 'Pasiva', name: "Warlord's Ire", es: 'Ira de la señora de la guerra', icon: 'warlord',
        desc: 'Los enemigos a los que daña quedan resaltados brevemente. Se mueve más rápido con escopetas.',
        facts: ['Brilla a corta distancia con escopeta.'] },
      { type: 'Táctica', name: 'Riot Drill', es: 'Taladro antidisturbios', icon: 'drill',
        desc: 'Lanza un taladro que se adhiere a una superficie y escupe fuego por el otro lado: quema a quien se esconde detrás.',
        facts: ['Diseñado para sacarte de detrás de la cobertura.'] },
      { type: 'Definitiva', name: 'Wrecking Ball', es: 'Bola de demolición', icon: 'ball',
        desc: 'Lanza una bola rodante que suelta placas de velocidad para su equipo y explota cerca de enemigos, dañándolos y ralentizándolos.',
        facts: ['Se ve venir desde lejos.'] }
    ],
    weak: [
      'El taladro quema un área pequeña: muévete y sales del fuego.',
      'La bola se ve venir y se puede esquivar.',
      'A media y larga distancia pierde su ventaja de escopeta.'
    ],
    open: [
      'Pelea a media distancia: su velocidad extra es con escopeta.',
      'La bola en abierto se ve venir: apártate de su ruta.'
    ],
    closed: [
      'El taladro hace imposible quedarse detrás de una puerta o pared: cambia de habitación.',
      'Sus placas de velocidad le dan una entrada rápida: espérala con escopeta.'
    ],
    nc: {
      steps: [
        'Maggie es tu anti-escudo: cuando oigas el taladro, cambia de cobertura en lugar de aguantar.',
        'Usa el Escudo móvil en movimiento para reposicionarte sin perder protección.',
        'Levanta Castle Wall en el último momento, no al principio de la pelea.',
        'Contra la bola, sal de su ruta o salta con la definitiva fuera del área.'
      ],
      dia: {
        label: 'Contra Mad Maggie: abandonar la cobertura con taladro y moverse con el escudo; esquivar la bola',
        env: 'open', rocks: [[180, 96, 30, 54], [92, 150, 28, 34]],
        zones: [['drill', 210, 123, 180], ['ball', 292, 192]],
        shields: [[158, 182, -15]],
        paths: [['move', [[168, 124], [134, 164]]], ['enemy', [[344, 152], [296, 188], [234, 206]]]],
        units: [['enemy', 342, 108, 'Maggie'], ['enemy', 354, 156], ['nc', 128, 170], ['ally', 150, 86]],
        steps: [[1, 214, 84], [2, 128, 206], [4, 300, 222]],
        notes: [[20, 30, 'Oyes el taladro: cambia de cobertura']]
      }
    },
    quick: { weak: 'Taladro de área pequeña; bola visible', open: 'Media distancia', closed: 'Cambia de sala al oír el taladro', nc: 'Escudo en movimiento; muro tarde' }
  },
  {
    id: 'mirage', name: 'Mirage', cls: 'apoyo', glyph: 'party', threat: 2,
    role: 'Embaucador holográfico',
    abilities: [
      { type: 'Pasiva', name: 'Now You See Me...', es: 'Ahora me ves...', icon: 'cloak',
        desc: 'Se camufla mientras revive a un aliado o usa una baliza de reaparición.',
        facts: ['El aliado derribado sigue siendo visible aunque Mirage no lo sea.'] },
      { type: 'Táctica', name: 'Psyche Out', es: 'Engaño mental', icon: 'decoy',
        desc: 'Despliega un señuelo holográfico controlable que imita sus acciones.',
        facts: ['El señuelo tiene 45 de vida; quien le dispara queda marcado unos segundos.'] },
      { type: 'Definitiva', name: 'Life of the Party', es: 'Alma de la fiesta', icon: 'party',
        desc: 'Despliega cinco señuelos que imitan sus movimientos; él gana velocidad y un segundo de invisibilidad.',
        facts: ['Cada señuelo tiene 45 de vida.'] }
    ],
    weak: [
      'Los señuelos caen con poco daño y no hacen daño real.',
      'Disparar a un señuelo te marca: confirma antes de disparar.',
      'El aliado que revive camuflado sigue en el suelo y se le puede disparar.'
    ],
    open: [
      'Fíjate en quién dispara de verdad: los señuelos no causan daño.',
      'Cuenta enemigos: si aparecen cinco a la vez, es su definitiva.'
    ],
    closed: [
      'En interiores, prioriza la puerta por la que entra el ruido real de disparos.',
      'Dispara al derribado si ves un revive camuflado.'
    ],
    nc: {
      steps: [
        'Gira el Escudo móvil hacia el revive camuflado y dispara al aliado derribado: Mirage no puede ocultarlo.',
        'No gastes Castle Wall contra señuelos: espera a ver daño real.',
        'Tras su definitiva, busca al Mirage que sí dispara.',
        'Mantén tu revive tras cobertura: los señuelos sirven para distraerte mientras atacan por otro lado.'
      ],
      dia: {
        label: 'Contra Mirage: ignorar los señuelos y disparar al aliado que revive camuflado',
        env: 'open', rocks: [[60, 190, 34, 26]],
        zones: [['cloak', 302, 152, 20]],
        shields: [[232, 146, 10]],
        paths: [['team', [[180, 166], [294, 154]]]],
        units: [['enemy', 248, 60], ['enemy', 290, 70], ['enemy', 332, 80], ['edown', 302, 156], ['nc', 186, 130], ['ally', 166, 98], ['ally', 176, 168]],
        steps: [[1, 302, 120], [2, 222, 52]],
        notes: [[300, 46, 'tres señuelos', 'middle'], [20, 236, 'Daño real primero; señuelos después']]
      }
    },
    quick: { weak: 'Señuelos sin daño real', open: 'Busca quién dispara de verdad', closed: 'Dispara al derribado', nc: 'Escudo y fuego al revive camuflado' }
  },
  {
    id: 'newcastle', name: 'Newcastle', cls: 'apoyo', glyph: 'castle', threat: 3,
    role: 'Defensor heroico: tu leyenda (y así se le vence)',
    abilities: [
      { type: 'Pasiva', name: 'Retrieve the Wounded', es: 'Rescatar al herido', icon: 'drag',
        desc: 'Arrastra a los aliados derribados mientras los revive, protegido por un escudo de reanimación.',
        facts: ['La vida del escudo de reanimación depende del nivel de su escudo de derribo.', 'Desde enero de 2026 la penalización de movimiento al revivir se reduce un 75% de base.'] },
      { type: 'Táctica', name: 'Mobile Shield', es: 'Escudo móvil', icon: 'mobileshield',
        desc: 'Lanza un dron que proyecta un escudo de energía que se mueve hacia donde apunta.',
        facts: ['Dos mitades (superior e inferior) de 500 de vida cada una.', 'Velocidad 250 de base desde enero de 2026.'] },
      { type: 'Definitiva', name: 'Castle Wall', es: 'Muro del castillo', icon: 'castle',
        desc: 'Salta hacia un aliado o una zona y aterriza levantando un muro fortificado con el lado exterior electrificado.',
        facts: ['35 m a un punto; 75 m si apunta a un aliado o a su caja de muerte.', 'Trepar el lado electrificado aturde y hace 20 de daño.'] }
    ],
    weak: [
      'Su Escudo móvil bloquea balas en ambos sentidos: él tampoco dispara a través.',
      'El salto de la definitiva es visible y lento: es un blanco fácil en el aire.',
      'El lado electrificado es solo el exterior: rodea el muro por los extremos.',
      'El revive con arrastre se interrumpe con daño de área detrás del escudo.'
    ],
    open: [
      'Dispárale durante el salto y en el aterrizaje.',
      'Flanquea su escudo: cubre un frente estrecho.'
    ],
    closed: [
      'En pasillos su escudo es fuerte: usa granadas que caigan detrás.',
      'Ataca por una segunda entrada mientras su escudo mira a la primera.'
    ],
    nc: {
      steps: [
        'Duelo de muros: el primero que levanta el muro revela su posición. Deja que él use el suyo primero.',
        'Dispara durante su salto: está en el aire sin cobertura.',
        'Rodea su muro por los extremos; el electrificado mira hacia ti, los laterales no.',
        'Rompe la mitad superior de su escudo y castiga cuando se asome por arriba.'
      ],
      dia: {
        label: 'Contra otro Newcastle: disparar durante su salto y rodear su muro por los extremos',
        env: 'open', rocks: [[60, 40, 34, 26]],
        walls: [[282, 80, 282, 170, 220, 125]],
        paths: [['leap', [[372, 40], [304, 118]]], ['team', [[184, 110], [298, 116]]], ['move', [[192, 172], [262, 212], [318, 190]]]],
        units: [['enemy', 310, 126, 'Rival'], ['enemy', 334, 156], ['nc', 182, 126], ['ally', 172, 92], ['ally', 188, 170]],
        steps: [[2, 338, 58], [3, 262, 230]],
        notes: [[20, 236, 'Su lado electrificado mira hacia ti']]
      }
    },
    quick: { weak: 'Salto visible; escudo de frente estrecho', open: 'Dispara en el salto', closed: 'Segunda entrada y granadas', nc: 'Deja que levante el muro primero' }
  },
  {
    id: 'octane', name: 'Octane', cls: 'escaramuzador', glyph: 'pad', threat: 3,
    role: 'Adicto a la adrenalina',
    abilities: [
      { type: 'Pasiva', name: 'Swift Mend', es: 'Curación rápida', icon: 'mend',
        desc: 'Regenera vida automáticamente con el tiempo.',
        facts: ['Desde enero de 2026: 3 de vida por segundo de base, hasta 9 con poca vida.'] },
      { type: 'Táctica', name: 'Stim', es: 'Estimulante', icon: 'stim',
        desc: 'Gana mucha velocidad durante unos segundos a cambio de vida. Con Stim Surge, al reactivarlo durante el efecto obtiene Fortificado y sigue curándose aunque reciba daño durante 6 s, sin coste de vida.',
        facts: ['Stim Surge llegó en enero de 2026 y se ajustó a la baja en febrero de 2026.'] },
      { type: 'Definitiva', name: 'Launch Pad', es: 'Plataforma de salto', icon: 'pad',
        desc: 'Despliega una plataforma que lanza por los aires a cualquiera que la pise.',
        facts: ['Puede almacenar 2 plataformas; doble salto y control aéreo de base desde enero de 2026.'] }
    ],
    weak: [
      'El Stim cuesta vida: tras usarlo suele estar más bajo.',
      'En el aire tras la plataforma su trayectoria es predecible.',
      'La plataforma también la puedes usar tú.'
    ],
    open: [
      'Pre-apunta el aterrizaje de la plataforma.',
      'Durante Stim Surge aguanta más: retrocede esos 6 s y contraataca después.'
    ],
    closed: [
      'En interiores su velocidad sirve menos: escopetas y esquinas.',
      'Escucha el sonido del Stim antes de que entre por la puerta.'
    ],
    nc: {
      steps: [
        'Planta Castle Wall en la línea de llegada de la plataforma: aterriza, trepa y queda aturdido.',
        'Orienta el Escudo móvil hacia el aterrizaje.',
        'Cuando active Stim Surge, no lo persigas: cúbrete 6 s y castiga al terminar.',
        'Octane suele entrar primero y solo: deja que tu equipo lo castigue detrás del muro.'
      ],
      dia: {
        label: 'Contra Octane: muro electrificado en la línea de aterrizaje de la plataforma de salto',
        env: 'open', rocks: [[70, 30, 34, 26]],
        zones: [['pad', 330, 172]],
        walls: [[216, 72, 216, 172, 262, 122]],
        paths: [['enemy', [[330, 166], [290, 112], [234, 112]]], ['team', [[170, 92], [226, 108]]]],
        units: [['enemy', 344, 188, 'Octane'], ['enemy', 362, 142], ['nc', 182, 124], ['ally', 162, 92], ['ally', 166, 162]],
        steps: [[1, 216, 56]],
        notes: [[20, 236, 'Stim Surge: cúbrete 6 s']]
      }
    },
    quick: { weak: 'El Stim cuesta vida; vuelo predecible', open: 'Pre-apunta el aterrizaje', closed: 'Escopeta en esquinas', nc: 'Muro en la llegada de la plataforma' }
  },
  {
    id: 'pathfinder', name: 'Pathfinder', cls: 'escaramuzador', glyph: 'zip', threat: 3,
    role: 'Explorador avanzado',
    abilities: [
      { type: 'Pasiva', name: 'Insider Knowledge', es: 'Conocimiento interno', icon: 'beacon',
        desc: 'Usa balizas de reconocimiento para ver la ubicación del próximo ring y reducir el enfriamiento de su gancho.',
        facts: ['Su equipo suele rotar antes y mejor.'] },
      { type: 'Táctica', name: 'Grappling Hook', es: 'Gancho de agarre', icon: 'grapple',
        desc: 'Lanza un gancho para desplazarse rápido o subir a posiciones altas.',
        facts: ['Cuanto más largo el viaje, más largo el enfriamiento.'] },
      { type: 'Definitiva', name: 'Zipline Gun', es: 'Pistola de tirolina', icon: 'zip',
        desc: 'Dispara una tirolina que puede usar cualquiera.',
        facts: ['Recibió mejoras en el Split 2 de la T29.'] }
    ],
    weak: [
      'Tras un gancho largo pasa bastante tiempo sin escape.',
      'Quien va colgado de la tirolina es un blanco fácil.',
      'Sus tirolinas también las puedes usar tú.'
    ],
    open: [
      'Dispara a los jugadores que cruzan por la tirolina.',
      'Si engancha a un alto, espera su llegada en vez de seguirle.'
    ],
    closed: [
      'En interiores pequeños el gancho apenas sirve.',
      'Cubre ventanas: suele entrar enganchado por ellas.'
    ],
    nc: {
      steps: [
        'Levanta Castle Wall en el extremo de llegada de la tirolina.',
        'Gira el escudo hacia la tirolina y dispara a quien llega colgado.',
        'Usa sus tirolinas para tu propia rotación.',
        'Castiga justo después de un gancho largo.'
      ],
      dia: {
        label: 'Contra Pathfinder: disparar a quien cruza la tirolina y muro en su punto de llegada',
        env: 'open', hills: [[360, 40, 50, 30]],
        zones: [['zipline', 360, 40, 244, 150]],
        walls: [[206, 104, 216, 196, 262, 150]],
        paths: [['team', [[162, 120], [294, 98]]]],
        units: [['enemy', 300, 96], ['enemy', 362, 46], ['nc', 172, 150], ['ally', 152, 118], ['ally', 162, 188]],
        steps: [[1, 206, 88], [2, 300, 70]],
        notes: [[20, 30, 'Pathfinder cruza por su tirolina'], [20, 236, 'La tirolina también es tuya']]
      }
    },
    quick: { weak: 'Viajeros de tirolina expuestos', open: 'Dispara a la tirolina', closed: 'Cubre ventanas', nc: 'Muro en la llegada de la tirolina' }
  },
  {
    id: 'rampart', name: 'Rampart', cls: 'control', glyph: 'minigun', threat: 3,
    role: 'Modificadora experta',
    abilities: [
      { type: 'Pasiva', name: 'Modded Loader', es: 'Cargador modificado', icon: 'reload',
        desc: 'Cargadores más grandes y recarga más rápida con ametralladoras ligeras y con su minigun.',
        facts: ['T30: progresa un 50% más rápido en los accesorios bloqueados.'] },
      { type: 'Táctica', name: 'Amped Cover', es: 'Cobertura amplificada', icon: 'cover',
        desc: 'Levanta muros que amplifican los disparos que salen a través de ellos.',
        facts: ['T27: su vida escala con el nivel Evo, se regeneran y tienen techo-escudo.', 'T30: 600/700/800 de vida y se despliegan 0,5 s más rápido.'] },
      { type: 'Definitiva', name: 'Mobile Minigun "Sheila"', es: 'Sheila', icon: 'minigun',
        desc: 'Minigun de gran cadencia, portátil o en emplazamiento, que necesita girar antes de disparar a pleno ritmo.',
        facts: ['Desde la T27 puede alternar entre colocar cobertura rápida o sacar el arma.'] }
    ],
    weak: [
      'Sus muros son fijos: flanquea.',
      'Sheila necesita tiempo de giro y la ralentiza.',
      'Sus muros se destruyen con daño suficiente y explosivos.'
    ],
    open: [
      'No intercambies disparos a través de su cobertura: sus balas salen amplificadas.',
      'Flanquea por el lado sin muro.'
    ],
    closed: [
      'Muros en puertas: explosivos y segunda entrada.',
      'Corta la distancia antes de que Sheila gire.'
    ],
    nc: {
      steps: [
        'No hagas duelo de muros: su muro amplifica, el tuyo solo bloquea. Usa el tuyo para flanquear.',
        'Acércate con el Escudo móvil y rompe sus muros a corta distancia.',
        'Contra Sheila, Castle Wall: absorbe la ráfaga y la obliga a recolocarse.',
        'Ataca durante el giro de la minigun, no después.'
      ],
      dia: {
        label: 'Contra Rampart: no disparar a través de su cobertura; flanquear protegido por el muro',
        env: 'open',
        zones: [['ecover', 304, 82, 304, 172]],
        walls: [[254, 18, 254, 84, 300, 50]],
        shields: [[262, 200, -20]],
        paths: [['move', [[142, 112], [200, 52], [240, 50]]], ['move', [[150, 182], [244, 200]]]],
        units: [['enemy', 334, 110, 'Rampart'], ['enemy', 334, 150], ['nc', 232, 56], ['ally', 136, 112], ['ally', 146, 184]],
        steps: [[1, 200, 32], [2, 286, 206]],
        notes: [[20, 236, 'Su muro amplifica; el tuyo solo bloquea']]
      }
    },
    quick: { weak: 'Muros fijos; Sheila lenta al girar', open: 'Flanquea, no dispares a su muro', closed: 'Explosivos y segunda entrada', nc: 'Muro para flanquear, no para duelos' }
  },
  {
    id: 'revenant', name: 'Revenant', cls: 'asalto', glyph: 'shadow', threat: 3,
    role: 'Asesino sintético',
    abilities: [
      { type: 'Pasiva', name: "Assassin's Instinct", es: 'Instinto asesino', icon: 'climb',
        desc: 'Trepa más alto, camina agachado más rápido y ve resaltados a los enemigos con poca vida.',
        facts: ['Ve a tu aliado recién revivido si sale con poca vida.'] },
      { type: 'Táctica', name: 'Shadow Pounce', es: 'Salto sombrío', icon: 'claw',
        desc: 'Salto largo y cargado en la dirección que mira.',
        facts: ['Trayectoria lineal: fácil de anticipar.'] },
      { type: 'Definitiva', name: 'Forged Shadows', es: 'Sombras forjadas', icon: 'shadow',
        desc: 'Se cubre de una sombra que absorbe daño y se renueva al conseguir derribos.',
        facts: ['La sombra tiene vida limitada: el fuego concentrado la rompe.'] }
    ],
    weak: [
      'El Salto sombrío es lineal: pre-apunta el aterrizaje.',
      'La sombra tiene vida limitada: concentrad el fuego.',
      'Sin herramientas defensivas: castígalo tras el salto.'
    ],
    open: [
      'Mantente agrupado y dispara al punto de aterrizaje del salto.',
      'Concentra todo el equipo en él cuando active la sombra.'
    ],
    closed: [
      'Los techos bajos limitan su salto.',
      'Cuidado con tejados: trepa a sitios inesperados.'
    ],
    nc: {
      steps: [
        'Coloca Castle Wall en la ruta del salto: si aterriza y trepa, queda aturdido.',
        'Gira el Escudo móvil hacia la dirección del salto.',
        'Concentrad el fuego del equipo en la sombra hasta romperla.',
        'Revive con Ready To Rumble: tu aliado sale regenerando y Revenant deja de verlo como presa fácil.'
      ],
      dia: {
        label: 'Contra Revenant: muro electrificado en la ruta del salto sombrío',
        env: 'open', rocks: [[60, 190, 34, 26]],
        walls: [[218, 72, 218, 172, 270, 122]],
        paths: [['enemy', [[352, 50], [236, 118]]], ['team', [[166, 98], [228, 112]]]],
        units: [['enemy', 366, 54, 'Revenant'], ['enemy', 372, 164], ['nc', 182, 126], ['ally', 162, 96], ['ally', 168, 160]],
        steps: [[1, 218, 56]],
        notes: [[20, 30, 'Salto lineal = aterrizaje predecible']]
      }
    },
    quick: { weak: 'Salto lineal; sombra con vida limitada', open: 'Fuego concentrado', closed: 'Techos bajos', nc: 'Muro en la ruta del salto' }
  },
  {
    id: 'seer', name: 'Seer', cls: 'recon', glyph: 'sphere', threat: 4,
    role: 'Buscador de ambiciones: el enemigo de tus revives',
    abilities: [
      { type: 'Pasiva', name: 'Heart Seeker', es: 'Buscador de corazones', icon: 'heart',
        desc: 'Al apuntar oye y ve el latido de los enemigos cercanos y su dirección.',
        facts: ['Alcance de unos 75 m.'] },
      { type: 'Táctica', name: 'Focus of Attention', es: 'Foco de atención', icon: 'reticle',
        desc: 'Lanza micro-drones que atraviesan paredes, revelan a los enemigos e interrumpen sus acciones, como curarse o revivir.',
        facts: ['Desde la T30 aplica menos ralentización de giro.'] },
      { type: 'Definitiva', name: 'Exhibit', es: 'Exhibición', icon: 'sphere',
        desc: 'Crea una esfera que revela a los enemigos que se mueven rápido o disparan dentro de ella.',
        facts: ['No revela a quien está quieto o camina agachado.'] }
    ],
    weak: [
      'La táctica tiene animación de carga visible y sale en línea: esquívala de lado.',
      'La Exhibición no revela a quien está quieto o camina agachado.',
      'Su pasiva exige apuntar, lo que la hace menos ágil.'
    ],
    open: [
      'Esquiva el Foco de atención moviéndote en lateral.',
      'Dentro de la Exhibición, quédate quieto o camina agachado.'
    ],
    closed: [
      'Las paredes no frenan su táctica: muévete en vez de esconderte.',
      'No te cures en su línea si sabe dónde estás.'
    ],
    nc: {
      steps: [
        'Seer es tu némesis: su táctica interrumpe revives. Antes de revivir, provoca que la gaste o espera su enfriamiento.',
        'Tu escudo no frena sus micro-drones: atraviesan superficies. Muévete de lado al verlos.',
        'Dentro de la Exhibición, revive detrás del muro sin disparar ni esprintar.',
        'Revive en cuanto gaste el Foco: tienes una ventana segura.'
      ],
      dia: {
        label: 'Contra Seer: esperar a que gaste el Foco de atención antes de revivir y moverse agachado dentro de la Exhibición',
        env: 'open',
        zones: [['exhibit', 190, 125, 62], ['scan', 340, 110, 180, 12, 150]],
        walls: [[236, 70, 236, 180, 290, 125]],
        units: [['enemy', 346, 110, 'Seer'], ['enemy', 352, 160], ['nc', 202, 108], ['down', 196, 142], ['ally', 164, 126]],
        steps: [[1, 306, 88], [3, 190, 50], [4, 222, 196]],
        notes: [[20, 236, 'Su Foco atraviesa paredes e interrumpe revives']]
      }
    },
    quick: { weak: 'Táctica esquivable; Exhibición ciega a lo quieto', open: 'Esquiva lateral', closed: 'Muévete, no te escondas', nc: 'Revive cuando gaste el Foco' }
  },
  {
    id: 'sparrow', name: 'Sparrow', cls: 'recon', glyph: 'bolt', threat: 3,
    role: 'Arquero ágil',
    abilities: [
      { type: 'Pasiva', name: 'Double Jump', es: 'Doble salto', icon: 'doublejump',
        desc: 'Puede hacer un segundo salto en el aire o impulsarse en una pared. Lleva flechas extra (también explosivas) para el arco Bocek.',
        facts: ['Llega a alturas que otros no alcanzan.'] },
      { type: 'Táctica', name: 'Tracker Dart', es: 'Dardo rastreador', icon: 'dart',
        desc: 'Dispara un dardo trampa que revela a los enemigos que entran en su línea de visión. También activa balizas de reconocimiento a distancia.',
        facts: ['Hasta 3 dardos a la vez.'] },
      { type: 'Definitiva', name: 'Stinger Bolt', es: 'Virote aguijón', icon: 'bolt',
        desc: 'Dispara una flecha grande que se ancla al suelo, se carga y libera seis descargas que dañan y ralentizan.',
        facts: ['El punto de anclaje es fijo: sal del radio.'] }
    ],
    weak: [
      'Los dardos se pueden destruir.',
      'El Virote se ancla: hay tiempo para salir del radio antes de las descargas.',
      'Depende de la información de sus dardos para colocarse.'
    ],
    open: [
      'Destruye los dardos antes de cruzar.',
      'Si clava el Virote, aléjate del ancla en línea recta.'
    ],
    closed: [
      'Revisa las esquinas: allí suele dejar los dardos.',
      'Cuidado con el doble salto hacia ventanas altas.'
    ],
    nc: {
      steps: [
        'Manda el Escudo móvil por delante para destruir dardos sin exponerte.',
        'Ante el Virote, sal del radio; si tienes la definitiva, salta hacia un aliado lejos del ancla.',
        'Pon Castle Wall entre los dardos y tu equipo para quitarles línea de visión.',
        'Presiona cuando haya gastado los dardos: va a ciegas.'
      ],
      dia: {
        label: 'Contra Sparrow: destruir los dardos y salir del radio del Virote aguijón saltando',
        env: 'open', rocks: [[240, 40, 30, 22], [222, 190, 30, 22]],
        zones: [['dart', 254, 62], ['dart', 236, 200], ['bolt', 172, 128, 34]],
        paths: [['leap', [[172, 128], [84, 190]]], ['team', [[96, 178], [228, 200]]]],
        units: [['enemy', 362, 118, 'Sparrow'], ['enemy', 372, 168], ['nc', 86, 190], ['ally', 66, 160]],
        steps: [[1, 286, 40], [2, 172, 80]],
        notes: [[20, 236, 'Seis descargas tras la carga']]
      }
    },
    quick: { weak: 'Dardos destruibles; Virote anclado', open: 'Rompe dardos antes de cruzar', closed: 'Revisa esquinas', nc: 'Escudo para romper dardos; sal del Virote' }
  },
  {
    id: 'valkyrie', name: 'Valkyrie', cls: 'escaramuzador', glyph: 'dive', threat: 3,
    role: 'Piloto de combate aéreo',
    abilities: [
      { type: 'Pasiva', name: 'VTOL Jets', es: 'Propulsores VTOL', icon: 'jets',
        desc: 'Vuela con propulsores durante unos segundos.',
        facts: ['T27: se recargan mucho más rápido (unos 3 s) y ganan velocidad horizontal, pero con 6 s de combustible.'] },
      { type: 'Táctica', name: 'Missile Swarm', es: 'Enjambre de misiles', icon: 'missile',
        desc: 'Lanza una cuadrícula de misiles que dañan, escanean 1,5 s al impactar y ponen en enfriamiento las pasivas de movimiento enemigas.',
        facts: ['Desde la T27 no aturde ni le daña a ella; la T30 redujo su daño.'] },
      { type: 'Definitiva', name: 'Skyward Dive', es: 'Salto celeste', icon: 'dive',
        desc: 'Despega con su equipo para reposicionarse desde el aire. Puede lanzar misiles durante la caída.',
        facts: ['La T30 recortó un 15% la altura.'] }
    ],
    weak: [
      'En vuelo es un blanco fácil.',
      'Los propulsores se oyen desde lejos.',
      'Su definitiva revela hacia dónde caerá el equipo.'
    ],
    open: [
      'Dispárale mientras vuela.',
      'Sigue su caída tras la definitiva y pre-apunta el aterrizaje.'
    ],
    closed: [
      'Sin techos altos sus propulsores apenas sirven.',
      'Los misiles dentro de una sala grande obligan a salir: no te quedes en la cuadrícula.'
    ],
    nc: {
      steps: [
        'Sal de la cuadrícula de misiles: el escaneo te revela y te quita la pasiva de movimiento.',
        'Dispárale en vuelo; no la persigas en tierra.',
        'Usa tu salto para llegar antes al punto alto donde va a caer su equipo.',
        'Levanta el muro mirando a su zona de aterrizaje.'
      ],
      dia: {
        label: 'Contra Valkyrie: salir de la cuadrícula de misiles y disparar mientras vuela',
        env: 'open', rocks: [[60, 30, 34, 26]],
        zones: [['missiles', 202, 122]],
        paths: [['move', [[198, 122], [134, 168]]], ['enemy', [[364, 40], [306, 70]]], ['team', [[120, 176], [296, 74]]]],
        units: [['enemy', 300, 76, 'Valkyrie'], ['nc', 128, 174], ['ally', 104, 150], ['ally', 112, 200]],
        steps: [[1, 202, 88], [2, 300, 48]],
        notes: [[20, 236, 'Misiles: escaneo 1,5 s + pasiva en enfriamiento']]
      }
    },
    quick: { weak: 'Expuesta en vuelo', open: 'Dispárale en el aire', closed: 'Sal de los misiles', nc: 'Sal de la cuadrícula; dispárale en vuelo' }
  },
  {
    id: 'vantage', name: 'Vantage', cls: 'recon', glyph: 'scope', threat: 3,
    role: 'Francotiradora superviviente',
    abilities: [
      { type: 'Pasiva', name: "Spotter's Lens", es: 'Lente de observador', icon: 'lens',
        desc: 'Apunta sin arma para ver distancia e información de los enemigos.',
        facts: ['Desde la T29, marcar a un equipo genera el 70% de una bala de definitiva (10 s de enfriamiento por equipo).'] },
      { type: 'Táctica', name: 'Echo Relocation', es: 'Reubicación de Echo', icon: 'bat',
        desc: 'Se lanza hacia la posición de su murciélago Echo para reposicionarse.',
        facts: ['T29: 21 m/s, doble salto de 7 m, sin aterrizaje duro y 17 s de enfriamiento.'] },
      { type: 'Definitiva', name: "Sniper's Mark", es: 'Marca de francotiradora', icon: 'scope',
        desc: 'Saca un rifle propio que marca a los enemigos alcanzados: su equipo les hace daño extra.',
        facts: ['T29: mira inclinada 2x y mira normal de 4x.'] }
    ],
    weak: [
      'Es débil a corta distancia.',
      'Echo se ve: indica hacia dónde va a saltar.',
      'Cuando te marca, lo sabes: cúbrete antes de que su equipo aproveche.'
    ],
    open: [
      'Rompe la línea de visión y rota por cobertura.',
      'No te quedes quieto en campo abierto.'
    ],
    closed: [
      'Lleva la pelea a interiores: allí Vantage pierde su ventaja.',
      'Cierra distancia rápido.'
    ],
    nc: {
      steps: [
        'Orienta el Escudo móvil hacia la francotiradora para cruzar campos abiertos.',
        'Usa Castle Wall como puente a mitad del cruce.',
        'Cierra distancia: a corta distancia gana tu equipo.',
        'Si te marca, cúbrete tras el muro antes de que su equipo dispare.'
      ],
      dia: {
        label: 'Contra Vantage: escudo hacia la francotiradora y muro como puente para cruzar el abierto',
        env: 'open', hills: [[340, 60, 60, 36]],
        zones: [['scan', 340, 60, 155, 30, 260]],
        shields: [[202, 150, -33]],
        walls: [[281, 195, 219, 145, 300, 130]],
        paths: [['move', [[60, 212], [170, 172]]]],
        units: [['enemy', 340, 56, 'Vantage'], ['nc', 182, 168], ['ally', 152, 184], ['ally', 160, 206]],
        steps: [[1, 202, 124], [2, 262, 222]],
        notes: [[20, 30, 'Media/larga distancia: su terreno']]
      }
    },
    quick: { weak: 'Débil de cerca', open: 'Rompe línea de visión', closed: 'Llévala dentro', nc: 'Escudo hacia ella y muro como puente' }
  },
  {
    id: 'wattson', name: 'Wattson', cls: 'control', glyph: 'pylon', threat: 3,
    role: 'Experta en defensa estática',
    abilities: [
      { type: 'Pasiva', name: 'Spark of Genius', es: 'Chispa de genio', icon: 'spark',
        desc: 'Los acelerantes de definitiva cargan su definitiva por completo.',
        facts: ['Desde el Split 2 de la T28 interactúa de forma especial con las mallas Hardlight y su táctica se recarga antes.'] },
      { type: 'Táctica', name: 'Perimeter Security', es: 'Seguridad perimetral', icon: 'fence',
        desc: 'Conecta nodos con vallas eléctricas que dañan y ralentizan a quien las cruza.',
        facts: ['Los nodos se pueden destruir a disparos.'] },
      { type: 'Definitiva', name: 'Interception Pylon', es: 'Pilón de intercepción', icon: 'pylon',
        desc: 'Coloca un pilón que destruye los explosivos entrantes y regenera escudos.',
        facts: ['Mientras el pilón esté en pie, las granadas no sirven.'] }
    ],
    weak: [
      'Los nodos de las vallas se destruyen a distancia.',
      'El pilón se puede destruir.',
      'El PEM de Crypto desactiva su defensa.'
    ],
    open: [
      'Sácala de su fortaleza con el ring.',
      'Sin edificio, su kit pierde mucha fuerza.'
    ],
    closed: [
      'Dispara a los nodos desde fuera antes de entrar.',
      'Destruye el pilón antes de gastar granadas.'
    ],
    nc: {
      steps: [
        'Adelanta el Escudo móvil y destruye los nodos de las vallas desde detrás.',
        'Guarda las granadas: primero destruye el pilón.',
        'No cruces vallas activas, ni con tu muro: su valla más tu muro es una combinación que les favorece a ellos.',
        'En tu equipo: Wattson y Newcastle forman una fortaleza de final de partida.'
      ],
      dia: {
        label: 'Contra Wattson: el escudo protege mientras se destruyen los nodos de la valla de la puerta',
        env: 'closed', rooms: [{ x: 200, y: 40, w: 170, h: 170, doors: [['w', 0.5, 34]] }],
        zones: [['fence', 200, 108, 200, 142], ['pylon', 292, 125, 40]],
        shields: [[162, 125, 0]],
        paths: [['team', [[112, 96], [196, 108]]], ['team', [[110, 158], [196, 142]]]],
        units: [['enemy', 302, 92, 'Wattson'], ['enemy', 322, 164], ['nc', 112, 126], ['ally', 102, 90], ['ally', 104, 164]],
        steps: [[1, 162, 98], [2, 292, 70]],
        notes: [[20, 236, 'Con el pilón en pie las granadas no sirven']]
      }
    },
    quick: { weak: 'Nodos y pilón destruibles', open: 'El ring la saca', closed: 'Dispara a los nodos desde fuera', nc: 'Escudo y rompe nodos; pilón antes que granadas' }
  },
  {
    id: 'wraith', name: 'Wraith', cls: 'escaramuzador', glyph: 'portal', threat: 3,
    role: 'Luchadora interdimensional',
    abilities: [
      { type: 'Pasiva', name: 'Voices from the Void', es: 'Voces del vacío', icon: 'ear',
        desc: 'Recibe avisos cuando la apuntan o cuando hay trampas cerca.',
        facts: ['Difícil de pillar desprevenida.'] },
      { type: 'Táctica', name: 'Into the Void', es: 'Hacia el vacío', icon: 'void',
        desc: 'Entra en fase durante unos segundos: es intangible y se mueve más rápido para reposicionarse.',
        facts: ['Enfriamiento de 15 s desde el Split 2 de la T28 (antes 20 s).'] },
      { type: 'Definitiva', name: 'Dimensional Rift', es: 'Fisura dimensional', icon: 'portal',
        desc: 'Conecta dos puntos con un portal de doble sentido.',
        facts: ['Enfriamiento de 90 s y activación más rápida desde el Split 2 de la T28.'] }
    ],
    weak: [
      'La fase dura poco y su salida es predecible.',
      'El portal es de doble sentido: puedes seguirlos o esperar en la salida.',
      'Tras la fase pasa unos 15 s sin escape.'
    ],
    open: [
      'Sigue la distorsión de la fase y apunta al punto donde termina.',
      'Si colocan un portal de huida, ve a la salida en vez de a la entrada.'
    ],
    closed: [
      'Un portal en interiores suele ser una huida: cubre la salida.',
      'Castiga justo después de la fase.'
    ],
    nc: {
      steps: [
        'Levanta Castle Wall en la salida del portal, lado electrificado hacia él.',
        'Orienta el Escudo móvil hacia donde termina su fase.',
        'Castiga en los 15 s posteriores a la fase.',
        'Si el portal es su huida, no lo cruces detrás de ellos sin plan: puede ser una trampa.'
      ],
      dia: {
        label: 'Contra Wraith: muro en la salida del portal de doble sentido',
        env: 'open', rocks: [[60, 190, 34, 26]],
        zones: [['portal', 370, 40, 262, 142]],
        walls: [[232, 96, 232, 192, 290, 142]],
        paths: [['team', [[178, 112], [252, 138]]]],
        units: [['enemy', 336, 28, 'Wraith'], ['enemy', 384, 66], ['nc', 192, 142], ['ally', 172, 110], ['ally', 176, 176]],
        steps: [[1, 232, 80]],
        notes: [[20, 30, 'Portal de doble sentido: tú también puedes usarlo']]
      }
    },
    quick: { weak: 'Salida de fase y portal predecibles', open: 'Apunta al final de la fase', closed: 'Cubre la salida del portal', nc: 'Muro en la salida del portal' }
  }
]);
