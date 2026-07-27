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

        // Créer l'élément li
        const li = document.createElement("li");

        li.classList.add("todo-item");


        // Ajouter la classe si la tâche est terminée
        if (todo.completed) {
            li.classList.add("completed");
        }


        // Créer la case à cocher
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;


        // Créer le texte de la tâche
        const span = document.createElement("span");

        span.textContent = todo.title;


        // Créer le bouton Modifier
        const editButton = document.createElement("button");

        editButton.textContent = "🖊";
        editButton.classList.add("edit-btn");


        // Créer le bouton Supprimer
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "🗑";
        deleteButton.classList.add("delete-btn");


        // Ajouter les éléments dans le li
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(deleteButton);


        // Ajouter la tâche dans la liste
        todoList.appendChild(li);

    });

}


// Charger les tâches quand la page est prête
loadTodos();