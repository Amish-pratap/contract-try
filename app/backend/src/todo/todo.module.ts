import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ToDo } from 'src/entities/todo.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [ToDo] })],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
