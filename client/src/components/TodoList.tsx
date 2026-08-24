import type { Todo } from "../types";
import TodoItem from "./TodoItem";

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: number) => void;
    onEdit: (id: number, currentTitle: string) => void;
    onDelete: (id: number) => void;
}

export default function TodoList({ todos, onToggle, onEdit, onDelete }: TodoListProps) {
    return (
        <ul id="todo-list">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}
