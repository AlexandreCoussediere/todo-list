# **Todo List**
*A Scalable Task Management Application*
Originally built with **HTML, CSS, and JavaScript**, later upgraded to **TypeScript** for robustness. The backend runs on **Node.js with Express**, and tasks are now stored in a **SQLite** database.

---

## **Project Evolution**
My Todo List application has evolved through multiple iterations to improve structure, maintainability, and performance:

1. **Initial Version**:
   - **Frontend**: HTML, CSS, JavaScript
   - **Backend**: Node.js with Express
   - **Storage**: JSON files (simple but limited scalability)

2. **First Upgrade**:
   - **Frontend**: HTML, CSS, JavaScript (unchanged)
   - **Backend**: Node.js with Express
   - **Storage**: **SQLite** (more robust and local)

3. **Second Upgrade**:
   - **Frontend**: HTML, CSS, **TypeScript** (for better typing and maintainability)
   - **Backend**: Node.js with Express
   - **Storage**: **SQLite** (efficient local storage)

4. **Actual Version**:
   - **Frontend**: React.js, **TypeScript** (for better typing and maintainability)
   - **Backend**: Node.js with Express
   - **Storage**: **SQLite** (efficient local storage)
---

## **Features**
- **➕** Add a task
- **👁** View all tasks
- **✏️** Edit a task
- **🗑** Delete a task
- **✅** Mark a task as complete
- **💾** Automatic saving to a **SQLite** database
- **⚠️** Client-side and server-side error handling

---

## **Technologies Used**

### **Frontend**
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

> **Why TypeScript?**
> Transitioned from JavaScript to TypeScript for static typing, reducing common errors and improving code maintainability.

---

### **Backend**
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

> **Why Express?**
> A minimalist and flexible framework for Node.js, ideal for building RESTful APIs quickly and efficiently.

---
### **Storage**
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

> **Why SQLite?**
> A lightweight, serverless, and local database perfect for applications like a Todo List where simplicity and speed are key.
> Data is stored locally in: `data/todos.db`.

---
## **Future Improvements (Ideas in Progress)**
- **Replace SQLite with PostgreSQL** for better scalability and advanced features (complex queries, user management, etc.).
- **Adopt Next.js** to combine React’s benefits with server-side rendering (SSR) or static site generation (SSG).

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
