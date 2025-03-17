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
}

interface Category {
  idCategory: number;
  name: string;
  parentId: number | null;
  level: number;
  description: string;
  subcategories?: Subcategory[];
}

interface Product {
  idProduct: number;
  name: string;
  points: number;
  categoryId: number;
  subcategoryId: number;
  sizeId: number;
  fabricTypeId: number;
  productNo: string;
  description: string;
  imageURL: string | null;
  isActive: boolean;
  supplier: string;
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

// Catégories et sous-catégories basées sur la base de données
export const mockCategories: Category[] = [
  {
    idCategory: 1,
    name: "Haut",
    parentId: null,
    level: 1,
    description: "Vêtements pour le haut du corps",
    subcategories: [
      {
        idCategory: 4,
        name: "Chemises",
        parentId: 1,
        level: 2,
        description: "Chemises à manches longues et courtes",
      },
      {
        idCategory: 5,
        name: "T-Shirts",
        parentId: 1,
        level: 2,
        description: "T-shirts et polos",
      },
      {
        idCategory: 6,
        name: "Manteaux",
        parentId: 1,
        level: 2,
        description: "Manteaux et vestes pour toutes saisons",
      },
    ],
  },
  {
    idCategory: 2,
    name: "Bas",
    parentId: null,
    level: 1,
    description: "Vêtements pour le bas du corps",
    subcategories: [
      {
        idCategory: 7,
        name: "Pantalons",
        parentId: 2,
        level: 2,
        description: "Pantalons de travail et uniformes",
      },
      {
        idCategory: 8,
        name: "Shorts",
        parentId: 2,
        level: 2,
        description: "Shorts et culottes courtes",
      },
    ],
  },
  {
    idCategory: 3,
    name: "Accessoire",
    parentId: null,
    level: 1,
    description: "Accessoires et équipements divers",
    subcategories: [
      {
        idCategory: 9,
        name: "Couvre-chefs",
        parentId: 3,
        level: 2,
        description: "Casquettes, tuques et autres couvre-chefs",
      },
      {
        idCategory: 10,
        name: "Ceintures",
        parentId: 3,
        level: 2,
        description: "Ceintures et accessoires de ceinture",
      },
      {
        idCategory: 11,
        name: "Badges",
        parentId: 3,
        level: 2,
        description: "Badges et identifiants",
      },
      {
        idCategory: 12,
        name: "Chaussures",
        parentId: 3,
        level: 2,
        description: "Bottes et chaussures",
      },
    ],
  },
];

// Produits basés sur la base de données
export const mockProducts: Product[] = [
  {
    idProduct: 1,
    name: "Blouson 3-1 Multi-fonctions Blauer",
    points: 229,
    categoryId: 1, // Haut
    subcategoryId: 6, // Manteaux
    sizeId: 4, // L
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
    categoryId: 1, // Haut
    subcategoryId: 6, // Manteaux
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
    name: "Chemise manche longue",
    points: 29,
    categoryId: 1, // Haut
    subcategoryId: 4, // Chemises
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
    idProduct: 4,
    name: "T-Shirt 3XDRY",
    points: 27,
    categoryId: 1, // Haut
    subcategoryId: 5, // T-Shirts
    sizeId: 4, // L
    fabricTypeId: 4, // 3XDry
    productNo: "8120X-NB",
    description: "T-shirt 3XDRY bleu-noir, tailles XS-3XL.",
    imageURL: null,
    isActive: true,
    supplier: "Blauer",
  },
  {
    idProduct: 5,
    name: "Pantalon poches Cargo",
    points: 42,
    categoryId: 2, // Bas
    subcategoryId: 7, // Pantalons
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
    idProduct: 6,
    name: "Culotte courte",
    points: 20,
    categoryId: 2, // Bas
    subcategoryId: 8, // Shorts
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
    idProduct: 7,
    name: "Casquette",
    points: 18,
    categoryId: 3, // Accessoire
    subcategoryId: 9, // Couvre-chefs
    sizeId: 8, // Taille unique
    fabricTypeId: 2, // Polyester
    productNo: "FP129",
    description: "Casquette avec logo, disponible en bleu ou noir.",
    imageURL: null,
    isActive: true,
    supplier: "Broderie Signature",
  },
  {
    idProduct: 8,
    name: "Ceinture en cuir 1½ pouce",
    points: 16,
    categoryId: 3, // Accessoire
    subcategoryId: 10, // Ceintures
    sizeId: 4, // L
    fabricTypeId: 6, // Cuir
    productNo: "ML1100-BK",
    description: "Ceinture en cuir noir avec boucle argent, tailles 28-54.",
    imageURL: null,
    isActive: true,
    supplier: "Blauer",
  },
  {
    idProduct: 9,
    name: "Badge de pompier avec clip ceinture en cuir",
    points: 67,
    categoryId: 3, // Accessoire
    subcategoryId: 11, // Badges
    sizeId: 8, // Taille unique
    fabricTypeId: 6, // Cuir
    productNo: "BADGE",
    description: "Badge de pompier avec clip ceinture en cuir.",
    imageURL: null,
    isActive: true,
    supplier: "Autre",
  },
  {
    idProduct: 10,
    name: "Bottes Fire-DEX",
    points: 150,
    categoryId: 3, // Accessoire
    subcategoryId: 12, // Chaussures
    sizeId: 4, // L
    fabricTypeId: 6, // Cuir
    productNo: "FIREDEX",
    description:
      "Bottes de pompier Fire-DEX, disponible en version régulier ou large, toutes pointures.",
    imageURL: null,
    isActive: true,
    supplier: "Fire-DEX",
  },
];

// Exporter les types pour pouvoir les utiliser ailleurs dans l'application
export type { Size, FabricType, Category, Subcategory, Product };
