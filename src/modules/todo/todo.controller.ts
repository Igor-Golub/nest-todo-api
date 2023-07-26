import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { CreateDTO, UpdateDTO } from './entities/dto';
import { APIRouts } from '../../shared/enums';

@Controller(APIRouts.Todo)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  getTodoById(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findById({ id });
  }

  @Post()
  createTodo(@Body() todo: CreateDTO): Promise<Todo> {
    return this.todoService.create({
      title: todo.title,
      isCompleted: todo.isCompleted ?? false,
    });
  }

  @Put()
  async updateTodo(
    @Body() { id, title, isCompleted = false }: UpdateDTO,
  ): Promise<Todo> {
    const findTodo = await this.todoService.findById({ id });

    if (!findTodo) throw new Error('Todo didn`t find!');

    return this.todoService.update({
      id: findTodo.id,
      title: title ?? findTodo.title,
      isCompleted: isCompleted ?? findTodo.isCompleted,
    });
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string): Promise<void> {
    return this.todoService.deleteById({ id });
  }
}
