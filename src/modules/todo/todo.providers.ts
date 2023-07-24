import { DataSource } from 'typeorm';
import { Todo } from './entities/todo.entity';

export const photoProviders = [
  {
    provide: 'TODO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Todo),
    inject: ['DATA_SOURCE'],
  },
];
