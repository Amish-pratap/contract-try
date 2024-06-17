import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
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
        limit,
        offset: (page - 1) * limit,
      },
    );
    return {
      tasks: tasks.map((e) => new taskListRo(e)),
      total,
    };
  }
}
