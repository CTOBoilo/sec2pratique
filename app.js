// Logique du site : choisit les thèmes de la semaine, génère les questions, corrige.
if (typeof module !== 'undefined') Object.assign(globalThis, require('./banque.js'), require('./conjugaison.js'), require('./maths.js'), require('./themes.js'));

const NB = { grammaire: 10, conjugaison: 12, maths: 10 };
const REVISION = 0.25; // part des questions tirées des thèmes précédents

// Lundi de la semaine (à midi pour éviter les surprises de fuseau horaire).
function lundi(date) {
  const d = new Date(date);
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
}
const isoLocal = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const hash = s => { let h = 2166136261; for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0; };

function semaineActive(cle) {
  const tri = [...THEMES].sort((a, b) => a.debut.localeCompare(b.debut));
  const i = Math.max(0, tri.findLastIndex(t => t.debut <= cle));
  return { actuel: tri[i], precedents: tri.slice(Math.max(0, i - 2), i) };
}

// « homophones » → tous les « homophones-… ». Avertit si un nom de thème n'existe pas.
function resoudre(noms, banque, avert) {
  return [...new Set((noms || []).flatMap(n => {
    if (banque[n]) return [n];
    const groupe = Object.keys(banque).filter(k => k.startsWith(n + '-'));
    if (!groupe.length) avert.push(`Thème inconnu : « ${n} »`);
    return groupe;
  }))];
}

// Tire un thème : surtout ceux de la semaine, parfois un ancien pour réviser.
const tirer = (R, actuels, anciens) => (anciens.length && R.next() < REVISION) || !actuels.length ? R.pick(anciens.length ? anciens : actuels) : R.pick(actuels);

const enHtml = s => s.replace(/\*(.+?)\*/g, '<mark>$1</mark>').replace(/___/g, '<span class="trou">_____</span>');

function questionsGrammaire(R, actuels, anciens) {
  if (!actuels.length && !anciens.length) return [];
  const vus = new Set(), out = [];
  for (let i = 0, essais = 0; out.length < NB.grammaire && essais < 200; essais++) {
    const cle = tirer(R, actuels, anciens), t = GRAMMAIRE[cle];
    const k = R.int(0, t.items.length - 1);
    if (vus.has(cle + k) && essais < 150) continue;
    vus.add(cle + k);
    const it = t.items[k];
    const q = Array.isArray(it)
      ? { q: t.question, phrase: it[0], rep: it[1], choix: it[2] || t.choix, expl: [t.regle, it[3]].filter(Boolean).join(' ') }
      : { q: it.q, phrase: '', rep: it.rep, choix: it.choix, expl: it.expl || t.regle };
    out.push({ theme: t.titre, html: `${q.q}${q.phrase ? `<div class="phrase">${enHtml(q.phrase)}</div>` : ''}`, choix: R.shuffle(q.choix), rep: q.rep, expl: q.expl });
    i++;
  }
  return out;
}

const PRONOMS = ['je', 'tu', 'il', 'nous', 'vous', 'ils'];
function questionsConjugaison(R, temps, anciens, verbes) {
  const out = [], vus = new Set();
  for (let essais = 0; out.length < NB.conjugaison && essais < 300; essais++) {
    const t = tirer(R, temps, anciens), v = R.pick(verbes);
    const formes = conjuguer(v, t);
    if (!formes) continue; // ex. pas d'impératif pour « pouvoir »
    const p = R.int(0, formes.length - 1);
    if (vus.has(v + t + p) && essais < 250) continue;
    vus.add(v + t + p);
    const pers = t === 'imperatif' ? ['(tu)', '(nous)', '(vous)'][p] : t === 'subjonctif' ? `que ${PRONOMS[p]}`.replace('que il', 'qu\'il') : PRONOMS[p];
    const reps = reponsesAcceptees(v, t, p);
    out.push({ theme: TEMPS[t], html: `<b>${v}</b> · ${TEMPS[t]}<div class="phrase">${pers} <span class="trou">_____</span></div>`, reps, expl: `Réponse : ${pers.replace(/[()]/g, '')} ${reps[0]}` });
  }
  return out;
}

