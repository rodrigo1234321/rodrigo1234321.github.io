# DNS CONFIGURATION — Ecosistema rodrigodev.me

Manual definitivo de registros DNS para Namecheap, plataformas y verificación.
**Actualizado: agosto 2026** — corregido (sin Heroku, branch `main`, API en Cloudflare).

---

## 1. Estado actual (ya configurado y propagado)

El dominio raíz **ya resuelve a GitHub Pages**. Verificado con `nslookup`:

| Host | Tipo | Valor | Estado |
|---|---|---|---|
| `@` | A | 185.199.108.153 | ✅ Activo |
| `@` | A | 185.199.109.153 | ✅ Activo |
| `@` | A | 185.199.110.153 | ✅ Activo |
| `@` | A | 185.199.111.153 | ✅ Activo |
| `www` | CNAME | rodrigo1234321.github.io | ✅ Activo |

> IPv6 (AAAA `2606:50c0:8000::153` … `8003::153`) opcional — no es necesario.

---

## 2. Registros a agregar en Namecheap

Panel: **Domain List → rodrigodev.me → Manage → Advanced DNS → Add New Record**

| Tipo | Host | Valor | TTL | Propósito | Estado |
|---|---|---|---|---|---|
| CNAME | `naro` | `cname.vercel-dns.com.` | Automatic | Naro AI → Vercel | ✅ Activo |
| CNAME | `api` | *(ver nota Cloudflare)* | Automatic | API → Cloudflare | ⬜ Pendiente |
| CNAME | `lab` | `rodrigo1234321.github.io.` | Automatic | Labs UTN → GitHub Pages | ⬜ Pendiente |
| CNAME | `demo` | `cname.vercel-dns.com.` | Automatic | Demos rápidas → Vercel | ⬜ Pendiente |
| CNAME | `auth` | `accounts.clerk.services.` | Automatic | Autenticación Clerk | ⬜ Pendiente |

### Nota importante sobre `api` (Cloudflare Workers)

Para usar `api.rodrigodev.me` con Cloudflare Workers, el dominio **debe estar en una zona de Cloudflare** (los Workers no aceptan CNAME directo hacia `*.workers.dev`). Dos opciones:

1. **Recomendada**: migrar los nameservers de Namecheap a Cloudflare (gratis).
   - Namecheap: *Manage → Nameservers → Custom DNS* → `aria.ns.cloudflare.com` / `brad.ns.cloudflare.com` (los que Cloudflare te asigne al agregar el dominio).
   - Beneficios: SSL Full/Strict automático, CNAME flattening para el apex, reglas de redirección y proxy CDN.
2. Alternativa temporal: usar `https://api.<tu-worker>.workers.dev` hasta migrar.

---

## 3. GitHub Pages (raíz + lab)

### Repositorio rodrigo1234321.github.io (raíz — HUB)
- Branch: **`main`** (importante: no `master`)
- Archivo `CNAME` en la raíz con contenido `rodrigodev.me` ✅ ya existe
- Settings → **Pages**:
  - Source: **GitHub Actions** (usa `.github/workflows/deploy.yml`)
  - Custom domain: `rodrigodev.me`
  - ☑️ **Enforce HTTPS** (SSL Let's Encrypt automático, ~5-15 min)

### Subdominio lab (repositorio aparte, ej. `control-center`)
- Crear archivo `CNAME` con `lab.rodrigodev.me`
- Settings → Pages → Source: `main` branch + Custom domain `lab.rodrigodev.me`
- En Namecheap: `CNAME lab → rodrigo1234321.github.io.`

---

## 4. Vercel (naro.rodrigodev.me + demo)

1. `vercel link` + `vercel deploy --prod` en el proyecto (o importar desde GitHub).
2. Dashboard → Project → **Settings → Domains** → Add `naro.rodrigodev.me`.
3. Vercel muestra el valor exacto del CNAME (generalmente `cname.vercel-dns.com`).
4. Namecheap: `CNAME naro → cname.vercel-dns.com.` (con punto final).

> Si el apex `@` algún día se muda a Vercel: `A @ → 76.76.21.21` y `CNAME www → cname.vercel-dns.com.`

---

## 5. Verificación

```powershell
nslookup rodrigodev.me                  # → 185.199.108-111.153 (GitHub)
nslookup www.rodrigodev.me              # → alias al apex
nslookup naro.rodrigodev.me             # → cname.vercel-dns.com
nslookup api.rodrigodev.me              # → zona Cloudflare
nslookup lab.rodrigodev.me              # → rodrigo1234321.github.io
```

```powershell
curl -I https://rodrigodev.me           # → 200 + TLS 1.3 + cert válido
curl -I https://naro.rodrigodev.me      # → 200 (Vercel)
curl -s https://api.rodrigodev.me/health  # → {"status":"ok"} (Workers)
```

Propagación DNS: hasta 24-48h teóricas, habitualmente < 1h. El certificado SSL de
GitHub Pages se emite automáticamente tras detectar los A records.

---

## 6. Costo mensual del ecosistema

| Servicio | Costo |
|---|---|
| Namecheap rodrigodev.me | ~USD 1-2/año (renovación) |
| GitHub Pages | $0 |
| Vercel (Hobby) | $0 |
| Cloudflare Workers (Free: 100k req/día) | $0 |
| Clerk / MongoDB Atlas (Student Pack / free) | $0 |
| **Total** | **$0/mes** |
