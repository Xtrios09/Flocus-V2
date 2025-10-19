import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, GripVertical, Trash2, Filter } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { useAppStore } from '@/stores/useAppStore';
import type { Todo, PriorityLevel, TaskCategory } from '@shared/schema';
import { AddTodoDialog } from './AddTodoDialog';
import confetti from 'canvas-confetti';
import { format } from 'date-fns';

export function TodoList() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<PriorityLevel | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | 'all'>('all');
  const [showCompleted, setShowCompleted] = useState(true);
  
  const todos = useLiveQuery(() => db.todos.orderBy('order').toArray(), []) || [];
  
  // Filter todos
  const filteredTodos = todos.filter(todo => {
    if (!showCompleted && todo.completed) return false;
    if (selectedPriority !== 'all' && todo.priority !== selectedPriority) return false;
    if (selectedCategory !== 'all' && todo.category !== selectedCategory) return false;
    return true;
  });
  
  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(filteredTodos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Update order in database
    await Promise.all(
      items.map((item, index) =>
        db.todos.update(item.id, { order: index })
      )
    );
  };
  
  const handleToggleComplete = async (todo: Todo) => {
    const { profile, updateProfile } = useAppStore.getState();
    const newCompleted = !todo.completed;
    await db.todos.update(todo.id, {
      completed: newCompleted,
      completedAt: newCompleted ? new Date().toISOString() : undefined,
    });
    
    if (newCompleted && profile) {
      // Award coins and XP
      const { completeTask } = await import('@/lib/gamification');
      const result = await completeTask(profile, todo.id);
      updateProfile(result.updatedProfile);
      
      // Celebration!
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };
  
  const handleDelete = async (id: string) => {
    await db.todos.delete(id);
  };
  
  const getPriorityColor = (priority: PriorityLevel) => {
    switch (priority) {
      case 'high': return 'border-l-destructive';
      case 'medium': return 'border-l-gold';
      case 'low': return 'border-l-success';
    }
  };
  
  return (
    <>
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-2xl font-bold">Tasks</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCompleted(!showCompleted)}
              data-testid="button-toggle-completed"
            >
              <Filter className="w-4 h-4 mr-2" />
              {showCompleted ? 'Hide' : 'Show'} Completed
            </Button>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              data-testid="button-add-todo"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>
        
        {/* Filter badges */}
        <div className="flex gap-2 flex-wrap">
          <Badge
            variant={selectedPriority === 'all' ? 'default' : 'outline'}
            className="cursor-pointer hover-elevate"
            onClick={() => setSelectedPriority('all')}
            data-testid="filter-priority-all"
          >
            All
          </Badge>
          <Badge
            variant={selectedPriority === 'high' ? 'destructive' : 'outline'}
            className="cursor-pointer hover-elevate"
            onClick={() => setSelectedPriority('high')}
            data-testid="filter-priority-high"
          >
            High
          </Badge>
          <Badge
            variant={selectedPriority === 'medium' ? 'default' : 'outline'}
            className="cursor-pointer hover-elevate bg-gold/10 text-gold-foreground border-gold/20"
            onClick={() => setSelectedPriority('medium')}
            data-testid="filter-priority-medium"
          >
            Medium
          </Badge>
          <Badge
            variant={selectedPriority === 'low' ? 'default' : 'outline'}
            className="cursor-pointer hover-elevate bg-success/10 text-success-foreground border-success/20"
            onClick={() => setSelectedPriority('low')}
            data-testid="filter-priority-low"
          >
            Low
          </Badge>
        </div>
        
        {/* Todo list */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {filteredTodos.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No tasks yet. Add one to get started!</p>
                  </div>
                ) : (
                  filteredTodos.map((todo, index) => (
                    <Draggable key={todo.id} draggableId={todo.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`group flex items-center gap-3 p-4 bg-card border rounded-md border-l-4 ${getPriorityColor(todo.priority)} transition-all ${
                            snapshot.isDragging ? 'shadow-lg scale-105' : 'hover-elevate'
                          }`}
                          data-testid={`todo-item-${todo.id}`}
                        >
                          <div {...provided.dragHandleProps}>
                            <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
                          </div>
                          
                          <Checkbox
                            checked={todo.completed}
                            onCheckedChange={() => handleToggleComplete(todo)}
                            data-testid={`checkbox-todo-${todo.id}`}
                          />
                          
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                              {todo.title}
                            </p>
                            <div className="flex gap-2 mt-1 flex-wrap">
                              <Badge variant="outline" className="text-xs">
                                {todo.category}
                              </Badge>
                              {todo.dueDate && (
                                <Badge variant="outline" className="text-xs">
                                  {format(new Date(todo.dueDate), 'MMM d')}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDelete(todo.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            data-testid={`button-delete-todo-${todo.id}`}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Card>
      
      <AddTodoDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />
    </>
  );
}
