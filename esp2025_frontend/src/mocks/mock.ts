// mocks.ts - Fichier de données mockées pour le catalogue

// Interfaces pour les types
interface Size {
  idSize: number;
  status: string;
}

interface FabricType {
  idFabricType: number;
  name: string;
}

interface Subcategory {
  idCategory: number;
  name: string;
  parentId: number | null;
  level: number;
  description: string;
  subcategories?: Subcategory[];
}

interface Category {
  idCategory: number;
  name: string;
  parentId: number | null;
  level: number;
  description: string;
  subcategories?: Category[];
}

interface Product {
  idProduct: number;
  name: string;
  points: number;
  categoryId: number;
  sizeId: number;
  fabricTypeId: number;
  productNo: string;
  description: string;
  imageURL: string | null;
  isActive: boolean;
  supplier: string;
}

// Interface pour représenter les grades
interface Grade {
  idGrade: number;
  nomGrade: string;
}

// Interface pour représenter les utilisateurs
interface User {
  idUser?: number;
  gradeId: number;
  email: string;
  ville: string;
  province: string;
  pays: string;
  noMatricule: number;
  password: string;
  firstName: string;
  lastName: string;
  points: number;
  isAdmin: boolean;
  isActive: boolean;
}

// Tailles basées sur la base de données
export const mockSizes: Size[] = [
  { idSize: 1, status: "XS" },
  { idSize: 2, status: "S" },
  { idSize: 3, status: "M" },
  { idSize: 4, status: "L" },
  { idSize: 5, status: "XL" },
  { idSize: 6, status: "XXL" },
  { idSize: 7, status: "XXXL" },
  { idSize: 8, status: "Taille unique" },
];

// Types de tissus basés sur la base de données
export const mockFabricTypes: FabricType[] = [
  { idFabricType: 1, name: "Coton" },
  { idFabricType: 2, name: "Polyester" },
  { idFabricType: 3, name: "Gore-Tex" },
  { idFabricType: 4, name: "3XDry" },
  { idFabricType: 5, name: "Polaire" },
  { idFabricType: 6, name: "Cuir" },
  { idFabricType: 7, name: "Mélange laine/nylon" },
  { idFabricType: 8, name: "Autre" },
];

// Catégories et sous-catégories basées sur la nouvelle structure à 3 niveaux
export const mockCategories: Category[] = [
  {
    idCategory: 1,
    name: "Vêtements",
    parentId: null,
    level: 1,
    description: "Tous types de vêtements et uniformes",
    subcategories: [
      {
        idCategory: 3,
        name: "Hauts",
        parentId: 1,
        level: 2,
        description: "Vêtements pour le haut du corps",
        subcategories: [
          {
            idCategory: 10,
            name: "Chemises",
            parentId: 3,
            level: 3,
            description: "Chemises à manches longues et courtes",
          },
          {
            idCategory: 11,
            name: "T-Shirts",
            parentId: 3,
            level: 3,
            description: "T-shirts et polos",
          },
          {
            idCategory: 12,
            name: "Manteaux",
            parentId: 3,
            level: 3,
            description: "Manteaux et vestes pour toutes saisons",
          },
          {
            idCategory: 13,
            name: "Chandails",
            parentId: 3,
            level: 3,
            description: "Chandails et vêtements en polar",
          },
        ],
      },
      {
        idCategory: 4,
        name: "Bas",
        parentId: 1,
        level: 2,
        description: "Vêtements pour le bas du corps",
        subcategories: [
          {
            idCategory: 14,
            name: "Pantalons",
            parentId: 4,
            level: 3,
            description: "Pantalons de travail et uniformes",
          },
          {
            idCategory: 15,
            name: "Shorts",
            parentId: 4,
            level: 3,
            description: "Shorts et culottes courtes",
          },
        ],
      },
      {
        idCategory: 5,
        name: "Chaussures",
        parentId: 1,
        level: 2,
        description: "Bottes et chaussures",
      },
    ],
  },
  {
    idCategory: 2,
    name: "Accessoires",
    parentId: null,
    level: 1,
    description: "Accessoires et équipements divers",
    subcategories: [
      {
        idCategory: 6,
        name: "Couvre-chefs",
        parentId: 2,
        level: 2,
        description: "Casquettes, tuques et autres couvre-chefs",
      },
      {
        idCategory: 7,
        name: "Ceintures",
        parentId: 2,
        level: 2,
        description: "Ceintures et accessoires de ceinture",
      },
      {
        idCategory: 8,
        name: "Badges",
        parentId: 2,
        level: 2,
        description: "Badges et identifiants",
      },
      {
        idCategory: 9,
        name: "Sacs",
        parentId: 2,
        level: 2,
        description: "Sacs et bagagerie",
      },
    ],
  },
];

