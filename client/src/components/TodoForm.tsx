import { useState, FormEvent } from "react";

interface TodoFormProps {
    onSubmit: (title: string) => void;
}

export default function TodoForm({ onSubmit }: TodoFormProps) {
    const [title, setTitle] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const trimmedTitle = title.trim();
        if (trimmedTitle === "") {
            return;
        }

        onSubmit(trimmedTitle);
        setTitle("");
    }

    return (
        <form id="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                id="todo-input"
                placeholder="Ajouter une tâche..."
                autoComplete="off"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />
            <button type="submit" aria-label="Ajouter">
                +
            </button>
        </form>
    );
}
