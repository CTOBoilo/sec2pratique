// Auto-vérification : node test.js  (aucune dépendance)
const assert = require('assert');
const { conjuguer, reponsesAcceptees, VERBES, TEMPS } = require('./conjugaison.js');
const { MATHS, ALGEBRE, creerRng, lireNombre, verifierNombre, verifierExpr, exprVersFonction } = require('./maths.js');
const { GRAMMAIRE, TEXTES, FINALES } = require('./banque.js');
const { THEMES } = require('./themes.js');
const { construire, normaliser, estJuste, compterMots, finaleJuste } = require('./app.js');

// --- Conjugaison : formes connues
const c = (v, t) => conjuguer(v, t).join(' ');
assert.strictEqual(c('manger', 'present'), 'mange manges mange mangeons mangez mangent');
assert.strictEqual(c('manger', 'imparfait'), 'mangeais mangeais mangeait mangions mangiez mangeaient');
assert.strictEqual(c('commencer', 'imparfait'), 'commençais commençais commençait commencions commenciez commençaient');
assert.strictEqual(c('finir', 'present'), 'finis finis finit finissons finissez finissent');
assert.strictEqual(c('finir', 'subjonctif'), 'finisse finisses finisse finissions finissiez finissent');
assert.strictEqual(c('attendre', 'futur'), 'attendrai attendras attendra attendrons attendrez attendront');
assert.strictEqual(c('être', 'imparfait'), 'étais étais était étions étiez étaient');
assert.strictEqual(c('faire', 'conditionnel'), 'ferais ferais ferait ferions feriez feraient');
assert.strictEqual(c('venir', 'subjonctif'), 'vienne viennes vienne venions veniez viennent');
assert.strictEqual(c('voir', 'subjonctif'), 'voie voies voie voyions voyiez voient');
assert.strictEqual(c('boire', 'imparfait'), 'buvais buvais buvait buvions buviez buvaient');
assert.strictEqual(c('parler', 'imperatif'), 'parle parlons parlez');
assert.strictEqual(c('aller', 'imperatif'), 'va allons allez');
assert.strictEqual(c('finir', 'imperatif'), 'finis finissons finissez');
assert.strictEqual(c('prendre', 'passe-compose'), 'ai pris as pris a pris avons pris avez pris ont pris');
assert.strictEqual(c('tomber', 'plus-que-parfait'), 'étais tombé étais tombé était tombé étions tombé étiez tombé étaient tombé');
assert.strictEqual(conjuguer('pouvoir', 'imperatif'), null);
assert.deepStrictEqual(reponsesAcceptees('aller', 'passe-compose', 5), ['sont allés']);
assert.deepStrictEqual(reponsesAcceptees('aller', 'passe-compose', 0), ['suis allé', 'suis allée']);
for (const v of VERBES) for (const t of Object.keys(TEMPS)) {
  const f = conjuguer(v, t);
  if (f) assert(f.every(x => typeof x === 'string' && x.length && !x.includes('undefined')), `${v} ${t}`);
}

// --- Normalisation des réponses
assert.strictEqual(normaliser("J'ai  Mangé"), 'ai mangé');
assert.strictEqual(normaliser("qu'il vienne"), 'vienne');
assert.strictEqual(normaliser('que nous finissions'), 'finissions');
assert(estJuste({ reps: ['suis allé', 'suis allée'] }, 'Je suis allée'));
assert(!estJuste({ reps: ['été'] }, 'ete'), 'les accents comptent');

// --- Lecture des nombres et expressions
assert.strictEqual(lireNombre('3/4'), 0.75);
assert.strictEqual(lireNombre('0,75'), 0.75);
assert.strictEqual(lireNombre('−2'), -2);
assert.strictEqual(lireNombre('12 cm'), 12);
assert.strictEqual(lireNombre('1 000'), 1000);
assert(Number.isNaN(lireNombre('abc')));
assert(verifierNombre('0,33', 1 / 3) && !verifierNombre('0,3', 1 / 3));
assert(verifierExpr('5 + 3x', '3x + 5'));
assert(verifierExpr('2(x+1)', '2x + 2'));
assert(verifierExpr('−x² + 1', '1 - x^2'));
assert(!verifierExpr('3x + 4', '3x + 5'));
assert(!verifierExpr('alert(1)', '1'), 'seuls chiffres, x et opérateurs sont acceptés');

// --- Maths : chaque générateur donne une réponse utilisable (et vérifiée par le correcteur)
for (const [cle, m] of Object.entries(MATHS)) {
  const R = creerRng(42);
  for (let i = 0; i < 300; i++) {
    const q = m.gen(R);
    assert(q.q && q.expl && !q.q.includes('undefined') && !q.expl.includes('NaN'), `${cle} : texte`);
    if (q.type === 'expr') assert(verifierExpr(q.rep, q.rep), `${cle} : ${q.rep}`);
    else assert(Number.isFinite(q.rep) && verifierNombre(String(q.rep), q.rep, q.tol), `${cle} : ${q.rep}`);
  }
}
// Équations : la réponse vérifie vraiment l'équation affichée
{
  const R = creerRng(7);
  for (let i = 0; i < 300; i++) {
    const q = MATHS['equations-1er-degre'].gen(R);
    const [g, d] = q.q.replace(/^Résous : /, '').split('<br>')[0].split(' = ');
    const f = s => new Function('x', `return ${s.replace(/−/g, '-').replace(/(\d)x/g, '$1*x')}`)(q.rep);
    assert.strictEqual(f(g), f(d), q.q);
  }
}

