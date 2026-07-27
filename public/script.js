const message = document.getElementById("message");


// Afficher un message utilisateur
function showMessage(text, error = false) {

    message.textContent = text;

    message.style.color = error ? "#555" : "#111";

    setTimeout(() => {
        message.textContent = "";
    }, 3000);

}


// Charger les tâches
async function loadTodos() {

    try {

        const response = await fetch("/api/todos");

        if (!response.ok) {
            throw new Error("Erreur serveur.");
        }

        const todos = await response.json();

        displayTodos(todos);


    } catch (error) {

        console.error("Erreur lors du chargement des tâches :", error);

        showMessage(
            "Impossible de charger les tâches.",
            true
        );

    }

}


// Afficher les tâches
function displayTodos(todos) {

    const todoList = document.getElementById("todo-list");

    todoList.innerHTML = "";


    todos.forEach(todo => {

        const li = document.createElement("li");

        li.classList.add("todo-item");


        if (todo.completed) {
            li.classList.add("completed");
        }


        // Checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;


        checkbox.addEventListener("change", async () => {

            try {

                const response = await fetch(
                    `/api/todos/${todo.id}/completed`,
                    {
                        method: "PATCH"
                    }
                );


                if (!response.ok) {
                    throw new Error("Erreur serveur.");
                }


                await response.json();

                loadTodos();


            } catch (error) {

                console.error(
                    "Erreur lors du changement d'état :",
                    error
                );

                showMessage(
                    "Impossible de modifier l'état.",
                    true
                );

            }

        });


        // Texte
        const span = document.createElement("span");

        span.textContent = todo.title;


        // Modifier
        const editButton = document.createElement("button");

        editButton.textContent = "🖊";
        editButton.classList.add("edit-btn");


        editButton.addEventListener("click", async () => {

            const newTitle = prompt(
                "Modifier la tâche :",
                todo.title
            );


            if (!newTitle || newTitle.trim() === "") {
                return;
            }


            try {

                const response = await fetch(
                    `/api/todos/${todo.id}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            title: newTitle.trim()
                        })
                    }
                );


                if (!response.ok) {
                    throw new Error("Erreur serveur.");
                }


                await response.json();

                loadTodos();


            } catch (error) {

                console.error(
                    "Erreur lors de la modification :",
                    error
                );

                showMessage(
                    "Impossible de modifier la tâche.",
                    true
                );

            }

        });


        // Supprimer
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "🗑";
        deleteButton.classList.add("delete-btn");


        deleteButton.addEventListener("click", async () => {

            try {

                const response = await fetch(
                    `/api/todos/${todo.id}`,
                    {
                        method: "DELETE"
                    }
                );


                if (!response.ok) {
                    throw new Error("Erreur serveur.");
                }


                await response.json();

                loadTodos();


            } catch (error) {

                console.error(
                    "Erreur lors de la suppression :",
                    error
                );

                showMessage(
                    "Impossible de supprimer la tâche.",
                    true
                );

            }

        });


        // Ajouter les éléments
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(deleteButton);


        todoList.appendChild(li);

    });

}


// Formulaire ajout
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");


todoForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    const title = todoInput.value.trim();


    if (title === "") {

        showMessage(
            "Veuillez entrer une tâche.",
            true
        );

        return;

    }


    try {

        const response = await fetch(
            "/api/todos",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    title: title
                })
            }
        );


        if (!response.ok) {
            throw new Error("Erreur serveur.");
        }


        await response.json();


        todoInput.value = "";

        loadTodos();


        showMessage(
            "Tâche ajoutée."
        );


    } catch (error) {

        console.error(
            "Erreur lors de l'ajout de la tâche :",
            error
        );

        showMessage(
            "Impossible d'ajouter la tâche.",
            true
        );

    }

});


// Chargement initial
loadTodos();