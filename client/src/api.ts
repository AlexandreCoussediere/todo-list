import type { Todo } from "./types";

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        throw new Error("Erreur serveur.");
    }
    return response.json() as Promise<T>;
}

export async function fetchTodos(): Promise<Todo[]> {
    const response = await fetch("/api/todos");
    return handleResponse<Todo[]>(response);
}

export async function createTodo(title: string): Promise<Todo> {
    const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
    });
    return handleResponse<Todo>(response);
}

export async function updateTodoTitle(id: number, title: string): Promise<Todo> {
    const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
    });
    return handleResponse<Todo>(response);
}

export async function deleteTodo(id: number): Promise<{ message: string }> {
    const response = await fetch(`/api/todos/${id}`, { method: "DELETE" });
    return handleResponse<{ message: string }>(response);
}

export async function toggleTodoCompleted(id: number): Promise<Todo> {
    const response = await fetch(`/api/todos/${id}/completed`, { method: "PATCH" });
    return handleResponse<Todo>(response);
}
