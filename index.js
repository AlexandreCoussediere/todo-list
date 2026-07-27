const express = require("express");
const fs = require("fs");

const app = express();

const PORT = 3000;

const DATA_FILE = "./data/todos.json";

app.use(express.json());

app.use(express.static("public"));


// Lire les tâches depuis le fichier JSON
function readTodos() {
    try {
        const data = fs.readFileSync(DATA_FILE, "utf-8");

        // Cas où le fichier est vide
        if (!data.trim()) {
            return [];
        }

        // Convertir le JSON en objet JavaScript
        const todos = JSON.parse(data);

        return todos;

    } catch (error) {
        console.error("Erreur lors de la lecture du fichier JSON :", error);

        // Retourner un tableau vide en cas d'erreur
        return [];
    }
}
console.log(readTodos());

// Sauvegarder les tâches dans le fichier JSON
function writeTodos(todos) {
    try {
        // Convertir les données JavaScript en JSON
        const jsonData = JSON.stringify(todos, null, 2);

        // Écrire dans le fichier
        fs.writeFileSync(DATA_FILE, jsonData, "utf-8");

        console.log("Données sauvegardées avec succès.");

    } catch (error) {
        console.error("Erreur lors de l'écriture du fichier JSON :", error);
    }
}

// Récupérer toutes les tâches
app.get("/api/todos", (req, res) => {
    res.send("GET /api/todos");
});

// Ajouter une tâche
app.post("/api/todos", (req, res) => {

    // Lire les tâches existantes
    const todos = readTodos();

    // Récupérer les données envoyées par le client
    const { title } = req.body;

    // Créer une nouvelle tâche
    const newTodo = {
        id: Date.now(),
        title: title,
        completed: false
    };

    // Ajouter la tâche au tableau
    todos.push(newTodo);

    // Sauvegarder les modifications
    writeTodos(todos);

    // Retourner la nouvelle tâche
    res.status(201).json(newTodo);

});

// Modifier une tâche
app.put("/api/todos/:id", (req, res) => {

    // Lire les tâches
    const todos = readTodos();

    // Récupérer l'identifiant
    const id = Number(req.params.id);

    // Récupérer le nouveau titre
    const { title } = req.body;

    // Rechercher la tâche
    const todo = todos.find(todo => todo.id === id);

    // Vérifier si elle existe
    if (!todo) {
        return res.status(404).json({
            message: "Tâche introuvable."
        });
    }

    // Modifier son contenu
    todo.title = title;

    // Sauvegarder
    writeTodos(todos);

    // Retourner la tâche modifiée
    res.json(todo);

});

// Supprimer une tâche
app.delete("/api/todos/:id", (req, res) => {

    // Lire les tâches
    const todos = readTodos();

    // Récupérer l'identifiant
    const id = Number(req.params.id);

    // Rechercher la tâche
    const todo = todos.find(todo => todo.id === id);

    // Vérifier si elle existe
    if (!todo) {
        return res.status(404).json({
            message: "Tâche introuvable."
        });
    }

    // Supprimer la tâche
    const updatedTodos = todos.filter(todo => todo.id !== id);

    // Sauvegarder
    writeTodos(updatedTodos);

    // Retourner une confirmation
    res.json({
        message: "Tâche supprimée avec succès."
    });

});

// Modifier l'état d'une tâche
app.patch("/api/todos/:id/completed", (req, res) => {

    // Lire les tâches
    const todos = readTodos();

    // Récupérer l'identifiant
    const id = Number(req.params.id);

    // Rechercher la tâche
    const todo = todos.find(todo => todo.id === id);

    // Vérifier si elle existe
    if (!todo) {
        return res.status(404).json({
            message: "Tâche introuvable."
        });
    }

    // Modifier son état
    todo.completed = !todo.completed;

    // Sauvegarder
    writeTodos(todos);

    // Retourner la tâche mise à jour
    res.json(todo);

});

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});