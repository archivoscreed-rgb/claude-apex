# Códice del Defensor

Guía web de Apex Legends en español, actualizada hasta el Split 2 de la Temporada 30 «Marked» (parche del 14 de septiembre de 2026).

## Contenido

1. **Leyendas y habilidades**: las 28 leyendas con su pasiva, táctica y definitiva explicadas, sus debilidades, cómo pelear contra cada una en espacios abiertos y cerrados, y un plan con Newcastle acompañado de un diagrama táctico.
2. **Contra-guía rápida**: principios para terreno abierto e interiores y una tabla de consulta ordenable por nivel de amenaza.
3. **Manual de Newcastle**: kit completo con números, mejoras de leyenda, técnicas avanzadas, armas, composiciones, cómo jugar una partida fase a fase y errores comunes.
4. **Battle IQ con Newcastle**: los cinco pilares, el ciclo de decisión, la economía de la definitiva, enfriamientos enemigos que conviene vigilar, un árbol de decisión, escenarios resueltos, llamadas de comunicación, listas de control y una rutina de entrenamiento.

Todas las imágenes (43 diagramas tácticos, emblemas e iconos de las 84 habilidades) son ilustraciones SVG originales generadas por el propio sitio; no se usa arte oficial del juego.

## Cómo verlo

Es un sitio estático sin dependencias: abre `index.html` en el navegador o publícalo con GitHub Pages (Settings → Pages → rama y carpeta raíz).

## Estructura

```
index.html          Portada y capítulos 2–4 (texto del manual)
css/styles.css      Estilos, modo claro y oscuro
js/icons.js         Iconos de habilidades y emblemas de leyendas
js/diagrams.js      Motor de diagramas y láminas del manual
js/legends-a.js     Fichas de Alter a Lifeline
js/legends-b.js     Fichas de Loba a Wraith
js/app.js           Montaje de la página, filtros, tabla y listas de control
```

Para actualizar una leyenda tras un parche, edita su objeto en `js/legends-a.js` o `js/legends-b.js`: habilidades (`abilities`), debilidades (`weak`), consejos (`open`, `closed`), plan con Newcastle (`nc.steps`) y su diagrama (`nc.dia`).

Apex Legends y sus personajes son marcas de Electronic Arts y Respawn Entertainment. Guía de fans sin afiliación.
