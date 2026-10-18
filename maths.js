// Générateurs de problèmes de maths, Secondaire 2 (PFEQ).
// Chaque gen(R) retourne { q (HTML), rep (nombre ou expression en x), type: 'nombre'|'expr', tol?, expl }.

// Générateur aléatoire déterministe : même graine = même série.
function creerRng(seed) {
  let a = seed >>> 0;
  const next = () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const int = (min, max) => min + Math.floor(next() * (max - min + 1));
  const pick = arr => arr[Math.floor(next() * arr.length)];
  const nonZero = (min, max) => { let n; do n = int(min, max); while (n === 0); return n; };
  const shuffle = arr => { const c = [...arr]; for (let i = c.length - 1; i > 0; i--) { const j = Math.floor(next() * (i + 1)); [c[i], c[j]] = [c[j], c[i]]; } return c; };
  return { next, int, pick, nonZero, shuffle };
}

const fr = n => String(Math.round(n * 1000) / 1000).replace('.', ',');
const dollars = n => n.toFixed(2).replace('.', ',') + ' $';
const par = n => (n < 0 ? `(${n})` : `${n}`);
const pgcd = (a, b) => (b === 0 ? Math.abs(a) : pgcd(b, a % b));
const frac = (n, d) => { if (d < 0) { n = -n; d = -d; } const g = pgcd(n, d) || 1; n /= g; d /= g; return d === 1 ? `${n}` : `${n}/${d}`; };
const sup = (b, e) => `${b}<sup>${e}</sup>`;
const PI_TOL = rep => Math.abs(rep) * 0.003 + 0.01; // accepte π de la calculatrice ou 3,14
const ARRONDI = ' <small>(arrondis au centième)</small>';

// Écrit ax + b proprement : 3x − 5, −x + 2, 4x, 7.
function poly(a, b) {
  const t = a === 0 ? '' : a === 1 ? 'x' : a === -1 ? '−x' : `${a}x`.replace('-', '−');
  if (b === 0) return t || '0';
  if (!t) return `${b}`.replace('-', '−');
  return `${t} ${b < 0 ? '−' : '+'} ${Math.abs(b)}`;
}

