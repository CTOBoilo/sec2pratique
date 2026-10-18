// Banque de grammaire (Secondaire 2, grammaire nouvelle) et sujets de rédaction.
// Item = [phrase, bonne réponse, choix (facultatif, sinon ceux du thème), note (facultatif)]
//     ou { q, choix, rep, expl } pour une question libre.
// *mot* = mot ou groupe surligné. ___ = trou à remplir.
// Pour ajouter des questions : copie une ligne et change-la. Pour un nouveau thème : copie un bloc complet.

const GRAMMAIRE = {
  'classes-de-mots': {
    titre: 'Classes de mots',
    question: 'Quelle est la classe du mot surligné ?',
    regle: 'Le déterminant accompagne un nom ; le pronom remplace un nom. L\'adverbe est invariable et modifie un verbe, un adjectif ou un autre adverbe. La préposition introduit un complément ; la conjonction relie des phrases ou des groupes.',
    choix: ['nom', 'déterminant', 'adjectif', 'pronom', 'verbe', 'adverbe', 'préposition', 'conjonction'],
    items: [
      ['Les chevaux *rapides* galopent dans le champ.', 'adjectif'],
      ['*Plusieurs* élèves ont oublié leur devoir.', 'déterminant'],
      ['Mon frère *la* regarde attentivement.', 'pronom', null, '« la » est devant un verbe : il remplace un nom.'],
      ['Il marche *lentement* vers l\'école.', 'adverbe'],
      ['Elle range ses livres *dans* son casier.', 'préposition'],
      ['J\'aime le soccer *mais* je préfère le hockey.', 'conjonction'],
      ['La *neige* tombe depuis ce matin.', 'nom'],
      ['Nous *préparons* un exposé oral.', 'verbe'],
      ['*Leur* chien aboie toute la nuit.', 'déterminant', null, '« leur » devant un nom = déterminant.'],
      ['Je *leur* ai donné mes notes.', 'pronom', null, '« leur » devant un verbe = pronom.'],
      ['Ce film est *très* drôle.', 'adverbe'],
      ['Il est parti *sans* dire au revoir.', 'préposition'],
      ['Je lirai *quand* j\'aurai fini mes devoirs.', 'conjonction'],
      ['Cette *décision* surprend tout le monde.', 'nom'],
      ['*Celui-ci* est mon préféré.', 'pronom'],
      ['Le ciel devient *gris*.', 'adjectif'],
      ['*Quelques* nuages cachent le soleil.', 'déterminant'],
      ['Les joueurs *ont* gagné la partie.', 'verbe', null, 'Un auxiliaire est un verbe.'],
    ],
  },

  'groupes-de-mots': {
    titre: 'Groupes de mots',
    question: 'Quel est le groupe surligné ?',
    regle: 'Le noyau donne son nom au groupe : nom → GN, verbe conjugué → GV, préposition → GPrép, adjectif → GAdj, adverbe → GAdv.',
    choix: ['GN', 'GV', 'GPrép', 'GAdj', 'GAdv'],
    items: [
      ['*Le vieux pont de pierre* traverse la rivière.', 'GN'],
      ['Ma sœur *lit un roman policier*.', 'GV'],
      ['Nous irons *au parc* demain.', 'GPrép'],
      ['Ce gâteau est *vraiment délicieux*.', 'GAdj', null, 'Le noyau est l\'adjectif « délicieux ».'],
      ['Il court *vraiment vite*.', 'GAdv'],
      ['*Les élèves de ma classe* préparent une pièce de théâtre.', 'GN'],
      ['Le chat dort *sous la table*.', 'GPrép'],
      ['Mon oncle *répare sa voiture*.', 'GV'],
      ['Elle semble *fière de son travail*.', 'GAdj'],
      ['*Très souvent*, je marche jusqu\'à l\'école.', 'GAdv'],
      ['Le professeur parle *avec enthousiasme*.', 'GPrép'],
      ['*Ce livre* appartient à Julie.', 'GN'],
      ['Les enfants *jouent dehors*.', 'GV'],
    ],
  },

  'fonctions-syntaxiques': {
    titre: 'Fonctions syntaxiques',
    question: 'Quelle est la fonction du groupe surligné ?',
    regle: 'Sujet : encadré par « c\'est… qui », remplacé par il/elle/ils/elles. Complément direct : remplacé par le/la/les, après le verbe sans préposition. Complément indirect : commence par une préposition, remplacé par lui/leur/y/en. Complément de phrase : déplaçable et effaçable. Attribut du sujet : après un verbe attributif (être, sembler, devenir, paraître, rester).',
    choix: ['sujet', 'prédicat', 'complément de phrase', 'complément direct du verbe', 'complément indirect du verbe', 'attribut du sujet', 'complément du nom'],
    items: [
      ['*Mon voisin* répare sa clôture.', 'sujet'],
      ['Mon voisin *répare sa clôture*.', 'prédicat'],
      ['*Chaque matin*, je prends l\'autobus.', 'complément de phrase'],
      ['Je mange *une pomme*.', 'complément direct du verbe'],
      ['Elle parle *à son amie*.', 'complément indirect du verbe'],
      ['Ce chien semble *fatigué*.', 'attribut du sujet'],
      ['La maison *de mes grands-parents* est grande.', 'complément du nom'],
      ['Nous partirons en voyage *après les examens*.', 'complément de phrase'],
      ['Il pense *à ses vacances*.', 'complément indirect du verbe'],
      ['Les élèves écoutent *le professeur*.', 'complément direct du verbe'],
      ['Mon frère est *gardien de but*.', 'attribut du sujet'],
      ['J\'ai acheté un chandail *en laine*.', 'complément du nom'],
      ['*Ma tante et mon oncle* arrivent ce soir.', 'sujet'],
      ['Léa *deviendra médecin*.', 'prédicat'],
    ],
  },

  'accords-gn': {
    titre: 'Accords dans le groupe du nom',
    question: 'Choisis le bon accord.',
    regle: 'Dans le GN, le déterminant et l\'adjectif prennent le genre et le nombre du nom noyau.',
    items: [
      ['Des fleurs ___ décorent la table. (blanc)', 'blanches', ['blanc', 'blancs', 'blanche', 'blanches']],
      ['Une ___ idée m\'est venue. (nouveau)', 'nouvelle', ['nouveau', 'nouvel', 'nouvelle', 'nouvelles']],
      ['Attention aux rues ___ ! (glissant)', 'glissantes', ['glissant', 'glissants', 'glissante', 'glissantes']],
      ['Il porte des bas ___ . (bleu)', 'bleus', ['bleu', 'bleus', 'bleue', 'bleues']],
      ['Elle a des espadrilles ___ . (orange)', 'orange', ['orange', 'oranges'], 'Les couleurs qui viennent d\'un nom (orange, marron) sont invariables.'],
      ['Il a acheté des chandails ___ . (bleu foncé)', 'bleu foncé', ['bleu foncé', 'bleus foncés', 'bleus foncé'], 'Une couleur composée de deux mots est invariable.'],
      ['C\'est un ___ ami de mon père. (vieux)', 'vieil', ['vieux', 'vieil', 'vieille'], 'Devant une voyelle : vieil, nouvel, bel.'],
      ['Des voitures ___ sont arrivées chez le concessionnaire. (neuf)', 'neuves', ['neuf', 'neufs', 'neuve', 'neuves']],
      ['Ce sont les ___ joueurs de l\'équipe. (meilleur)', 'meilleurs', ['meilleur', 'meilleurs', 'meilleure', 'meilleures']],
      ['J\'ai vu une histoire et un film ___ . (intéressant)', 'intéressants', ['intéressant', 'intéressants', 'intéressante', 'intéressantes'], 'Masculin + féminin = masculin pluriel.'],
      ['Il fait des ___ tours de magie. (beau)', 'beaux', ['beau', 'beaux', 'belle', 'belles']],
      ['Je t\'attends depuis une heure et ___ . (demi)', 'demie', ['demi', 'demie', 'demis'], 'Après le nom, « demi » s\'accorde en genre seulement.'],
      ['Ces ___ chats sont adorables. (petit)', 'petits', ['petit', 'petits', 'petite', 'petites']],
    ],
  },

  'accord-verbe': {
    titre: 'Accord du verbe avec le sujet',
    question: 'Choisis la bonne forme du verbe.',
    regle: 'Trouve le sujet avec « c\'est… qui » : le verbe s\'accorde avec le noyau du sujet (personne et nombre).',
    items: [
      ['Les élèves de la classe ___ demain. (partir)', 'partent', ['part', 'partent'], 'Le noyau du sujet est « élèves ».'],
      ['Mon frère et ma sœur ___ au cinéma. (aller)', 'vont', ['va', 'vont']],
      ['Toi et moi ___ les meilleurs amis. (être)', 'sommes', ['sont', 'sommes', 'êtes'], 'Toi + moi = nous.'],
      ['Je les ___ souvent au parc. (voir)', 'vois', ['vois', 'voient'], '« les » est un pronom complément, pas le sujet.'],
      ['C\'est moi qui ___ raison. (avoir)', 'ai', ['a', 'ai'], '« qui » remplace « moi » : 1re personne.'],
      ['La plupart des invités ___ en retard. (arriver)', 'arrivent', ['arrive', 'arrivent']],
      ['Le chien des voisins ___ toute la nuit. (aboyer)', 'aboie', ['aboie', 'aboient'], 'Le noyau est « chien », pas « voisins ».'],
      ['Chacun de nous ___ son opinion. (avoir)', 'a', ['a', 'avons', 'ont'], '« Chacun » est singulier.'],
      ['Que ___-vous ? (dire)', 'dites', ['disez', 'dites']],
      ['Ma mère leur ___ une lettre. (écrire)', 'écrit', ['écrit', 'écrivent'], '« leur » est un pronom complément.'],
      ['Les feuilles que le vent ___ tombent dans la rue. (emporter)', 'emporte', ['emporte', 'emportent'], 'Le sujet de « emporte » est « le vent ».'],
    ],
  },

  'participe-passe-etre': {
    titre: 'Participe passé avec être',
    question: 'Accorde le participe passé.',
    regle: 'Avec l\'auxiliaire être, le participe passé s\'accorde avec le sujet (genre et nombre).',
    items: [
      ['Mes cousines sont ___ hier. (arriver)', 'arrivées', ['arrivé', 'arrivée', 'arrivés', 'arrivées']],
      ['Le spectacle était ___ par les élèves. (préparer)', 'préparé', ['préparé', 'préparée', 'préparés']],
      ['Les portes ont été ___ à clé. (fermer)', 'fermées', ['fermé', 'fermés', 'fermées'], '« été » est le participe de être : accord avec le sujet.'],
      ['Elle est ___ tôt ce matin. (partir)', 'partie', ['parti', 'partie', 'partis', 'parties']],
      ['Les garçons sont ___ au musée. (aller)', 'allés', ['allé', 'allés', 'allées']],
      ['Les fenêtres sont ___ . (ouvrir)', 'ouvertes', ['ouvert', 'ouverte', 'ouverts', 'ouvertes']],
      ['Ma grand-mère est ___ en Gaspésie. (naître)', 'née', ['né', 'née', 'nés', 'nées']],
      ['Les gâteaux seront ___ demain. (livrer)', 'livrés', ['livré', 'livrés', 'livrées']],
      ['Julie et Marc sont ___ en retard. (arriver)', 'arrivés', ['arrivé', 'arrivés', 'arrivées'], 'Féminin + masculin = masculin pluriel.'],
      ['La tempête est ___ pendant la nuit. (finir)', 'finie', ['fini', 'finie', 'finis', 'finies']],
    ],
  },

  'participe-passe-avoir': {
    titre: 'Participe passé avec avoir',
    question: 'Accorde le participe passé.',
    regle: 'Avec avoir, le participe passé s\'accorde avec le complément direct seulement s\'il est placé AVANT le verbe. Le sujet n\'a aucune influence.',
    items: [
      ['Elle a ___ des pommes. (manger)', 'mangé', ['mangé', 'mangée', 'mangées'], 'Le CD « des pommes » est après le verbe : pas d\'accord.'],
      ['Les pommes qu\'elle a ___ étaient sucrées. (manger)', 'mangées', ['mangé', 'mangée', 'mangées'], 'CD « qu\' » = les pommes, placé avant.'],
      ['Ces photos, je les ai ___ hier. (prendre)', 'prises', ['pris', 'prise', 'prises'], 'CD « les » = ces photos, placé avant.'],
      ['Nous avons ___ toute la soirée. (rire)', 'ri', ['ri', 'ris'], 'Pas de complément direct : pas d\'accord.'],
      ['La lettre que tu m\'as ___ m\'a fait plaisir. (écrire)', 'écrite', ['écrit', 'écrite', 'écrites']],
      ['Ils ont ___ leurs devoirs. (finir)', 'fini', ['fini', 'finis']],
      ['Quelle chanson as-tu ___ ? (choisir)', 'choisie', ['choisi', 'choisie', 'choisis'], 'CD « quelle chanson » placé avant.'],
      ['Mes amis, je les ai ___ au parc. (voir)', 'vus', ['vu', 'vus', 'vues']],
      ['Les filles ont ___ le match. (gagner)', 'gagné', ['gagné', 'gagnées'], 'Avec avoir, on n\'accorde jamais avec le sujet.'],
      ['Combien de livres as-tu ___ cet été ? (lire)', 'lus', ['lu', 'lus'], 'CD « combien de livres » placé avant.'],
    ],
  },

  'homophones-a': {
    titre: 'Homophones a / à', question: 'Complète avec le bon mot.', choix: ['a', 'à'],
    regle: '« a » = verbe avoir (on peut dire « avait »). « à » = préposition.',
    items: [['Mon frère ___ oublié son sac.', 'a'], ['Je vais ___ l\'école à pied.', 'à'], ['Elle ___ trois chats.', 'a'], ['Nous jouons ___ la balle.', 'à'], ['Il ___ toujours faim après l\'école.', 'a'], ['C\'est un sac ___ dos.', 'à'], ['Qui ___ pris mon crayon ?', 'a'], ['Il pense ___ ses vacances.', 'à']],
  },
  'homophones-ou': {
    titre: 'Homophones ou / où', question: 'Complète avec le bon mot.', choix: ['ou', 'où'],
    regle: '« ou » = ou bien (un choix). « où » = un lieu ou un moment.',
    items: [['Veux-tu du jus ___ du lait ?', 'ou'], ['Dis-moi ___ tu as mis mes clés.', 'où'], ['La ville ___ j\'habite est petite.', 'où'], ['Tu viens ce soir ___ demain ?', 'ou'], ['Le jour ___ il est arrivé, il neigeait.', 'où'], ['Choisis le rouge ___ le bleu.', 'ou']],
  },
  'homophones-son': {
    titre: 'Homophones son / sont', question: 'Complète avec le bon mot.', choix: ['son', 'sont'],
    regle: '« sont » = verbe être (on peut dire « étaient »). « son » = déterminant (on peut dire « mon »).',
    items: [['Ils ___ partis en vacances.', 'sont'], ['Il a perdu ___ cahier.', 'son'], ['Mes amis ___ très drôles.', 'sont'], ['Elle promène ___ chien.', 'son'], ['Les devoirs ___ terminés.', 'sont'], ['Je connais bien ___ frère.', 'son']],
  },
  'homophones-on': {
    titre: 'Homophones on / ont', question: 'Complète avec le bon mot.', choix: ['on', 'ont'],
    regle: '« ont » = verbe avoir (on peut dire « avaient »). « on » = pronom (on peut dire « il »).',
    items: [['Mes parents ___ acheté une voiture.', 'ont'], ['Ce soir, ___ va au cinéma.', 'on'], ['Les élèves ___ beaucoup de devoirs.', 'ont'], ['Demain, ___ partira tôt.', 'on'], ['Ils ___ gagné la partie.', 'ont'], ['Je pense que ___ est en retard.', 'on']],
  },
  'homophones-ces': {
    titre: 'Homophones ces / ses / c\'est / s\'est', question: 'Complète avec le bon mot.', choix: ['ces', 'ses', 'c\'est', 's\'est'],
    regle: '« ces » = démonstratif (ces… -là). « ses » = possessif (les siens). « c\'est » = cela est. « s\'est » = verbe pronominal (se + être).',
    items: [['Il range ___ vêtements dans son tiroir.', 'ses'], ['Regarde ___ nuages là-bas !', 'ces'], ['Je crois que ___ une bonne idée.', 'c\'est'], ['Elle ___ blessée au genou.', 's\'est'], ['Marc a oublié ___ lunettes.', 'ses'], ['Il ___ levé très tôt.', 's\'est'], ['Qui a apporté ___ biscuits-là ?', 'ces'], ['Dis-moi si ___ vrai.', 'c\'est']],
  },
  'homophones-ce': {
    titre: 'Homophones ce / se', question: 'Complète avec le bon mot.', choix: ['ce', 'se'],
    regle: '« se » = pronom devant un verbe (me, te, se). « ce » = déterminant devant un nom, ou pronom (cela).',
    items: [['Il ___ lave les mains.', 'se'], ['J\'aime ___ film.', 'ce'], ['Ils ___ parlent tous les jours.', 'se'], ['Tout ___ que tu dis est vrai.', 'ce'], ['Elle va ___ coucher tôt.', 'se'], ['Je lis ___ roman depuis lundi.', 'ce']],
  },
  'homophones-leur': {
    titre: 'Homophones leur / leurs', question: 'Complète avec le bon mot.', choix: ['leur', 'leurs'],
    regle: '« leur » devant un verbe = pronom, toujours invariable. Devant un nom : « leur » (un seul) ou « leurs » (plusieurs).',
    items: [['Je ___ ai parlé hier.', 'leur'], ['Les enfants rangent ___ jouets.', 'leurs'], ['Ils ont vendu ___ maison.', 'leur'], ['Le professeur ___ donne des devoirs.', 'leur'], ['Mes voisins promènent ___ deux chiens.', 'leurs'], ['Je ___ écrirai une lettre.', 'leur']],
  },
  'homophones-la': {
    titre: 'Homophones la / l\'a / là', question: 'Complète avec le bon mot.', choix: ['la', 'l\'a', 'là'],
    regle: '« là » = un lieu (ici / là). « l\'a » = on peut dire « l\'avait ». « la » = déterminant ou pronom.',
    items: [['Pose ton sac ___ .', 'là'], ['Cette pomme, il ___ mangée.', 'l\'a'], ['Je ___ vois tous les jours.', 'la'], ['Ce jour-___, il pleuvait.', 'là'], ['Elle a trouvé ___ réponse.', 'la'], ['Sa veste ? Il ___ oubliée à l\'école.', 'l\'a']],
  },
  'homophones-peu': {
    titre: 'Homophones peu / peut / peux', question: 'Complète avec le bon mot.', choix: ['peu', 'peut', 'peux'],
    regle: '« peu » = pas beaucoup. « peut / peux » = verbe pouvoir (on peut dire « pouvait ») : « peux » avec je/tu, « peut » avec il/elle/on.',
    items: [['Il ___ venir ce soir.', 'peut'], ['Tu ___ m\'aider ?', 'peux'], ['J\'ai ___ dormi cette nuit.', 'peu'], ['Je ne ___ pas sortir.', 'peux'], ['Elle mange très ___ .', 'peu'], ['On ___ commencer maintenant.', 'peut']],
  },

  'types-phrases': {
    titre: 'Types de phrases',
    question: 'Quel est le type de cette phrase ?',
    regle: 'Déclarative : donne une information. Interrogative : pose une question. Exclamative : exprime une émotion (!). Impérative : donne un ordre ou un conseil, sans sujet exprimé.',
    choix: ['déclarative', 'interrogative', 'exclamative', 'impérative'],
    items: [
      ['Range ta chambre avant le souper.', 'impérative'], ['Quelle belle journée !', 'exclamative'], ['As-tu terminé ton projet ?', 'interrogative'],
      ['Le train part à huit heures.', 'déclarative'], ['Comme tu as grandi !', 'exclamative'], ['Est-ce que tu viens avec nous ?', 'interrogative'],
      ['Ne touchez pas à ce fil.', 'impérative'], ['Mon équipe a gagné le tournoi.', 'déclarative'], ['Que ce paysage est magnifique !', 'exclamative'],
      ['Où as-tu caché les clés ?', 'interrogative'], ['Prenons l\'autobus de 7 h 30.', 'impérative'],
    ],
  },

  'formes-phrases': {
    titre: 'Formes de phrases',
    question: 'Quelle est la forme de cette phrase ?',
    regle: 'Positive / négative (ne… pas, ne… jamais, personne ne…). Active / passive (le sujet subit l\'action : être + participe passé + par…). Neutre / emphatique (on met un élément en relief : c\'est… qui, détachement). Personnelle / impersonnelle (« il » ne remplace rien : il pleut, il faut).',
    items: [
      ['Le gâteau a été mangé par Léo.', 'passive', ['active', 'passive']],
      ['Léo a mangé le gâteau.', 'active', ['active', 'passive']],
      ['Je ne comprends pas cet exercice.', 'négative', ['positive', 'négative']],
      ['Il pleut depuis trois jours.', 'impersonnelle', ['personnelle', 'impersonnelle']],
      ['C\'est ma sœur qui a gagné la course.', 'emphatique', ['neutre', 'emphatique']],
      ['Ce roman, je l\'ai lu deux fois.', 'emphatique', ['neutre', 'emphatique']],
      ['Personne n\'est venu à la fête.', 'négative', ['positive', 'négative']],
      ['Il faut terminer ce travail.', 'impersonnelle', ['personnelle', 'impersonnelle']],
      ['La lettre sera envoyée demain.', 'passive', ['active', 'passive']],
      ['Mes amis préparent une surprise.', 'neutre', ['neutre', 'emphatique']],
    ],
  },

  'subordonnees': {
    titre: 'Subordonnées',
    question: 'Quelle sorte de subordonnée est surlignée ?',
    regle: 'Relative : complète un nom (l\'antécédent), commence par qui, que, dont, où. Complétive : complète un verbe, souvent introduite par « que ». Circonstancielle : exprime le temps, la cause, le but… (quand, parce que, afin que, bien que).',
    choix: ['relative', 'complétive', 'circonstancielle'],
    items: [
      ['Le livre *que tu m\'as prêté* est passionnant.', 'relative'], ['Je pense *que tu as raison*.', 'complétive'],
      ['Nous sortirons *quand la pluie cessera*.', 'circonstancielle'], ['J\'ai un ami *qui parle quatre langues*.', 'relative'],
      ['Elle souhaite *que nous venions*.', 'complétive'], ['Il étudie *parce qu\'il veut réussir*.', 'circonstancielle'],
      ['La ville *où je suis né* est petite.', 'relative'], ['Je sais *qu\'il viendra demain*.', 'complétive'],
      ['*Bien qu\'il soit fatigué*, il continue.', 'circonstancielle'], ['Mon père, *dont je suis fier*, est pompier.', 'relative'],
    ],
  },

  'ponctuation': {
    titre: 'La virgule',
    regle: 'Virgule après un complément de phrase placé au début, entre les éléments d\'une énumération (pas avant « et »), avant « mais », autour d\'une apposition. Jamais entre le sujet et le prédicat.',
    items: [
      { q: 'Quelle phrase est bien ponctuée ?', rep: 'Demain matin, nous partirons en camping.', choix: ['Demain matin, nous partirons en camping.', 'Demain matin nous partirons, en camping.', 'Demain, matin nous partirons en camping.'], expl: 'Le complément de phrase placé au début est suivi d\'une virgule.' },
      { q: 'Quelle phrase est bien ponctuée ?', rep: 'J\'ai acheté des pommes, des poires et des bananes.', choix: ['J\'ai acheté des pommes, des poires et des bananes.', 'J\'ai acheté des pommes, des poires, et des bananes.', 'J\'ai acheté, des pommes des poires et des bananes.'], expl: 'Énumération : virgules entre les éléments, mais pas avant « et ».' },
      { q: 'Quelle phrase est bien ponctuée ?', rep: 'Mon chien, un labrador noir, adore nager.', choix: ['Mon chien, un labrador noir, adore nager.', 'Mon chien un labrador noir, adore nager.', 'Mon chien, un labrador noir adore nager.'], expl: 'L\'apposition est encadrée par deux virgules.' },
      { q: 'Quelle phrase est bien ponctuée ?', rep: 'Il voulait sortir, mais il pleuvait.', choix: ['Il voulait sortir, mais il pleuvait.', 'Il voulait sortir mais, il pleuvait.', 'Il voulait, sortir mais il pleuvait.'], expl: 'On met une virgule avant « mais ».' },
      { q: 'Quelle phrase est bien ponctuée ?', rep: 'Julie, viens ici !', choix: ['Julie, viens ici !', 'Julie viens, ici !', 'Julie viens ici, !'], expl: 'Le nom de la personne à qui on parle est détaché par une virgule.' },
      { q: 'Quelle phrase est bien ponctuée ?', rep: 'Les élèves de ma classe préparent un spectacle.', choix: ['Les élèves de ma classe préparent un spectacle.', 'Les élèves de ma classe, préparent un spectacle.', 'Les élèves, de ma classe préparent un spectacle.'], expl: 'Jamais de virgule entre le sujet et le prédicat.' },
      { q: 'Quelle phrase est bien ponctuée ?', rep: 'Pendant les vacances, Léa a lu, dessiné et nagé.', choix: ['Pendant les vacances, Léa a lu, dessiné et nagé.', 'Pendant les vacances Léa, a lu dessiné et nagé.', 'Pendant, les vacances Léa a lu dessiné, et nagé.'], expl: 'Virgule après le complément de phrase au début, et dans l\'énumération.' },
    ],
  },
};

