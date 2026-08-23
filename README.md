# Todo List
Task management application developed using **HTML, CSS, TypeScript, and Node.js with Express**.

Tasks are stored in an **SQLite** database on the backend.

---

## Features

- **+** Add a task
- View all tasks
- 🖊 Edit a task
- 🗑 Delete a task
- Mark a task as complete
- Automatic saving to an SQLite database
- ⚠️ Client-side and server-side error handling

---

## Technologies Used

### Frontend

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

### Storage
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

#### Data is saved locally in: `data/todos.db`
---

## Planned Improvements
- Replace `SQLite` storage with `PostgreSQL` storage
- Replace the `HTML/CSS/JS` frontend with a `React.js` frontend
- Replace the `React.js` frontend with a `Next.js` frontend

---
## Installation

Clone the project:

```bash
git clone https://github.com/AlexandreCoussediere/todo-list.git
```

Install dependencies:

```bash
npm install
```

Compile TypeScript:

```bash
npm run build
```

Start the server:

```bash
npm start
```

Or in development mode (with auto-reload):

```bash
npm run dev
```
