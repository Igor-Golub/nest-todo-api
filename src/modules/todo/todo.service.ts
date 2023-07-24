import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateDTO, UpdateDTO } from './entities/dto';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODO_REPOSITORY')
    private todoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findById({ id }: Pick<Todo, 'id'>): Promise<Todo> {
    return this.todoRepository.findOneBy({ id });
  }

  async create(newTodo: CreateDTO): Promise<Todo> {
    return this.todoRepository.save(newTodo);
  }

  async update(newTodo: UpdateDTO): Promise<Todo> {
    return this.todoRepository.save(newTodo);
  }

  async deleteById({ id }: Pick<Todo, 'id'>): Promise<void> {
    this.todoRepository.delete(id);
  }
}
