// Conjugueur : verbes réguliers (-er, -ir type finir, -re type attendre) + tableau d'irréguliers.
// ponytail: pas de verbes à changement d'orthographe (appeler, acheter, payer…) ni pronominaux ; ajoute-les dans IRREG si besoin.

const PERSONNES = ['je', 'tu', 'il', 'nous', 'vous', 'ils'];

const TEMPS = {
  'present': 'présent',
  'imparfait': 'imparfait',
  'passe-compose': 'passé composé',
  'plus-que-parfait': 'plus-que-parfait',
  'futur': 'futur simple',
  'conditionnel': 'conditionnel présent',
  'subjonctif': 'subjonctif présent',
  'imperatif': 'impératif présent',
};

// pres: présent (6 formes), fut: radical du futur, pp: participe passé, aux: 'etre' si auxiliaire être.
// subj / imp / impf: seulement quand la règle générale ne marche pas.
const IRREG = {
  'être':     { pres: 'suis es est sommes êtes sont', fut: 'ser', pp: 'été', impf: 'ét', subj: 'sois sois soit soyons soyez soient', imp: 'sois soyons soyez' },
  'avoir':    { pres: 'ai as a avons avez ont', fut: 'aur', pp: 'eu', subj: 'aie aies ait ayons ayez aient', imp: 'aie ayons ayez' },
  'aller':    { pres: 'vais vas va allons allez vont', fut: 'ir', pp: 'allé', aux: 'etre', subj: 'aille ailles aille allions alliez aillent', imp: 'va allons allez' },
  'faire':    { pres: 'fais fais fait faisons faites font', fut: 'fer', pp: 'fait', subj: 'fasse fasses fasse fassions fassiez fassent' },
  'pouvoir':  { pres: 'peux peux peut pouvons pouvez peuvent', fut: 'pourr', pp: 'pu', subj: 'puisse puisses puisse puissions puissiez puissent', imp: null },
  'vouloir':  { pres: 'veux veux veut voulons voulez veulent', fut: 'voudr', pp: 'voulu', subj: 'veuille veuilles veuille voulions vouliez veuillent', imp: null },
  'savoir':   { pres: 'sais sais sait savons savez savent', fut: 'saur', pp: 'su', subj: 'sache saches sache sachions sachiez sachent', imp: 'sache sachons sachez' },
  'devoir':   { pres: 'dois dois doit devons devez doivent', fut: 'devr', pp: 'dû', imp: null },
  'venir':    { pres: 'viens viens vient venons venez viennent', fut: 'viendr', pp: 'venu', aux: 'etre' },
  'tenir':    { pres: 'tiens tiens tient tenons tenez tiennent', fut: 'tiendr', pp: 'tenu' },
  'prendre':  { pres: 'prends prends prend prenons prenez prennent', fut: 'prendr', pp: 'pris' },
  'mettre':   { pres: 'mets mets met mettons mettez mettent', fut: 'mettr', pp: 'mis' },
  'dire':     { pres: 'dis dis dit disons dites disent', fut: 'dir', pp: 'dit' },
  'voir':     { pres: 'vois vois voit voyons voyez voient', fut: 'verr', pp: 'vu' },
  'partir':   { pres: 'pars pars part partons partez partent', fut: 'partir', pp: 'parti', aux: 'etre' },
  'sortir':   { pres: 'sors sors sort sortons sortez sortent', fut: 'sortir', pp: 'sorti', aux: 'etre' },
  'dormir':   { pres: 'dors dors dort dormons dormez dorment', fut: 'dormir', pp: 'dormi' },
  'lire':     { pres: 'lis lis lit lisons lisez lisent', fut: 'lir', pp: 'lu' },
  'écrire':   { pres: 'écris écris écrit écrivons écrivez écrivent', fut: 'écrir', pp: 'écrit' },
  'boire':    { pres: 'bois bois boit buvons buvez boivent', fut: 'boir', pp: 'bu' },
  'croire':   { pres: 'crois crois croit croyons croyez croient', fut: 'croir', pp: 'cru' },
  'connaître':{ pres: 'connais connais connaît connaissons connaissez connaissent', fut: 'connaîtr', pp: 'connu' },
  'vivre':    { pres: 'vis vis vit vivons vivez vivent', fut: 'vivr', pp: 'vécu' },
  'courir':   { pres: 'cours cours court courons courez courent', fut: 'courr', pp: 'couru' },
  'recevoir': { pres: 'reçois reçois reçoit recevons recevez reçoivent', fut: 'recevr', pp: 'reçu' },
  'ouvrir':   { pres: 'ouvre ouvres ouvre ouvrons ouvrez ouvrent', fut: 'ouvrir', pp: 'ouvert', imp: 'ouvre ouvrons ouvrez' },
};

