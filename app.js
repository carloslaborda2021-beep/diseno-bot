const USER = 'carloslaborda2021-beep';
const REPOS = [
  { slug: 'design-resources-for-developers', label: 'Recursos de diseño', tag: 'lista', use: 'Stock, paletas, UI kits' },
  { slug: 'Front-End-Checklist', label: 'Front-End Checklist', tag: 'calidad', use: 'QA visual y técnico' },
  { slug: 'tailwindcss', label: 'Tailwind CSS', tag: 'ui', use: 'Sistema de utilidades' },
  { slug: 'ui', label: 'shadcn/ui', tag: 'ui', use: 'Componentes accesibles' },
  { slug: 'daisyui', label: 'daisyUI', tag: 'ui', use: 'Temas sobre Tailwind' },
  { slug: 'bootstrap', label: 'Bootstrap', tag: 'ui', use: 'Grid clásico' },
  { slug: 'animate.css', label: 'Animate.css', tag: 'motion', use: 'Entradas y hovers' },
  { slug: 'anime', label: 'anime.js', tag: 'motion', use: 'Timelines SVG/CSS' },
  { slug: 'react-bits', label: 'React Bits', tag: 'motion', use: 'Componentes wow' },
  { slug: 'lucide', label: 'Lucide', tag: 'iconos', use: 'Iconos de producto' },
  { slug: 'simple-icons', label: 'Simple Icons', tag: 'iconos', use: 'Logos de marcas' },
  { slug: 'Font-Awesome', label: 'Font Awesome', tag: 'iconos', use: 'Kit clásico' },
  { slug: 'nerd-fonts', label: 'Nerd Fonts', tag: 'tipo', use: 'Fuentes con glifos' },
  { slug: 'Graphite', label: 'Graphite', tag: 'editor', use: 'Vector y motion 2D' },
  { slug: 'luban-h5', label: 'Luban H5', tag: 'builder', use: 'Landings móviles' },
  { slug: 'brick-design', label: 'Brick Design', tag: 'builder', use: 'Low-code layout' },
  { slug: 'three.js', label: 'three.js', tag: '3d', use: 'WebGL / WebGPU' },
  { slug: 'Web-Dev-For-Beginners', label: 'Web Dev Beginners', tag: 'aprender', use: 'Currículum HTML/CSS' },
  { slug: '30-seconds-of-code', label: '30 seconds of code', tag: 'aprender', use: 'Snippets CSS' }
];
const CHIPS = ['Paleta editorial café','Hero de landing SaaS','Par de tipografías','Set de botones','Checklist de accesibilidad','Stack recomendado'];
const PALETTES = {
  cafe: { name: 'Tostado editorial', colors: ['#1A120B','#3C2A21','#D5BDAF','#E5E5CB','#C45C26'], note: 'Alto contraste papel/tinta. Evita naranja puro en texto largo.' },
  saas: { name: 'SaaS limpio', colors: ['#0B1220','#1E293B','#38BDF8','#F8FAFC','#22C55E'], note: 'Un acento (sky) + un éxito (green). El resto neutro.' },
  moda: { name: 'Moda frío', colors: ['#111111','#F5F0EB','#6B7280','#9F1239','#D6D3D1'], note: 'Negro + piedra + un rojo vino para CTA.' }
};
function repoUrl(slug) { return 'https://github.com/' + USER + '/' + slug; }
function renderRepos() {
  document.getElementById('repo-list').innerHTML = REPOS.map(r =>
    '<li><a class="block rounded-lg border border-white/10 px-3 py-2 hover:border-clay/60 hover:bg-white/5" href="' + repoUrl(r.slug) + '" target="_blank" rel="noopener"><span class="block font-medium">' + r.label + '</span><span class="text-xs text-paper/50">' + r.tag + ' · ' + r.use + '</span></a></li>'
  ).join('');
}
function addMsg(role, html) {
  const box = document.getElementById('chat');
  const el = document.createElement('article');
  el.className = 'rounded-xl px-3 py-3 text-sm ' + (role === 'user' ? 'msg-user ml-8' : 'msg-bot mr-4 animate__animated animate__fadeIn');
  el.innerHTML = html;
  box.appendChild(el);
  box.scrollTop = box.scrollHeight;
}
function setPreview(html) {
  document.getElementById('preview').innerHTML = html;
  if (window.lucide) lucide.createIcons();
}
function detectIntent(text) {
  const t = text.toLowerCase();
  if (t.includes('stack') || t.includes('repo')) return 'stack';
  if (t.includes('check') || t.includes('accesib')) return 'check';
  if (t.includes('tipo') || t.includes('fuente') || t.includes('par de')) return 'type';
  if (t.includes('boton') || t.includes('botón')) return 'buttons';
  if (t.includes('hero') || t.includes('landing') || t.includes('saas')) return 'hero';
  return 'palette';
}
function pickPalette(text) {
  const t = text.toLowerCase();
  if (t.includes('saas') || t.includes('tech') || t.includes('app')) return PALETTES.saas;
  if (t.includes('moda') || t.includes('lujo')) return PALETTES.moda;
  return PALETTES.cafe;
}
function respond(text) {
  const intent = detectIntent(text);
  if (intent === 'stack') {
    addMsg('bot', '<p class="mb-2"><strong>Stack que usa este bot</strong></p><ul class="list-disc space-y-1 pl-5 text-paper/80"><li>Tailwind + shadcn/ui</li><li>Animate.css y Lucide (esta página ya los carga)</li><li>Recursos: design-resources-for-developers</li><li>QA: Front-End-Checklist</li><li>Creación: Graphite</li></ul>');
    setPreview('<div class="flex min-h-[280px] flex-col justify-between p-6"><p class="text-xs uppercase tracking-[0.2em] text-stone-500">Stack</p><p class="font-serif text-3xl">Tailwind + Lucide + Animate</p><p class="text-sm text-stone-600">Sistema rápido, iconos consistentes, motion ligero.</p></div>');
    return;
  }
  if (intent === 'check') {
    addMsg('bot', '<p class="mb-2"><strong>Checklist mínimo</strong></p><ol class="list-decimal space-y-1 pl-5 text-paper/80"><li>Un h1.</li><li>Contraste 4.5:1.</li><li>Focus visible en botones.</li><li>Alt en imágenes.</li><li>Probar a 360px.</li></ol>');
    setPreview('<div class="p-6"><p class="text-xs uppercase tracking-widest text-stone-500">QA</p><h3 class="mt-2 text-2xl font-semibold">Si no se lee en el móvil, no está diseñado.</h3></div>');
    return;
  }
  if (intent === 'type') {
    addMsg('bot', '<p><strong>Par tipográfico</strong></p><p>Display: Fraunces. Cuerpo: Outfit. Escala 14 / 16 / 24 / 40.</p>');
    setPreview('<div class="p-6"><p style="font-family:Fraunces,serif" class="text-4xl leading-none">Café de altura</p><p class="mt-4 text-sm text-stone-600">Outfit en el cuerpo.</p></div>');
    return;
  }
  if (intent === 'buttons') {
    addMsg('bot', '<p><strong>Botones Tailwind</strong></p><pre class="mt-2 rounded-lg bg-black/40 p-3 font-mono text-xs">rounded-xl bg-zinc-900 px-4 py-2 text-white</pre>');
    setPreview('<div class="flex min-h-[280px] flex-col items-start justify-center gap-3 p-6"><button class="rounded-xl bg-zinc-900 px-4 py-2 text-sm text-white">Primario</button><button class="rounded-xl border border-zinc-300 px-4 py-2 text-sm">Secundario</button></div>');
    return;
  }
  if (intent === 'hero') {
    addMsg('bot', '<p><strong>Hero</strong></p><p>Eyebrow + h1 de 2 líneas + un CTA primario y uno secundario.</p>');
    setPreview('<div class="flex min-h-[280px] flex-col justify-center p-6"><p class="text-[11px] uppercase tracking-[0.25em] text-stone-500">Producto</p><h3 class="mt-2 font-serif text-3xl leading-none">Diseña sistemas, no pantallas sueltas</h3></div>');
    return;
  }
  const pal = pickPalette(text);
  addMsg('bot', '<p class="mb-2"><strong>Paleta: ' + pal.name + '</strong></p><p class="font-mono text-xs">' + pal.colors.join(' · ') + '</p><p class="mt-2 text-paper/80">' + pal.note + '</p>');
  setPreview('<div class="grid min-h-[280px] grid-cols-5">' + pal.colors.map(c => '<div style="background:' + c + '"></div>').join('') + '</div>');
}
document.getElementById('chips').innerHTML = CHIPS.map(c => '<button type="button" class="rounded-full border border-white/15 px-3 py-1 text-xs hover:border-clay" data-q="' + c + '">' + c + '</button>').join('');
document.getElementById('chips').addEventListener('click', function (e) {
  const btn = e.target.closest('[data-q]');
  if (!btn) return;
  document.getElementById('prompt').value = btn.getAttribute('data-q');
  document.getElementById('composer').requestSubmit();
});
document.getElementById('composer').addEventListener('submit', function (e) {
  e.preventDefault();
  const input = document.getElementById('prompt');
  const text = input.value.trim();
  if (!text) return;
  addMsg('user', text);
  input.value = '';
  respond(text);
});
renderRepos();
addMsg('bot', '<p><strong>Soy DiseñoBot.</strong> Pide una paleta, un hero, tipografías, botones, un stack o un checklist.</p>');
setPreview('<div class="flex min-h-[280px] items-end p-6"><p class="font-serif text-3xl leading-none">Empieza por el color,<br>no por el framework.</p></div>');
if (window.lucide) lucide.createIcons();
