import { TodoList } from '@/components/todos/TodoList';

export default function TodosPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <p className="text-muted-foreground">Organize and track your todos with drag-and-drop</p>
      </div>
      
      <TodoList />
    </div>
  );
}
