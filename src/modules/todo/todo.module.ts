import { Module } from '@nestjs/common';
import { DataBaseModule } from '../db/database.module';
import { photoProviders } from './todo.providers';
import { TodoService } from './todo.service';

@Module({
  imports: [DataBaseModule],
  providers: [...photoProviders, TodoService],
})
export class TodoModule {}
