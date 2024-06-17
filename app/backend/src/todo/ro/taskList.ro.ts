import { ToDo } from 'src/entities/todo.entity';

export class taskListRo {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  constructor(todo: ToDo) {
    this.id = todo.id;
    this.title = todo.title;
    this.description = todo.description;
    this.isCompleted = todo.isCompleted;
  }
}
