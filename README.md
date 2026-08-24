# Orders Dashboard (Vue 3 + TypeScript + Vuetify)

Projet scaffoldé automatiquement par Copilot.

Fonctionnalités incluses:
- Liste des commandes
- Recherche
- Filtre par statut
- Pagination
- Détail d'une commande
- Modification du statut
- États loading / empty / error
- Responsive (desktop/tablette)

Prérequis
- Node 18+

Installer et lancer

1. Installer les dépendances

   npm install

2. Lancer le mock API (json-server)

   npm run serve:api

   L'API sera disponible sur http://localhost:4000 (GET /orders)

3. Lancer l'application

   npm run dev

Notes
- Le projet utilise Vuetify 3. Pour ajuster le thème ou les composants, modifier src/plugins/vuetify.ts
- Le mock se situe dans public/mock/orders.json
- Variables d'environnement: VITE_API_URL pour pointer l'API

Prochaines étapes possibles
- Ajouter tests unitaires + e2e
- Ajouter GitHub Action (lint/build)
- Ajouter MSW pour des mocks plus riches

