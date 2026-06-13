# Web-Kalembu

Landing page e-commerce premium para **Kalembu**, marca de jeans premium para mujer.

Sitio estático (HTML + CSS + JavaScript, sin dependencias ni build) con estética
de boutique editorial: tipografía serif elegante para títulos, sans moderna para
texto, mucho espacio en blanco, animaciones discretas y enfoque en conversión
hacia WhatsApp.

## Estructura

```
index.html        Marcado de todas las secciones de la landing
css/styles.css    Estilos, paleta temporal y diseño responsive
js/config.js      Datos editables (WhatsApp, correo, redes) — edita esto
js/main.js        Interacciones (menú, carrito, selectores, reveal, etc.)
```

## Cómo verlo

Abre `index.html` en el navegador, o sirve la carpeta:

```bash
python3 -m http.server 8000
# luego abre http://localhost:8000
```

## Configuración rápida

Edita **`js/config.js`** y completa:

- `whatsappNumber`: número en formato internacional, solo dígitos (ej. `593990000000`).
- `email`: correo de contacto.
- `social`: enlaces de Instagram, TikTok y Facebook.

Al definir el número de WhatsApp, todos los botones (flotante, producto, carrito,
CTA y footer) se enlazan automáticamente con un mensaje prellenado.

## Contenido pendiente de la marca

El diseño usa marcadores visibles `[PENDIENTE DEFINIR: …]` donde falta información
oficial. Para completar la web se necesita:

- Fotografías oficiales (hero, colección, producto, editorial, galería)
- Colores disponibles, precio y tallas del jean
- Composición de la tela
- Políticas de cambios y devoluciones
- WhatsApp, correo y enlaces de redes sociales
- Color de acento y complementario definitivos de la identidad

## Secciones incluidas

Barra informativa rotativa · Header fijo con menú y carrito · Hero editorial ·
Colección de 3 colores · Producto destacado con galería y selectores ·
Bloque editorial de marca · Detalles del producto · Galería de estilo (lookbook) ·
Beneficios de compra · Opiniones de clientas · CTA WhatsApp · Suscripción · Footer.

## Próximos pasos sugeridos

- Reemplazar los placeholders por fotografías oficiales.
- Definir la paleta final (acento y complementario) en `css/styles.css` (`:root`).
- Integrar una pasarela de pago (Mercado Pago / Stripe) sobre el carrito existente.
