import TodoItem from "./todo-item";
import EmptyState from "./empty-state";

type TodoListItem = {
  task: string;
  isComplete: boolean;
};

type TodoListProps = {
  todos: TodoListItem[];
};

export default function TodoList({ todos }: TodoListProps) {
  if (todos.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col gap-3">
      {todos.map((todo, index) => (
        <TodoItem key={index} task={todo.task} isComplete={todo.isComplete} />
      ))}
    </div>
  );
}
