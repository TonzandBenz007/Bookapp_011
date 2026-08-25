import TodoItem from "./todo-item";
import EmptyState from "./empty-state";
import type { Todo } from "@/types/todo";

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, newTask: string, newYear?: number | null) => void;
};

export default function TodoList({ todos, onToggle, onDelete, onRename }: TodoListProps) {
  if (todos.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col gap-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onRename={onRename}
        />
      ))}
    </div>
  );
}
