import { Injectable } from '@nestjs/common';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ToDo } from '../entities/todo.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import { TodoRequestShape } from './todo.controller';
import { taskListRo } from './ro/taskList.ro';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(ToDo)
    private readonly todoRepository: EntityRepository<ToDo>,
    private readonly em: EntityManager,
  ) {}

  async create(dto: TodoRequestShape['createTask']['body']) {
    const todo = new ToDo({ title: dto.title, description: dto.description });
    await this.em.persistAndFlush(todo);
    return todo;
  }
  async tasks(page: number, limit: number) {
    const [tasks, total] = await this.todoRepository.findAndCount(
      {},
      {
        orderBy: { createdAt: 'asc' },
        limit,
        offset: (page - 1) * limit,
      },
    );
    return {
      tasks: tasks.map((e) => new taskListRo(e)),
      total,
    };
  }
  async update(dto: TodoRequestShape['updateTask']['body']) {
    const todo = await this.todoRepository.findOneOrFail({ id: dto.id });
    wrap(todo).assign({ isCompleted: dto.isCompleted });
    await this.em.flush();
    return todo;
  }
  async delete(dto: TodoRequestShape['deleteTask']['params']) {
    const todo = await this.todoRepository.findOneOrFail({ id: dto.id });
    await this.em.removeAndFlush(todo);
  }
}
