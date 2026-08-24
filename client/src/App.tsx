import { useEffect, useState, useCallback } from "react";
import type { Todo } from "./types";
import {
    fetchTodos,
    createTodo,
    updateTodoTitle,
    deleteTodo,
    toggleTodoCompleted,
} from "./api";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export default function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const showMessage = useCallback((text: string, error = false) => {
        setMessage(text);
        setIsError(error);

        setTimeout(() => {
            setMessage("");
        }, 3000);
    }, []);

    const loadTodos = useCallback(async () => {
        try {
            const data = await fetchTodos();
            setTodos(data);
        } catch (error) {
            console.error("Erreur lors du chargement des tâches :", error);
            showMessage("Impossible de charger les tâches.", true);
        }
    }, [showMessage]);

    useEffect(() => {
        loadTodos();
    }, [loadTodos]);

    async function handleAddTodo(title: string) {
        try {
            await createTodo(title);
            await loadTodos();
            showMessage("Tâche ajoutée.");
        } catch (error) {
            console.error("Erreur lors de l'ajout de la tâche :", error);
            showMessage("Impossible d'ajouter la tâche.", true);
        }
    }

    async function handleToggleTodo(id: number) {
        try {
            await toggleTodoCompleted(id);
            await loadTodos();
        } catch (error) {
            console.error("Erreur lors du changement d'état :", error);
            showMessage("Impossible de modifier l'état.", true);
        }
    }

    async function handleEditTodo(id: number, currentTitle: string) {
        const newTitle = window.prompt("Modifier la tâche :", currentTitle);

        if (!newTitle || newTitle.trim() === "") {
            return;
        }

        try {
            await updateTodoTitle(id, newTitle.trim());
            await loadTodos();
        } catch (error) {
            console.error("Erreur lors de la modification :", error);
            showMessage("Impossible de modifier la tâche.", true);
        }
    }

    async function handleDeleteTodo(id: number) {
        try {
            await deleteTodo(id);
            await loadTodos();
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
            showMessage("Impossible de supprimer la tâche.", true);
        }
    }

    const todoCountLabel = `${todos.length} tâche${todos.length > 1 ? "s" : ""}`;

    return (
        <main className="container">
            <header className="ticket-header">
                <span className="eyebrow">Carnet du jour</span>
                <h1>Choses à faire</h1>
                <span className="count" id="todo-count">{todoCountLabel}</span>
            </header>

            <TodoForm onSubmit={handleAddTodo} />

            <p id="message" style={{ color: isError ? "#555" : "#111" }}>
                {message}
            </p>

            <div className="perforation" aria-hidden="true" />

            <TodoList
                todos={todos}
                onToggle={handleToggleTodo}
                onEdit={handleEditTodo}
                onDelete={handleDeleteTodo}
            />
        </main>
    );
}
