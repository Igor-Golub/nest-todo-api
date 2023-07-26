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
    console.log(todo);
    const newTodo = new Todo();

    newTodo.title = todo.title;
    newTodo.isCompleted = todo.isCompleted;

    return this.todoService.create(newTodo);
  }

  @Put()
  updateTodo(
    @Body() { id, title, isCompleted = false }: UpdateDTO,
  ): Promise<Todo> {
    const findedTodo = this.todoService.findById({ id });

    if (!findedTodo) throw new Error('Todo didn`t find!');

    const newTodo = new Todo();

    newTodo.title = title;
    newTodo.isCompleted = isCompleted;

    return this.todoService.update(newTodo);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string): Promise<void> {
    return this.todoService.deleteById({ id });
  }
}