// Équations avec parenthèses / fractions : la réponse vérifie l'équation
{
  const R = creerRng(11);
  for (let i = 0; i < 300; i++) {
    const q = MATHS['equations-parentheses'].gen(R);
    const [g, d] = q.q.replace(/^Résous : /, '').split('<br>')[0].split(' = ').map(exprVersFonction);
    assert(Math.abs(g(q.rep) - d(q.rep)) < 1e-9, q.q);
  }
}
assert(verifierExpr('4n - 1', '4x − 1'), 'n accepté comme variable');
assert(verifierExpr('12x²', '3x × 4x') && verifierExpr('0.5x+4', 'x/2 + 4'));
assert(ALGEBRE.every(k => MATHS[k]), 'thèmes d\'algèbre existants');
// Environ 70 % d'algèbre sur l'année
{
  let alg = 0, total = 0;
  for (let d = new Date('2026-08-31T12:00'); d < new Date('2027-06-30'); d.setDate(d.getDate() + 7))
    for (const q of construire(d).maths) { total++; alg += Object.entries(MATHS).some(([k, m]) => ALGEBRE.includes(k) && m.titre === q.theme); }
  assert(alg / total > 0.6, `seulement ${Math.round(alg / total * 100)} % d'algèbre`);
  console.log(`  algèbre : ${Math.round(alg / total * 100)} % des questions de maths sur l'année`);
}

// --- Grammaire : chaque bonne réponse fait partie des choix
for (const [cle, t] of Object.entries(GRAMMAIRE)) for (const it of t.items) {
  const [rep, choix] = Array.isArray(it) ? [it[1], it[2] || t.choix] : [it.rep, it.choix];
  assert(choix && choix.includes(rep), `${cle} : « ${rep} » absent des choix`);
}

// --- Calendrier : toute l'année se construit sans erreur, et change chaque semaine
let precedent = '';
for (let d = new Date('2026-08-31T12:00'); d < new Date('2027-06-30'); d.setDate(d.getDate() + 7)) {
  const s = construire(d);
  assert.deepStrictEqual(s.avert, [], `${s.cle} : ${s.avert}`);
  assert.strictEqual(s.grammaire.length, 10, `${s.cle} grammaire`);
  assert.strictEqual(s.conjugaison.length, 12, `${s.cle} conjugaison`);
  assert.strictEqual(s.maths.length, 10, `${s.cle} maths`);
  const empreinte = JSON.stringify(s.maths.map(q => q.q));
  assert.notStrictEqual(empreinte, precedent, `${s.cle} identique à la semaine d'avant`);
  precedent = empreinte;
}
// Même semaine = même série ; nouvelle série = autres questions
const lundi = construire(new Date('2026-10-19T12:00')), jeudi = construire(new Date('2026-10-22T12:00'));
assert.strictEqual(JSON.stringify(lundi.maths), JSON.stringify(jeudi.maths));
assert.notStrictEqual(JSON.stringify(construire(new Date('2026-10-19T12:00'), 1).maths), JSON.stringify(lundi.maths));

// --- Finales en [é] : extraits bien annotés, rotation complète, correction
for (const t of TEXTES) {
  const marques = [...t.texte.matchAll(/\{([^|}]+)\|([^}]+)\}/g)];
  assert(marques.length >= 8, `${t.source} : seulement ${marques.length} finales`);
  for (const [, , fin] of marques) assert(FINALES[fin], `${t.source} : finale inconnue « ${fin} »`);
  assert(!/[{}|]/.test(t.texte.replace(/\{[^|}]+\|[^}]+\}/g, '')), `${t.source} : accolade mal fermée`);
}
{
  const vus = new Set();
  for (let i = 0; i < TEXTES.length; i++) vus.add(construire(new Date(2026, 9, 19 + 7 * i, 12)).finales.source + construire(new Date(2026, 9, 19 + 7 * i, 12)).finales.mots.length);
  assert.strictEqual(vus.size, new Set(TEXTES.map(t => t.source + [...t.texte.matchAll(/\{/g)].length)).size, 'chaque extrait passe une fois');
  const m = { rad: 'manqu', fin: 'er' };
  assert(finaleJuste(m, 'er') && finaleJuste(m, ' -ER ') && finaleJuste(m, 'manquer') && !finaleJuste(m, 'é'));
}

assert.strictEqual(compterMots("L'école est   finie !"), 3);

console.log('✓ Tous les tests passent');
