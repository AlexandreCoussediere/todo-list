# Todo List

Application de gestion de tâches développée avec **HTML, CSS, TypeScript et Node.js avec Express**.

Les tâches sont stockées dans une base de données **SQLite** côté backend.

---

## Fonctionnalités

- **+** Ajouter une tâche
- Afficher toutes les tâches
- 🖊 Modifier une tâche
- 🗑 Supprimer une tâche
- Marquer une tâche comme terminée
- Sauvegarde automatique dans une base de données SQLite
- ⚠️ Gestion des erreurs côté client et serveur

---

## Technologies utilisées

### Frontend

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

### Stockage
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

#### Les données sont sauvegardées localement dans : `data/todos.db`
---

## Amélioration à venir
- Remplacer le stockage sur `SQLite` par un stockage avec `PostgreSQL`
- Remplacer le Frontend `html/css/js` en Frontend `React.js`
- Remplacer le Frontend `React.js` en Frontend `Next.js`

---
## Installation

Cloner le projet :

```bash
git clone https://github.com/AlexandreCoussediere/todo-list.git
```

Installer les dépendances :

```bash
npm install
```

Compiler le TypeScript :

```bash
npm run build
```

Lancer le serveur :

```bash
npm start
```

Ou en mode développement (avec rechargement automatique) :

```bash
npm run dev
```