const MATHS = {
  'nombres-negatifs': {
    titre: 'Nombres positifs et négatifs',
    gen(R) {
      const op = R.pick(['+', '−', '×', '÷']);
      let a = R.nonZero(-20, 20), b = R.nonZero(-12, 12);
      if (op === '÷') a = b * R.nonZero(-9, 9);
      const rep = op === '+' ? a + b : op === '−' ? a - b : op === '×' ? a * b : a / b;
      const expl = { '+': 'Signes pareils : on additionne et on garde le signe. Signes différents : on soustrait et on garde le signe du plus grand.',
        '−': 'Soustraire un nombre, c\'est additionner son opposé.',
        '×': 'Signes pareils → positif ; signes différents → négatif.',
        '÷': 'Signes pareils → positif ; signes différents → négatif.' }[op];
      return { q: `${par(a)} ${op} ${par(b)} = ?`, rep, type: 'nombre', expl };
    },
  },

  'priorite-operations': {
    titre: 'Priorité des opérations',
    gen(R) {
      const a = R.int(2, 9), b = R.int(2, 9), c = R.int(2, 6), d = R.int(1, 5);
      const forme = R.int(0, 3);
      if (forme === 0) return { q: `${a} + ${b} × ${c} = ?`, rep: a + b * c, type: 'nombre', expl: `La multiplication d'abord : ${b} × ${c} = ${b * c}, puis ${a} + ${b * c}.` };
      if (forme === 1) return { q: `(${a} + ${b}) × ${c} − ${d} = ?`, rep: (a + b) * c - d, type: 'nombre', expl: `Parenthèses d'abord : ${a + b}, puis × ${c} = ${(a + b) * c}, puis − ${d}.` };
      if (forme === 2) { const k = b * c; return { q: `${a * 3} − ${k} ÷ ${c} + ${d} = ?`, rep: a * 3 - b + d, type: 'nombre', expl: `La division d'abord : ${k} ÷ ${c} = ${b}, puis de gauche à droite.` }; }
      const e = R.int(1, 4);
      return { q: `${a} × (${b} − ${e})<sup>2</sup> + ${d} = ?`, rep: a * (b - e) ** 2 + d, type: 'nombre', expl: `Parenthèses (${b - e}), puis l'exposant (${(b - e) ** 2}), puis × ${a}, puis + ${d}.` };
    },
  },

  'fractions': {
    titre: 'Fractions',
    gen(R) {
      const b = R.int(2, 10), d = R.int(2, 10), a = R.int(1, b + 2), c = R.int(1, d + 2);
      const op = R.pick(['+', '−', '×', '÷']);
      const [n, den] = op === '+' ? [a * d + c * b, b * d] : op === '−' ? [a * d - c * b, b * d] : op === '×' ? [a * c, b * d] : [a * d, b * c];
      const expl = { '+': 'Trouve un dénominateur commun, additionne les numérateurs, puis simplifie.',
        '−': 'Trouve un dénominateur commun, soustrais les numérateurs, puis simplifie.',
        '×': 'Numérateur × numérateur, dénominateur × dénominateur, puis simplifie.',
        '÷': 'Diviser, c\'est multiplier par l\'inverse de la 2e fraction.' }[op];
      return { q: `${a}/${b} ${op} ${c}/${d} = ? <small>(fraction irréductible)</small>`, rep: n / den, type: 'nombre', expl: `${expl} Réponse : ${frac(n, den)}.` };
    },
  },

  'puissances-racines': {
    titre: 'Puissances et racines carrées',
    gen(R) {
      const forme = R.int(0, 5);
      const a = R.int(2, 9), m = R.int(2, 6), n = R.int(2, 5);
      if (forme === 0) { const e = R.int(2, a <= 3 ? 5 : 3); return { q: `${sup(a, e)} = ?`, rep: a ** e, type: 'nombre', expl: `${a} multiplié par lui-même ${e} fois.` }; }
      if (forme === 1) { const r = R.int(2, 15); return { q: `√${r * r} = ?`, rep: r, type: 'nombre', expl: `${r} × ${r} = ${r * r}.` }; }
      if (forme === 2) return { q: `${sup(a, m)} × ${sup(a, n)} = ${a}<sup>?</sup>`, rep: m + n, type: 'nombre', expl: 'Même base en multiplication : on additionne les exposants.' };
      if (forme === 3) return { q: `${sup(a, m + n)} ÷ ${sup(a, n)} = ${a}<sup>?</sup>`, rep: m, type: 'nombre', expl: 'Même base en division : on soustrait les exposants.' };
      if (forme === 4) return { q: `(${sup(a, m)})<sup>${n}</sup> = ${a}<sup>?</sup>`, rep: m * n, type: 'nombre', expl: 'Puissance d\'une puissance : on multiplie les exposants.' };
      const neg = R.pick([true, false]);
      return neg
        ? { q: `(−${a})<sup>2</sup> = ?`, rep: a * a, type: 'nombre', expl: `Le − est dans la parenthèse : (−${a}) × (−${a}) = ${a * a}.` }
        : { q: `−${a}<sup>2</sup> = ?`, rep: -a * a, type: 'nombre', expl: `L'exposant s'applique seulement au ${a} : −(${a} × ${a}) = −${a * a}.` };
    },
  },

  'pourcentages': {
    titre: 'Pourcentages',
    gen(R) {
      const forme = R.int(0, 3);
      if (forme === 0) { const p = R.pick([5, 10, 15, 20, 25, 30, 40, 75]), t = R.pick([20, 40, 60, 80, 120, 200, 360]); return { q: `Combien font ${p} % de ${t} ?`, rep: p * t / 100, type: 'nombre', expl: `${p} % = ${p}/100, donc ${p} × ${t} ÷ 100.` }; }
      if (forme === 1) { const prix = R.pick([20, 40, 60, 80, 120]), p = R.pick([10, 15, 20, 25, 30, 50]); return { q: `Un chandail coûte ${prix} $. Il est en solde à ${p} % de rabais. Quel est le nouveau prix (en $) ?`, rep: prix * (100 - p) / 100, type: 'nombre', expl: `Rabais : ${p} % de ${prix} = ${fr(prix * p / 100)} $. Nouveau prix : ${prix} − ${fr(prix * p / 100)}.` }; }
      if (forme === 2) { const tot = R.pick([20, 25, 40, 50]), ok = R.int(Math.ceil(tot / 2), tot); return { q: `Sur un examen de ${tot} questions, Léa en réussit ${ok}. Quel est son résultat en pourcentage ?`, rep: ok / tot * 100, type: 'nombre', expl: `${ok} ÷ ${tot} × 100.` }; }
      const prix = R.pick([15, 25, 40, 60, 80]);
      return { q: `Un jeu coûte ${prix} $ avant taxes. Au Québec, les taxes (TPS + TVQ) sont de 14,975 %. Combien paies-tu (en $) ?${ARRONDI}`, rep: Math.round(prix * 1.14975 * 100) / 100, type: 'nombre', tol: 0.011, expl: `${prix} × 1,14975 = ${dollars(prix * 1.14975)}.` };
    },
  },

  'rapports-taux': {
    titre: 'Rapports et taux',
    gen(R) {
      const forme = R.int(0, 2);
      if (forme === 0) { const v = R.pick([60, 70, 80, 90, 100]), h = R.int(2, 5); return { q: `Une voiture parcourt ${v * h} km en ${h} h. Quelle est sa vitesse moyenne en km/h ?`, rep: v, type: 'nombre', expl: `Taux unitaire : ${v * h} ÷ ${h}.` }; }
      if (forme === 1) { const n = R.pick([4, 6, 8, 12]), u = R.pick([0.75, 1.25, 1.5, 2.25]); return { q: `Un paquet de ${n} jus coûte ${dollars(n * u)}. Quel est le prix d'un jus (en $) ?`, rep: u, type: 'nombre', expl: `${dollars(n * u)} ÷ ${n}.` }; }
      const g = R.int(2, 4), f = R.int(2, 5), k = R.int(3, 6);
      return { q: `Dans une classe, le rapport garçons : filles est ${g} : ${f}. Il y a ${(g + f) * k} élèves. Combien y a-t-il de filles ?`, rep: f * k, type: 'nombre', expl: `${g} + ${f} = ${g + f} parts. ${(g + f) * k} ÷ ${g + f} = ${k} élèves par part. Filles : ${f} × ${k}.` };
    },
  },

  'proportionnalite': {
    titre: 'Proportionnalité',
    gen(R) {
      const forme = R.int(0, 2);
      if (forme === 0) { const u = R.pick([1.5, 2.5, 3, 4.25]), a = R.int(3, 6), b = R.int(7, 12); return { q: `Si ${a} cahiers coûtent ${dollars(a * u)}, combien coûtent ${b} cahiers (en $) ?`, rep: b * u, type: 'nombre', expl: `Prix d'un cahier : ${dollars(a * u)} ÷ ${a} = ${dollars(u)}. Puis × ${b}.` }; }
      if (forme === 1) { const e = R.pick([5, 10, 20, 25, 50]), c = R.int(2, 12); return { q: `Sur une carte, 1 cm représente ${e} km. Deux villes sont à ${c} cm sur la carte. Quelle est la distance réelle en km ?`, rep: e * c, type: 'nombre', expl: `${c} × ${e}.` }; }
      const p = R.pick([2, 4]), q = R.pick([6, 8, 10]), farine = R.pick([100, 200, 300]);
      return { q: `Une recette pour ${p} personnes demande ${farine} g de farine. Combien de grammes pour ${q} personnes ?`, rep: farine * q / p, type: 'nombre', expl: `${farine} ÷ ${p} = ${fr(farine / p)} g par personne, × ${q}.` };
    },
  },

  'expressions-algebriques': {
    titre: 'Expressions algébriques',
    gen(R) {
      const forme = R.int(0, 2);
      const a = R.nonZero(-6, 9), b = R.nonZero(-9, 9), c = R.nonZero(-6, 9), d = R.nonZero(-9, 9);
      if (forme === 0) return { q: `Réduis : ${poly(a, b)} ${c < 0 ? '−' : '+'} ${Math.abs(c) === 1 ? '' : Math.abs(c)}x ${d < 0 ? '−' : '+'} ${Math.abs(d)}`, rep: poly(a + c, b + d), type: 'expr', expl: `Termes semblables : x avec x (${a} + ${par(c)} = ${a + c}), constantes avec constantes (${b} + ${par(d)} = ${b + d}).` };
      if (forme === 1) { const k = R.nonZero(-5, 6); return { q: `Développe : ${k}(${poly(a, b)})`, rep: poly(k * a, k * b), type: 'expr', expl: `Distributivité : ${k} × ${a}x et ${k} × ${par(b)}.` }; }
      const x = R.int(-4, 5), e = R.int(1, 4);
      return { q: `Évalue ${e}x<sup>2</sup> ${a < 0 ? '−' : '+'} ${Math.abs(a)}x ${b < 0 ? '−' : '+'} ${Math.abs(b)} pour x = ${x}`, rep: e * x * x + a * x + b, type: 'nombre', expl: `Remplace x par ${par(x)} : ${e} × ${par(x)}² + ${a} × ${par(x)} + ${par(b)}.` };
    },
  },

  'equations-1er-degre': {
    titre: 'Équations du 1er degré',
    gen(R) {
      const x = R.int(-10, 10), a = R.pick([2, 3, 4, 5, 6, 7, -2, -3]);
      if (R.int(0, 1) === 0) {
        const b = R.nonZero(-15, 15);
        return { q: `Résous : ${poly(a, b)} = ${a * x + b}<br><small>x = ?</small>`, rep: x, type: 'nombre', expl: `Enlève ${b} des deux côtés : ${a}x = ${a * x}. Divise par ${a} : x = ${x}.` };
      }
      let c; do c = R.int(-5, 6); while (c === a || c === 0);
      const b = R.nonZero(-12, 12), d = (a - c) * x + b;
      return { q: `Résous : ${poly(a, b)} = ${poly(c, d)}<br><small>x = ?</small>`, rep: x, type: 'nombre', expl: `Regroupe les x d'un côté : ${a - c}x = ${d - b}. Donc x = ${d - b} ÷ ${par(a - c)} = ${x}.` };
    },
  },

  'perimetre-aire': {
    titre: 'Périmètre et aire',
    gen(R) {
      const f = R.int(0, 5), L = R.int(3, 15), l = R.int(2, 10), h = R.int(2, 12);
      if (f === 0) return { q: `Rectangle de ${L} cm sur ${l} cm. Quel est son périmètre (cm) ?`, rep: 2 * (L + l), type: 'nombre', expl: `P = 2 × (${L} + ${l}).` };
      if (f === 1) return { q: `Triangle de base ${L} cm et de hauteur ${h} cm. Quelle est son aire (cm²) ?`, rep: L * h / 2, type: 'nombre', expl: `A = (b × h) ÷ 2 = (${L} × ${h}) ÷ 2.` };
      if (f === 2) { const B = L + l; return { q: `Trapèze : grande base ${B} cm, petite base ${L} cm, hauteur ${h} cm. Quelle est son aire (cm²) ?`, rep: (B + L) * h / 2, type: 'nombre', expl: `A = (B + b) × h ÷ 2 = (${B} + ${L}) × ${h} ÷ 2.` }; }
      if (f === 3) return { q: `Losange : grande diagonale ${L + l} cm, petite diagonale ${l} cm. Quelle est son aire (cm²) ?`, rep: (L + l) * l / 2, type: 'nombre', expl: `A = (D × d) ÷ 2.` };
      const r = R.int(2, 12);
      if (f === 4) { const rep = 2 * Math.PI * r; return { q: `Cercle de rayon ${r} cm. Quelle est sa circonférence (cm) ?${ARRONDI}`, rep, tol: PI_TOL(rep), type: 'nombre', expl: `C = 2πr = 2 × π × ${r} ≈ ${fr(Math.round(rep * 100) / 100)}.` }; }
      const rep = Math.PI * r * r;
      return { q: `Cercle de rayon ${r} cm. Quelle est son aire (cm²) ?${ARRONDI}`, rep, tol: PI_TOL(rep), type: 'nombre', expl: `A = πr² = π × ${r}² ≈ ${fr(Math.round(rep * 100) / 100)}.` };
    },
  },

  'aire-solides': {
    titre: 'Aire des solides',
    gen(R) {
      const f = R.int(0, 3), a = R.int(2, 10), b = R.int(2, 8), c = R.int(2, 8);
      if (f === 0) return { q: `Cube d'arête ${a} cm. Quelle est son aire totale (cm²) ?`, rep: 6 * a * a, type: 'nombre', expl: `6 faces carrées : 6 × ${a}².` };
      if (f === 1) return { q: `Prisme rectangulaire de ${a} cm × ${b} cm × ${c} cm. Quelle est son aire totale (cm²) ?`, rep: 2 * (a * b + a * c + b * c), type: 'nombre', expl: `A = 2 × (${a}×${b} + ${a}×${c} + ${b}×${c}).` };
      if (f === 2) return { q: `Prisme rectangulaire de ${a} cm × ${b} cm (base) et ${c} cm de hauteur. Quelle est son aire latérale (cm²) ?`, rep: 2 * (a + b) * c, type: 'nombre', expl: `Aire latérale = périmètre de la base × hauteur = 2 × (${a} + ${b}) × ${c}.` };
      const rep = 2 * Math.PI * b * b + 2 * Math.PI * b * c;
      return { q: `Cylindre de rayon ${b} cm et de hauteur ${c} cm. Quelle est son aire totale (cm²) ?${ARRONDI}`, rep, tol: PI_TOL(rep), type: 'nombre', expl: `2 disques (2πr²) + le rectangle enroulé (2πr × h).` };
    },
  },

  'statistiques': {
    titre: 'Statistiques',
    gen(R) {
      const n = R.pick([5, 7]), v = Array.from({ length: n }, () => R.int(40, 100));
      const liste = v.join(' ; '), tri = [...v].sort((x, y) => x - y);
      const f = R.int(0, 2);
      if (f === 0) { const m = v.reduce((s, x) => s + x, 0) / n; return { q: `Résultats : ${liste}. Quelle est la moyenne ? <small>(arrondis au dixième)</small>`, rep: m, tol: 0.051, type: 'nombre', expl: `Somme (${v.reduce((s, x) => s + x, 0)}) ÷ ${n} ≈ ${fr(Math.round(m * 10) / 10)}.` }; }
      if (f === 1) return { q: `Résultats : ${liste}. Quelle est la médiane ?`, rep: tri[(n - 1) / 2], type: 'nombre', expl: `Place les données en ordre : ${tri.join(' ; ')}. La valeur du milieu est la médiane.` };
      return { q: `Résultats : ${liste}. Quelle est l'étendue ?`, rep: tri[n - 1] - tri[0], type: 'nombre', expl: `Étendue = max − min = ${tri[n - 1]} − ${tri[0]}.` };
    },
  },

  'probabilites': {
    titre: 'Probabilités',
    gen(R) {
      const f = R.int(0, 3);
      if (f === 0) {
        const r = R.int(1, 6), b = R.int(1, 6), v = R.int(1, 6), t = r + b + v, [nom, k] = R.pick([['rouge', r], ['bleue', b], ['verte', v]]);
        return { q: `Un sac contient ${r} billes rouges, ${b} bleues et ${v} vertes. Quelle est la probabilité de tirer une bille ${nom} ? <small>(fraction)</small>`, rep: k / t, type: 'nombre', expl: `Cas favorables ÷ cas possibles = ${k}/${t} = ${frac(k, t)}.` };
      }
      if (f === 1) {
        const [txt, k] = R.pick([['un nombre pair', 3], ['un nombre supérieur à 4', 2], ['un multiple de 3', 2], ['un nombre premier', 3], ['un 6', 1]]);
        return { q: `On lance un dé à 6 faces. Quelle est la probabilité d'obtenir ${txt} ? <small>(fraction)</small>`, rep: k / 6, type: 'nombre', expl: `${k} cas favorables sur 6 = ${frac(k, 6)}.` };
      }
      if (f === 2) return { q: 'On lance deux pièces de monnaie. Quelle est la probabilité d\'obtenir deux fois « pile » ? <small>(fraction)</small>', rep: 1 / 4, type: 'nombre', expl: 'Résultats possibles : PP, PF, FP, FF. Un seul est favorable : 1/4.' };
      const s = R.int(2, 12), k = 6 - Math.abs(7 - s);
      return { q: `On lance deux dés à 6 faces. Quelle est la probabilité que la somme soit ${s} ? <small>(fraction)</small>`, rep: k / 36, type: 'nombre', expl: `Il y a 36 résultats possibles et ${k} donnent une somme de ${s} : ${frac(k, 36)}.` };
    },
  },
};

