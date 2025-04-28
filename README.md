# Catalogue Pompier - Frontend (Structure généré par l'IA, modifié par Jérémie Lapointe)

Application web pour la gestion du catalogue d'équipements et de vêtements pour le Service d'Incendie de Rivière-du-Loup.

## Fonctionnalités

- **Système d'authentification** - Login sécurisé avec JWT
- **Catalogue de produits** - Consultation des produits disponibles avec filtrage par catégories
- **Gestion du panier** - Ajout de produits et passage de commande
- **Système de points** - Attribution et suivi des points pour les employés
- **Admin panel** - Interface d'administration pour la gestion des utilisateurs, produits et points

## Technologies utilisées

- React 19
- TypeScript
- React Router v7
- TailwindCSS
- Fetch API

## Structure du projet

```
src/
├── assets/             # Images et ressources statiques
├── components/
│   ├── common/         # Composants réutilisables (Header, Footer)
│   ├── layout/         # Composants de mise en page principale
│   └── modals/         # Fenêtres modales
├── mocks/              # Données mockées pour le développement (plus utilisé, à enlever)
├── page/               # Pages/routes principales
└── services/           # Services API pour les appels au backend
```

## Installation

1. Cloner le dépôt

   ```
   git clone https://github.com/JeremieLapointe13/ESP2025_CataloguePompier/tree/pre-prod
   cd esp2025_frontend
   ```

2. Installer les dépendances

   ```
   npm install
   ```

3. Créer un fichier `.env` à partir du modèle `.env.template`

   ```
   cp .env.template .env
   ```

   Puis modifier le fichier `.env` pour configurer l'URL de l'API backend.

4. Démarrer l'application en mode développement
   ```
   npm start
   ```

## Connexion

Veuillez contacter l'administrateur du système pour obtenir vos informations de connexion. (voir la remise Moodle)

## Scripts disponibles

- `npm start` - Lance l'application en mode développement
- `npm test` - Exécute les tests
- `npm run build` - Crée une version optimisée pour la production

## Points d'amélioration

- Implémentation de la section "Mes commandes"
- Amélioration du code coverage
- Optimisation des performances pour les images de produits
