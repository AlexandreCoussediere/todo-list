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
        return JSON.parse(data);


    } catch (error) {

        console.error(
            "Erreur lors de la lecture du fichier JSON :",
            error
        );

        return [];

    }

}



// Sauvegarder les tâches dans le fichier JSON
function writeTodos(todos) {

    try {

        const jsonData = JSON.stringify(
            todos,
            null,
            2
        );


        fs.writeFileSync(
            DATA_FILE,
            jsonData,
            "utf-8"
        );


        console.log(
            "Données sauvegardées avec succès."
        );


    } catch (error) {

        console.error(
            "Erreur lors de l'écriture du fichier JSON :",
            error
        );

    }

}



// =========================
// Routes API
// =========================


// Récupérer toutes les tâches
app.get("/api/todos", (req, res) => {

    const todos = readTodos();

    res.json(todos);

});



// Ajouter une tâche
app.post("/api/todos", (req, res) => {

    const todos = readTodos();


    const { title } = req.body;


    // Vérifier le contenu
    if (!title || title.trim() === "") {

        return res.status(400).json({
            message: "Le titre est obligatoire."
        });

    }


    const newTodo = {

        id: Date.now(),

        title: title.trim(),

        completed: false

    };


    todos.push(newTodo);


    writeTodos(todos);


    res.status(201).json(newTodo);

});



// Modifier une tâche
app.put("/api/todos/:id", (req, res) => {

    const todos = readTodos();


    const id = Number(req.params.id);


    const { title } = req.body;


    const todo = todos.find(
        todo => todo.id === id
    );


    if (!todo) {

        return res.status(404).json({
            message: "Tâche introuvable."
        });

    }


    // Vérifier le nouveau texte
    if (!title || title.trim() === "") {

        return res.status(400).json({
            message: "Titre invalide."
        });

    }


    todo.title = title.trim();


    writeTodos(todos);


    res.json(todo);

});



// Supprimer une tâche
app.delete("/api/todos/:id", (req, res) => {

    const todos = readTodos();


    const id = Number(req.params.id);


    const todo = todos.find(
        todo => todo.id === id
    );


    if (!todo) {

        return res.status(404).json({
            message: "Tâche introuvable."
        });

    }


    const updatedTodos = todos.filter(
        todo => todo.id !== id
    );


    writeTodos(updatedTodos);


    res.json({

        message: "Tâche supprimée avec succès."

    });

});



// Modifier l'état d'une tâche
app.patch("/api/todos/:id/completed", (req, res) => {

    const todos = readTodos();


    const id = Number(req.params.id);


    const todo = todos.find(
        todo => todo.id === id
    );


    if (!todo) {

        return res.status(404).json({
            message: "Tâche introuvable."
        });

    }


    todo.completed = !todo.completed;


    writeTodos(todos);


    res.json(todo);

});



// =========================
// Lancement du serveur
// =========================

app.listen(PORT, () => {

    console.log(
        `Serveur lancé sur http://localhost:${PORT}`
    );

});