const SUJETS = [
  'Raconte ta meilleure journée de l\'été.',
  'Si tu pouvais inventer un objet, lequel serait-ce et pourquoi ?',
  'Décris ton endroit préféré à Montréal.',
  'Les téléphones cellulaires devraient-ils être interdits à l\'école ? Donne ton opinion.',
  'Raconte un moment où tu as dû faire preuve de courage.',
  'Décris ton repas parfait.',
  'Imagine que tu te réveilles avec un superpouvoir pour une seule journée.',
  'Quel métier aimerais-tu faire plus tard et pourquoi ?',
  'Écris une lettre à toi-même dans dix ans.',
  'Raconte une tempête de neige mémorable.',
  'Décris ton animal préféré comme si tu le présentais à un extraterrestre.',
  'Faut-il faire des devoirs pendant les vacances ? Justifie ta réponse.',
  'Raconte la suite : « Quand j\'ai ouvert la porte du gymnase, il n\'y avait plus personne… »',
  'Quel livre, film ou jeu vidéo recommanderais-tu à un ami ? Pourquoi ?',
  'Décris une personne qui t\'inspire.',
  'Imagine une journée complète sans électricité.',
  'Quelle est la plus belle saison au Québec selon toi ? Explique.',
  'Raconte un voyage, réel ou imaginaire.',
  'Si tu étais directeur de l\'école pour une journée, que changerais-tu ?',
  'Décris les bruits de ta ville le matin.',
  'Raconte une erreur qui t\'a appris quelque chose.',
  'Comment peux-tu protéger l\'environnement dans ta vie de tous les jours ?',
  'Imagine que ton animal (ou celui d\'un ami) peut parler pendant une heure.',
  'Décris ton sport préféré à quelqu\'un qui ne le connaît pas.',
  'Les jeux vidéo : bons ou mauvais pour les jeunes ? Donne ton opinion.',
  'Raconte un souvenir avec tes grands-parents.',
  'Invente une nouvelle fête et explique comment on la célèbre.',
  'Écris un dialogue entre un élève et un robot professeur.',
  'Décris ta chambre idéale.',
  'Raconte la suite : « Le message disait seulement : rendez-vous à minuit au parc… »',
  'Pourquoi l\'amitié est-elle importante ?',
  'Explique une recette que tu sais faire, étape par étape.',
  'Imagine Montréal en l\'an 2100.',
  'Raconte ta première journée au secondaire.',
  'Si tu pouvais rencontrer une personne célèbre, qui choisirais-tu et pourquoi ?',
  'L\'école devrait-elle commencer plus tard le matin ? Donne ton opinion.',
  'Décris un paysage d\'automne en utilisant les cinq sens.',
  'Raconte une compétition ou un match important pour toi.',
  'Écris une publicité pour vendre un objet complètement inutile.',
  'Imagine que tu es coincé dans un ascenseur avec ton enseignant.',
  'Quel talent aimerais-tu développer et comment t\'y prendrais-tu ?',
  'Décris un rêve étrange que tu as fait (ou invente-le).',
  'Raconte la journée d\'un objet de ton coffre à crayons.',
  'Faudrait-il apprendre une troisième langue à l\'école ? Pourquoi ?',
  'Décris ce que tu vois par la fenêtre de ta classe.',
  'Raconte la suite : « Personne ne m\'avait cru, mais cette fois, j\'avais une preuve… »',
  'Écris une lettre de remerciement à quelqu\'un qui t\'a aidé.',
  'Présente une invention qui a changé le monde.',
  'Qu\'est-ce qu\'un bon chef d\'équipe ?',
  'Décris la cabane à sucre à quelqu\'un qui n\'y est jamais allé.',
  'Imagine que les animaux de la ville prennent le contrôle du métro.',
  'Raconte une journée où tout est allé de travers.',
  'Les réseaux sociaux devraient-ils être interdits avant 16 ans ? Donne ton opinion.',
  'Décris le personnage principal de ton histoire préférée.',
  'Si tu pouvais voyager dans le temps, à quelle époque irais-tu ?',
  'Raconte une activité que tu as faite pour la première fois.',
  'Quelles sont les qualités d\'un bon ami ?',
  'Décris un objet auquel tu tiens beaucoup.',
  'Écris le début d\'une histoire de science-fiction.',
  'Que ferais-tu avec 1000 $ pour aider ton quartier ?',
];

