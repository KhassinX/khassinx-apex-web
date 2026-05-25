# khassinx-www

Source for **[khassinx.com](https://khassinx.com)** — the umbrella marketing landing for the KhassinX indie studio ecosystem.

## What lives here

- `index.html` — apex landing with apps directory + philosophy + contact
- `_layouts/base.html` — Jekyll layout (head, header, footer, skip-link)
- `_layouts/prose.html` — layout for legal docs / blog posts (if needed)
- `assets/css/tokens.css` — **Layer 1** umbrella tokens (charcoal + warm gold)
- `assets/css/primitives.css` — **Layer 3** shared component primitives
- `assets/favicons/favicon.svg` — K monogram

## Brand layer

This is the **only** site that uses **Layer 1** umbrella tokens (charcoal + warm gold). Per-app sites (`asvab.khassinx.com`, future `khazen.khassinx.com`, etc.) use their own Layer 2 brand and share Layer 3 primitives.

See `~/KhassinX/_template/BRAND_SYSTEM.md` for the full convention.

## Hosting

Served via **GitHub Pages** with custom domain `khassinx.com`. DNS managed in Cloudflare:
- Apex: A records → GitHub Pages IPs `185.199.108-111.153` + AAAA IPv6 (proxy off)
- `www.khassinx.com` CNAME → `khassinx.github.io` (proxy off)

## License

The landing page and site assets are proprietary to KhassinX.

## Contact

- **Founder**: Abraham K. Alonso · Tampa, FL · USA
- **Email**: hello@khassinx.com
