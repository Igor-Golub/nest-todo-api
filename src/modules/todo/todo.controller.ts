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

@Controller('api/todo')
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
  createTodo(@Body() { title, isComplited = false }: CreateDTO): Promise<Todo> {
    const newTodo = new Todo();

    newTodo.title = title;
    newTodo.isComplited = isComplited;

    return this.todoService.create(newTodo);
  }

  @Put()
  updateTodo(
    @Body() { id, title, isComplited = false }: UpdateDTO,
  ): Promise<Todo> {
    const findedTodo = this.todoService.findById({ id });

    if (!findedTodo) throw new Error('Todo didn`t find!');

    const newTodo = new Todo();

    newTodo.title = title;
    newTodo.isComplited = isComplited;

    return this.todoService.update(newTodo);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string): Promise<void> {
    return this.todoService.deleteById({ id });
  }
}