// Produits basés sur la base de données avec les nouvelles catégories
export const mockProducts: Product[] = [
  // MANTEAUX
  {
    idProduct: 1,
    name: "Blouson 3-1 Multi-fonctions Blauer",
    points: 229,
    categoryId: 12, // Manteaux (niveau 3)
    sizeId: 3, // M
    fabricTypeId: 3, // Gore-Tex
    productNo: "6820Z-NB",
    description:
      'Blouson 3-en-1 avec bandes 3M (avant et collet), inscriptions "Incendie" au dos et devant de la coquille, écussons aux épaules.',
    imageURL: null,
    isActive: true,
    supplier: "Blauer",
  },
  {
    idProduct: 2,
    name: "Manteau Blauer 3/1 en Gore-Tex",
    points: 329,
    categoryId: 12, // Manteaux (niveau 3)
    sizeId: 4, // L
    fabricTypeId: 3, // Gore-Tex
    productNo: "9840Z-NB",
    description:
      'Manteau avec broderie du SSI sur intérieur et extérieur, inscriptions "Incendie" au dos et devant de la coquille, écussons aux épaules, épaulettes pour grades.',
    imageURL: null,
    isActive: true,
    supplier: "Blauer",
  },
  {
    idProduct: 3,
    name: "Manteau d'entraînement",
    points: 61,
    categoryId: 12, // Manteaux (niveau 3)
    sizeId: 4, // L
    fabricTypeId: 2, // Polyester
    productNo: "STXJ-2",
    description:
      "Manteau d'entraînement avec logo ton sur ton, disponible en tailles S-3XL.",
    imageURL: null,
    isActive: true,
    supplier: "Broderie Signature",
  },
  {
    idProduct: 4,
    name: "Manteau d'entraînement (hiver)",
    points: 100,
    categoryId: 12, // Manteaux (niveau 3)
    sizeId: 4, // L
    fabricTypeId: 2, // Polyester
    productNo: "WRX-1",
    description:
      "Manteau d'entraînement d'hiver avec logo ton sur ton, disponible en tailles S-3XL.",
    imageURL: null,
    isActive: true,
    supplier: "Broderie Signature",
  },

  // CHANDAILS
  {
    idProduct: 5,
    name: "Chandail en polar",
    points: 91,
    categoryId: 13, // Chandails (niveau 3)
    sizeId: 4, // L
    fabricTypeId: 5, // Polaire
    productNo: "505E-NB",
    description:
      "Chandail en polar bleu-noir, avec ou sans logo. ATTENTION! Commander un point plus grand.",
    imageURL: null,
    isActive: true,
    supplier: "Broderie Signature",
  },
  {
    idProduct: 6,
    name: "Molleton en polyester",
    points: 37,
    categoryId: 13, // Chandails (niveau 3)
    sizeId: 4, // L
    fabricTypeId: 2, // Polyester
    productNo: "F2047",
    description:
      "Molleton en polyester, disponible en rouge et anthracite ou marine et anthracite. Avec logo, tailles S-3XL.",
    imageURL: null,
    isActive: true,
    supplier: "Broderie Signature",
  },

  // CHEMISES
  {
    idProduct: 7,
    name: "Chemise manche longue",
    points: 29,
    categoryId: 10, // Chemises (niveau 3)
    sizeId: 4, // L
    fabricTypeId: 1, // Coton
    productNo: "SR1625-NB",
    description:
      'Chemise à manches longues bleue-noire, disponible en régulier ou "tall", tailles 14½ à 21½.',
    imageURL: null,
    isActive: true,
    supplier: "Blauer",
  },
  {
    idProduct: 8,
    name: "Chemise manche courte",
    points: 28,
    categoryId: 10, // Chemises (niveau 3)
    sizeId: 4, // L
    fabricTypeId: 1, // Coton
    productNo: "SR1725-NB",
    description: "Chemise à manches courtes bleue-noire, tailles 14½ à 21½.",
    imageURL: null,
    isActive: true,
    supplier: "Blauer",
  },
  {
    idProduct: 9,
    name: "Chemise manche longue 3XDry",
    points: 61,
    categoryId: 10, // Chemises (niveau 3)
    sizeId: 4, // L
    fabricTypeId: 4, // 3XDry
    productNo: "8903X-NB",
    description:
      'Chemise à manches longues 3XDry, disponible en régulier ou "tall", tailles 14½ à 21½.',
    imageURL: null,
    isActive: true,
    supplier: "Blauer",
  },

  // T-SHIRTS & POLOS
  {
    idProduct: 10,
    name: "T-Shirt 3XDRY",
    points: 27,
    categoryId: 11, // T-Shirts (niveau 3)
    sizeId: 4, // L
    fabricTypeId: 4, // 3XDry
    productNo: "8120X-NB",
    description: "T-shirt 3XDRY bleu-noir, tailles XS-3XL.",
    imageURL: null,
    isActive: true,
    supplier: "Blauer",
  },
  {
    idProduct: 11,
    name: "T-Shirt d'entraînement",
    points: 35,
    categoryId: 11, // T-Shirts (niveau 3)
    sizeId: 4, // L
    fabricTypeId: 1, // Coton
    productNo: "SAT-100",
    description:
      "T-shirt d'entraînement noir et rouge avec logo du SSIRDL à la poitrine. Tailles S-3XL.",
    imageURL: null,
    isActive: true,
    supplier: "Broderie Signature",
  },
  {
    idProduct: 12,
    name: "Polo",
    points: 65,
    categoryId: 11, // T-Shirts (niveau 3)
    sizeId: 4, // L
    fabricTypeId: 1, // Coton
    productNo: "8160-NB",
    description: "Polo bleu-noir avec ou sans logo, tailles XS-3XL.",
    imageURL: null,
    isActive: true,
    supplier: "Blauer",
  },

  // PANTALONS
  {
    idProduct: 13,
    name: "Pantalon poches Cargo",
    points: 42,
    categoryId: 14, // Pantalons (niveau 3)
    sizeId: 4, // L
    fabricTypeId: 1, // Coton
    productNo: "PTS5305-NB",
    description:
      "Pantalon avec poches cargo bleu-noir, bandes élastiques à la taille pour plus de confort, tailles 28-52.",
    imageURL: null,
    isActive: true,
    supplier: "Blauer",
  },
  {
    idProduct: 14,
    name: "Pantalon poches Cargo renforcé",
    points: 79,
    categoryId: 14, // Pantalons (niveau 3)
    sizeId: 4, // L
    fabricTypeId: 1, // Coton
    productNo: "8562S-NB",
    description:
      "Pantalon avec poches cargo bleu-noir, bandes élastiques à la taille pour confort, bandes réfléchissantes aux poches, tailles 28-52.",
    imageURL: null,
    isActive: true,
    supplier: "Blauer",
  },

  // SHORTS
  {
    idProduct: 15,
    name: "Culotte courte",
    points: 20,
    categoryId: 15, // Shorts (niveau 3)
    sizeId: 4, // L
    fabricTypeId: 1, // Coton
    productNo: "SAP-100",
    description:
      "Short d'entraînement noir avec logo à la cuisse, tailles S-3XL.",
    imageURL: null,
    isActive: true,
    supplier: "Broderie Signature",
  },
  {
    idProduct: 16,
    name: "Culotte longue",
    points: 45,
    categoryId: 15, // Shorts (niveau 3)
    sizeId: 4, // L
    fabricTypeId: 1, // Coton
    productNo: "STXP-2",
    description: "Pantalon d'entraînement noir, tailles S-3XL.",
    imageURL: null,
    isActive: true,
    supplier: "Broderie Signature",
  },

  // COUVRE-CHEFS
  {
    idProduct: 17,
    name: "Casquette",
    points: 18,
    categoryId: 6, // Couvre-chefs (niveau 2)
    sizeId: 8, // Taille unique
    fabricTypeId: 2, // Polyester
    productNo: "FP129",
    description: "Casquette avec logo, disponible en bleu ou noir.",
    imageURL: null,
    isActive: true,
    supplier: "Broderie Signature",
  },
  {
    idProduct: 18,
    name: "Tuque",
    points: 15,
    categoryId: 6, // Couvre-chefs (niveau 2)
    sizeId: 8, // Taille unique
    fabricTypeId: 2, // Polyester
    productNo: "TUQ",
    description: "Tuque avec logo à l'avant et titre à l'arrière.",
    imageURL: null,
    isActive: true,
    supplier: "Broderie Signature",
  },

  // CEINTURES
  {
    idProduct: 19,
    name: "Ceinture en cuir 1½ pouce",
    points: 16,
    categoryId: 7, // Ceintures (niveau 2)
    sizeId: 4, // L
    fabricTypeId: 6, // Cuir
    productNo: "ML1100-BK",
    description: "Ceinture en cuir noir avec boucle argent, tailles 28-54.",
    imageURL: null,
    isActive: true,
    supplier: "Blauer",
  },

  // BADGES
  {
    idProduct: 20,
    name: "Badge de pompier avec clip ceinture en cuir",
    points: 67,
    categoryId: 8, // Badges (niveau 2)
    sizeId: 8, // Taille unique
    fabricTypeId: 6, // Cuir
    productNo: "BADGE",
    description: "Badge de pompier avec clip ceinture en cuir.",
    imageURL: null,
    isActive: true,
    supplier: "Autre",
  },
  {
    idProduct: 21,
    name: "Guide FPDS en version électronique",
    points: 20,
    categoryId: 8, // Badges (niveau 2)
    sizeId: 8, // Taille unique
    fabricTypeId: 8, // Autre
    productNo: "FPDS",
    description:
      "Guide FPDS (Fire Priority Dispatch System) en version électronique.",
    imageURL: null,
    isActive: true,
    supplier: "Autre",
  },

  // CHAUSSURES
  {
    idProduct: 22,
    name: "Bottes Fire-DEX",
    points: 150,
    categoryId: 5, // Chaussures (niveau 2)
    sizeId: 4, // L
    fabricTypeId: 6, // Cuir
    productNo: "FIREDEX",
    description:
      "Bottes de pompier Fire-DEX, disponible en version régulier ou large, toutes pointures.",
    imageURL: null,
    isActive: true,
    supplier: "Fire-DEX",
  },
  {
    idProduct: 23,
    name: "Espadrilles",
    points: 130,
    categoryId: 5, // Chaussures (niveau 2)
    sizeId: 4, // L
    fabricTypeId: 8, // Autre
    productNo: "ESPADRILLES",
    description:
      "Espadrilles au choix de l'employé avec un maximum de 130 points. Si dépassement, l'employé paie la différence.",
    imageURL: null,
    isActive: true,
    supplier: "Autre",
  },

  // SACS
  {
    idProduct: 24,
    name: "Sac de sport OGIO",
    points: 51,
    categoryId: 9, // Sacs (niveau 2)
    sizeId: 8, // Taille unique
    fabricTypeId: 2, // Polyester
    productNo: "412030",
    description: "Sac de sport OGIO avec logo.",
    imageURL: null,
    isActive: true,
    supplier: "OGIO",
  },
];

// Données mockées pour les grades
export const mockGrades: Grade[] = [
  { idGrade: 1, nomGrade: "Pompier" },
  { idGrade: 2, nomGrade: "Administrateur" },
];

// Données mockées pour les utilisateurs
export const mockUsers: User[] = [
  {
    idUser: 1,
    gradeId: 1, // Pompier
    email: "pistouille@casernerdl.ca",
    ville: "Rivière-du-Loup",
    province: "Québec",
    pays: "Canada",
    noMatricule: 1,
    password: "Patate123",
    firstName: "Jean",
    lastName: "Pistouille",
    points: 0,
    isAdmin: false,
    isActive: true,
  },
  {
    idUser: 2,
    gradeId: 2, // Administrateur
    email: "adminJay@casernerdl.ca",
    ville: "Rivière-du-Loup",
    province: "Québec",
    pays: "Canada",
    noMatricule: 2,
    password: "Patate123",
    firstName: "Jérémie",
    lastName: "Lapointe",
    points: 0,
    isAdmin: true,
    isActive: true,
  },
];

// Exporter les types pour pouvoir les utiliser ailleurs dans l'application
export type { Size, FabricType, Category, Subcategory, Product, User, Grade };
