const express = require("express");
const fs = require("fs");

const app = express();

const PORT = 3000;

const DATA_FILE = "./data/todos.json";

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

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});