# Productly

## Avant propos

Pour ce test, j’ai choisi de ne pas utiliser de framework CSS comme Tailwind ou Bootstrap, même si je maîtrise ces outils. L’objectif étant de rejoindre une agence orientée WordPress en tant que développeur de thèmes, il me semblait plus pertinent de mettre en avant ma capacité à travailler en CSS pur. Cela garantit un code lisible, entièrement maîtrisé dans ses détails, et démontre ma faculté à construire une intégration solide sans dépendances lourdes.

Pour les animations, j’ai opté pour AOS. Cette librairie légère et rapide à mettre en place m’a permis d’apporter de la fluidité et un rendu moderne, tout en respectant les préférences système comme prefers-reduced-motion. C’était un choix stratégique pour obtenir un effet visuel convaincant sans sacrifier du temps sur des développements complexes.

Le carrousel a été réalisé en vanilla JavaScript. C’était l’occasion de démontrer mes compétences en développement d’une fonctionnalité interactive et accessible, pensée spécifiquement pour répondre à la maquette.

Enfin, j’ai utilisé Vite afin de bénéficier d’un environnement moderne, rapide et optimisé, parfaitement adapté à la contrainte de temps et à l’objectif d’un projet léger et performant.

Mon approche a donc été guidée par la simplicité, l’efficacité et la lisibilité, avec un accent particulier mis sur la qualité du rendu et la pertinence des choix techniques. Bien sûr, certains points du code pourraient être refactorisés, notamment au niveau du nommage, afin de gagner en maintenabilité et en évolutivité.

## Fonctionnalités

- **Design responsive** : Interface adaptative pour tous les appareils
- **Menu mobile** : Navigation mobile optimisée avec hamburger menu
- **Carousel interactif** : Galerie d'images avec navigation par boutons
- **Animations fluides** : Animations au scroll avec AOS (Animate On Scroll)
- **Accessibilité** : Conforme aux standards d'accessibilité web
- **Performance** : Optimisé avec Vite pour un chargement rapide

## Technologies utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Styles modernes avec CSS Grid et Flexbox
- **JavaScript ES6+** : Modules et fonctionnalités interactives
- **Vite** : Build tool moderne et rapide
- **AOS** : Bibliothèque d'animations au scroll
- **ESLint & Prettier** : Qualité et formatage du code
- **Stylelint** : Linting CSS

## Installation

1. **Cloner le repository**

   ```bash
   git clone <url-du-repository>
   cd test-theme-dev-2025
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**

   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur**
   ```
   http://localhost:5173
   ```

## Scripts disponibles

- `npm run dev` : Lance le serveur de développement Vite
- `npm run build` : Compile le projet pour la production
- `npm run preview` : Prévisualise la version de production
- `npm run lint:js` : Vérifie la qualité du code JavaScript
- `npm run lint:css` : Vérifie la qualité du code CSS
- `npm run format` : Formate le code avec Prettier

## Structure du projet

```
test-theme-dev-2025/
├── dist/                    # Dossier de build (généré automatiquement)
├── public/                  # Fichiers statiques
│   ├── images/             # Images et icônes
│   └── fonts/              # Polices personnalisées
├── src/                    # Code source
│   ├── style.css           # Styles principaux
│   ├── main.js             # Point d'entrée JavaScript
│   ├── mobileMenu.js       # Module menu mobile
│   └── carousel.js         # Module carousel
├── index.html              # Page principale
├── package.json            # Configuration npm
└── eslint.config.js        # Configuration ESLint
```

## Fonctionnalités détaillées

### Menu mobile

- Navigation responsive avec breakpoint à 768px
- Animation fluide d'ouverture/fermeture
- Gestion de l'état du menu et de l'accessibilité

### Carousel

- Navigation par boutons avec indicateurs
- Support du scroll-snap pour une navigation tactile
- Responsive avec adaptation mobile/desktop

### Animations

- Animations au scroll avec AOS
- Transitions CSS fluides
- Optimisation des performances

## Déploiement

Pour déployer le projet :

1. **Build de production**

   ```bash
   npm run build
   ```

2. **Les fichiers optimisés sont dans le dossier `dist/`**

3. **Déployer le contenu du dossier `dist/` sur votre serveur web**

## Auteur

[Raphael Sanchez](https://raphaelsanchez.design)
