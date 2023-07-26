import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Todo {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty()
  @Column({ length: 500 })
  title: string;

  @ApiProperty()
  @Column({ default: false })
  isCompleted: boolean;
}
