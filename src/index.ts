import express, { Request, Response } from "express";
import db from "./database";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

// =========================
// Routes API
// =========================

// Récupérer toutes les tâches
app.get("/api/todos", (req: Request, res: Response) => {
    const todos = db.prepare("SELECT * FROM todos").all();
    res.json(todos);
});

// Ajouter une tâche
app.post("/api/todos", (req: Request, res: Response) => {
    const { title } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({ message: "Le titre est obligatoire." });
    }

    const stmt = db.prepare("INSERT INTO todos (title, completed) VALUES (?, 0)");
    const result = stmt.run(title.trim());

    const newTodo = db.prepare("SELECT * FROM todos WHERE id = ?").get(result.lastInsertRowid);

    res.status(201).json(newTodo);
});

// Modifier une tâche
app.put("/api/todos/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { title } = req.body;

    const todo = db.prepare("SELECT * FROM todos WHERE id = ?").get(id);

    if (!todo) {
        return res.status(404).json({ message: "Tâche introuvable." });
    }

    if (!title || title.trim() === "") {
        return res.status(400).json({ message: "Titre invalide." });
    }

    db.prepare("UPDATE todos SET title = ? WHERE id = ?").run(title.trim(), id);

    const updatedTodo = db.prepare("SELECT * FROM todos WHERE id = ?").get(id);
    res.json(updatedTodo);
});

// Supprimer une tâche
app.delete("/api/todos/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const todo = db.prepare("SELECT * FROM todos WHERE id = ?").get(id);

    if (!todo) {
        return res.status(404).json({ message: "Tâche introuvable." });
    }

    db.prepare("DELETE FROM todos WHERE id = ?").run(id);
    res.json({ message: "Tâche supprimée avec succès." });
});

// Modifier l'état d'une tâche
app.patch("/api/todos/:id/completed", (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const todo = db.prepare("SELECT * FROM todos WHERE id = ?").get(id) as { completed: number } | undefined;

    if (!todo) {
        return res.status(404).json({ message: "Tâche introuvable." });
    }

    const newCompleted = todo.completed ? 0 : 1;

    db.prepare("UPDATE todos SET completed = ? WHERE id = ?").run(newCompleted, id);

    const updatedTodo = db.prepare("SELECT * FROM todos WHERE id = ?").get(id);
    res.json(updatedTodo);
});

// =========================
// Lancement du serveur
// =========================

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});