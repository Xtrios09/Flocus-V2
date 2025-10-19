import Dexie, { Table } from 'dexie';
import { Todo, PomodoroSession, Notification } from '@shared/schema';

// IndexedDB database for storing large data
export class PomodoroDatabase extends Dexie {
  todos!: Table<Todo>;
  sessions!: Table<PomodoroSession>;
  notifications!: Table<Notification>;

  constructor() {
    super('PomodoroAppDB');
    
    this.version(1).stores({
      todos: 'id, completed, priority, category, dueDate, order',
      sessions: 'id, completedAt, type, category',
      notifications: 'id, createdAt, read, type',
    });
  }
}

export const db = new PomodoroDatabase();
