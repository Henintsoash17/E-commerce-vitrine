# Elecwave — boutique tech (démo portfolio)

Boutique fictive de matériel informatique et électronique construite avec Next.js App Router, React et TypeScript. Les produits sont définis localement dans `lib/products.ts`. Le panier et les favoris sont conservés dans `localStorage`; aucun backend, paiement ou service externe n'est utilisé.

## Prérequis
- Node.js 24.x
- npm

## Installation
```bash
npm install
npm run dev
```
Ouvrir http://localhost:3000.

## Vérifications
```bash
npm run typecheck
npm run lint
npm run build
```

## Architecture
- `app/`: layout, styles globaux et route principale
- `components/ui/`: éléments réutilisables (logo)
- `components/storefront/`: en-tête, filtres de catégories, cartes produits, grille, panier et assemblage de la boutique
- `lib/products.ts`: types, catégories, données fictives et formatage des prix

Le checkout, la newsletter et les avis sont des interactions de démonstration : aucun paiement ni envoi de données n'est effectué.
