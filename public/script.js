// Charger les tâches au démarrage
async function loadTodos() {

    try {

        // Faire une requête GET
        const response = await fetch("/api/todos");

        // Convertir la réponse en JSON
        const todos = await response.json();

        // Réafficher les tâches
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

        checkbox.addEventListener("change", async () => {

    try {

        // Envoyer la requête PATCH
        const response = await fetch(`/api/todos/${todo.id}/completed`, {
            method: "PATCH"
        });


        // Recevoir la tâche modifiée
        const updatedTodo = await response.json();


        // Mettre à jour l'affichage
        loadTodos();


    } catch (error) {

        console.error("Erreur lors du changement d'état :", error);

    }

});


        // Créer le texte de la tâche
        const span = document.createElement("span");

        span.textContent = todo.title;


        // Créer le bouton Modifier
        const editButton = document.createElement("button");

        editButton.textContent = "🖊";
        editButton.classList.add("edit-btn");

        editButton.addEventListener("click", async () => {

    // Demander le nouveau texte
    const newTitle = prompt(
        "Modifier la tâche :",
        todo.title
    );


    // Vérifier que le texte existe
    if (!newTitle || newTitle.trim() === "") {
        return;
    }


    try {

        // Envoyer la requête PUT
        const response = await fetch(`/api/todos/${todo.id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title: newTitle.trim()
            })

        });


        // Recevoir la réponse
        const updatedTodo = await response.json();


        // Mettre à jour l'affichage
        loadTodos();


    } catch (error) {

        console.error("Erreur lors de la modification :", error);

    }

});

        // Créer le bouton Supprimer
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "🗑";
        deleteButton.classList.add("delete-btn");

        deleteButton.addEventListener("click", async () => {

    try {

        // Envoyer la requête DELETE
        await fetch(`/api/todos/${todo.id}`, {
            method: "DELETE"
        });


        // Mettre à jour l'affichage
        loadTodos();


    } catch (error) {

        console.error("Erreur lors de la suppression :", error);

    }

});


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

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");


// Ajouter une tâche
todoForm.addEventListener("submit", async (event) => {

    // Empêcher le rechargement de la page
    event.preventDefault();


    // Récupérer le texte saisi
    const title = todoInput.value.trim();


    // Vérifier que le texte n'est pas vide
    if (title === "") {
        return;
    }


    try {

        // Envoyer la requête POST
        const response = await fetch("/api/todos", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title: title
            })
        });


        // Attendre la réponse
        const newTodo = await response.json();


        // Mettre à jour l'affichage
        loadTodos();


        // Vider le champ
        todoInput.value = "";


    } catch (error) {

        console.error("Erreur lors de l'ajout de la tâche :", error);

    }

});