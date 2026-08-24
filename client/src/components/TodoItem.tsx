import type { Todo } from "../types";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => void;
    onEdit: (id: number, currentTitle: string) => void;
    onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
    return (
        <li className={`todo-item${todo.completed ? " completed" : ""}`}>
            <input
                type="checkbox"
                checked={Boolean(todo.completed)}
                onChange={() => onToggle(todo.id)}
            />
            <span>{todo.title}</span>
            <button
                type="button"
                className="edit-btn"
                aria-label="Modifier"
                onClick={() => onEdit(todo.id, todo.title)}
            >
                🖊
            </button>
            <button
                type="button"
                className="delete-btn"
                aria-label="Supprimer"
                onClick={() => onDelete(todo.id)}
            >
                🗑
            </button>
        </li>
    );
}
