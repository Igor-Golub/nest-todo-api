import { Module } from '@nestjs/common';
import { DataBaseModule } from '../db/database.module';
import { photoProviders } from './todo.providers';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';

@Module({
  imports: [DataBaseModule],
  controllers: [TodoController],
  providers: [...photoProviders, TodoService],
})
export class TodoModule {}