// Lit « 3/4 », « 0,75 », « -2 », « 12 cm », « 1 000 ». NaN si illisible.
function lireNombre(texte) {
  const s = String(texte).replace(/\s/g, '').replace(/−/g, '-').replace(/,/g, '.');
  const m = s.match(/^(-?\d*\.?\d+)(?:\/(-?\d*\.?\d+))?/);
  if (!m) return NaN;
  return m[2] !== undefined ? Number(m[1]) / Number(m[2]) : Number(m[1]);
}

function verifierNombre(texte, rep, tol = 0.005) {
  const n = lireNombre(texte);
  return Number.isFinite(n) && Math.abs(n - rep) <= tol;
}

// Transforme « 3x² − 2(x + 1) » en fonction JS ; null si illisible.
function exprVersFonction(texte) {
  let s = String(texte).toLowerCase().replace(/\s/g, '').replace(/[−–]/g, '-').replace(/,/g, '.')
    .replace(/[×·]/g, '*').replace(/²/g, '^2').replace(/³/g, '^3');
  if (!s || !/^[0-9x+\-*/().^]+$/.test(s)) return null; // liste blanche : rien d'autre ne passe
  s = s.replace(/(\d|x|\))(?=x|\()/g, '$1*').replace(/\)(?=\d)/g, ')*');
  s = s.replace(/(\d*\.?\d+|x)\^(\d+)/g, 'Math.pow($1,$2)');
  if (s.includes('^')) return null;
  try { const f = new Function('x', `return ${s};`); f(1); return f; } catch { return null; }
}

// Deux expressions sont égales si elles donnent la même valeur pour plusieurs x.
function verifierExpr(texte, attendu) {
  const f = exprVersFonction(texte), g = exprVersFonction(attendu);
  if (!f || !g) return false;
  return [-2, -0.5, 0, 1, 3, 7].every(x => Math.abs(f(x) - g(x)) < 1e-9);
}

if (typeof module !== 'undefined') module.exports = { MATHS, creerRng, lireNombre, verifierNombre, verifierExpr, frac };