// Une part fixe des questions est de l'algèbre ; les thèmes d'algèbre de la semaine comptent double.
function questionsMaths(R, actuels, anciens) {
  const part = typeof PART_ALGEBRE === 'number' ? PART_ALGEBRE : 0.7;
  const algSemaine = actuels.filter(k => ALGEBRE.includes(k)), alg = [...algSemaine, ...algSemaine, ...ALGEBRE];
  const out = [], vus = new Set();
  for (let essais = 0; out.length < NB.maths && essais < 100; essais++) {
    const cle = R.next() < part || (!actuels.length && !anciens.length) ? R.pick(alg) : tirer(R, actuels, anciens), q = MATHS[cle].gen(R);
    if (vus.has(q.q) && essais < 80) continue;
    vus.add(q.q);
    out.push({ theme: MATHS[cle].titre, ...q, html: q.q });
  }
  return out;
}

// Extrait littéraire : chaque {radical|finale} devient une case à remplir.
// Rotation : un extrait différent chaque semaine, tous passent avant qu'un revienne.
function extraitFinales(n) {
  const t = TEXTES[((n % TEXTES.length) + TEXTES.length) % TEXTES.length], mots = [];
  const html = t.texte.split(/\n\s*\n/).map(p => '<p>' + p.replace(/\{([^|}]+)\|([^}]+)\}/g, (_, rad, fin) =>
    `<span class="mot">${rad}<input class="fin" data-i="${mots.push({ rad, fin }) - 1}" aria-label="Finale de ${rad}…" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"></span>`) + '</p>').join('');
  return { source: t.source, html, mots };
}

// Accepte la finale seule (« er ») ou le mot entier (« manquer »).
const finaleJuste = (m, valeur) => { const v = String(valeur).trim().toLowerCase().replace(/^-/, ''); return v === m.fin || v === (m.rad + m.fin).toLowerCase(); };

// Tout le contenu d'une semaine. Même date + même série = mêmes questions.
function construire(date, serie = 0) {
  const lun = lundi(date), cle = isoLocal(lun);
  const { actuel, precedents } = semaineActive(cle);
  const anciens = champ => precedents.flatMap(p => p[champ] || []);
  const avert = [];
  const R = creerRng(hash(`${cle}:${serie}`));

  const verbes = (actuel.verbes || VERBES).filter(v => VERBES.includes(v) || !avert.push(`Verbe inconnu : « ${v} »`));
  const temps = t => t.filter(x => TEMPS[x] || !avert.push(`Temps inconnu : « ${x} »`));

  return {
    cle, lundi: lun, avert,
    grammaire: questionsGrammaire(R, resoudre(actuel.grammaire, GRAMMAIRE, avert), resoudre(anciens('grammaire'), GRAMMAIRE, [])),
    conjugaison: questionsConjugaison(R, (temps(actuel.temps || []).length ? temps(actuel.temps) : ['present']), temps(anciens('temps')), verbes.length ? verbes : VERBES),
    maths: questionsMaths(R, resoudre(actuel.maths, MATHS, avert), resoudre(anciens('maths'), MATHS, [])),
    sujet: actuel.sujet || creerRng(hash(cle)).pick(SUJETS), // le sujet ne change pas avec « Nouvelle série »
    mots: actuel.mots || 100,
    finales: extraitFinales(Math.round(lun / 6048e5) + serie),
  };
}

