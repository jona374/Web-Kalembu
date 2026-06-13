# Plan — Web Kalembu (jeans de mujer)

## 1. Objetivo

Crear la web oficial de la marca Kalembu: mostrar la colección de jeans de mujer,
transmitir la identidad de la marca y vender (o captar clientas para vender por
WhatsApp/Instagram en una primera etapa).

## 2. Decisión clave: ¿catálogo o tienda online?

| Opción | Qué incluye | Cuándo conviene |
|---|---|---|
| **Fase 1 — Catálogo + contacto** | Productos con fotos, precios y botón "Comprar por WhatsApp" | Para lanzar rápido, sin pasarela de pago ni logística automatizada |
| **Fase 2 — E-commerce completo** | Carrito, pago online (Mercado Pago / Stripe), gestión de stock y envíos | Cuando hay volumen de ventas y catálogo estable |

**Recomendación:** lanzar la Fase 1 con una estructura ya preparada para
convertirse en tienda completa, sin rehacer el sitio.

## 3. Tecnología propuesta

- **Frontend:** Next.js (React) + Tailwind CSS — rápido, SEO-friendly, responsive.
- **Catálogo:** datos de productos en archivos JSON/Markdown al inicio; migrar a un
  CMS (Sanity o similar) cuando el catálogo crezca.
- **Pagos (Fase 2):** Mercado Pago o Stripe según el país de operación.
- **Hosting:** Vercel (gratis para empezar) + dominio propio (ej. `kalembu.com`).

Alternativa sin código: Shopify (~USD 30/mes) si se prefiere no mantener código;
este repo asume la opción a medida.

## 4. Estructura del sitio

1. **Inicio** — hero con foto de campaña, colección destacada, propuesta de la marca.
2. **Tienda / Catálogo** — grilla de jeans con filtros clave para denim:
   - Calce (skinny, recto, wide leg, mom, flare)
   - Tiro (alto, medio, bajo)
   - Talla y color/lavado
3. **Ficha de producto** — varias fotos (frente, espalda, detalle, puesto),
   composición de la tela, **guía de talles con medidas en cm**, y CTA
   (WhatsApp en Fase 1, carrito en Fase 2).
4. **Guía de talles** — página propia; en jeans es lo que más reduce devoluciones
   y dudas de compra.
5. **Sobre la marca** — historia de Kalembu, valores, proceso.
6. **Contacto** — WhatsApp, Instagram, email, formulario.
7. **Legales** — cambios y devoluciones, términos, privacidad.

## 5. Identidad y contenido

- Paleta inspirada en denim (azules/índigo) + 1 color de acento de la marca.
- Tipografía moderna y legible; logo en SVG.
- **Fotografía es lo más importante:** fotos de producto sobre fondo neutro +
  fotos lifestyle con modelos reales. Mínimo 4 fotos por jean.
- Textos por producto: nombre, calce, tiro, lavado, composición, talles disponibles.

## 6. Funcionalidades transversales

- 100% responsive (la mayoría del tráfico de moda es móvil).
- SEO básico: títulos/descripciones por página, sitemap, Open Graph para compartir
  en redes.
- Integración con Instagram (feed o enlaces) y botón flotante de WhatsApp.
- Analytics (Google Analytics o Plausible) desde el día 1.
- Newsletter (captura de emails) para lanzamientos de colección.

## 7. Fases y orden de trabajo

**Fase 0 — Definición (1 semana)**
- Confirmar nombre de dominio, paleta, logo y catálogo inicial (lista de jeans
  con fotos, precios y talles).

**Fase 1 — Sitio catálogo (2–3 semanas)**
1. Setup del proyecto (Next.js + Tailwind) y layout base (header, footer, nav).
2. Página de inicio.
3. Catálogo con filtros + ficha de producto.
4. Guía de talles, Sobre la marca, Contacto.
5. Botón WhatsApp, SEO, analytics.
6. Deploy en Vercel con dominio propio.

**Fase 2 — E-commerce (cuando haya tracción)**
- Carrito y checkout con pasarela de pago.
- Gestión de stock por talle.
- Emails transaccionales (confirmación de pedido).
- Cálculo de envíos.

**Fase 3 — Crecimiento**
- CMS para autogestionar productos.
- Reseñas de clientas, wishlist, cupones de descuento.

## 8. Qué se necesita de la marca para empezar

- [ ] Logo (idealmente vectorial) y colores de marca
- [ ] Lista de productos: nombre, precio, calce, tiro, talles, composición
- [ ] Fotos de cada jean (mínimo 4 por producto)
- [ ] Tabla de medidas por talle (cintura, cadera, largo, tiro en cm)
- [ ] Número de WhatsApp y redes sociales
- [ ] País/moneda de venta (define pasarela de pago y textos)
