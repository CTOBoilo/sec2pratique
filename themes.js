// =====================================================================
//  CALENDRIER DES THÈMES — c'est le seul fichier à modifier.
// =====================================================================
// Chaque bloc { ... } commence un lundi (« debut ») et reste actif jusqu'au bloc suivant.
// Les exercices changent tout seuls chaque lundi, même si tu ne touches à rien.
// Environ 1 question sur 4 vient des thèmes des deux blocs précédents (révision).
//
// Ce que ton fils voit en classe cette semaine ? Ajoute ou modifie un bloc.
// Les lignes qui commencent par // sont des commentaires (ignorées).
//
// grammaire : classes-de-mots, groupes-de-mots, fonctions-syntaxiques, accords-gn, accord-verbe,
//             participe-passe-etre, participe-passe-avoir, types-phrases, formes-phrases,
//             subordonnees, ponctuation,
//             homophones-a, homophones-ou, homophones-son, homophones-on, homophones-ces,
//             homophones-ce, homophones-leur, homophones-la, homophones-peu
//             (« homophones » tout court = tous les homophones)
// temps     : present, imparfait, passe-compose, plus-que-parfait, futur, conditionnel,
//             subjonctif, imperatif
// verbes    : (facultatif) liste de verbes à l'infinitif, ex. ['aller', 'finir', 'prendre']
// maths     : nombres-negatifs, priorite-operations, fractions, puissances-racines, pourcentages,
//             rapports-taux, proportionnalite, expressions-algebriques, equations-1er-degre,
//             perimetre-aire, aire-solides, statistiques, probabilites,
//             monomes, traduction-algebrique, suites, equations-parentheses, problemes-equations
// sujet     : (facultatif) sujet de rédaction imposé, sinon un sujet est tiré au hasard
// mots      : (facultatif) nombre de mots visé pour le texte, 100 par défaut
//
// Attention : garde les guillemets '...' et la virgule à la fin de chaque ligne.

// Part des questions de maths qui sont de l'algèbre, peu importe le thème de la semaine.
// 0.7 = 7 questions sur 10. Mets 0 pour suivre seulement le calendrier, 1 pour 100 % algèbre.
const PART_ALGEBRE = 0.7;

const THEMES = [
  { debut: '2026-08-31', grammaire: ['classes-de-mots'], temps: ['present'], maths: ['nombres-negatifs', 'priorite-operations'] },
  { debut: '2026-09-14', grammaire: ['groupes-de-mots', 'homophones-a'], temps: ['present', 'imparfait'], maths: ['fractions'] },
  { debut: '2026-09-28', grammaire: ['fonctions-syntaxiques', 'homophones-ou'], temps: ['imparfait', 'passe-compose'], maths: ['fractions', 'puissances-racines'] },
  { debut: '2026-10-12', grammaire: ['fonctions-syntaxiques', 'accords-gn'], temps: ['passe-compose'], maths: ['puissances-racines', 'pourcentages'] },
  { debut: '2026-10-26', grammaire: ['accords-gn', 'homophones-son', 'homophones-on'], temps: ['futur', 'conditionnel'], maths: ['pourcentages'] },
  { debut: '2026-11-09', grammaire: ['accord-verbe'], temps: ['futur', 'conditionnel'], maths: ['rapports-taux'] },
  { debut: '2026-11-23', grammaire: ['accord-verbe', 'homophones-ces'], temps: ['plus-que-parfait'], maths: ['proportionnalite'] },
  { debut: '2026-12-07', grammaire: ['participe-passe-etre', 'homophones-ce'], temps: ['passe-compose', 'plus-que-parfait'], maths: ['proportionnalite', 'expressions-algebriques'] },
  { debut: '2026-12-21', grammaire: ['homophones'], temps: ['present', 'imparfait', 'passe-compose', 'futur'], maths: ['nombres-negatifs', 'fractions', 'pourcentages'], sujet: 'Raconte ton plus beau souvenir du temps des Fêtes.' },
  { debut: '2027-01-04', grammaire: ['participe-passe-avoir'], temps: ['subjonctif'], maths: ['expressions-algebriques'] },
  { debut: '2027-01-18', grammaire: ['participe-passe-avoir', 'homophones-leur'], temps: ['subjonctif'], maths: ['equations-1er-degre'] },
  { debut: '2027-02-01', grammaire: ['types-phrases'], temps: ['imperatif'], maths: ['equations-1er-degre'] },
  { debut: '2027-02-15', grammaire: ['formes-phrases', 'homophones-la'], temps: ['imperatif', 'subjonctif'], maths: ['equations-1er-degre', 'expressions-algebriques'] },
  { debut: '2027-03-01', grammaire: ['formes-phrases', 'homophones-peu'], temps: ['futur', 'conditionnel'], maths: ['perimetre-aire'] },
  { debut: '2027-03-15', grammaire: ['subordonnees'], temps: ['passe-compose', 'imparfait'], maths: ['perimetre-aire'] },
  { debut: '2027-03-29', grammaire: ['subordonnees', 'ponctuation'], temps: ['plus-que-parfait', 'conditionnel'], maths: ['aire-solides'] },
  { debut: '2027-04-12', grammaire: ['ponctuation'], temps: ['subjonctif', 'present'], maths: ['aire-solides'] },
  { debut: '2027-04-26', grammaire: ['participe-passe-etre', 'participe-passe-avoir'], temps: ['passe-compose', 'plus-que-parfait'], maths: ['statistiques'] },
  { debut: '2027-05-10', grammaire: ['accord-verbe', 'accords-gn'], temps: ['imparfait', 'conditionnel', 'subjonctif'], maths: ['statistiques', 'probabilites'] },
  { debut: '2027-05-24', grammaire: ['homophones'], temps: ['futur', 'imperatif'], maths: ['probabilites'] },
  { debut: '2027-06-07', grammaire: ['fonctions-syntaxiques', 'participe-passe-avoir', 'homophones'], temps: ['present', 'imparfait', 'passe-compose', 'futur', 'conditionnel', 'subjonctif'], maths: ['equations-1er-degre', 'pourcentages', 'perimetre-aire', 'probabilites'], sujet: 'Qu\'as-tu le plus aimé apprendre cette année ? Explique.' },
];

if (typeof module !== 'undefined') module.exports = { THEMES, PART_ALGEBRE };