// « J'ai mangé » → « ai mangé » ; ignore majuscules et espaces, garde les accents.
function normaliser(s) {
  return String(s).toLowerCase().replace(/[’`]/g, '\'').replace(/\s+/g, ' ').trim()
    .replace(/^(que |qu')/, '').replace(/^(j'|(je|tu|il|elle|on|nous|vous|ils|elles) )/, '').trim();
}

function estJuste(q, valeur) {
  if (q.reps) return q.reps.some(r => normaliser(r) === normaliser(valeur));
  if (q.choix) return valeur === q.rep;
  if (q.type === 'expr') return verifierExpr(valeur, q.rep);
  return verifierNombre(valeur, q.rep, q.tol);
}

const compterMots = t => t.trim().split(/\s+/).filter(m => /[\p{L}\p{N}]/u.test(m)).length;

if (typeof module !== 'undefined') module.exports = { construire, normaliser, estJuste, compterMots, lundi, isoLocal, finaleJuste };

// ===================== Page web =====================
if (typeof document !== 'undefined') {
  const $ = s => document.querySelector(s);
  const stock = {
    get: k => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* navigation privée : tant pis */ } },
  };
  const params = new URLSearchParams(location.search);
  const date = params.get('date') ? new Date(params.get('date') + 'T12:00') : new Date();
  let serie = 0, semaine;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

  function afficherQuiz(nom) {
    const qs = semaine[nom], zone = $(`#${nom} .questions`);
    zone.innerHTML = qs.map((q, i) => `
      <li class="q" data-i="${i}">
        <div class="theme">${esc(q.theme)}</div>
        <div class="enonce">${q.html}</div>
        ${q.choix
          ? `<div class="choix">${q.choix.map(c => `<label><input type="radio" name="${nom}-${i}" value="${esc(c)}"> ${esc(c)}</label>`).join('')}</div>`
          : `<input type="text" class="rep" aria-label="Ta réponse" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">`}
        <div class="retro" aria-live="polite"></div>
      </li>`).join('') || '<p>Aucun thème choisi cette semaine.</p>';
    $(`#${nom} .score`).textContent = '';
    afficherMeilleur(nom);
  }

  function afficherMeilleur(nom) {
    const m = stock.get(`meilleur:${semaine.cle}:${nom}`);
    const total = nom === 'finales' ? semaine.finales.mots.length : semaine[nom].length;
    $(`#${nom} .meilleur`).textContent = m ? `Meilleur score cette semaine : ${m} / ${total}` : '';
  }

  function corriger(nom) {
    let bons = 0;
    document.querySelectorAll(`#${nom} .q`).forEach(li => {
      const q = semaine[nom][li.dataset.i];
      const valeur = q.choix ? (li.querySelector('input:checked') || {}).value || '' : li.querySelector('.rep').value;
      const ok = valeur !== '' && estJuste(q, valeur);
      bons += ok;
      li.classList.toggle('ok', ok);
      li.classList.toggle('ko', !ok);
      const bonne = q.reps ? q.reps[0] : q.type === 'nombre' ? Math.round(q.rep * 1000) / 1000 : q.rep; // la fraction exacte est dans l'explication
      li.querySelector('.retro').innerHTML = ok ? '✓ Bravo !' : `✗ Bonne réponse : <b>${esc(String(bonne).replace('.', ','))}</b><br><small>${q.expl}</small>`;
    });
    $(`#${nom} .score`).textContent = `${bons} / ${semaine[nom].length}`;
    const cle = `meilleur:${semaine.cle}:${nom}`;
    if (bons > Number(stock.get(cle) || -1)) stock.set(cle, bons);
    afficherMeilleur(nom);
  }

  function afficherFinales() {
    const f = semaine.finales;
    $('#finales .extrait').innerHTML = f.html;
    $('#finales .source').textContent = f.source;
    $('#finales .explications').innerHTML = '';
    $('#finales .score').textContent = '';
    afficherMeilleur('finales');
  }

  function corrigerFinales() {
    const f = semaine.finales, erreurs = new Map();
    let bons = 0;
    document.querySelectorAll('#finales input.fin').forEach(inp => {
      const m = f.mots[inp.dataset.i], ok = finaleJuste(m, inp.value);
      bons += ok;
      inp.classList.toggle('ok', ok);
      inp.classList.toggle('ko', !ok);
      inp.nextElementSibling?.classList.contains('corr') && inp.nextElementSibling.remove();
      if (!ok) {
        inp.insertAdjacentHTML('afterend', `<sup class="corr">${m.fin}</sup>`);
        erreurs.set(m.rad + m.fin, m.fin);
      }
    });
    $('#finales .explications').innerHTML = [...erreurs].map(([mot, fin]) =>
      `<li><b>${esc(mot.slice(0, -fin.length))}<u>${esc(fin)}</u></b> — ${esc(FINALES[fin] || '')}</li>`).join('');
    $('#finales .score').textContent = `${bons} / ${f.mots.length}`;
    const cle = `meilleur:${semaine.cle}:finales`;
    if (bons > Number(stock.get(cle) || -1)) stock.set(cle, bons);
    afficherMeilleur('finales');
  }

  function charger() {
    semaine = construire(date, serie);
    const jour = semaine.lundi.toLocaleDateString('fr-CA', { day: 'numeric', month: 'long', year: 'numeric' });
    $('#semaine').textContent = `Semaine du ${jour}${serie ? ` · série ${serie + 1}` : ''}`;
    $('#avert').hidden = !semaine.avert.length;
    $('#avert').textContent = 'Erreur dans themes.js — ' + [...new Set(semaine.avert)].join(' · ');
    ['grammaire', 'conjugaison', 'maths'].forEach(afficherQuiz);
    afficherFinales();
  }

  // Rédaction
  function initRedaction() {
    const zone = $('#texte'), cleBrouillon = `brouillon:${semaine.cle}`;
    $('#sujet').textContent = semaine.sujet;
    zone.value = stock.get(cleBrouillon) || '';
    const maj = () => {
      const n = compterMots(zone.value), cible = semaine.mots;
      $('#compteur').textContent = `${n} mot${n > 1 ? 's' : ''} / ${cible}`;
      $('#compteur').className = Math.abs(n - cible) <= cible / 10 ? 'bon' : n > 0 ? 'loin' : '';
      stock.set(cleBrouillon, zone.value);
    };
    zone.addEventListener('input', maj);
    maj();
    const corps = () => `Sujet : ${semaine.sujet}\n\n${zone.value}\n\n(${compterMots(zone.value)} mots)`;
    $('#copier').onclick = async () => {
      try { await navigator.clipboard.writeText(corps()); $('#copier').textContent = 'Copié ✓'; } catch { zone.select(); $('#copier').textContent = 'Fais Cmd+C'; }
      setTimeout(() => ($('#copier').textContent = 'Copier'), 2000);
    };
    // Nouveau message Gmail dans un autre onglet ; le destinataire est choisi dans Gmail (rien de personnel dans le code public).
    $('#courriel').onclick = () => {
      const url = 'https://mail.google.com/mail/?' + new URLSearchParams({ view: 'cm', fs: '1', su: 'Rédaction — ' + $('#semaine').textContent, body: corps() });
      window.open(url, '_blank', 'noopener');
    };
  }

  // Onglets
  document.querySelectorAll('[role=tab]').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('[role=tab]').forEach(x => x.setAttribute('aria-selected', x === b));
    document.querySelectorAll('[role=tabpanel]').forEach(p => (p.hidden = p.id !== b.dataset.tab));
    stock.set('onglet', b.dataset.tab);
  }));
  document.querySelectorAll('.corriger').forEach(b => b.addEventListener('click', () => { const nom = b.closest('section').id; nom === 'finales' ? corrigerFinales() : corriger(nom); }));
  $('#nouvelle').addEventListener('click', () => { serie++; charger(); });

  charger();
  initRedaction();
  (document.querySelector(`[data-tab="${stock.get('onglet')}"]`) || document.querySelector('[role=tab]')).click();
}