// Finales de verbes en [é] dans des extraits d'œuvres du domaine public (texte de Project Gutenberg).
// {radical|finale} = la finale à trouver. Une ligne vide = nouveau paragraphe. […] = passage coupé.
const FINALES = {
  'er': 'Infinitif : on peut le remplacer par « vendre » ou « mordre ». Souvent après une préposition (à, de, pour, sans) ou un autre verbe.',
  'é': 'Participe passé : on peut le remplacer par « vendu ». Masculin singulier.',
  'ée': 'Participe passé : on peut le remplacer par « vendue ». Il s\'accorde au féminin singulier.',
  'és': 'Participe passé : on peut le remplacer par « vendus ». Il s\'accorde au masculin pluriel.',
  'ées': 'Participe passé : on peut le remplacer par « vendues ». Il s\'accorde au féminin pluriel.',
  'ez': 'Le sujet est « vous » : -ez.',
  'ai': 'Passé simple ou futur avec « je » : -ai.',
  'ais': 'Imparfait ou conditionnel avec « je » ou « tu » : -ais (on peut dire « vendais »).',
  'ait': 'Imparfait ou conditionnel avec il / elle / on (ou un nom singulier) : -ait (on peut dire « vendait »).',
  'aient': 'Imparfait ou conditionnel avec ils / elles (ou un nom pluriel) : -aient (on peut dire « vendaient »).',
};

