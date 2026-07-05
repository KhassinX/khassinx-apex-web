# Services section ("Work with us") — design

> **Estado:** aprobado por Abraham en conversación (2026-07-06), modo AFK. Alcance chico — implementación directa, sin plan TDD separado.

## Contexto
`khassinx.com` hoy es 100% portafolio de apps propias, sin ninguna mención de que KHASSINX LLC también construye apps para clientes seleccionados. Abraham pidió que la web "ofrezca esos servicios" y le dé a un cliente potencial los datos que debe mandar para que le coticemos.

## Decisión (Abraham, 2026-07-06): empezar simple, evolucionar después
- **Ahora:** una sección de contenido estático en la home (EN + ES), sin formulario ni backend nuevo. Explica el servicio y lista qué mandar por email a `hello@khassinx.com`.
- **Después (no se construye todavía):** si hay demanda real, subir a un formulario HTML que postea a un Cloudflare Worker (sin SaaS de terceros, coherente con la filosofía del portafolio) que envía el email estructurado — ver "Upgrade path" abajo.

## Reglas duras (heredadas de `_apex/social/CLAUDE.md` y la spec del pipeline de contenido, 2026-07-06)
- Sin precios públicos, nunca — cotización siempre a medida.
- Voz plural de estudio ("KhassinX...", "we/nosotros"), nunca solo-dev/persona/ubicación.
- Nombres de Apple (iPhone/iPad/Mac/Apple Watch) solo en uso referencial de compatibilidad — nunca logo, nunca mockup de producto que no sea nuestro.
- CTA siempre a `hello@khassinx.com`, nunca el email personal.

## Implementación
Nueva sección `<section class="section" id="work-with-us">` (EN) / `id="trabajemos-juntos"` (ES), después de la sección "Apps" existente, mismo patrón visual (`.container`, `.card`) que ya usa esa sección — cero CSS nuevo.

**Copy EN** (`index.html`):
- H2: "Work with us"
- Lead: "Beyond our own apps, KhassinX partners with select teams to build premium, privacy-first apps for Apple platforms."
- Card: intro + lista (qué problema resuelve la app · plataformas objetivo · timeline aproximado · apps de referencia) + cierre "every project is unique, so we quote based on scope."

**Copy ES** (`es/index.html`):
- H2: "Trabajemos juntos"
- Lead: "Además de nuestras propias apps, en KhassinX construimos apps premium y privacy-first para plataformas Apple junto a equipos seleccionados."
- Card: mismo contenido en español nativo.

## Verificación
El repo ya tiene `build-preview.yml` (corre en cada PR): `jekyll build --strict_front_matter --safe --verbose` + validación HTML5. Se usa esa Action existente como test — no se agrega tooling nuevo.

## Gate de publicación
Este repo hace deploy automático del sitio en vivo al mergear a `main` (GitHub Pages). Agregar una oferta de servicios pública es "exponer superficie pública nueva" — se implementa en una rama + PR, **el merge espera confirmación explícita de Abraham**, no se mergea solo aunque el resto del trabajo se haga de forma autónoma.

## Upgrade path futuro (NO se construye ahora, solo documentado)
Cuando haya demanda real: formulario HTML (`name`, `email`, tipo de app, plataformas, descripción, timeline, referencias) → POST a un Cloudflare Worker nuevo (mismo patrón que `_apex/social/publisher/` planea para redes) → el Worker usa el `cloudflare-email-service` skill para mandar el email estructurado a `hello@khassinx.com`, sin guardar datos del cliente en ningún lado, sin SaaS de terceros (Typeform/Google Forms descartados por la filosofía del portafolio). Requeriría su propio brainstorm/spec cuando se decida escalar.
