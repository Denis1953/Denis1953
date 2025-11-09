# Guide : Configuration d'un Repository Git

## 📋 Table des matières
1. [Configuration Git de base](#1-configuration-git-de-base)
2. [Fichiers essentiels](#2-fichiers-essentiels)
3. [Branches et workflow](#3-branches-et-workflow)
4. [Protection et sécurité](#4-protection-et-sécurité)
5. [Intégration continue (CI/CD)](#5-intégration-continue-cicd)
6. [Documentation](#6-documentation)
7. [Collaboration](#7-collaboration)

---

## 1. Configuration Git de base

### Configuration utilisateur
```bash
# Votre identité
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@example.com"

# Éditeur par défaut
git config --global core.editor "vim"

# Visualiser la configuration
git config --list
```

### Configuration du repository local
```bash
# Initialiser le repository
git init

# Ajouter un remote
git remote add origin https://github.com/username/repo.git

# Vérifier les remotes
git remote -v
```

---

## 2. Fichiers essentiels

### 2.1 `.gitignore`
Fichier crucial pour exclure les fichiers inutiles du versioning.

**Exemple pour un projet Node.js :**
```gitignore
# Dependencies
node_modules/
package-lock.json

# Environment variables
.env
.env.local
.env.production

# Logs
logs/
*.log
npm-debug.log*

# Build output
dist/
build/
.next/
out/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Tests
coverage/
.nyc_output/
```

### 2.2 `README.md`
Documentation principale du projet.

**Structure recommandée :**
```markdown
# Nom du Projet

## Description
Brève description du projet

## Installation
```bash
npm install
```

## Utilisation
```bash
npm start
```

## Technologies utilisées
- Node.js
- Express
- etc.

## Contribution
Instructions pour contribuer

## Licence
MIT
```

### 2.3 `LICENSE`
Fichier de licence (MIT, GPL, Apache, etc.)

### 2.4 `.editorconfig`
Standardise le style de code entre éditeurs.

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

### 2.5 `.gitattributes`
Gestion des attributs de fichiers.

```
* text=auto
*.js text eol=lf
*.json text eol=lf
*.md text eol=lf
*.yml text eol=lf
```

---

## 3. Branches et workflow

### 3.1 Structure des branches

```
main (production)
  ├── develop (développement)
  │   ├── feature/nouvelle-fonctionnalite
  │   ├── feature/autre-fonctionnalite
  │   └── bugfix/correction-bug
  └── hotfix/urgence-production
```

### 3.2 Conventions de nommage

- `main` ou `master` : branche principale (production)
- `develop` : branche de développement
- `feature/nom-feature` : nouvelles fonctionnalités
- `bugfix/nom-bug` : corrections de bugs
- `hotfix/nom-hotfix` : corrections urgentes en production
- `release/version` : préparation des releases

### 3.3 Commandes de branches

```bash
# Créer une branche
git checkout -b feature/ma-fonctionnalite

# Changer de branche
git checkout develop

# Lister les branches
git branch -a

# Supprimer une branche
git branch -d feature/ma-fonctionnalite
```

---

## 4. Protection et sécurité

### 4.1 Protection de la branche principale (GitHub)

Dans les paramètres GitHub :
- Settings > Branches > Branch protection rules

**À configurer :**
- ✅ Require pull request reviews before merging
- ✅ Require status checks to pass before merging
- ✅ Require conversation resolution before merging
- ✅ Require linear history
- ✅ Include administrators

### 4.2 Secrets et variables d'environnement

**Ne JAMAIS commiter :**
- Mots de passe
- Clés API
- Tokens
- Certificats
- Fichiers `.env`

**Utiliser :**
- Variables d'environnement locales (`.env`)
- GitHub Secrets pour CI/CD
- Services de gestion de secrets (Vault, AWS Secrets Manager)

### 4.3 `.env.example`
Créer un template sans valeurs sensibles :

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# API Keys
API_KEY=your_api_key_here
SECRET_KEY=your_secret_key_here

# Environment
NODE_ENV=development
PORT=3000
```

---

## 5. Intégration continue (CI/CD)

### 5.1 GitHub Actions

Créer `.github/workflows/ci.yml` :

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm ci

    - name: Run tests
      run: npm test

    - name: Run linter
      run: npm run lint

    - name: Build
      run: npm run build
```

### 5.2 Badges de statut

Ajouter au README.md :
```markdown
![CI](https://github.com/username/repo/workflows/CI/badge.svg)
![Coverage](https://codecov.io/gh/username/repo/branch/main/graph/badge.svg)
```

---

## 6. Documentation

### 6.1 Fichiers de documentation essentiels

- `README.md` : Vue d'ensemble du projet
- `CONTRIBUTING.md` : Guide de contribution
- `CODE_OF_CONDUCT.md` : Code de conduite
- `CHANGELOG.md` : Journal des modifications
- `docs/` : Documentation technique détaillée

### 6.2 Exemple de CONTRIBUTING.md

```markdown
# Guide de contribution

## Comment contribuer

1. Forkez le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## Standards de code

- Utilisez ESLint
- Écrivez des tests
- Documentez les nouvelles fonctionnalités
```

### 6.3 Exemple de CHANGELOG.md

```markdown
# Changelog

## [1.0.0] - 2025-11-09

### Added
- Nouvelle fonctionnalité X
- Support pour Y

### Changed
- Amélioration de la performance Z

### Fixed
- Correction du bug #123
```

---

## 7. Collaboration

### 7.1 Templates GitHub

**Pull Request Template** (`.github/PULL_REQUEST_TEMPLATE.md`) :

```markdown
## Description
Décrivez les changements

## Type de changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Breaking change
- [ ] Documentation

## Checklist
- [ ] Mon code suit les standards du projet
- [ ] J'ai effectué une revue de mon propre code
- [ ] J'ai commenté les parties complexes
- [ ] J'ai mis à jour la documentation
- [ ] Mes changements ne génèrent pas de nouveaux warnings
- [ ] J'ai ajouté des tests
- [ ] Tous les tests passent
```

**Issue Template** (`.github/ISSUE_TEMPLATE/bug_report.md`) :

```markdown
---
name: Bug report
about: Signaler un bug
---

## Description du bug
Description claire et concise du bug

## Comment reproduire
1. Aller sur '...'
2. Cliquer sur '...'
3. Voir l'erreur

## Comportement attendu
Description du comportement attendu

## Screenshots
Si applicable, ajoutez des screenshots

## Environnement
- OS: [e.g. Ubuntu 22.04]
- Version: [e.g. 1.0.0]
```

### 7.2 Code Review

**Bonnes pratiques :**
- Commenter de manière constructive
- Vérifier les tests
- Valider la conformité aux standards
- Tester localement si nécessaire

### 7.3 Conventions de commit

**Format recommandé (Conventional Commits) :**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types :**
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage
- `refactor`: Refactorisation
- `test`: Tests
- `chore`: Tâches de maintenance

**Exemples :**
```bash
git commit -m "feat(auth): add JWT authentication"
git commit -m "fix(api): resolve timeout issue on large requests"
git commit -m "docs(readme): update installation instructions"
```

---

## 📚 Ressources supplémentaires

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)

---

## ✅ Checklist de configuration complète

- [ ] Configuration Git locale (user.name, user.email)
- [ ] Création du repository (local et remote)
- [ ] Fichier .gitignore adapté au projet
- [ ] README.md complet
- [ ] LICENSE choisie
- [ ] Structure de branches définie
- [ ] Protection de la branche main
- [ ] CI/CD configuré (GitHub Actions)
- [ ] Templates PR et Issues
- [ ] CONTRIBUTING.md
- [ ] Code of Conduct
- [ ] .env.example
- [ ] Documentation technique
- [ ] Tests automatisés

---

**Date de création :** 2025-11-09
**Dernière mise à jour :** 2025-11-09