const TEXTES = [
  { source: 'Alphonse Daudet, « La dernière classe », Contes du lundi (1873)', texte: `Ce matin-là j'{ét|ais} très en retard pour {all|er} à l'école, et j'{av|ais} grand'peur d'être {grond|é}, d'autant que M. Hamel nous {av|ait} dit qu'il nous {interroger|ait} sur les participes, et je n'en {sav|ais} pas le premier mot. Un moment l'idée me vint de {manqu|er} la classe et de prendre ma course à travers champs.

Le temps {ét|ait} si chaud, si clair!

On {entend|ait} les merles {siffl|er} à la lisière du bois, et dans le pré Rippert, derrière la scierie, les Prussiens qui {fais|aient} l'exercice. Tout cela me {tent|ait} bien plus que la règle des participes; mais j'eus la force de {résist|er}, et je courus bien vite vers l'école.` },

  { source: 'Alphonse Daudet, « La dernière classe », Contes du lundi (1873)', texte: `En passant devant la mairie, je vis qu'il y {av|ait} du monde {arrêt|é} près du petit grillage aux affiches. Depuis deux ans, c'est de là que nous sont venues toutes les mauvaises nouvelles, les batailles perdues, les réquisitions, les ordres de la commandature; et je {pens|ai} sans m'{arrêt|er}:

«Qu'est-ce qu'il y a encore?»

Alors, comme je {travers|ais} la place en courant, le forgeron Wachter, qui {ét|ait} là avec son apprenti en train de lire l'affiche, me cria:

«Ne te dépêche pas tant, petit; tu y arriveras toujours assez tôt à ton école!»

Je crus qu'il se {moqu|ait} de moi, et j'{entr|ai} tout {essouffl|é} dans la petite cour de M. Hamel.` },

  { source: 'Alphonse Daudet, « La chèvre de M. Seguin », Lettres de mon moulin (1869)', texte: `M. Seguin n'{av|ait} jamais eu de bonheur avec ses chèvres.

Il les {perd|ait} toutes de la même façon: un beau matin, elles {cass|aient} leur corde, s'en {all|aient} dans la montagne, et là-haut le loup les {mange|ait}. Ni les caresses de leur maître, ni la peur du loup, rien ne les {reten|ait}. C'{ét|ait}, paraît-il, des chèvres indépendantes, voulant à tout prix le grand air et la liberté.

Le brave M. Seguin, qui ne {compren|ait} rien au caractère de ses bêtes, {ét|ait} {constern|é}. Il {dis|ait}:

— C'est fini; les chèvres s'ennuient chez moi, je n'en {garder|ai} pas une.` },

  { source: 'Alphonse Daudet, « La chèvre de M. Seguin », Lettres de mon moulin (1869)', texte: `Ah! Gringoire, qu'elle {ét|ait} jolie la petite chèvre de M. Seguin! qu'elle {ét|ait} jolie avec ses yeux doux, sa barbiche de sous-officier, ses sabots noirs et luisants, ses cornes {zébr|ées} et ses longs poils blancs qui lui {fais|aient} une houppelande! […]

M. Seguin {av|ait} derrière sa maison un clos {entour|é} d'aubépines. C'est là qu'il mit la nouvelle pensionnaire. Il l'attacha à un pieu, au plus bel endroit du pré, en ayant soin de lui {laiss|er} beaucoup de corde, et de temps en temps il {ven|ait} voir si elle {ét|ait} bien. La chèvre se {trouv|ait} très heureuse et {brout|ait} l'herbe de si bon coeur que M. Seguin {ét|ait} ravi.` },

  { source: 'Alphonse Daudet, « La chèvre de M. Seguin », Lettres de mon moulin (1869)', texte: `Quand la chèvre blanche arriva dans la montagne, ce fut un ravissement général. Jamais les vieux sapins n'{av|aient} rien vu d'aussi joli. On la reçut comme une petite reine. Les châtaigniers se {baiss|aient} jusqu'à terre pour la {caress|er} du bout de leurs branches. Les genêts d'or s'{ouvr|aient} sur son passage, et {sent|aient} bon tant qu'ils {pouv|aient}. Toute la montagne lui fit fête.

Tu penses, Gringoire, si notre chèvre {ét|ait} heureuse! Plus de corde, plus de pieu... rien qui l'empêchât de {gambad|er}, de {brout|er} à sa guise... C'est là qu'il y en {av|ait} de l'herbe! jusque par-dessus les cornes, mon cher!... Et quelle herbe! Savoureuse, fine, {dentel|ée}, faite de mille plantes...` },

  { source: 'Alain-Fournier, Le Grand Meaulnes (1913)', texte: `Nous habitions les bâtiments du Cours Supérieur de Sainte-Agathe. Mon père, que j'{appel|ais} M. Seurel, comme les autres élèves, y {dirige|ait} à la fois le Cours supérieur, où l'on {prépar|ait} le brevet d'instituteur, et le Cours moyen. Ma mère {fais|ait} la petite classe. […]

Le hasard des «changements», une décision d'inspecteur ou de préfet, nous {av|aient} conduits là. Vers la fin des vacances, il y a bien longtemps, une voiture de paysan, qui {précéd|ait} notre ménage, nous {av|ait} {dépos|és}, ma mère et moi, devant la petite grille {rouill|ée}. Des gamins qui {vol|aient} des pêches dans le jardin s'{ét|aient} enfuis silencieusement par les trous de la haie...` },

  { source: 'Gustave Flaubert, « Un cœur simple », Trois contes (1877)', texte: `Pendant un demi-siècle, les bourgeoises de Pont l'Evêque envièrent à Mme Aubain sa servante Félicité.

Pour cent francs par an, elle {fais|ait} la cuisine et le ménage, {cous|ait}, {lav|ait}, {repass|ait}, {sav|ait} {brid|er} un cheval, {engraiss|er} les volailles, battre le beurre, et resta fidèle à sa maîtresse, — qui cependant n'{ét|ait} pas une personne agréable.

Elle {av|ait} {épous|é} un beau garçon sans fortune, mort au commencement de 1809, en lui laissant deux enfants très jeunes avec une quantité de dettes. Alors elle vendit ses immeubles, sauf la ferme de Toucques et la ferme de Geffosses, dont les rentes {mont|aient} à 5 000 francs tout au plus, et elle quitta sa maison de Saint-Melaine pour en {habit|er} une autre moins dispendieuse, ayant appartenu à ses ancêtres et {plac|ée} derrière les halles.` },

  { source: 'Louis Hémon, Maria Chapdelaine (1914)', texte: `La porte de l'église de Péribonka s'ouvrit et les hommes commencèrent à sortir.

Un instant plus tôt elle {av|ait} paru {désol|ée}, cette église, {juch|ée} au bord du chemin sur la berge haute, au-dessus de la rivière Péribonka, dont la nappe {glac|ée} et couverte de neige {ét|ait} toute pareille à une plaine. La neige {gis|ait} épaisse sur le chemin aussi, et sur les champs, car le soleil d'avril n'{envoy|ait} entre les nuages gris que quelques rayons sans chaleur et les grandes pluies de printemps n'{ét|aient} pas encore venues. Toute cette blancheur froide, la petitesse de l'église de bois et des quelques maisons, de bois également, {espac|ées} le long du chemin, la lisière sombre de la forêt, si proche qu'elle {sembl|ait} une menace, tout {parl|ait} d'une vie dure dans un pays austère.` },

  { source: 'Jules Renard, Poil de Carotte (1894)', texte: `— Je parie, dit madame Lepic, qu'Honorine a encore {oubli|é} de {ferm|er} les poules.

C'est vrai. On peut s'en {assur|er} par la fenêtre. Là-bas, tout au fond de la grande cour, le petit toit aux poules découpe, dans la nuit, le carré noir de sa porte ouverte.

— Félix, si tu {all|ais} les {ferm|er}? dit madame Lepic à l'aîné de ses trois enfants.

— Je ne suis pas ici pour m'{occup|er} des poules, dit Félix, garçon pâle, indolent et poltron.

— Et toi, Ernestine?

— Oh! Moi, maman, j'{aur|ais} trop peur!

Grand frère Félix et soeur Ernestine lèvent à peine la tête pour répondre. Ils lisent, très {intéress|és}, les coudes sur la table, presque front contre front.

— Dieu, que je suis bête! Dit madame Lepic. Je n'y {pens|ais} plus. Poil de Carotte, va {ferm|er} les poules!` },
];

if (typeof module !== 'undefined') module.exports = { GRAMMAIRE, SUJETS, FINALES, TEXTES };
