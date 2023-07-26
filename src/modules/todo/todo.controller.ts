import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { CreateDTO, UpdateDTO } from './entities/dto';
import { APIRouts, StatusCodes, SwaggerGroups } from '../../shared/enums';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(SwaggerGroups.Todo)
@Controller(APIRouts.Todo)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiResponse({
    status: StatusCodes.Success,
    description: 'Get all todos',
    type: [Todo],
  })
  getTodos(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: StatusCodes.Success,
    description: 'Get todo by id',
    type: Todo,
  })
  getTodoById(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findById({ id });
  }

  @Post()
  @ApiResponse({
    status: StatusCodes.Create,
    description: 'Create todo',
    type: Todo,
  })
  @ApiBody({
    type: CreateDTO,
  })
  createTodo(@Body() todo: CreateDTO): Promise<Todo> {
    return this.todoService.create({
      title: todo.title,
      isCompleted: todo.isCompleted ?? false,
    });
  }

  @Put()
  @ApiResponse({
    status: StatusCodes.Update,
    description: 'Update todo',
    type: Todo,
  })
  @ApiBody({
    type: UpdateDTO,
  })
  async updateTodo(
    @Body() { id, title, isCompleted = false }: UpdateDTO,
  ): Promise<Todo> {
    if (!id) throw new HttpException('Was not sent id', StatusCodes.BadRequest);

    const findTodo = await this.todoService.findById({ id });

    if (!findTodo) {
      throw new HttpException('Todo did not find!', StatusCodes.BadRequest);
    }

    return this.todoService.update({
      id: findTodo.id,
      title: title ?? findTodo.title,
      isCompleted: isCompleted ?? findTodo.isCompleted,
    });
  }

  @Delete(':id')
  @ApiResponse({
    status: StatusCodes.Success,
    description: 'Delete todo',
  })
  deleteTodo(@Param('id') id: string): Promise<void> {
    if (!id) throw new HttpException('Was not sent id', StatusCodes.BadRequest);

    return this.todoService.deleteById({ id });
  }
}
