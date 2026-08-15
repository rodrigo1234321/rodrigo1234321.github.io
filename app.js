/* ============================================
   RODRIGODEV.ME — Interactive Terminal (app.js)
   Commands: help · dns · stack · naro · projects
             about · contact · whoami · clear
   ============================================ */

(function () {
  'use strict';

  const body = document.getElementById('terminal-body');
  const input = document.getElementById('terminal-input');
  if (!body || !input) return;

  const CLR = {
    green: '#34d399',
    cyan: '#22d3ee',
    purple: '#a855f7',
    blue: '#6366f1',
    yellow: '#fbbf24',
    red: '#f87171',
    muted: '#6b6b80',
    text: '#f0f0f5',
    orange: '#fb923c'
  };

  const eco = {
    dns: [
      ['@', 'A', '185.199.108.153 + 3 más', 'GitHub Pages'],
      ['www', 'CNAME', 'rodrigo1234321.github.io', 'GitHub Pages'],
      ['naro', 'CNAME', 'cname.vercel-dns.com', 'Vercel'],
      ['api', 'CNAME', 'workers.dev', 'Cloudflare'],
      ['lab', 'CNAME', 'rodrigo1234321.github.io', 'GitHub Pages (pronto)']
    ],
    stack: [
      ['Frontend', 'Next.js, React, TypeScript, Tailwind, HTML/CSS/JS'],
      ['Backend', 'Node.js, NestJS, Python (FastAPI), Prisma ORM'],
      ['Bases de datos', 'PostgreSQL, MongoDB Atlas, Supabase, Firestore'],
      ['IA', 'Gemini AI, Claude, OpenAI, n8n workflows'],
      ['DevOps', 'GitHub Actions, Vercel, Cloudflare Workers, Docker, Firebase'],
      ['Costo mensual', '$0 — GitHub Student Pack + tiers gratuitos']
    ],
    projects: [
      ['GestiónComercial', 'SaaS de stock y ventas con IA', 'https://control-comercio-weld.vercel.app'],
      ['Naro AI', 'Startup de asistentes con IA', 'https://naro.rodrigodev.me'],
      ['Panorama.ar', 'Portal de noticias con scraper automático', 'https://panorama-web-one.vercel.app'],
      ['Dynasty.ar', 'E-commerce tech con checkout por WhatsApp', 'https://rodrigo1234321.github.io/dynasty'],
      ['Lucky Detail', 'Web para comercio local premium', 'https://rodrigo1234321.github.io/lucky-detail'],
      ['MS Refrigeración', 'Web corporativa con n8n', 'https://rodrigo1234321.github.io/ms-refrigeracion-web']
    ]
  };

  const cmd = {
    help: () => [
      { t: 'Comandos disponibles:', c: CLR.cyan },
      { t: '  help       — mostrar esta ayuda', c: CLR.text },
      { t: '  dns        — registros DNS del ecosistema', c: CLR.text },
      { t: '  stack      — stack tecnológico', c: CLR.text },
      { t: '  naro       — info de la startup Naro AI', c: CLR.text },
      { t: '  projects   — proyectos destacados', c: CLR.text },
      { t: '  about      — quién soy', c: CLR.text },
      { t: '  contact    — formas de contacto', c: CLR.text },
      { t: '  whoami     — quién estás consultando', c: CLR.text },
      { t: '  clear      — limpiar la terminal', c: CLR.text }
    ],
    dns: () => {
      const out = [
        { t: 'Registros DNS de rodrigodev.me (Namecheap):', c: CLR.cyan },
        { t: '  Host    Tipo    Destino                      Plataforma', c: CLR.muted }
      ];
      eco.dns.forEach(r => out.push({
        t: `  ${r[0].padEnd(7)} ${r[1].padEnd(6)} ${r[2].padEnd(27)} ${r[3]}`,
        c: r[1] === 'A' ? CLR.yellow : CLR.purple
      }));
      out.push({ t: '  IPv6 AAAA disponibles para el apex (@) — opcionales.', c: CLR.muted });
      return out;
    },
    stack: () => {
      const out = [{ t: 'Stack tecnológico:', c: CLR.cyan }];
      eco.stack.forEach(r => out.push({ t: `  ${r[0].padEnd(16)} ${r[1]}`, c: CLR.text }));
      return out;
    },
    naro: () => [
      { t: 'NARO AI — Startup de asistentes con IA', c: CLR.green },
      { t: '  Frontend  : Next.js + Tailwind en Vercel', c: CLR.text },
      { t: '  Backend   : APIs serverless (Cloudflare Workers)', c: CLR.text },
      { t: '  URL       : https://naro.rodrigodev.me', c: CLR.blue },
      { t: '  Estado    : en despliegue continuo desde GitHub', c: CLR.yellow }
    ],
    projects: () => {
      const out = [{ t: 'Proyectos destacados:', c: CLR.cyan }];
      eco.projects.forEach(p => out.push({
        t: `  ${p[0].padEnd(20)} ${p[1].padEnd(38)} ${p[2]}`,
        c: CLR.text
      }));
      return out;
    },
    about: () => [
      { t: 'Rodrigo — Desarrollador Full Stack', c: CLR.green },
      { t: '  Especialista en soluciones potenciadas por IA (Gemini, Claude, Copilot).', c: CLR.text },
      { t: '  SaaS multitenant, e-commerce, portales de noticias y web corporativa.', c: CLR.text },
      { t: '  Estudiante en UTN — Mar del Plata, Argentina.', c: CLR.text }
    ],
    contact: () => [
      { t: 'Contacto:', c: CLR.cyan },
      { t: '  Email    : rodrigosanmartin07@gmail.com', c: CLR.text },
      { t: '  GitHub   : https://github.com/rodrigo1234321', c: CLR.text },
      { t: '  LinkedIn : https://linkedin.com/in/rodrigo', c: CLR.text }
    ],
    whoami: () => [
      { t: 'visitor → consultando el ecosistema rodrigodev.me', c: CLR.muted },
      { t: 'Autor: Rodrigo (@rodrigo1234321)', c: CLR.green }
    ],
    clear: () => null
  };

  function printLines(lines) {
    lines.forEach(line => {
      const div = document.createElement('div');
      div.className = 'term-line term-line--output';
      div.textContent = line.t;
      if (line.c) div.style.color = line.c;
      body.insertBefore(div, body.lastElementChild);
    });
    scrollToBottom();
  }

  function scrollToBottom() {
    body.scrollTop = body.scrollHeight;
  }

  function onCommand(raw) {
    const value = raw.trim().toLowerCase();
    input.value = '';

    printLines([{ t: value || '(comando vacío)', c: CLR.text }]);
    if (!value) return;

    const fn = cmd[value];
    if (!fn) {
      printLines([
        { t: `comando no encontrado: '${value}'`, c: CLR.red },
        { t: 'Escribí "help" para ver la lista de comandos.', c: CLR.muted }
      ]);
      return;
    }

    const out = fn();
    if (out) printLines(out);
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') onCommand(input.value);
  });

  body.addEventListener('click', () => input.focus());
  window.addEventListener('load', () => input.focus());

  printLines([
    { t: 'Bienvenido al hub de rodrigodev.me', c: CLR.green },
    { t: 'Ingresá "help" para listar los comandos.', c: CLR.muted }
  ]);
})();
