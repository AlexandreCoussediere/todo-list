// Charger les tâches au démarrage
async function loadTodos() {

    try {
        // Faire une requête GET vers l'API
        const response = await fetch("/api/todos");

        // Convertir la réponse en JSON
        const todos = await response.json();

        // Afficher les tâches
        displayTodos(todos);

    } catch (error) {
        console.error("Erreur lors du chargement des tâches :", error);
    }

}


// Afficher les tâches dans la page
function displayTodos(todos) {

    const todoList = document.getElementById("todo-list");

    // Vider la liste avant affichage
    todoList.innerHTML = "";


    todos.forEach(todo => {

        const li = document.createElement("li");

        li.textContent = todo.title;

        todoList.appendChild(li);

    });

}


// Charger les tâches quand la page est prête
loadTodos();