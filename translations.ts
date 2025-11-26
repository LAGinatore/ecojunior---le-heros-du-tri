import { Language } from './types';

export const TRANSLATIONS = {
  fr: {
    hero: {
      subtitle: "Deviens un super-héros de la planète ! Apprends à trier tes déchets en t'amusant.",
      play: "JOUER MAINTENANT",
      learn: "APPRENDRE",
      scan: "UTILISER LE SCANNER",
      detectiveTitle: "Détective des Déchets ?",
      detectiveDesc: "Prends une photo d'un déchet et l'IA magique te dira où le jeter !"
    },
    learn: {
      title: "Guide du Tri",
      back: "Retour",
      examples: "Exemples :"
    },
    game: {
      score: "Score",
      streak: "Suite",
      back: "Quitter",
      congrats: "BRAVO !",
      oops: "OUPS !",
      totalXp: "Total XP",
      newBadge: "NOUVEAU BADGE !",
      badgesTitle: "Mes Trophées",
      locked: "Verrouillé",
      keepPlaying: "Continue de jouer pour débloquer !",
      awesome: "Génial !",
      close: "Fermer",
      sortInto: "Trier dans"
    },
    scanner: {
      title: "Scanner Magique",
      back: "Retour",
      uploadTitle: "Montre-moi un déchet !",
      uploadDesc: "Prends une photo ou choisis une image, et je te dirai dans quelle poubelle elle va.",
      btnPhoto: "Prendre une photo",
      analyzing: "Analyse en cours...",
      change: "Changer",
      identify: "Identifier",
      error: "Oups, une erreur est survenue.",
      unknown: "L'IA n'a pas pu identifier l'image.",
      retry: "Réessayer",
      binLabel: "Va dans la poubelle :",
      unknownType: "Type inconnu",
      scanAgain: "Scanner un autre objet"
    },
    parents: {
      title: "Espace Parents",
      back: "Retour",
      intro: "Chers parents, sensibiliser vos enfants à la gestion des déchets est un investissement pour leur avenir. Voici quelques conseils pour vous aider dans cette démarche éducative.",
      tipsTitle: "5 Conseils pour un foyer écoresponsable :",
      tips: [
        "Montrez l'exemple : Les enfants imitent vos gestes. Triez systématiquement devant eux.",
        "Utilisez des bacs de couleur à la maison pour faciliter l'identification.",
        "Compostez en famille si vous avez un jardin ou un bac de quartier.",
        "Réduisez les déchets à la source : préférez les gourdes aux bouteilles en plastique.",
        "Transformez le tri en jeu : qui mettra le plus vite les emballages dans le bac jaune ?"
      ],
      didYouKnow: "Le saviez-vous ?",
      didYouKnowText: "Le recyclage d'une seule tonne de plastique permet d'économiser jusqu'à 2 tonnes de pétrole brut."
    },
    bins: {
      organic: { name: 'Organique', desc: "Pour les restes de nourriture et ce qui vient de la nature.", examples: ['Peaux de banane', 'Restes de repas', 'Feuilles mortes'] },
      paper: { name: 'Papier/Carton', desc: "Pour les journaux, les magazines et les boîtes en carton.", examples: ['Journaux', 'Magazines', 'Boîtes de céréales'] },
      plastic: { name: 'Plastique', desc: "Pour les bouteilles en plastique et les emballages.", examples: ['Bouteilles d\'eau', 'Flacons de shampooing', 'Pots de yaourt'] },
      glass: { name: 'Verre', desc: "Pour les bouteilles et pots en verre. Attention, ça casse !", examples: ['Bouteilles de jus', 'Pots de confiture', 'Bocaux'] },
      metal: { name: 'Métal', desc: "Pour les conserves, canettes et barquettes en aluminium.", examples: ['Boîtes de conserve', 'Canettes de soda', 'Barquettes alu'] },
      general: { name: 'Tout Venant', desc: "Pour ce qui ne se recycle pas.", examples: ['Couches', 'Vaisselle cassée', 'Mouchoirs sales'] }
    },
    badges: [
      { name: "Débutant", desc: "Tu as commencé ton aventure !" },
      { name: "Apprenti Trieur", desc: "Tu commences à comprendre le système." },
      { name: "Gardien de la Nature", desc: "La planète te remercie !" },
      { name: "Expert du Recyclage", desc: "Rien ne t'échappe !" },
      { name: "Légende Écologique", desc: "Tu es le héros ultime du tri !" }
    ],
    waste: [
      { name: 'Pomme', desc: 'Un reste de fruit délicieux.' },
      { name: 'Journal', desc: 'Les nouvelles d\'hier.' },
      { name: 'Bouteille', desc: 'Une bouteille en plastique vide.' },
      { name: 'Banane', desc: 'Une peau de banane glissante.' },
      { name: 'Carton', desc: 'Une boîte de livraison.' },
      { name: 'Bocal', desc: 'Un pot de confiture vide.' },
      { name: 'Os', desc: 'Les restes du poulet.' },
      { name: 'Conserve', desc: 'Une boîte de conserve.' },
      { name: 'Sac', desc: 'Un sac plastique sale.' },
      { name: 'Fleurs', desc: 'Des fleurs fanées.' },
      { name: 'Cahier', desc: 'Un vieux cahier d\'école.' },
      { name: 'Bouteille Verre', desc: 'Une bouteille de jus de raisin.' },
      // New Items
      { name: 'Coquille d\'œuf', desc: 'Parfait pour le compost !' },
      { name: 'Sachet de thé', desc: 'Après une bonne tasse de thé.' },
      { name: 'Enveloppe', desc: 'Une lettre reçue par la poste.' },
      { name: 'Rouleau WC', desc: 'Le tube en carton fini.' },
      { name: 'Paquet de chips', desc: 'Un emballage gras et brillant.' },
      { name: 'Brosse à dents', desc: 'En plastique dur, ne se recycle pas.' },
      { name: 'Pot de yaourt', desc: 'Un pot en plastique vide.' },
      { name: 'Flacon Parfum', desc: 'Une jolie bouteille en verre.' },
      { name: 'Paille', desc: 'Une paille en plastique.' },
      { name: 'Magazine', desc: 'Plein de pages colorées.' },
      { name: 'Arête de poisson', desc: 'Les restes du dîner.' },
      { name: 'Verre cassé', desc: 'Attention aux doigts !' },
      { name: 'Stylo usé', desc: 'Il n\'écrit plus.' },
      { name: 'Boîte à pizza', desc: 'Carton un peu gras.' },
      { name: 'Canette', desc: 'Une canette de soda.' },
      { name: 'Bidon Lessive', desc: 'Gros bidon en plastique.' },
      { name: 'Mouchoir', desc: 'Un mouchoir en papier sale.' },
      { name: 'Coton-tige', desc: 'Ne va pas dans les toilettes !' }
    ]
  },
  en: {
    hero: {
      subtitle: "Become a planet superhero! Learn to sort waste while having fun.",
      play: "PLAY NOW",
      learn: "LEARN",
      scan: "USE SCANNER",
      detectiveTitle: "Waste Detective?",
      detectiveDesc: "Take a photo of waste and the magic AI will tell you where to throw it!"
    },
    learn: {
      title: "Sorting Guide",
      back: "Back",
      examples: "Examples:"
    },
    game: {
      score: "Score",
      streak: "Streak",
      back: "Quit",
      congrats: "GREAT JOB!",
      oops: "OOPS!",
      totalXp: "Total XP",
      newBadge: "NEW BADGE!",
      badgesTitle: "My Trophies",
      locked: "Locked",
      keepPlaying: "Keep playing to unlock!",
      awesome: "Awesome!",
      close: "Close",
      sortInto: "Sort into"
    },
    scanner: {
      title: "Magic Scanner",
      back: "Back",
      uploadTitle: "Show me some trash!",
      uploadDesc: "Take a photo or pick an image, and I'll tell you which bin it goes in.",
      btnPhoto: "Take a photo",
      analyzing: "Analyzing...",
      change: "Change",
      identify: "Identify",
      error: "Oops, something went wrong.",
      unknown: "AI couldn't identify the image.",
      retry: "Try again",
      binLabel: "Goes in bin:",
      unknownType: "Unknown type",
      scanAgain: "Scan another item"
    },
    parents: {
      title: "Parents Zone",
      back: "Back",
      intro: "Dear parents, teaching your children about waste management is an investment in their future. Here are some tips to help you in this educational journey.",
      tipsTitle: "5 Tips for an Eco-friendly Home:",
      tips: [
        "Lead by example: Children imitate your actions. Always sort waste in front of them.",
        "Use color-coded bins at home to make identification easier.",
        "Compost as a family if you have a garden or a neighborhood bin.",
        "Reduce waste at the source: prefer reusable bottles over plastic ones.",
        "Turn sorting into a game: who can put packaging in the yellow bin the fastest?"
      ],
      didYouKnow: "Did you know?",
      didYouKnowText: "Recycling just one ton of plastic saves up to 2 tons of crude oil."
    },
    bins: {
      organic: { name: 'Organic', desc: "For food scraps and things from nature.", examples: ['Banana peels', 'Leftovers', 'Dead leaves'] },
      paper: { name: 'Paper/Cardboard', desc: "For newspapers, magazines, and cardboard boxes.", examples: ['Newspapers', 'Magazines', 'Cereal boxes'] },
      plastic: { name: 'Plastic', desc: "For plastic bottles and packaging.", examples: ['Water bottles', 'Shampoo bottles', 'Yogurt pots'] },
      glass: { name: 'Glass', desc: "For glass bottles and jars. Careful, it breaks!", examples: ['Juice bottles', 'Jam jars', 'Jars'] },
      metal: { name: 'Metal', desc: "For tin cans, soda cans, and aluminum trays.", examples: ['Tin cans', 'Soda cans', 'Foil'] },
      general: { name: 'General Waste', desc: "For things that cannot be recycled.", examples: ['Diapers', 'Broken dishes', 'Dirty tissues'] }
    },
    badges: [
      { name: "Beginner", desc: "You started your journey!" },
      { name: "Sorter Apprentice", desc: "You are getting the hang of it." },
      { name: "Nature Guardian", desc: "The planet thanks you!" },
      { name: "Recycling Expert", desc: "Nothing escapes you!" },
      { name: "Eco Legend", desc: "You are the ultimate sorting hero!" }
    ],
    waste: [
      { name: 'Apple', desc: 'A delicious fruit core.' },
      { name: 'Newspaper', desc: 'Yesterday\'s news.' },
      { name: 'Bottle', desc: 'An empty plastic bottle.' },
      { name: 'Banana', desc: 'A slippery banana peel.' },
      { name: 'Cardboard', desc: 'A delivery box.' },
      { name: 'Jar', desc: 'An empty jam jar.' },
      { name: 'Bone', desc: 'Chicken leftovers.' },
      { name: 'Can', desc: 'A tin can.' },
      { name: 'Bag', desc: 'A dirty plastic bag.' },
      { name: 'Flowers', desc: 'Wilted flowers.' },
      { name: 'Notebook', desc: 'An old school notebook.' },
      { name: 'Glass Bottle', desc: 'A grape juice bottle.' },
      // New Items
      { name: 'Eggshell', desc: 'Perfect for compost!' },
      { name: 'Tea Bag', desc: 'After a nice cup of tea.' },
      { name: 'Envelope', desc: 'A letter from the mail.' },
      { name: 'Toilet Roll', desc: 'The finished cardboard tube.' },
      { name: 'Crisp Packet', desc: 'Shiny greasy wrapper.' },
      { name: 'Toothbrush', desc: 'Hard plastic, cannot recycle.' },
      { name: 'Yogurt Pot', desc: 'An empty plastic pot.' },
      { name: 'Perfume', desc: 'A fancy glass bottle.' },
      { name: 'Straw', desc: 'A plastic drinking straw.' },
      { name: 'Magazine', desc: 'Full of colorful pages.' },
      { name: 'Fish Bone', desc: 'Dinner leftovers.' },
      { name: 'Broken Glass', desc: 'Watch your fingers!' },
      { name: 'Old Pen', desc: 'It does not write anymore.' },
      { name: 'Pizza Box', desc: 'Greasy cardboard.' },
      { name: 'Soda Can', desc: 'An aluminum can.' },
      { name: 'Detergent', desc: 'Big plastic bottle.' },
      { name: 'Tissue', desc: 'A dirty paper tissue.' },
      { name: 'Cotton Bud', desc: 'Do not flush it!' }
    ]
  },
  ar: {
    hero: {
      subtitle: "كن بطلاً خارقاً للكوكب! تعلم فرز النفايات واستمتع بوقتك.",
      play: "العب الآن",
      learn: "تعلم",
      scan: "الماسح الضوئي",
      detectiveTitle: "محقق النفايات؟",
      detectiveDesc: "التقط صورة للنفايات وسيقوم الذكاء الاصطناعي السحري بإخبارك أين ترميها!"
    },
    learn: {
      title: "دليل الفرز",
      back: "رجوع",
      examples: "أمثلة:"
    },
    game: {
      score: "النقاط",
      streak: "تتابع",
      back: "خروج",
      congrats: "أحسنت!",
      oops: "أوبس!",
      totalXp: "مجموع الخبرة",
      newBadge: "وسام جديد!",
      badgesTitle: "أوسمتي",
      locked: "مغلق",
      keepPlaying: "استمر باللعب لفتح الأوسمة!",
      awesome: "رائع!",
      close: "إغلاق",
      sortInto: "فرز في"
    },
    scanner: {
      title: "الماسح السحري",
      back: "رجوع",
      uploadTitle: "أرني بعض النفايات!",
      uploadDesc: "التقط صورة أو اختر صورة، وسأخبرك في أي سلة يجب وضعها.",
      btnPhoto: "التقط صورة",
      analyzing: "جاري التحليل...",
      change: "تغيير",
      identify: "تعرف",
      error: "عذراً، حدث خطأ ما.",
      unknown: "لم يتمكن الذكاء الاصطناعي من التعرف على الصورة.",
      retry: "حاول مرة أخرى",
      binLabel: "توضع في سلة:",
      unknownType: "نوع غير معروف",
      scanAgain: "مسح عنصر آخر"
    },
    parents: {
      title: "منطقة الآباء",
      back: "رجوع",
      intro: "أعزائي الآباء، تعليم أطفالكم كيفية إدارة النفايات هو استثمار في مستقبلهم. إليكم بعض النصائح لمساعدتكم في هذه الرحلة التعليمية.",
      tipsTitle: "5 نصائح لمنزل صديق للبيئة:",
      tips: [
        "كونوا قدوة: الأطفال يقلدون أفعالكم. قوموا دائماً بفرز النفايات أمامهم.",
        "استخدموا صناديق ملونة في المنزل لتسهيل عملية الفرز.",
        "قوموا بالتسميد كعائلة إذا كان لديكم حديقة أو صندوق حي.",
        "قللوا النفايات من المصدر: فضلوا الزجاجات القابلة لإعادة الاستخدام على البلاستيكية.",
        "حولوا الفرز إلى لعبة: من يضع العبوات في السلة الصفراء أسرع؟"
      ],
      didYouKnow: "هل تعلم؟",
      didYouKnowText: "إعادة تدوير طن واحد فقط من البلاستيك يوفر ما يصل إلى 2 طن من النفط الخام."
    },
    bins: {
      organic: { name: 'عضوي', desc: "لبقايا الطعام والأشياء الطبيعية.", examples: ['قشور الموز', 'بقايا الطعام', 'أوراق شجر'] },
      paper: { name: 'ورق/كرتون', desc: "للصحف والمجلات وصناديق الكرتون.", examples: ['صحف', 'مجلات', 'علب حبوب'] },
      plastic: { name: 'بلاستيك', desc: "للزجاجات البلاستيكية والعبوات.", examples: ['زجاجات مياه', 'عبوات شامبو', 'أكواب زبادي'] },
      glass: { name: 'زجاج', desc: "للزجاجات والبرطمانات الزجاجية. احذر، إنها تنكسر!", examples: ['زجاجات عصير', 'برطمانات مربى', 'برطمانات'] },
      metal: { name: 'معادن', desc: "للعلب المعدنية والصفائح والألومنيوم.", examples: ['علب صفيح', 'علب صودا', 'ورق ألومنيوم'] },
      general: { name: 'نفايات عامة', desc: "للأشياء التي لا يمكن إعادة تدويرها.", examples: ['حفاضات', 'أطباق مكسورة', 'مناديل متسخة'] }
    },
    badges: [
      { name: "مبتدئ", desc: "لقد بدأت رحلتك!" },
      { name: "متدرب الفرز", desc: "بدأت تفهم النظام." },
      { name: "حارس الطبيعة", desc: "الكوكب يشكرك!" },
      { name: "خبير التدوير", desc: "لا شيء يفوتك!" },
      { name: "أسطورة البيئة", desc: "أنت بطل الفرز الخارق!" }
    ],
    waste: [
      { name: 'تفاحة', desc: 'بقايا فاكهة لذيذة.' },
      { name: 'جريدة', desc: 'أخبار الأمس.' },
      { name: 'زجاجة', desc: 'زجاجة بلاستيكية فارغة.' },
      { name: 'موزة', desc: 'قشرة موز زلقة.' },
      { name: 'كرتون', desc: 'صندوق توصيل.' },
      { name: 'برطمان', desc: 'برطمان مربى فارغ.' },
      { name: 'عظم', desc: 'بقايا دجاج.' },
      { name: 'علبة', desc: 'علبة صفيح.' },
      { name: 'كيس', desc: 'كيس بلاستيكي متسخ.' },
      { name: 'زهور', desc: 'زهور ذابلة.' },
      { name: 'دفتر', desc: 'دفتر مدرسي قديم.' },
      { name: 'زجاجة زجاجية', desc: 'زجاجة عصير عنب.' },
      // New Items
      { name: 'قشر البيض', desc: 'ممتاز للسماد!' },
      { name: 'كيس شاي', desc: 'بعد كوب شاي لذيذ.' },
      { name: 'ظرف', desc: 'رسالة من البريد.' },
      { name: 'رول تواليت', desc: 'أنبوب الكرتون المنتهي.' },
      { name: 'كيس شيبس', desc: 'غلاف لامع ودهني.' },
      { name: 'فرشاة أسنان', desc: 'بلاستيك صلب، لا يعاد تدويره.' },
      { name: 'كوب زبادي', desc: 'كوب بلاستيكي فارغ.' },
      { name: 'زجاجة عطر', desc: 'زجاجة زجاجية أنيقة.' },
      { name: 'مصاصة', desc: 'مصاصة شرب بلاستيكية.' },
      { name: 'مجلة', desc: 'مليئة بالصفحات الملونة.' },
      { name: 'عظم سمك', desc: 'بقايا العشاء.' },
      { name: 'زجاج مكسور', desc: 'انتبه لأصابعك!' },
      { name: 'قلم قديم', desc: 'لم يعد يكتب.' },
      { name: 'علبة بيتزا', desc: 'كرتون دهني.' },
      { name: 'علبة صودا', desc: 'علبة ألومنيوم.' },
      { name: 'منظف غسيل', desc: 'عبوة بلاستيكية كبيرة.' },
      { name: 'منديل', desc: 'منديل ورقي متسخ.' },
      { name: 'عواد قطنية', desc: 'لا ترميها في المرحاض!' }
    ]
  }
};