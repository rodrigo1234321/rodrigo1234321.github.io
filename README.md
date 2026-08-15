# rodrigodev.me — Hub del Ecosistema

Portafolio y nave central del ecosistema `rodrigodev.me`: portafolio, startup Naro AI, APIs y demos — todo desplegado a **$0 de costo** usando GitHub Pages, Vercel y Cloudflare Workers.

## Arquitectura

```
                        ┌─────────────────────────────┐
                        │      Namecheap DNS (host)   │
                        │      rodrigodev.me          │
                        └──────┬───────┬───────┬──────┘
             A @ ───────────────┘       │       └── CNAME naro
             CNAME www ─────────────────┘       └── CNAME api
             CNAME lab ─────────────────┘
                    │
        ┌───────────▼───────────┐   ┌───────────────┐   ┌──────────────────┐
        │  GitHub Pages (raíz)  │   │    Vercel     │   │ Cloudflare (edge)│
        │  https://rodrigodev.me│   │ naro.<dom>    │   │ api.<dom>        │
        │  Hub + lab project    │   │ Naro AI       │   │ Workers API      │
        └───────────────────────┘   └───────────────┘   └──────────────────┘
```

## Estructura del repo

| Archivo | Propósito |
|---|---|
| `index.html` | Hub principal: hero, proyectos, ecosistema, terminal |
| `styles.css` | Diseño oscuro glassmorphism (Inter + JetBrains Mono) |
| `scripts.js` | Animaciones, reveal on scroll, partículas, contadores |
| `app.js` | Terminal interactiva (`help`, `dns`, `stack`, `naro`, `projects`, ...) |
| `CNAME` | Fija el dominio `rodrigodev.me` en GitHub Pages |
| `.github/workflows/deploy.yml` | CI/CD: deploy a Pages en cada push a `main` |
| `vercel.json` | Config opcional por si el hub migra a Vercel |
| `DNS_CONFIGURATION.md` | Manual DNS completo (Namecheap) |

## Deploy

Cada `git push` a `main` dispara el workflow de GitHub Actions que publica el sitio en `https://rodrigodev.me`.

## Subdominios

- `naro.rodrigodev.me` → Vercel (Naro AI)
- `api.rodrigodev.me` → Cloudflare Workers
- `lab.rodrigodev.me` → GitHub Pages (labs UTN, en breve)
- `www.rodrigodev.me` → redirige al hub

Ver `DNS_CONFIGURATION.md` para la tabla de registros completa.
