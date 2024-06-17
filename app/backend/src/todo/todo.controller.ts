import { Controller } from '@nestjs/common';
import { TodoService } from './todo.service';
import { contract } from 'contract';
import {
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
  nestControllerContract,
} from '@ts-rest/nest';
import { z } from 'zod';

export const todoContractController = nestControllerContract(contract.todo);
export type TodoRequestShape = NestRequestShapes<typeof todoContractController>;

@Controller()
export class TodoController
  implements NestControllerInterface<typeof todoContractController>
{
  constructor(private readonly todoService: TodoService) {}

  @TsRest(todoContractController.createTask)
  async createTask(@TsRestRequest() { body }: TodoRequestShape['createTask']) {
    const data = await this.todoService.create(body);
    return {
      status: 200 as const,
      body: {
        isSuccess: true,
        message: 'task ban gaya hai',
        id: data.id,
        title: data.title,
        description: data.description,
        isCompleted: data.isCompleted,
      },
    };
  }
  @TsRest(todoContractController.getTask)
  async getTask(@TsRestRequest() { query }: TodoRequestShape['getTask']) {
    const { page, limit } = query;
    const data = await this.todoService.tasks(page, limit);
    return {
      status: 200 as const,
      body: {
        isSuccess: true,
        message: 'task list',
        result: data.tasks,
        total: data.total,
        page,
        limit,
      },
    };
  }
}