const REGULIERS = [
  'parler', 'chanter', 'jouer', 'aimer', 'regarder', 'travailler', 'écouter', 'trouver', 'donner', 'penser',
  'manger', 'nager', 'voyager', 'ranger', 'commencer', 'avancer', 'lancer', 'arriver', 'rester', 'tomber', 'entrer',
  'finir', 'choisir', 'réussir', 'grandir', 'réfléchir', 'obéir', 'remplir', 'bâtir',
  'attendre', 'vendre', 'répondre', 'entendre', 'perdre', 'rendre', 'descendre',
];
const AUX_ETRE = new Set(['arriver', 'rester', 'tomber', 'entrer', 'descendre']);

const VERBES = [...Object.keys(IRREG), ...REGULIERS];

// Présent des réguliers ; les verbes en -ger/-cer gardent le son devant a/o (mangeons, commençons).
function presentRegulier(v) {
  const r = v.slice(0, -2);
  if (v.endsWith('er')) {
    const nous = v.endsWith('ger') ? r + 'eons' : v.endsWith('cer') ? r.slice(0, -1) + 'çons' : r + 'ons';
    return [r + 'e', r + 'es', r + 'e', nous, r + 'ez', r + 'ent'];
  }
  if (v.endsWith('ir')) return ['is', 'is', 'it', 'issons', 'issez', 'issent'].map(e => r + e);
  return ['s', 's', '', 'ons', 'ez', 'ent'].map(e => r + e); // -re
}

function infos(v) {
  const ir = IRREG[v];
  const pres = ir ? ir.pres.split(' ') : presentRegulier(v);
  const pp = ir ? ir.pp : v.endsWith('er') ? v.slice(0, -2) + 'é' : v.endsWith('ir') ? v.slice(0, -1) : v.slice(0, -2) + 'u';
  const fut = ir ? ir.fut : v.endsWith('re') ? v.slice(0, -1) : v;
  const aux = (ir && ir.aux === 'etre') || AUX_ETRE.has(v) ? 'etre' : 'avoir';
  return { ir, pres, pp, fut, aux };
}

// Ajoute la terminaison de l'imparfait en gardant le son (mangeais, commençais).
function imparfait(v, radical) {
  const fins = ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'];
  return fins.map(f => {
    if (f[0] === 'a' && v.endsWith('ger') && !IRREG[v]) return radical + 'e' + f;
    if (f[0] === 'a' && v.endsWith('cer') && !IRREG[v]) return radical.slice(0, -1) + 'ç' + f;
    return radical + f;
  });
}

// Retourne les 6 formes (ou 3 pour l'impératif : tu, nous, vous), null si n'existe pas.
// Pour les temps composés, renvoie le participe au masculin ; voir reponsesAcceptees pour l'accord.
function conjuguer(v, temps) {
  const { ir, pres, pp, fut, aux } = infos(v);
  const radNous = pres[3].replace(/ons$/, '');
  const radNousBrut = v.endsWith('ger') && !ir ? radNous.slice(0, -1) : v.endsWith('cer') && !ir ? radNous.slice(0, -1) + 'c' : radNous;
  switch (temps) {
    case 'present': return pres;
    case 'imparfait': return imparfait(v, ir && ir.impf ? ir.impf : radNousBrut);
    case 'futur': return ['ai', 'as', 'a', 'ons', 'ez', 'ont'].map(f => fut + f);
    case 'conditionnel': return ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'].map(f => fut + f);
    case 'subjonctif': {
      if (ir && ir.subj) return ir.subj.split(' ');
      const r = pres[5].replace(/ent$/, '');
      return [r + 'e', r + 'es', r + 'e', radNousBrut + 'ions', radNousBrut + 'iez', r + 'ent'];
    }
    case 'imperatif': {
      if (ir && 'imp' in ir) return ir.imp ? ir.imp.split(' ') : null;
      const tu = v.endsWith('er') ? pres[1].replace(/s$/, '') : pres[1];
      return [tu, pres[3], pres[4]];
    }
    case 'passe-compose':
    case 'plus-que-parfait': {
      const auxTemps = temps === 'passe-compose' ? 'present' : 'imparfait';
      return conjuguer(aux === 'etre' ? 'être' : 'avoir', auxTemps).map(a => a + ' ' + pp);
    }
  }
  throw new Error('Temps inconnu : ' + temps);
}

// Toutes les réponses acceptées pour un verbe / temps / personne (0-5, ou 0-2 à l'impératif).
// Avec l'auxiliaire être, le participe s'accorde : on accepte masc. et fém. selon la personne.
function reponsesAcceptees(v, temps, p) {
  const forme = conjuguer(v, temps)[p];
  if (!(temps === 'passe-compose' || temps === 'plus-que-parfait') || infos(v).aux !== 'etre') return [forme];
  const pluriel = p >= 3;
  const base = forme + (pluriel ? 's' : '');
  const fem = forme + (pluriel ? 'es' : 'e');
  if (p === 4) return [forme, forme + 'e', forme + 's', forme + 'es']; // vous de politesse
  return p === 2 || p === 5 ? [base] : [base, fem]; // il / ils : masculin
}

if (typeof module !== 'undefined') module.exports = { PERSONNES, TEMPS, VERBES, IRREG, conjuguer, reponsesAcceptees };
